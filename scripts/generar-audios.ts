/**
 * Genera las voces naturales de la app con ElevenLabs (modelo Eleven v4) y
 * las guarda como archivos estáticos: public/audio/<clave>.mp3, listados en
 * src/data/audios.json. Cada texto se graba UNA sola vez: si ya existe su
 * archivo (misma voz y mismo texto), no se vuelve a pedir ni se gastan
 * créditos. Si cambia un texto, sólo se graba ese.
 *
 * Uso: poné la clave en un archivo .env (ignorado por git, ver .env.example)
 * o en la variable de entorno ELEVENLABS_API_KEY, y corré:
 *   npm run voces
 *
 * Opciones:
 *   --alcance nucleo|todo   nucleo: lecciones, preguntas, artículos de las 8
 *                           unidades, fallos, casos y glosario. todo: además,
 *                           todo el articulado del CPPBA y del Código Penal.
 *   --max N                 tope de caracteres a enviar en esta corrida.
 *   --voz ID                voz de ElevenLabs (por defecto, la elegida antes o
 *                           una voz argentina de la biblioteca).
 *   --modelo ID             por defecto eleven_v4.
 *   --simular               sólo cuenta caracteres, no llama a la API.
 *   --muestra DIR           graba dos textos de ejemplo con Eleven v4 y con
 *                           v4 Turbo en DIR (para comparar antes de grabar todo).
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { articulo, inicializarCodigos, todosLosArticulos, type CodigoImportado } from '../src/data/codigos';
import { UNIDADES_NUCLEO } from '../src/data/curriculo';
import { GLOSARIO } from '../src/data/glosario';
import type { FalloClave } from '../src/data/tipos';
import { claveLocucion, locuciones, type Locucion } from '../src/lib/locucion';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
// Clave local en .env (está en .gitignore: nunca se sube al repositorio).
if (existsSync(resolve(raiz, '.env'))) process.loadEnvFile(resolve(raiz, '.env'));
const API = 'https://api.elevenlabs.io';
const FORMATO = 'mp3_22050_32';
const KBPS = 32;

const args = process.argv.slice(2).filter((a) => a !== '--');
const opcion = (nombre: string, def?: string) => {
  const i = args.indexOf(`--${nombre}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : def;
};
const alcance = opcion('alcance', 'nucleo') as 'nucleo' | 'todo';
const maxCaracteres = Number(opcion('max', '1000000'));
const modelo = opcion('modelo', 'eleven_v4')!;
const simular = args.includes('--simular');
const dirMuestra = opcion('muestra');
const clave = process.env.ELEVENLABS_API_KEY ?? '';

const dirAudio = resolve(raiz, 'public/audio');
const rutaManifiesto = resolve(raiz, 'src/data/audios.json');

interface Manifiesto {
  modelo: string | null;
  voz: { id: string; nombre: string } | null;
  formato: string | null;
  generadoEl: string | null;
  archivos: Record<string, { b: number; s?: number }>;
}

// ---------------------------------------------------------------------------
// 1. Textos a grabar, en orden de prioridad
// ---------------------------------------------------------------------------

function cargarCodigos() {
  const leer = (f: string) => JSON.parse(readFileSync(resolve(raiz, 'src/data/codigos', f), 'utf8')) as CodigoImportado;
  inicializarCodigos(leer('cp.json'), leer('cppba.json'));
}

function locucionesAGrabar(alcance: 'nucleo' | 'todo'): Locucion[] {
  const out: Locucion[] = [];
  const temas = UNIDADES_NUCLEO.flatMap((u) => u.temas);
  const lecciones = temas.flatMap((t) => t.lecciones);
  for (const l of lecciones) out.push(locuciones.intro(l));
  for (const l of lecciones) for (const q of l.preguntas) out.push(locuciones.pregunta(q));
  const ids = [...new Set(temas.flatMap((t) => [t.articuloId, ...(t.relacionados ?? [])]))];
  for (const id of ids) {
    const a = articulo(id);
    if (a) out.push(locuciones.articulo(a));
  }
  for (const t of temas)
    for (const f of [t.falloClave, ...(t.fallosRelacionados ?? [])].filter((x): x is FalloClave => !!x)) out.push(locuciones.fallo(f));
  for (const u of UNIDADES_NUCLEO) if (u.caso) out.push(locuciones.caso(u.caso));
  for (const t of GLOSARIO) out.push(locuciones.glosario(t));
  if (alcance === 'todo') {
    const resto = todosLosArticulos().filter((a) => !a.sintetico && !ids.includes(a.id));
    resto.sort((x, y) => (x.codigo === y.codigo ? 0 : x.codigo === 'CPPBA' ? -1 : 1));
    for (const a of resto) out.push(locuciones.articulo(a));
  }
  const vistas = new Set<string>();
  return out.filter((l) => {
    const k = claveLocucion(l.texto);
    if (vistas.has(k)) return false;
    vistas.add(k);
    return true;
  });
}

// ---------------------------------------------------------------------------
// 2. API de ElevenLabs
// ---------------------------------------------------------------------------

const espera = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function api(ruta: string, init: RequestInit = {}): Promise<Response> {
  for (let intento = 1; ; intento++) {
    const r = await fetch(`${API}${ruta}`, {
      ...init,
      headers: { 'xi-api-key': clave, 'Content-Type': 'application/json', ...(init.headers ?? {}) },
    });
    if ((r.status === 429 || r.status >= 500) && intento < 7) {
      const s = Number(r.headers.get('retry-after')) || 4 * intento;
      console.warn(`  … ${r.status} en ${ruta}; reintento en ${s}s`);
      await espera(s * 1000);
      continue;
    }
    return r;
  }
}

async function json<T>(ruta: string, init?: RequestInit): Promise<T> {
  const r = await api(ruta, init);
  if (!r.ok) throw new Error(`${init?.method ?? 'GET'} ${ruta} → ${r.status} ${await r.text()}`);
  return (await r.json()) as T;
}

interface VozCompartida {
  public_owner_id: string;
  voice_id: string;
  name: string;
  accent?: string;
  language?: string;
  locale?: string;
  use_case?: string;
  gender?: string;
  descriptive?: string;
}

/** Elige una voz: la indicada, la usada antes o una voz argentina de la biblioteca. */
async function elegirVoz(anterior: Manifiesto['voz']): Promise<{ id: string; nombre: string }> {
  const pedida = opcion('voz');
  if (pedida) {
    const v = await json<{ voice_id: string; name: string }>(`/v1/voices/${pedida}`).catch(() => null);
    return { id: pedida, nombre: v?.name ?? pedida };
  }
  if (anterior) return anterior;
  const busquedas = [
    '/v1/shared-voices?page_size=40&language=es&accent=argentine&sort=cloned_by_count',
    '/v1/shared-voices?page_size=40&language=es&search=argentin&sort=cloned_by_count',
    '/v1/shared-voices?page_size=40&language=es&accent=latin%20american&sort=cloned_by_count',
  ];
  const prioridad = (v: VozCompartida) =>
    (/informative|educational|narrat/i.test(v.use_case ?? '') ? 0 : 2) + (/argentin|rioplat|buenos aires/i.test(`${v.accent} ${v.locale} ${v.name} ${v.descriptive}`) ? 0 : 1);
  for (const ruta of busquedas) {
    const r = await json<{ voices: VozCompartida[] }>(ruta).catch((e) => {
      console.warn(`  (no se pudo buscar voces: ${(e as Error).message.slice(0, 160)})`);
      return { voices: [] };
    });
    const candidatas = r.voices.sort((a, b) => prioridad(a) - prioridad(b));
    for (const v of candidatas.slice(0, 5)) {
      const agregada = await json<{ voice_id: string }>(`/v1/voices/add/${v.public_owner_id}/${v.voice_id}`, {
        method: 'POST',
        body: JSON.stringify({ new_name: `Carpi · ${v.name}`.slice(0, 60) }),
      }).catch((e) => {
        console.warn(`  (no se pudo agregar la voz ${v.name}: ${(e as Error).message.slice(0, 160)})`);
        return null;
      });
      if (agregada) {
        console.log(`Voz elegida de la biblioteca: ${v.name} (${v.accent ?? '?'} · ${v.use_case ?? '?'})`);
        return { id: agregada.voice_id, nombre: v.name };
      }
    }
  }
  // Respaldo: una voz de la propia cuenta.
  const propias = await json<{ voices: { voice_id: string; name: string; labels?: Record<string, string> }[] }>('/v1/voices');
  const v = propias.voices.find((x) => /spanish|español|argentin|latin/i.test(JSON.stringify(x.labels ?? {}))) ?? propias.voices[0];
  if (!v) throw new Error('No hay voces disponibles en la cuenta.');
  console.warn(`Usando una voz de la cuenta: ${v.name}`);
  return { id: v.voice_id, nombre: v.name };
}

