import { plantillasGeneradas } from './generador';
import type { Leccion, Nodo, PreguntaEnContexto, Tema, Unidad } from './tipos';
import { U1 } from './unidades/u1-garantias';
import { U2 } from './unidades/u2-fiscal-imputado';
import { U3 } from './unidades/u3-coercion';
import { U4 } from './unidades/u4-excarcelacion';
import { U5 } from './unidades/u5-prueba-nulidades';
import { U6 } from './unidades/u6-ipp-elevacion';
import { U7 } from './unidades/u7-juicio';
import { U8 } from './unidades/u8-salidas-recursos';

export const UNIDADES_NUCLEO: Unidad[] = [U1, U2, U3, U4, U5, U6, U7, U8];

/** Artículos ya tratados en las unidades centrales (no se repiten en los módulos generados). */
export const ARTICULOS_NUCLEO = new Set(
  UNIDADES_NUCLEO.flatMap((u) => u.temas.flatMap((t) => [t.articuloId, ...(t.relacionados ?? [])])),
);

export function generados() {
  return plantillasGeneradas(ARTICULOS_NUCLEO, UNIDADES_NUCLEO.length + 1);
}

/** Estado mínimo de progreso que necesita el camino. */
export interface ProgresoCamino {
  leccionesCompletadas: Record<string, unknown>;
  repasosCompletados: Record<string, unknown>;
  casosCompletados: Record<string, unknown>;
  fallosLeidos: Record<string, unknown>;
}

export const unidadCompleta = (u: Unidad, p: ProgresoCamino) => Boolean(p.repasosCompletados[u.id]);

/**
 * Unidades visibles en el mapa: todas las centrales y los módulos generados
 * hasta el primero sin completar (el siguiente se genera al terminar éste).
 */
export function unidadesVisibles(p: ProgresoCamino): { unidades: Unidad[]; hayMas: boolean; totalGenerados: number } {
  const unidades = [...UNIDADES_NUCLEO];
  const gen = generados();
  const nucleoCompleto = UNIDADES_NUCLEO.every((u) => unidadCompleta(u, p));
  if (!nucleoCompleto) {
    return { unidades, hayMas: gen.total > 0, totalGenerados: gen.total };
  }
  for (let i = 0; i < gen.total; i++) {
    const u = gen.unidad(i);
    if (!u) break;
    unidades.push(u);
    if (!unidadCompleta(u, p)) return { unidades, hayMas: i + 1 < gen.total, totalGenerados: gen.total };
  }
  return { unidades, hayMas: false, totalGenerados: gen.total };
}

/** Busca una unidad por id (centrales o generadas, materializándola si hace falta). */
export function unidadPorId(id: string): Unidad | undefined {
  const nucleo = UNIDADES_NUCLEO.find((u) => u.id === id);
  if (nucleo) return nucleo;
  const gen = generados();
  const i = gen.ids.indexOf(id);
  return i >= 0 ? gen.unidad(i) : undefined;
}

export interface UbicacionLeccion {
  unidad: Unidad;
  tema: Tema;
  leccion: Leccion;
  indiceEnTema: number;
}

export function buscarLeccion(leccionId: string): UbicacionLeccion | undefined {
  const unidadId = leccionId.startsWith('g-') ? generados().ids.find((id) => leccionId.startsWith(`${id}-`)) : leccionId.split('-')[0];
  const u = unidadId ? unidadPorId(unidadId) : undefined;
  if (!u) return undefined;
  for (const tema of u.temas) {
    const i = tema.lecciones.findIndex((l) => l.id === leccionId);
    if (i >= 0) return { unidad: u, tema, leccion: tema.lecciones[i], indiceEnTema: i };
  }
  return undefined;
}

/** Nodos del camino de una unidad: lecciones, ramas de «Fallo clave», caso y repaso. */
export function nodosDeUnidad(u: Unidad): Nodo[] {
  const nodos: Nodo[] = [];
  let orden = 0;
  for (const tema of u.temas) {
    for (const l of tema.lecciones) {
      nodos.push({ id: l.id, tipo: 'leccion', unidadId: u.id, titulo: l.titulo, articuloId: tema.articuloId, leccionId: l.id, orden: orden++ });
    }
    if (tema.falloClave) {
      nodos.push({
        id: `fallo-${tema.articuloId}`,
        tipo: 'fallo',
        unidadId: u.id,
        titulo: tema.falloClave.caso,
        articuloId: tema.articuloId,
        orden: orden - 1,
      });
    }
  }
  if (u.caso) nodos.push({ id: `caso-${u.id}`, tipo: 'caso', unidadId: u.id, titulo: u.caso.titulo, orden: orden++ });
  nodos.push({ id: `repaso-${u.id}`, tipo: 'repaso', unidadId: u.id, titulo: 'Repaso dinámico', orden: orden++ });
  return nodos;
}

export function nodoCompleto(n: Nodo, p: ProgresoCamino): boolean {
  switch (n.tipo) {
    case 'leccion':
      return Boolean(p.leccionesCompletadas[n.leccionId!]);
    case 'caso':
      return Boolean(p.casosCompletados[n.unidadId]);
    case 'repaso':
      return Boolean(p.repasosCompletados[n.unidadId]);
    case 'fallo':
      return Boolean(p.fallosLeidos[n.articuloId!]);
  }
}

export interface EstadoNodo {
  nodo: Nodo;
  completo: boolean;
  desbloqueado: boolean;
  actual: boolean;
}

/** Calcula el estado de todos los nodos visibles (desbloqueo lineal; los fallos son ramas opcionales). */
export function estadoCamino(unidades: Unidad[], p: ProgresoCamino): Map<string, EstadoNodo[]> {
  const out = new Map<string, EstadoNodo[]>();
  let previoCompleto = true;
  let actualAsignado = false;
  for (const u of unidades) {
    const estados: EstadoNodo[] = [];
    for (const nodo of nodosDeUnidad(u)) {
      const completo = nodoCompleto(nodo, p);
      if (nodo.tipo === 'fallo') {
        // Rama opcional: se habilita cuando se completó la primera lección del tema.
        const tema = u.temas.find((t) => t.articuloId === nodo.articuloId);
        const habilitado = Boolean(tema && p.leccionesCompletadas[tema.lecciones[0].id]);
        estados.push({ nodo, completo, desbloqueado: habilitado, actual: false });
        continue;
      }
      const desbloqueado = previoCompleto;
      const actual = desbloqueado && !completo && !actualAsignado;
      if (actual) actualAsignado = true;
      estados.push({ nodo, completo, desbloqueado, actual });
      previoCompleto = completo;
    }
    out.set(u.id, estados);
  }
  return out;
}

/** Índice de preguntas con su contexto, para repasos y prácticas. */
export function preguntasDeUnidad(u: Unidad): PreguntaEnContexto[] {
  return u.temas.flatMap((t) =>
    t.lecciones.flatMap((l) => l.preguntas.map((pregunta) => ({ pregunta, unidadId: u.id, leccionId: l.id, articuloId: t.articuloId }))),
  );
}

/** Preguntas de lecciones ya completadas en las unidades visibles. */
export function preguntasVistas(unidades: Unidad[], p: ProgresoCamino): PreguntaEnContexto[] {
  return unidades.flatMap(preguntasDeUnidad).filter((q) => p.leccionesCompletadas[q.leccionId]);
}

/** Temas con «Fallo clave» de las unidades visibles. */
export function temasConFallo(unidades: Unidad[]) {
  return unidades.flatMap((u) => u.temas.filter((t) => t.falloClave).map((t) => ({ unidad: u, tema: t })));
}
