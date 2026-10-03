import type {
  Leccion,
  Pregunta,
  PreguntaCompletar,
  PreguntaOpcion,
  PreguntaOrdenar,
  PreguntaVF,
} from './tipos';

type SinId<T> = T extends unknown ? Omit<T, 'id'> : never;
export type PreguntaBorrador = SinId<Pregunta>;

/** Opción múltiple: la primera opción es la correcta (la app las mezcla). */
export const op = (enunciado: string, opciones: string[], explicacion: string): SinId<PreguntaOpcion> => ({
  tipo: 'opcion',
  enunciado,
  opciones,
  correcta: 0,
  explicacion,
});

export const vf = (enunciado: string, correcta: boolean, explicacion: string): SinId<PreguntaVF> => ({
  tipo: 'vf',
  enunciado,
  correcta,
  explicacion,
});

/** Ordenar: los pasos se escriben en el orden correcto. */
export const ord = (enunciado: string, pasos: string[], explicacion: string): SinId<PreguntaOrdenar> => ({
  tipo: 'ordenar',
  enunciado,
  pasos,
  explicacion,
});

/** Completar: la frase lleva ___ y la primera opción es la correcta. */
export const comp = (
  enunciado: string,
  frase: string,
  opciones: string[],
  explicacion: string,
): SinId<PreguntaCompletar> => ({
  tipo: 'completar',
  enunciado,
  frase,
  opciones,
  correcta: 0,
  explicacion,
});

interface LeccionBorrador extends Omit<Leccion, 'preguntas'> {
  preguntas: PreguntaBorrador[];
}

export function leccion(l: LeccionBorrador): Leccion {
  return {
    ...l,
    preguntas: l.preguntas.map((p, i) => ({ ...p, id: `${l.id}-p${i + 1}` }) as Pregunta),
  };
}

/** 'cp', '76 bis' -> 'cp-76-bis' */
export const idArticulo = (codigo: 'cp' | 'cppba', numero: string) =>
  `${codigo}-${numero.trim().toLowerCase().replace(/\s+/g, '-')}`;
