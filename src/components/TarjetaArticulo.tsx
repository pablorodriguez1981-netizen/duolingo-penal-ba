import { useState } from 'react';
import { etiquetaArticulo } from '../data/codigos';
import type { Articulo } from '../data/tipos';
import { detener, hablar, useHablando, vozDisponible } from '../lib/voz';
import { useProgreso } from '../store/progreso';
import { ParrafosGlosario } from './Glosario';

interface Props {
  articulo: Articulo;
  foco?: string;
  compacta?: boolean;
}

export function BotonEscuchar({ id, texto, etiqueta = 'Escuchar' }: { id: string; texto: string; etiqueta?: string }) {
  const hablando = useHablando();
  const ajustes = useProgreso((s) => s.ajustes);
  if (!vozDisponible()) return null;
  const activo = hablando === id;
  return (
    <button
      type="button"
      onClick={() => (activo ? detener() : hablar(texto, { velocidad: ajustes.vozVelocidad, vozURI: ajustes.vozURI, id }))}
      className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-extrabold transition ${
        activo ? 'bg-azul-500 text-white' : 'bg-azul-100 text-azul-600 hover:brightness-95 dark:bg-azul-700 dark:text-azul-100'
      }`}
      aria-pressed={activo}
      aria-label={activo ? 'Detener lectura' : `${etiqueta} en voz alta`}
    >
      <span aria-hidden>{activo ? '⏹' : '🔊'}</span>
      <span>{activo ? 'Detener' : etiqueta}</span>
      {activo && (
        <span className="ml-0.5 flex h-3 items-end gap-0.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-0.5 animate-pulse rounded bg-white" style={{ height: `${6 + i * 3}px`, animationDelay: `${i * 120}ms` }} />
          ))}
        </span>
      )}
    </button>
  );
}

export function InsigniaCodigo({ codigo }: { codigo: Articulo['codigo'] }) {
  return (
    <span
      className={`rounded-lg px-2 py-0.5 text-xs font-black tracking-wide text-white ${codigo === 'CP' ? 'bg-naranja-500' : 'bg-azul-500'}`}
    >
      {codigo === 'CP' ? 'CÓDIGO PENAL' : 'CPPBA'}
    </span>
  );
}

/** Tarjeta "pergamino moderno" con el texto de la norma, audio y glosario. */
export function TarjetaArticulo({ articulo: a, foco, compacta }: Props) {
  const [verNotas, setVerNotas] = useState(false);
  const [verDocumento, setVerDocumento] = useState(false);
  const mostrarDocumento = verDocumento && !!a.textoDocumento;
  const textoVisible = mostrarDocumento ? a.textoDocumento! : a.texto;
  const parrafos = textoVisible.split('\n\n');
  return (
    <article className="relative overflow-hidden rounded-3xl border-2 border-pergamino-borde bg-pergamino shadow-[0_6px_0_0_var(--pergamino-borde)]">
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-oro-400 via-naranja-400 to-oro-400" aria-hidden />
      <div className={compacta ? 'p-4' : 'p-5 sm:p-6'}>
        <header className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <InsigniaCodigo codigo={a.codigo} />
              <span className="text-sm font-black text-suave">{etiquetaArticulo(a)}</span>
            </div>
            <h3 className="text-lg leading-snug font-extrabold">{a.epigrafe}</h3>
            {a.ubicacion && <p className="mt-0.5 text-xs font-semibold text-suave">{a.ubicacion}</p>}
          </div>
          <BotonEscuchar id={`art-${a.id}`} texto={`${etiquetaArticulo(a)}. ${a.epigrafe}. ${textoVisible}`} />
        </header>

        {a.textoDocumento && (
          <div className="mb-3 grid grid-cols-2 gap-1 rounded-xl bg-black/5 p-1 text-xs font-black dark:bg-white/10" role="tablist" aria-label="Versión del texto">
            {[
              { doc: false, etiqueta: '🆕 Versión actualizada' },
              { doc: true, etiqueta: '📄 Tu documento (2003)' },
            ].map((t) => (
              <button
                key={t.etiqueta}
                role="tab"
                aria-selected={mostrarDocumento === t.doc}
                onClick={() => setVerDocumento(t.doc)}
                className={`rounded-lg px-2 py-1.5 ${mostrarDocumento === t.doc ? 'bg-superficie text-texto shadow' : 'text-suave'}`}
              >
                {t.etiqueta}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-3 font-serif text-[17px] leading-relaxed text-texto">
          <ParrafosGlosario parrafos={parrafos} foco={mostrarDocumento ? undefined : foco} />
        </div>

        <footer className="mt-4 space-y-2 text-xs">
          {mostrarDocumento ? (
            <p className="font-bold text-verde-700 dark:text-verde-500">📄 {a.fuente ?? 'Texto literal del documento importado.'}</p>
          ) : a.fidelidad === 'oficial' ? (
            <p className="font-bold text-verde-700 dark:text-verde-500">📄 {a.fuente ?? 'Texto literal del código importado.'}</p>
          ) : (
            <p className="rounded-xl bg-naranja-100 px-3 py-2 font-bold text-naranja-600 dark:bg-naranja-600/20 dark:text-naranja-400">
              🧭 Versión actualizada de estudio (reformas posteriores a tu documento): cotejala con el texto oficial vigente antes de citarla.
            </p>
          )}
          {a.avisoVigencia && (
            <p className="rounded-xl bg-oro-300/40 px-3 py-2 font-semibold text-texto">⚠️ {a.avisoVigencia}</p>
          )}
          {a.notas && a.notas.length > 0 && (
            <div>
              <button className="font-bold text-azul-500" onClick={() => setVerNotas((v) => !v)} aria-expanded={verNotas}>
                {verNotas ? '▾' : '▸'} Historial de reformas ({a.notas.length})
              </button>
              {verNotas && (
                <ul className="mt-1 list-disc space-y-0.5 pl-5 text-suave">
                  {a.notas.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </footer>
      </div>
    </article>
  );
}
