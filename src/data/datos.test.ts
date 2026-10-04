import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import { articulo, inicializarCodigos, type CodigoImportado } from './codigos';
import { estadoCamino, generados, nodosDeUnidad, preguntasDeUnidad, UNIDADES_NUCLEO, unidadesVisibles } from './curriculo';
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

  it('el texto del CP es literal del PDF importado', () => {
    expect(articulo('cp-164')?.texto).toMatch(/^Será reprimido con prisión de un mes a seis años/);
    expect(articulo('cp-76-bis')?.fidelidad).toBe('oficial');
  });

  it('el CPPBA usa el texto literal del documento y conserva las versiones actualizadas de los reformados', () => {
    expect(articulo('cppba-1')).toMatchObject({ fidelidad: 'oficial', epigrafe: expect.stringMatching(/^Juez natural/) });
    expect(articulo('cppba-308')?.texto).toMatch(/previa notificación al Defensor bajo sanción de nulidad/);
    for (const n of ['144', '148', '157', '169', '171', '395']) {
      const a = articulo(`cppba-${n}`)!;
      expect(a.fidelidad, n).toBe('referencia');
      expect(a.textoDocumento, n).toBeTruthy();
      expect(a.avisoVigencia, n).toBeTruthy();
    }
    expect(articulo('cppba-169')?.textoDocumento).toMatch(/seis \(6\) años/);
  });

  it('cada fragmento resaltado aparece literalmente en el artículo que se lee', () => {
    for (const u of UNIDADES_NUCLEO)
      for (const t of u.temas)
        for (const l of t.lecciones) if (l.foco) expect(articulo(t.articuloId)?.texto, `${l.id}: «${l.foco}»`).toContain(l.foco);
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
