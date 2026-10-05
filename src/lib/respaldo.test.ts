import { describe, expect, it } from 'vitest';
import { crearRespaldo, leerRespaldo } from './respaldo';
import type { DatosProgreso } from '../store/progreso';

const datos = {
  leccionesCompletadas: { 'u1-a1-l1': { fecha: '2026-10-05', aciertos: 4, total: 5 } },
  repasosCompletados: {},
  casosCompletados: {},
  fallosLeidos: {},
  preguntas: {},
  xp: 120,
  racha: { actual: 3, mejor: 5, ultimoDia: '2026-10-05' },
  hoy: { dia: '2026-10-05', articulos: [], xp: 0 },
  historial: {},
  vidas: { cantidad: 2, recargaDesde: null },
  supervivenciaRecord: 0,
  vueltas: 0,
  ajustes: { sonido: true, vozVelocidad: 1, vozURI: null, vozNatural: true, metaDiaria: 3, recordatorios: false, horaRecordatorio: 20, tema: 'sistema' },
  bienvenidaVista: true,
} as DatosProgreso;

describe('copia de seguridad del progreso', () => {
  it('ida y vuelta conserva los datos', () => {
    const { datos: leidos, exportadoEl } = leerRespaldo(JSON.stringify(crearRespaldo(datos)));
    expect(leidos).toEqual(datos);
    expect(exportadoEl).toBeTruthy();
  });

  it('rechaza archivos ajenos o dañados', () => {
    expect(() => leerRespaldo('hola')).toThrow(/no es una copia/);
    expect(() => leerRespaldo(JSON.stringify({ app: 'otra', version: 1, datos: {} }))).toThrow(/no es una copia/);
    expect(() => leerRespaldo(JSON.stringify({ ...crearRespaldo(datos), version: 99 }))).toThrow(/más nueva/);
    const roto = crearRespaldo(datos);
    (roto.datos as Record<string, unknown>).xp = 'mucho';
    expect(() => leerRespaldo(JSON.stringify(roto))).toThrow(/xp/);
  });

  it('ignora campos desconocidos', () => {
    const r = crearRespaldo(datos);
    (r.datos as Record<string, unknown>).malicioso = '<script>';
    expect(leerRespaldo(JSON.stringify(r)).datos).not.toHaveProperty('malicioso');
  });
});
