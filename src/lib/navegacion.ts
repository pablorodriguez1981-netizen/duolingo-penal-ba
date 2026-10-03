import type { NavigateFunction } from 'react-router-dom';

/** Vuelve a la pantalla anterior o, si se entró directo (atajo de la app), al camino. */
export function volverAtras(navegar: NavigateFunction) {
  const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0;
  if (idx > 0) navegar(-1);
  else navegar('/', { replace: true });
}
