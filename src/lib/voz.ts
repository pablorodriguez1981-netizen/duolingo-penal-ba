/**
 * Lectura en voz alta.
 *
 * 1. Voz natural: audios pregrabados con Eleven v4 (public/audio, listados en
 *    src/data/audios.json). No consumen créditos al reproducirse y quedan
 *    guardados en el teléfono para usarlos sin conexión.
 * 2. Respaldo: la voz del dispositivo (Web Speech API), para los textos que no
 *    tienen audio grabado o si no se pudo descargar.
 */
import { useEffect, useState, useSyncExternalStore } from 'react';
import manifiesto from '../data/audios.json';
import { claveLocucion, textoParaVoz } from './locucion';

export { textoParaVoz } from './locucion';

interface ManifiestoAudios {
  modelo: string | null;
  voz: { id: string; nombre: string } | null;
  formato: string | null;
  generadoEl: string | null;
  /** clave → bytes y segundos aproximados */
  archivos: Record<string, { b: number; s?: number }>;
}

export const AUDIOS = manifiesto as ManifiestoAudios;
export const CACHE_AUDIOS = 'carpi-audios';
export const urlAudio = (clave: string) => `${import.meta.env.BASE_URL}audio/${clave}.mp3`;
export const tieneVozNatural = (texto: string) => !!AUDIOS.archivos[claveLocucion(texto)];

export const vozDisponible = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

const PREFERENCIA_IDIOMA = ['es-AR', 'es-419', 'es-US', 'es-MX', 'es-ES', 'es'];

export function vocesEnEspanol(): SpeechSynthesisVoice[] {
  if (!vozDisponible()) return [];
  const voces = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('es'));
  const rango = (v: SpeechSynthesisVoice) => {
    const i = PREFERENCIA_IDIOMA.findIndex((p) => v.lang.toLowerCase().replace('_', '-').startsWith(p.toLowerCase()));
    return i < 0 ? 99 : i;
  };
  return voces.sort((a, b) => rango(a) - rango(b) || Number(b.localService) - Number(a.localService));
}

export function useVoces() {
  const [voces, setVoces] = useState<SpeechSynthesisVoice[]>(() => vocesEnEspanol());
  useEffect(() => {
    if (!vozDisponible()) return;
    const actualizar = () => setVoces(vocesEnEspanol());
    actualizar();
    window.speechSynthesis.addEventListener('voiceschanged', actualizar);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', actualizar);
  }, []);
  return voces;
}

/** Divide en fragmentos cortos: algunos motores cortan los textos largos. */
export function fragmentar(texto: string, max = 220): string[] {
  const oraciones = texto.replace(/\s+/g, ' ').match(/[^.;:!?]+[.;:!?]*/g) ?? [texto];
  const out: string[] = [];
  let actual = '';
  for (const o of oraciones) {
    if ((actual + o).length > max && actual) {
      out.push(actual.trim());
      actual = '';
    }
    if (o.length > max) {
      const palabras = o.split(' ');
      for (const p of palabras) {
        if ((actual + ' ' + p).length > max) {
          out.push(actual.trim());
          actual = '';
        }
        actual += ` ${p}`;
      }
    } else {
      actual += o;
    }
  }
  if (actual.trim()) out.push(actual.trim());
  return out;
}

// --- estado global de reproducción (para mostrar qué se está leyendo) ---
let hablandoId: string | null = null;
const oyentes = new Set<() => void>();
const notificar = () => oyentes.forEach((f) => f());

export function useHablando(): string | null {
  return useSyncExternalStore(
    (f) => {
      oyentes.add(f);
      return () => oyentes.delete(f);
    },
    () => hablandoId,
    () => null,
  );
}

export interface OpcionesVoz {
  velocidad?: number;
  vozURI?: string | null;
  id?: string;
  alTerminar?: () => void;
  /** Usar la voz natural pregrabada si existe (por defecto, sí). */
  natural?: boolean;
}

let audioActual: HTMLAudioElement | null = null;

const terminar = (id: string, alTerminar?: () => void) => {
  if (hablandoId === id) {
    hablandoId = null;
    notificar();
  }
  alTerminar?.();
};

export function detener() {
  if (audioActual) {
    audioActual.onended = null;
    audioActual.onerror = null;
    audioActual.pause();
    audioActual = null;
  }
  if (vozDisponible()) window.speechSynthesis.cancel();
  hablandoId = null;
  notificar();
}

/** ¿Hay alguna forma de leer este texto? */
export const puedeHablar = (texto: string, natural = true) => (natural && tieneVozNatural(texto)) || vozDisponible();

export function hablar(texto: string, opciones: OpcionesVoz = {}) {
  const { velocidad = 1, id = 'general', alTerminar, natural = true } = opciones;
  detener();
  const clave = claveLocucion(texto);
  if (natural && AUDIOS.archivos[clave] && typeof Audio !== 'undefined') {
    const audio = new Audio(urlAudio(clave));
    audio.playbackRate = velocidad;
    audioActual = audio;
    hablandoId = id;
    notificar();
    audio.onended = () => {
      audioActual = null;
      terminar(id, alTerminar);
    };
    // Sin conexión y sin el audio guardado: se lee con la voz del dispositivo.
    audio.onerror = () => {
      if (audioActual !== audio) return;
      audioActual = null;
      hablarDispositivo(texto, opciones);
    };
    audio.play().catch(() => {
      if (audioActual === audio) {
        audioActual = null;
        hablarDispositivo(texto, opciones);
      }
    });
    return;
  }
  hablarDispositivo(texto, opciones);
}

function hablarDispositivo(texto: string, { velocidad = 1, vozURI, id = 'general', alTerminar }: OpcionesVoz) {
  if (!vozDisponible()) {
    terminar(id);
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const voces = vocesEnEspanol();
  const voz = voces.find((v) => v.voiceURI === vozURI) ?? voces[0];
  const partes = fragmentar(textoParaVoz(texto));
  hablandoId = id;
  notificar();
  partes.forEach((parte, i) => {
    const u = new SpeechSynthesisUtterance(parte);
    u.lang = voz?.lang ?? 'es-AR';
    if (voz) u.voice = voz;
    u.rate = velocidad;
    u.pitch = 1;
    if (i === partes.length - 1) u.onend = () => terminar(id, alTerminar);
    u.onerror = () => terminar(id);
    synth.speak(u);
  });
}
