/**
 * Efectos sonoros sintetizados con Web Audio (sin archivos: funcionan offline
 * y no pesan nada en el bundle).
 */
let ctx: AudioContext | null = null;
let activo = true;

export const configurarSonido = (on: boolean) => {
  activo = on;
};

function contexto(): AudioContext | null {
  if (!activo || typeof window === 'undefined') return null;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function nota(frecuencia: number, inicio: number, duracion: number, tipo: OscillatorType = 'sine', volumen = 0.18) {
  const c = contexto();
  if (!c) return;
  const t0 = c.currentTime + inicio;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = tipo;
  osc.frequency.setValueAtTime(frecuencia, t0);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(volumen, t0 + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duracion);
  osc.connect(gain).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + duracion + 0.02);
}

export const sonidos = {
  toque() {
    nota(660, 0, 0.06, 'triangle', 0.06);
  },
  acierto() {
    nota(784, 0, 0.12, 'triangle');
    nota(1175, 0.09, 0.22, 'triangle');
  },
  error() {
    nota(220, 0, 0.18, 'sawtooth', 0.08);
    nota(185, 0.12, 0.25, 'sawtooth', 0.07);
  },
  victoria() {
    [523, 659, 784, 1047].forEach((f, i) => nota(f, i * 0.11, 0.3, 'triangle', 0.16));
    nota(1319, 0.48, 0.5, 'sine', 0.12);
  },
  racha() {
    [440, 554, 659, 880].forEach((f, i) => nota(f, i * 0.07, 0.2, 'square', 0.05));
  },
  tic() {
    nota(1000, 0, 0.03, 'square', 0.03);
  },
};

/** Vibración háptica breve en Android. */
export function vibrar(patron: number | number[]) {
  if (activo && typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(patron);
}
