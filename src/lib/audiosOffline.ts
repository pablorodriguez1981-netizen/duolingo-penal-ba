/** Descarga de las voces naturales al teléfono, para escucharlas sin conexión. */
import { AUDIOS, CACHE_AUDIOS, urlAudio } from './voz';

export const clavesAudios = () => Object.keys(AUDIOS.archivos);
export const totalAudios = () => clavesAudios().length;
export const megasAudios = () => Object.values(AUDIOS.archivos).reduce((s, a) => s + a.b, 0) / 1024 / 1024;

const disponible = () => typeof window !== 'undefined' && 'caches' in window;
const ruta = (clave: string) => new URL(urlAudio(clave), window.location.href).pathname;

/** Cuántas voces ya están guardadas en este dispositivo. */
export async function contarGuardados(): Promise<number> {
  if (!disponible()) return 0;
  const cache = await caches.open(CACHE_AUDIOS);
  const guardadas = new Set((await cache.keys()).map((r) => new URL(r.url).pathname));
  return clavesAudios().filter((k) => guardadas.has(ruta(k))).length;
}

/** Descarga todas las voces que falten (de a cuatro en paralelo). */
export async function descargarAudios(alAvanzar: (hechos: number, total: number) => void): Promise<number> {
  if (!disponible()) throw new Error('Este navegador no permite guardar audios.');
  // Pide que el navegador no borre estos datos si falta espacio.
  await navigator.storage?.persist?.().catch(() => false);
  const cache = await caches.open(CACHE_AUDIOS);
  const claves = clavesAudios();
  const pendientes = [...claves];
  let hechos = 0;
  let fallidos = 0;
  const trabajador = async () => {
    for (let clave = pendientes.shift(); clave; clave = pendientes.shift()) {
      const url = urlAudio(clave);
      try {
        if (!(await cache.match(url))) {
          const r = await fetch(url);
          if (r.ok) await cache.put(url, r);
          else fallidos++;
        }
      } catch {
        fallidos++;
      }
      alAvanzar(++hechos, claves.length);
    }
  };
  await Promise.all([trabajador(), trabajador(), trabajador(), trabajador()]);
  return fallidos;
}
