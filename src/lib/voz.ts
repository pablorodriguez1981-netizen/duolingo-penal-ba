/**
 * Lectura en voz alta con la Web Speech API (SpeechSynthesis).
 * Funciona offline con las voces del sistema (en Android, las de Google TTS).
 */
import { useEffect, useState, useSyncExternalStore } from 'react';

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

/** Adapta abreviaturas jurídicas para que la voz las lea bien. */
export function textoParaVoz(texto: string): string {
  return texto
    .replace(/\bCPPBA\b/g, 'Código Procesal Penal bonaerense')
    .replace(/\bCP\b/g, 'Código Penal')
    .replace(/\bIPP\b/g, 'I P P')
    .replace(/\bSCBA\b/g, 'Suprema Corte bonaerense')
    .replace(/\bCSJN\b/g, 'Corte Suprema')
    .replace(/\barts?\.\s/gi, (m) => (m.toLowerCase().startsWith('arts') ? 'artículos ' : 'artículo '))
    .replace(/\binc\.\s/gi, 'inciso ')
    .replace(/\s\(\d+\)/g, '')
    .replace(/___/g, 'espacio en blanco');
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
}

export function detener() {
  if (!vozDisponible()) return;
  window.speechSynthesis.cancel();
  hablandoId = null;
  notificar();
}

export function hablar(texto: string, { velocidad = 1, vozURI, id = 'general', alTerminar }: OpcionesVoz = {}) {
  if (!vozDisponible()) return;
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
    if (i === partes.length - 1) {
      u.onend = () => {
        if (hablandoId === id) {
          hablandoId = null;
          notificar();
        }
        alTerminar?.();
      };
    }
    u.onerror = () => {
      if (hablandoId === id) {
        hablandoId = null;
        notificar();
      }
    };
    synth.speak(u);
  });
}