let conIdioma = true;

async function grabar(vozId: string, guion: string, modeloId = modelo, formato = FORMATO): Promise<Buffer> {
  const cuerpo = (idioma: boolean) => JSON.stringify({ text: guion, model_id: modeloId, ...(idioma ? { language_code: 'es' } : {}) });
  let r = await api(`/v1/text-to-speech/${vozId}?output_format=${formato}`, { method: 'POST', body: cuerpo(conIdioma) });
  if (r.status === 400 || r.status === 422) {
    const detalle = await r.text();
    if (conIdioma && /language/i.test(detalle)) {
      console.warn('  (el modelo no acepta language_code; se omite)');
      conIdioma = false;
      r = await api(`/v1/text-to-speech/${vozId}?output_format=${formato}`, { method: 'POST', body: cuerpo(false) });
    } else throw new Error(`TTS ${r.status}: ${detalle}`);
  }
  if (!r.ok) throw new Error(`TTS ${r.status}: ${await r.text()}`);
  const costo = [...r.headers.entries()].filter(([k]) => /char|cost|credit/i.test(k)).map(([k, v]) => `${k}=${v}`).join(' ');
  if (costo) ultimoCosto = costo;
  return Buffer.from(await r.arrayBuffer());
}

let ultimoCosto = '';

