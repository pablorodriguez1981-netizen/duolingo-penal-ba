/** Día local en formato AAAA-MM-DD. */
export function diaLocal(fecha: Date = new Date()): string {
  const y = fecha.getFullYear();
  const m = String(fecha.getMonth() + 1).padStart(2, '0');
  const d = String(fecha.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function sumarDias(dia: string, n: number): string {
  const [y, m, d] = dia.split('-').map(Number);
  const f = new Date(y, m - 1, d);
  f.setDate(f.getDate() + n);
  return diaLocal(f);
}

export const ayer = (dia: string = diaLocal()) => sumarDias(dia, -1);

export function ultimosDias(n: number, hasta: string = diaLocal()): string[] {
  return Array.from({ length: n }, (_, i) => sumarDias(hasta, i - n + 1));
}

const DIAS = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
export function inicialDia(dia: string): string {
  const [y, m, d] = dia.split('-').map(Number);
  return DIAS[new Date(y, m - 1, d).getDay()];
}

export function mmss(segundos: number): string {
  const s = Math.max(0, Math.round(segundos));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
