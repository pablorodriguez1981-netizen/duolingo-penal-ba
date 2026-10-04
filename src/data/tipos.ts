export type CodigoId = 'CPPBA' | 'CP';

/**
 * Fidelidad del texto mostrado en la tarjeta de lectura:
 * - `oficial`: transcripción literal del código importado (PDF provisto).
 * - `referencia`: versión de estudio redactada a partir del código; debe
 *   cotejarse con el texto oficial vigente. Se reemplaza automáticamente
 *   cuando se importa el PDF oficial (ver scripts/importar-codigo.mjs).
 */
export type Fidelidad = 'oficial' | 'referencia';

export interface Articulo {
  id: string; // 'cppba-148', 'cp-76-bis'
  codigo: CodigoId;
  numero: string; // '148', '76 bis'
  epigrafe: string;
  texto: string; // párrafos separados por \n\n
  fidelidad: Fidelidad;
  ubicacion?: string; // 'Libro I · Título VI · Medidas de coerción'
  notas?: string[]; // notas de reforma
  avisoVigencia?: string; // reformas posteriores conocidas que el texto no refleja
  /**
   * Texto literal del documento importado cuando el artículo fue reformado
   * después de esa versión: `texto` lleva la versión actualizada de estudio
   * (la que usan las lecciones) y acá queda el texto del documento.
   */
  textoDocumento?: string;
  /** Rótulo de la fuente del texto literal (p. ej., "Documento provisto, versión 2003"). */
  fuente?: string;
}

interface PreguntaBase {
  id: string;
  explicacion: string;
}

export interface PreguntaOpcion extends PreguntaBase {
  tipo: 'opcion';
  enunciado: string;
  opciones: string[];
  correcta: number;
}

export interface PreguntaVF extends PreguntaBase {
  tipo: 'vf';
  enunciado: string;
  correcta: boolean;
}

export interface PreguntaOrdenar extends PreguntaBase {
  tipo: 'ordenar';
  enunciado: string;
  /** Pasos en el orden correcto; la app los mezcla. */
  pasos: string[];
}

export interface PreguntaCompletar extends PreguntaBase {
  tipo: 'completar';
  enunciado: string;
  /** Frase con un hueco marcado como ___ */
  frase: string;
  opciones: string[];
  correcta: number;
}

export type Pregunta = PreguntaOpcion | PreguntaVF | PreguntaOrdenar | PreguntaCompletar;

export interface Leccion {
  id: string;
  titulo: string;
  minutos: number; // 3 a 5
  intro: {
    titulo: string;
    parrafos: string[];
    /** Bajada práctica: cómo se ve en un tribunal bonaerense. */
    enLaPractica?: string;
  };
  /** Fragmento del artículo a resaltar en la lectura. */
  foco?: string;
  preguntas: Pregunta[];
}

export interface FalloClave {
  tribunal: string;
  caso: string;
  anio?: string;
  resumen: string;
  regla: string;
  /** Aclaración sobre el alcance de la síntesis. */
  nota?: string;
}

export interface Tema {
  articuloId: string;
  /** Artículos vinculados (CP de fondo o CPPBA) para leer en conjunto. */
  relacionados?: string[];
  lecciones: Leccion[]; // 1 a 5
  falloClave?: FalloClave;
}

export interface OpcionCaso {
  texto: string;
  puntaje: 0 | 1 | 2;
  devolucion: string;
}

export interface EtapaCaso {
  id: string;
  momento: string; // "Audiencia de excarcelación — 10:15 h"
  situacion: string;
  pregunta: string;
  opciones: OpcionCaso[];
  normas: string[];
}

export interface CasoPractico {
  id: string;
  titulo: string;
  rol: string; // 'Defensa oficial', 'Fiscalía', ...
  sede: string;
  hechos: string[];
  etapas: EtapaCaso[];
  cierre: { titulo: string; texto: string };
}

export type ColorUnidad = 'azul' | 'naranja' | 'verde' | 'violeta' | 'rosa' | 'turquesa' | 'amarillo' | 'rojo';

export interface Unidad {
  id: string;
  numero: number;
  titulo: string;
  subtitulo: string;
  etapa: string; // categoría temática / etapa procesal
  color: ColorUnidad;
  icono: string; // emoji
  temas: Tema[];
  caso?: CasoPractico;
  /** Generada automáticamente desde el articulado. */
  generada?: boolean;
  aviso?: string;
}

export interface TerminoGlosario {
  id: string;
  termino: string;
  /** Formas en que aparece en los textos (se buscan sin distinguir mayúsculas). */
  variantes: string[];
  definicion: string;
  fuente?: string;
}

/** Nodo del camino (mapa). */
export type TipoNodo = 'leccion' | 'caso' | 'repaso' | 'fallo';

export interface Nodo {
  id: string;
  tipo: TipoNodo;
  unidadId: string;
  titulo: string;
  articuloId?: string;
  leccionId?: string;
  /** índice lineal en el camino principal (los fallos son ramas opcionales) */
  orden: number;
}

/** Pregunta con su contexto, para repasos y modos de práctica. */
export interface PreguntaEnContexto {
  pregunta: Pregunta;
  unidadId: string;
  leccionId: string;
  articuloId: string;
}
