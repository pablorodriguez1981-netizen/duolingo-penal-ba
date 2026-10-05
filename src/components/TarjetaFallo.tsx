import { useState } from 'react';
import type { AmbitoFallo, FalloClave } from '../data/tipos';
import { BotonEscuchar } from './TarjetaArticulo';
import { TextoGlosario } from './Glosario';

interface Props {
  fallo: FalloClave;
  idArticulo: string;
  /** Si es plegable, empieza cerrada (tarjeta opcional dentro de la lección). */
  plegable?: boolean;
  alAbrir?: () => void;
}

export const AMBITOS: Record<AmbitoFallo, { etiqueta: string; corta: string }> = {
  bonaerense: { etiqueta: 'Jurisprudencia bonaerense', corta: 'Bonaerenses' },
  nacional: { etiqueta: 'Corte Suprema de la Nación', corta: 'Corte Suprema' },
  interamericano: { etiqueta: 'Sistema interamericano', corta: 'Interamericanos' },
};

/** "El Fallo Clave": síntesis amigable de una línea jurisprudencial. */
export function TarjetaFallo({ fallo, idArticulo, plegable, alAbrir }: Props) {
  const [abierta, setAbierta] = useState(!plegable);
  const encabezado = (
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-violeta-500 text-2xl text-white shadow-[0_3px_0_0_#4b33b8]" aria-hidden>
        ⚖️
      </span>
      <div className="min-w-0 text-left">
        <p className="text-xs font-black tracking-widest text-violeta-500 uppercase">
          {fallo.ambito === 'bonaerense' ? '🏛️ Fallo bonaerense' : 'El Fallo Clave'}
        </p>
        <p className="leading-tight font-extrabold">{fallo.caso}</p>
        <p className="text-xs font-semibold text-suave">
          {fallo.tribunal}
          {fallo.anio ? ` · ${fallo.anio}` : ''}
        </p>
      </div>
    </div>
  );
  return (
    <section className="rounded-3xl border-2 border-violeta-500/30 bg-superficie p-4 shadow-[0_4px_0_0_rgba(124,92,255,0.25)]">
      {plegable ? (
        <button
          className="flex w-full items-center justify-between gap-2"
          onClick={() => {
            setAbierta((a) => !a);
            if (!abierta) alAbrir?.();
          }}
          aria-expanded={abierta}
        >
          {encabezado}
          <span className="text-xl text-suave">{abierta ? '▾' : '▸'}</span>
        </button>
      ) : (
        encabezado
      )}
      {abierta && (
        <div className="mt-3 space-y-3 text-[15.5px] leading-relaxed">
          <p>
            <TextoGlosario texto={fallo.resumen} />
          </p>
          <div className="rounded-2xl bg-violeta-500/10 p-3">
            <p className="text-xs font-black tracking-wide text-violeta-500 uppercase">La regla que tenés que recordar</p>
            <p className="mt-1 font-bold">
              <TextoGlosario texto={fallo.regla} />
            </p>
          </div>
          {fallo.nota && <p className="text-xs text-suave">ℹ️ {fallo.nota}</p>}
          <div className="flex flex-wrap items-center gap-2">
            <BotonEscuchar id={`fallo-${idArticulo}-${fallo.caso}`} texto={`${fallo.caso}. ${fallo.resumen}. La regla: ${fallo.regla}`} />
            {fallo.enlaces.map((e) => (
              <a
                key={e.url}
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-violeta-500/10 px-3 py-1.5 text-sm font-extrabold text-violeta-500 hover:bg-violeta-500/20"
              >
                📄 Ver fallo ↗<span className="sr-only"> ({e.etiqueta})</span>
              </a>
            ))}
          </div>
          {fallo.enlaces.length > 0 && <p className="text-[11px] font-semibold text-suave">{fallo.enlaces.map((e) => e.etiqueta).join(' · ')}</p>}
        </div>
      )}
    </section>
  );
}
