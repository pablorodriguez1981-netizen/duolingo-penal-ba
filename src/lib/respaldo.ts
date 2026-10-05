/**
 * Copia de seguridad del progreso en un archivo JSON (sin cuentas ni servidor):
 * sirve para pasar el avance a otro teléfono o recuperarlo si se borran los datos.
 */
import type { DatosProgreso } from '../store/progreso';
import { diaLocal } from './fechas';

const APP = 'carpi-penal';
const VERSION = 1;

export interface Respaldo {
  app: typeof APP;
  version: number;
  exportadoEl: string;
  datos: Partial<DatosProgreso>;
}

/** Claves que se guardan y su tipo esperado. */
const CLAVES: Record<keyof DatosProgreso, 'objeto' | 'numero' | 'booleano'> = {
  leccionesCompletadas: 'objeto',
  repasosCompletados: 'objeto',
  casosCompletados: 'objeto',
  fallosLeidos: 'objeto',
  preguntas: 'objeto',
  xp: 'numero',
  racha: 'objeto',
  hoy: 'objeto',
  historial: 'objeto',
  vidas: 'objeto',
  supervivenciaRecord: 'numero',
  vueltas: 'numero',
  ajustes: 'objeto',
  bienvenidaVista: 'booleano',
};

const esObjeto = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

export function crearRespaldo(estado: DatosProgreso): Respaldo {
  const datos = Object.fromEntries(Object.keys(CLAVES).map((k) => [k, estado[k as keyof DatosProgreso]])) as Partial<DatosProgreso>;
  return { app: APP, version: VERSION, exportadoEl: new Date().toISOString(), datos };
}

export const nombreArchivo = () => `carpi-penal-progreso-${diaLocal()}.json`;

/** Valida un respaldo y devuelve sólo los datos reconocidos (lanza un Error legible si no sirve). */
export function leerRespaldo(texto: string): { datos: Partial<DatosProgreso>; exportadoEl: string | null } {
  let json: unknown;
  try {
    json = JSON.parse(texto);
  } catch {
    throw new Error('El archivo no es una copia válida de Carpi Penal.');
  }
  if (!esObjeto(json) || json.app !== APP || !esObjeto(json.datos)) throw new Error('El archivo no es una copia de Carpi Penal.');
  if (typeof json.version !== 'number' || json.version > VERSION) throw new Error('La copia es de una versión más nueva de la app: actualizala y volvé a intentar.');
  const datos: Record<string, unknown> = {};
  for (const [clave, tipo] of Object.entries(CLAVES)) {
    const v = json.datos[clave];
    if (v === undefined) continue;
    const ok = tipo === 'objeto' ? esObjeto(v) : tipo === 'numero' ? typeof v === 'number' && Number.isFinite(v) : typeof v === 'boolean';
    if (!ok) throw new Error(`La copia está dañada (campo «${clave}»).`);
    datos[clave] = v;
  }
  if (!esObjeto(datos.leccionesCompletadas)) throw new Error('La copia no contiene progreso.');
  return { datos: datos as Partial<DatosProgreso>, exportadoEl: typeof json.exportadoEl === 'string' ? json.exportadoEl : null };
}

function archivo(estado: DatosProgreso) {
  return new File([JSON.stringify(crearRespaldo(estado))], nombreArchivo(), { type: 'application/json' });
}

/** Descarga el archivo de respaldo. */
export function descargarRespaldo(estado: DatosProgreso) {
  const url = URL.createObjectURL(archivo(estado));
  const a = document.createElement('a');
  a.href = url;
  a.download = nombreArchivo();
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export const puedeCompartirArchivo = () => {
  try {
    return typeof navigator.canShare === 'function' && navigator.canShare({ files: [new File(['{}'], 'x.json', { type: 'application/json' })] });
  } catch {
    return false;
  }
};

/** Abre el menú de compartir del sistema (WhatsApp, Drive, correo…) con el archivo. */
export async function compartirRespaldo(estado: DatosProgreso) {
  try {
    await navigator.share({ files: [archivo(estado)], title: 'Copia de Carpi Penal', text: 'Mi progreso en Carpi Penal' });
  } catch (e) {
    if ((e as Error).name !== 'AbortError') descargarRespaldo(estado);
  }
}
