/**
 * Repaso espaciado con cajas de Leitner. Cada pregunta respondida vive en una
 * caja (1 a 5): acertar la sube y espacia el próximo repaso; fallar la
 * devuelve a la caja 1 para verla pronto.
 */
import { mezclar } from './azar';
import type { PreguntaEnContexto } from '../data/tipos';

export interface EstadisticaPregunta {
  caja: number;
  vistas: number;
  errores: number;
  ultima: number; // epoch ms
  proxima: number; // epoch ms
}

const DIA = 24 * 60 * 60 * 1000;
export const INTERVALOS_DIAS = [0, 1, 3, 7, 16];

export function actualizarEstadistica(
  previa: EstadisticaPregunta | undefined,
  correcta: boolean,
  ahora = Date.now(),
): EstadisticaPregunta {
  const base = previa ?? { caja: 1, vistas: 0, errores: 0, ultima: ahora, proxima: ahora };
  const caja = correcta ? (previa ? Math.min(5, base.caja + 1) : 2) : 1;
  return {
    caja,
    vistas: base.vistas + 1,
    errores: base.errores + (correcta ? 0 : 1),
    ultima: ahora,
    proxima: ahora + INTERVALOS_DIAS[caja - 1] * DIA,
  };
}

/** Prioridad de repaso: vencidas primero, luego caja baja y más errores. */
export function prioridad(e: EstadisticaPregunta | undefined, ahora = Date.now()): number {
  if (!e) return 2; // vista en lección pero sin estadística (no debería pasar)
  const vencida = e.proxima <= ahora ? 3 : 0;
  return vencida + (6 - e.caja) * 0.6 + Math.min(e.errores, 5) * 0.4;
}

export function seleccionarParaRepaso(
  candidatas: PreguntaEnContexto[],
  stats: Record<string, EstadisticaPregunta>,
  n: number,
  azar: () => number = Math.random,
): PreguntaEnContexto[] {
  const conRuido = mezclar(candidatas, azar).map((q) => ({ q, p: prioridad(stats[q.pregunta.id]) + azar() * 0.8 }));
  conRuido.sort((a, b) => b.p - a.p);
  return conRuido.slice(0, n).map((x) => x.q);
}

/**
 * Repaso dinámico de unidad: mezcla preguntas de la unidad actual con
 * preguntas de unidades anteriores, priorizando las más olvidadas.
 */
export function armarRepasoDinamico(
  deLaUnidad: PreguntaEnContexto[],
  anteriores: PreguntaEnContexto[],
  stats: Record<string, EstadisticaPregunta>,
  total = 8,
): PreguntaEnContexto[] {
  const cupoAnteriores = anteriores.length ? Math.min(3, anteriores.length) : 0;
  const propias = seleccionarParaRepaso(deLaUnidad, stats, total - cupoAnteriores);
  const viejas = seleccionarParaRepaso(anteriores, stats, total - propias.length);
  return mezclar([...propias, ...viejas]);
}

export const errorFrecuente = (e: EstadisticaPregunta | undefined) => !!e && e.errores > 0 && e.caja <= 2;
