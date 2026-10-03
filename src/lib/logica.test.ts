import { describe, expect, it } from 'vitest';
import type { PreguntaEnContexto } from '../data/tipos';
import { MAX_VIDAS, RECARGA_VIDA_MS, rachaVigente, vidasActuales } from '../store/progreso';
import { ayer, diaLocal, sumarDias } from './fechas';
import { actualizarEstadistica, armarRepasoDinamico, INTERVALOS_DIAS } from './repaso';
import { fragmentar, textoParaVoz } from './voz';

const DIA = 86_400_000;

describe('repaso espaciado (Leitner)', () => {
  it('sube de caja al acertar y vuelve a la 1 al fallar', () => {
    const t0 = 1_000_000;
    const a = actualizarEstadistica(undefined, true, t0);
    expect(a.caja).toBe(2);
    expect(a.proxima).toBe(t0 + INTERVALOS_DIAS[1] * DIA);
    const b = actualizarEstadistica(a, true, t0);
    expect(b.caja).toBe(3);
    const c = actualizarEstadistica(b, false, t0);
    expect(c).toMatchObject({ caja: 1, errores: 1, vistas: 3, proxima: t0 });
  });

  it('el repaso dinámico mezcla la unidad actual con unidades anteriores', () => {
    const q = (id: string, unidadId: string): PreguntaEnContexto => ({
      pregunta: { id, tipo: 'vf', enunciado: id, correcta: true, explicacion: '-' },
      unidadId,
      leccionId: `${unidadId}-l`,
      articuloId: 'x',
    });
    const actual = Array.from({ length: 10 }, (_, i) => q(`a${i}`, 'u2'));
    const previas = Array.from({ length: 10 }, (_, i) => q(`p${i}`, 'u1'));
    const repaso = armarRepasoDinamico(actual, previas, {}, 8);
    expect(repaso).toHaveLength(8);
    expect(repaso.filter((x) => x.unidadId === 'u1')).toHaveLength(3);
    expect(new Set(repaso.map((x) => x.pregunta.id)).size).toBe(8);
  });
});

describe('vidas', () => {
  it('se recargan con el tiempo hasta el máximo', () => {
    const t0 = 5_000_000;
    expect(vidasActuales({ cantidad: 0, recargaDesde: t0 }, t0 + RECARGA_VIDA_MS - 1).cantidad).toBe(0);
    const una = vidasActuales({ cantidad: 0, recargaDesde: t0 }, t0 + RECARGA_VIDA_MS + 5);
    expect(una).toEqual({ cantidad: 1, recargaDesde: t0 + RECARGA_VIDA_MS });
    expect(vidasActuales({ cantidad: 1, recargaDesde: t0 }, t0 + 50 * RECARGA_VIDA_MS)).toEqual({ cantidad: MAX_VIDAS, recargaDesde: null });
  });
});

describe('racha', () => {
  it('se mantiene si se practicó hoy o ayer y se corta después', () => {
    const hoy = diaLocal(new Date(2026, 9, 3));
    expect(rachaVigente({ actual: 4, mejor: 4, ultimoDia: hoy }, hoy)).toBe(4);
    expect(rachaVigente({ actual: 4, mejor: 4, ultimoDia: ayer(hoy) }, hoy)).toBe(4);
    expect(rachaVigente({ actual: 4, mejor: 4, ultimoDia: sumarDias(hoy, -2) }, hoy)).toBe(0);
  });

  it('suma días respetando cambios de mes', () => {
    expect(sumarDias('2026-02-28', 1)).toBe('2026-03-01');
    expect(ayer('2026-01-01')).toBe('2025-12-31');
  });
});

describe('lectura en voz alta', () => {
  it('adapta abreviaturas jurídicas', () => {
    expect(textoParaVoz('Art. 169 CPPBA y art. 26 CP, dentro de veinticuatro (24) horas')).toBe(
      'artículo 169 Código Procesal Penal bonaerense y artículo 26 Código Penal, dentro de veinticuatro horas',
    );
  });

  it('divide textos largos en fragmentos cortos', () => {
    const largo = 'Primera oración bastante larga para el ejemplo. '.repeat(20);
    const partes = fragmentar(largo, 220);
    expect(partes.length).toBeGreaterThan(3);
    expect(partes.every((p) => p.length <= 220)).toBe(true);
    expect(partes.join(' ').replace(/\s+/g, ' ').trim()).toBe(largo.replace(/\s+/g, ' ').trim());
  });
});
