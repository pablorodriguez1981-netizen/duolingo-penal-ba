import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import { sonidos } from '../lib/sonido';

type Variante = 'verde' | 'azul' | 'naranja' | 'rojo' | 'neutro' | 'contorno' | 'fantasma';

const ESTILOS: Record<Variante, { clase: string; sombra: string }> = {
  verde: { clase: 'bg-verde-500 text-white hover:brightness-105', sombra: '#13763c' },
  azul: { clase: 'bg-azul-500 text-white hover:brightness-110', sombra: '#133b8a' },
  naranja: { clase: 'bg-naranja-500 text-white hover:brightness-105', sombra: '#c25e00' },
  rojo: { clase: 'bg-rojo-500 text-white hover:brightness-105', sombra: '#a92525' },
  neutro: { clase: 'bg-superficie text-texto border-2 border-borde hover:bg-superficie-2', sombra: 'var(--borde)' },
  contorno: { clase: 'bg-transparent text-azul-500 border-2 border-borde hover:bg-superficie-2', sombra: 'var(--borde)' },
  fantasma: { clase: 'bg-transparent text-azul-500 shadow-none! hover:bg-superficie-2', sombra: 'transparent' },
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
  ancho?: boolean;
  chico?: boolean;
}

export function Boton({ variante = 'verde', ancho, chico, className = '', style, onClick, ...resto }: Props) {
  const e = ESTILOS[variante];
  return (
    <button
      {...resto}
      onClick={(ev) => {
        sonidos.toque();
        onClick?.(ev);
      }}
      style={{ ...style, ['--sombra' as string]: e.sombra } as CSSProperties}
      className={`btn-3d ${chico ? 'px-4 py-2 text-sm' : 'px-6 py-3.5 text-[15px]'} ${ancho ? 'w-full' : ''} ${e.clase} ${className}`}
    />
  );
}
