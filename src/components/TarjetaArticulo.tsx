import { useState } from 'react';
import { etiquetaArticulo, fuenteDe } from '../data/codigos';
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
  const textoVisible = a.texto;
  const parrafos = textoVisible.split('\n\n');
  const fuente = a.sintetico ? null : fuenteDe(a.codigo);
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

        <div className="space-y-3 font-serif text-[17px] leading-relaxed text-texto">
          <ParrafosGlosario parrafos={parrafos} foco={foco} />
        </div>

        <footer className="mt-4 space-y-2 text-xs">
          {fuente && (
            <p className="font-semibold text-suave">
              Texto vigente · revisado el {fuente.revisado}
              {fuente.enlace && (
                <>
                  {' · '}
                  <a href={fuente.enlace} target="_blank" rel="noopener noreferrer" className="font-bold text-azul-500 underline">
                    Ver en {fuente.sitio} ↗
                  </a>
                </>
              )}
            </p>
          )}
          {a.sintetico && <p className="font-semibold text-suave">Resumen de la estructura del código (no es texto legal).</p>}
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