/** Graba dos textos de ejemplo con cada modelo para comparar calidad y costo. */
async function muestras(dir: string, manifiesto: Manifiesto) {
  mkdirSync(dir, { recursive: true });
  const voz = await elegirVoz(manifiesto.voz);
  const l = UNIDADES_NUCLEO[0].temas[0].lecciones[0];
  const art = articulo('cppba-358');
  const textos = [
    { nombre: 'explicacion', guion: locuciones.intro(l).guion },
    ...(art ? [{ nombre: 'articulo-358', guion: locuciones.articulo(art).guion }] : []),
  ];
  const informe: string[] = [`Voz: ${voz.nombre} (${voz.id})`];
  for (const m of ['eleven_v4', 'eleven_v4_turbo']) {
    for (const t of textos) {
      const antes = await json<{ character_count: number }>('/v1/user/subscription').catch(() => null);
      const audio = await grabar(voz.id, t.guion, m, 'mp3_44100_128');
      const despues = await json<{ character_count: number }>('/v1/user/subscription').catch(() => null);
      writeFileSync(resolve(dir, `${m}-${t.nombre}.mp3`), audio);
      const gastado = antes && despues ? despues.character_count - antes.character_count : NaN;
      const linea = `${m} · ${t.nombre}: ${t.guion.length} caracteres enviados → ${Number.isNaN(gastado) ? '?' : gastado} créditos descontados ${ultimoCosto ? `(${ultimoCosto})` : ''} · ${(audio.length / 1024).toFixed(0)} KB`;
      informe.push(linea);
      console.log(linea);
    }
  }
  writeFileSync(resolve(dir, 'informe.txt'), `${informe.join('\n')}\n`);
  writeFileSync(resolve(dir, 'voz.json'), JSON.stringify(voz));
}

// ---------------------------------------------------------------------------
// 3. Corrida
// ---------------------------------------------------------------------------

