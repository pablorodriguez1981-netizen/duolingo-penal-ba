import confetti from 'canvas-confetti';

const COLORES = ['#1f5fd6', '#ff8a1f', '#22b35e', '#ffc53d', '#7c5cff', '#ff5ea8'];

export function lanzarConfeti(intenso = false) {
  const base = { colors: COLORES, disableForReducedMotion: true, zIndex: 60 };
  void confetti({ ...base, particleCount: intenso ? 140 : 90, spread: 80, origin: { y: 0.65 } });
  if (intenso) {
    window.setTimeout(() => {
      void confetti({ ...base, particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.7 } });
      void confetti({ ...base, particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.7 } });
    }, 250);
  }
}
