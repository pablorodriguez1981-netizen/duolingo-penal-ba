import type { ColorUnidad } from '../data/tipos';

export const COLOR_UNIDAD: Record<ColorUnidad, { base: string; oscuro: string; claro: string }> = {
  azul: { base: '#1f5fd6', oscuro: '#133b8a', claro: '#dce7ff' },
  naranja: { base: '#ff8a1f', oscuro: '#c25e00', claro: '#ffe9d4' },
  verde: { base: '#22b35e', oscuro: '#13763c', claro: '#d2f4df' },
  violeta: { base: '#7c5cff', oscuro: '#4b33b8', claro: '#e7e1ff' },
  rosa: { base: '#ff5ea8', oscuro: '#c22a72', claro: '#ffe0ef' },
  turquesa: { base: '#13b5c8', oscuro: '#0b7c8a', claro: '#d3f5f9' },
  amarillo: { base: '#f5a800', oscuro: '#a86f00', claro: '#fff1c7' },
  rojo: { base: '#ef4b4b', oscuro: '#a92525', claro: '#ffd9d9' },
};