async function main() {
  cargarCodigos();
  const todas = locucionesAGrabar(alcance);
  // Para limpiar audios viejos se considera siempre el conjunto completo.
  const vigentes = new Set(locucionesAGrabar('todo').map((l) => claveLocucion(l.texto)));
  const manifiesto: Manifiesto = existsSync(rutaManifiesto)
    ? JSON.parse(readFileSync(rutaManifiesto, 'utf8'))
    : { modelo: null, voz: null, formato: null, generadoEl: null, archivos: {} };
  mkdirSync(dirAudio, { recursive: true });

  const porTipo = new Map<string, { n: number; c: number }>();
  for (const l of todas) {
    const t = porTipo.get(l.tipo) ?? { n: 0, c: 0 };
    t.n++;
    t.c += l.guion.length;
    porTipo.set(l.tipo, t);
  }
  console.log(`Alcance «${alcance}»: ${todas.length} textos`);
  for (const [tipo, t] of porTipo) console.log(`  ${tipo.padEnd(9)} ${String(t.n).padStart(4)} textos · ${t.c.toLocaleString('es-AR')} caracteres`);

  if (simular) {
    const faltan = todas.filter((l) => !existsSync(resolve(dirAudio, `${claveLocucion(l.texto)}.mp3`)));
    console.log(`Faltan grabar ${faltan.length} textos · ${faltan.reduce((s, l) => s + l.guion.length, 0).toLocaleString('es-AR')} caracteres`);
    return;
  }
  if (!clave) throw new Error('Falta la variable de entorno ELEVENLABS_API_KEY.');
  if (dirMuestra) {
    await muestras(resolve(raiz, dirMuestra), manifiesto);
    return;
  }

  const sub = await json<{ character_count: number; character_limit: number; tier: string }>('/v1/user/subscription').catch(() => null);
  const restantes = sub ? sub.character_limit - sub.character_count : Infinity;
  if (sub) console.log(`Plan ${sub.tier}: quedan ${restantes.toLocaleString('es-AR')} créditos de ${sub.character_limit.toLocaleString('es-AR')}`);

  const voz = await elegirVoz(manifiesto.voz);
  if ((manifiesto.voz && manifiesto.voz.id !== voz.id) || (manifiesto.modelo && manifiesto.modelo !== modelo)) {
    console.log('Cambió la voz o el modelo: se regrabará todo.');
    for (const f of readdirSync(dirAudio)) if (f.endsWith('.mp3')) unlinkSync(resolve(dirAudio, f));
    manifiesto.archivos = {};
  }
  manifiesto.voz = voz;
  manifiesto.modelo = modelo;
  manifiesto.formato = FORMATO;

  const tope = Math.min(maxCaracteres, restantes - 500);
  const pendientes = todas.filter((l) => !existsSync(resolve(dirAudio, `${claveLocucion(l.texto)}.mp3`)));
  let usados = 0;
  let grabados = 0;
  const cola: Locucion[] = [];
  for (const l of pendientes) {
    if (usados + l.guion.length > tope) break;
    usados += l.guion.length;
    cola.push(l);
  }
  console.log(`Ya grabados: ${todas.length - pendientes.length}. Se grabarán ahora: ${cola.length} (${usados.toLocaleString('es-AR')} caracteres).`);
  if (cola.length < pendientes.length) console.log(`Quedan ${pendientes.length - cola.length} para otra corrida (tope de créditos).`);

  let error: Error | null = null;
  const trabajador = async () => {
    for (let l = cola.shift(); l && !error; l = cola.shift()) {
      const k = claveLocucion(l.texto);
      try {
        const audio = await grabar(voz.id, l.guion);
        writeFileSync(resolve(dirAudio, `${k}.mp3`), audio);
        grabados++;
        if (grabados % 20 === 0) console.log(`  ${grabados} grabados…`);
      } catch (e) {
        error = e as Error;
      }
    }
  };
  await Promise.all([trabajador(), trabajador(), trabajador()]);

  // Manifiesto: sólo los textos vigentes que tienen archivo; borra los huérfanos.
  const archivos: Manifiesto['archivos'] = {};
  for (const f of readdirSync(dirAudio)) {
    if (!f.endsWith('.mp3')) continue;
    const k = f.slice(0, -4);
    if (!vigentes.has(k)) {
      unlinkSync(resolve(dirAudio, f));
      continue;
    }
    const b = statSync(resolve(dirAudio, f)).size;
    archivos[k] = { b, s: Math.round((b * 8) / (KBPS * 1000)) };
  }
  manifiesto.archivos = Object.fromEntries(Object.entries(archivos).sort(([a], [b]) => a.localeCompare(b)));
  manifiesto.generadoEl = new Date().toISOString().slice(0, 10);
  writeFileSync(rutaManifiesto, `${JSON.stringify(manifiesto, null, 1)}\n`);
  const mb = Object.values(archivos).reduce((s, a) => s + a.b, 0) / 1024 / 1024;
  console.log(`✔ ${grabados} audios nuevos. Total: ${Object.keys(archivos).length} audios (${mb.toFixed(1)} MB).`);
  if (error) throw error;
}

main().catch((e) => {
  console.error(`✖ ${(e as Error).message}`);
  process.exit(1);
});
