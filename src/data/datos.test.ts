import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import { articulo, fuenteDe, inicializarCodigos, type CodigoImportado } from './codigos';
import {
  buscarLeccion,
  buscarPregunta,
  estadoCamino,
  generados,
  leccionesDeArticulo,
  nodosDeUnidad,
  preguntasDeUnidad,
  preguntasParaPracticar,
  sinPenalidad,
  UNIDADES_NUCLEO,
  unidadesVisibles,
} from './curriculo';
import { extraerPena } from './generador';
import { GLOSARIO } from './glosario';
import type { Pregunta, Unidad } from './tipos';

const leer = (archivo: string) => JSON.parse(readFileSync(resolve(__dirname, 'codigos', archivo), 'utf8')) as CodigoImportado;

beforeAll(() => {
  inicializarCodigos(leer('cp.json'), leer('cppba.json'));
});

function validarPregunta(p: Pregunta) {
  expect(p.explicacion.length).toBeGreaterThan(3);
  switch (p.tipo) {
    case 'opcion':
    case 'completar':
      expect(p.opciones.length).toBeGreaterThanOrEqual(2);
      expect(new Set(p.opciones.map((o) => o.toLowerCase())).size).toBe(p.opciones.length);
      expect(p.correcta).toBeGreaterThanOrEqual(0);
      expect(p.correcta).toBeLessThan(p.opciones.length);
      if (p.tipo === 'completar') expect(p.frase).toContain('___');
      break;
    case 'ordenar':
      expect(p.pasos.length).toBeGreaterThanOrEqual(2);
      expect(new Set(p.pasos).size).toBe(p.pasos.length);
      break;
    case 'vf':
      expect(typeof p.correcta).toBe('boolean');
  }
}

function validarUnidad(u: Unidad) {
  expect(u.temas.length).toBeGreaterThan(0);
  for (const t of u.temas) {
    expect(articulo(t.articuloId), `artículo ${t.articuloId}`).toBeDefined();
    for (const r of t.relacionados ?? []) expect(articulo(r), `relacionado ${r}`).toBeDefined();
    expect(t.lecciones.length).toBeGreaterThanOrEqual(1);
    expect(t.lecciones.length).toBeLessThanOrEqual(5);
    for (const l of t.lecciones) {
      expect(l.minutos).toBeGreaterThanOrEqual(3);
      expect(l.minutos).toBeLessThanOrEqual(5);
      expect(l.preguntas.length).toBeGreaterThanOrEqual(2);
      l.preguntas.forEach(validarPregunta);
    }
  }
}

describe('unidades centrales', () => {
  it('son válidas', () => UNIDADES_NUCLEO.forEach(validarUnidad));

  it('tienen ids de lecciones y preguntas únicos', () => {
    const ids = UNIDADES_NUCLEO.flatMap(preguntasDeUnidad).map((q) => q.pregunta.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('cada etapa de caso tiene exactamente una opción óptima', () => {
    for (const u of UNIDADES_NUCLEO) {
      expect(u.caso, u.id).toBeDefined();
      for (const e of u.caso!.etapas) expect(e.opciones.filter((o) => o.puntaje === 2)).toHaveLength(1);
    }
  });

  it('el CP es el texto actualizado oficial (InfoLEG)', () => {
    expect(articulo('cp-164')?.texto).toMatch(/^Será reprimido con prisión de un mes a seis años/);
    // Ley 27.147 (2015): nuevas causales de extinción de la acción
    expect(articulo('cp-59')?.texto).toMatch(/conciliación o reparación integral/);
    // Ley 26.791 (2012): femicidio
    expect(articulo('cp-80')?.texto).toMatch(/mediare violencia de género/);
    expect(fuenteDe('CP')?.enlace).toMatch(/^https:\/\/www\.argentina\.gob\.ar\//);
  });

  it('el CPPBA es el texto actualizado oficial (normas.gba.gob.ar)', () => {
    expect(articulo('cppba-1')?.epigrafe).toMatch(/^Juez natural y juicio por jurados/);
    // Ley 15.004: interrogatorio del imputado por su defensor
    expect(articulo('cppba-358')?.texto).toContain('el imputado queda sometido al interrogatorio de su abogado defensor y de las partes contrarias');
    expect(articulo('cppba-358')?.notas).toContain('Texto según Ley 15004');
    expect(articulo('cppba-395')?.texto).toMatch(/quince \(15\) años/);
    expect(articulo('cppba-169')?.texto).toMatch(/ocho \(8\) años/);
    expect(articulo('cppba-342-bis')?.epigrafe).toBe('Debate ante el Tribunal de jurados');
    expect(fuenteDe('CPPBA')).toMatchObject({ enlace: expect.stringMatching(/^https:\/\/normas\.gba\.gob\.ar\//), revisado: expect.stringMatching(/^\d{2}\/\d{2}\/\d{4}$/) });
  });

  it('cada fragmento resaltado aparece literalmente en el artículo que se lee', () => {
    const faltantes: string[] = [];
    for (const u of UNIDADES_NUCLEO)
      for (const t of u.temas)
        for (const l of t.lecciones) if (l.foco && !articulo(t.articuloId)?.texto.includes(l.foco)) faltantes.push(`${l.id} (${t.articuloId}): «${l.foco}»`);
    expect(faltantes).toEqual([]);
  });
});

describe('camino', () => {
  it('desbloquea linealmente y marca una sola lección actual', () => {
    const vacio = { leccionesCompletadas: {}, repasosCompletados: {}, casosCompletados: {}, fallosLeidos: {} };
    const { unidades } = unidadesVisibles(vacio);
    expect(unidades).toHaveLength(UNIDADES_NUCLEO.length);
    const estados = [...estadoCamino(unidades, vacio).values()].flat();
    expect(estados.filter((e) => e.actual)).toHaveLength(1);
    expect(estados[0].desbloqueado).toBe(true);
    expect(estados.filter((e) => e.desbloqueado && e.nodo.tipo !== 'fallo')).toHaveLength(1);
  });

  it('cada unidad termina con el repaso dinámico obligatorio', () => {
    for (const u of UNIDADES_NUCLEO) expect(nodosDeUnidad(u).at(-1)?.tipo).toBe('repaso');
  });

  it('genera el siguiente módulo al completar todo lo anterior', () => {
    const completo = {
      leccionesCompletadas: {},
      casosCompletados: {},
      fallosLeidos: {},
      repasosCompletados: Object.fromEntries(UNIDADES_NUCLEO.map((u) => [u.id, '2026-01-01'])),
    };
    const { unidades, hayMas } = unidadesVisibles(completo);
    expect(unidades).toHaveLength(UNIDADES_NUCLEO.length + 1);
    expect(unidades.at(-1)?.generada).toBe(true);
    expect(hayMas).toBe(true);
  });
});

describe('módulos generados', () => {
  it('se generan desde el articulado y son válidos', () => {
    const gen = generados();
    expect(gen.total).toBeGreaterThan(150);
    expect(gen.ids.some((id) => id.startsWith('g-cppba-l'))).toBe(true);
    for (let i = 0; i < gen.total; i++) validarUnidad(gen.unidad(i)!);
    const ids = Array.from({ length: gen.total }, (_, i) => preguntasDeUnidad(gen.unidad(i)!)).flat().map((q) => q.pregunta.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('son determinísticos', () => {
    const a = JSON.stringify(generados().unidad(3));
    const b = JSON.stringify(generados().unidad(3));
    expect(a).toBe(b);
  });
});

describe('extracción de penas', () => {
  it('reconoce escalas con y sin unidad en el mínimo', () => {
    expect(extraerPena('Será reprimido con prisión de un mes a dos años, el que')).toMatchObject({ minimo: 'un mes', maximo: 'dos años' });
    expect(extraerPena('Se aplicará reclusión o prisión de ocho a veinticinco años, al que matare')).toMatchObject({
      minimo: 'ocho años',
      maximo: 'veinticinco años',
    });
  });
});

describe('glosario', () => {
  it('tiene ids únicos', () => {
    expect(new Set(GLOSARIO.map((t) => t.id)).size).toBe(GLOSARIO.length);
  });
});

describe('vidas, temas y práctica', () => {
  it('la primera unidad es de práctica libre', () => {
    expect(sinPenalidad('u1')).toBe(true);
    expect(sinPenalidad('u2')).toBe(false);
  });

  it('se puede practicar con preguntas intentadas aunque no haya lecciones completas', () => {
    const vacio = { leccionesCompletadas: {}, repasosCompletados: {}, casosCompletados: {}, fallosLeidos: {} };
    const { unidades } = unidadesVisibles(vacio);
    expect(preguntasParaPracticar(unidades, { ...vacio, preguntas: {} })).toHaveLength(0);
    const intento = { 'u1-a1-l1-p1': {}, 'u4-a169-l2-p2': {} };
    const banco = preguntasParaPracticar(unidades, { ...vacio, preguntas: intento });
    expect(banco.map((q) => q.pregunta.id).sort()).toEqual(['u1-a1-l1-p1', 'u4-a169-l2-p2']);
    expect(buscarPregunta('u7-a358-l1-p1')?.articuloId).toBe('cppba-358');
  });

  it('cada artículo tiene una lección para estudiarlo directamente', () => {
    expect(leccionesDeArticulo('cppba-169')).toContain('u4-a169-l2');
    expect(leccionesDeArticulo('cppba-358')).toEqual(['u7-a358-l1']);
    const generada = leccionesDeArticulo('cppba-448-bis')[0];
    expect(generada).toMatch(/^g-cppba-/);
    expect(buscarLeccion(generada)?.tema.articuloId).toBe('cppba-448-bis');
  });

  it('todos los fallos tienen ámbito y los enlaces son https', () => {
    for (const u of UNIDADES_NUCLEO)
      for (const t of u.temas)
        for (const f of [t.falloClave, ...(t.fallosRelacionados ?? [])].filter((x) => !!x)) {
          expect(['bonaerense', 'nacional', 'interamericano'], f!.caso).toContain(f!.ambito);
          for (const e of f!.enlaces) expect(e.url, f!.caso).toMatch(/^https:\/\//);
        }
    const bonaerenses = UNIDADES_NUCLEO.flatMap((u) => u.temas.flatMap((t) => [t.falloClave, ...(t.fallosRelacionados ?? [])])).filter((f) => f?.ambito === 'bonaerense');
    expect(bonaerenses.length).toBeGreaterThanOrEqual(5);
  });

  it('los textos vetados no forman parte del artículo', () => {
    expect(articulo('cppba-334')?.texto).not.toContain('órganos ordinarios de juzgamiento');
    expect(articulo('cppba-334')?.notas?.join(' ')).toMatch(/observado/);
  });
});
