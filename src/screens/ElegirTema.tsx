import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InsigniaCodigo } from '../components/TarjetaArticulo';
import { articulo, etiquetaArticulo, todosLosArticulos } from '../data/codigos';
import { leccionesDeArticulo, UNIDADES_NUCLEO } from '../data/curriculo';
import type { Articulo, Tema, Unidad } from '../data/tipos';
import { COLOR_UNIDAD } from '../lib/colores';
import { useProgreso } from '../store/progreso';

/** Atajos a los temas que más se consultan. */
const ATAJOS = [
  'Garantías',
  'Declaración del imputado',
  'Prisión preventiva',
  'Excarcelación',
  'Nulidades',
  'Prueba',
  'Elevación a juicio',
  'Juicio oral',
  'Jurados',
  'Juicio abreviado',
  'Probation',
  'Casación',
];

const normalizar = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

const textoTema = (u: Unidad, t: Tema) => {
  const a = articulo(t.articuloId);
  return normalizar(
    [u.titulo, u.subtitulo, u.etapa, a?.epigrafe, a?.ubicacion, a ? etiquetaArticulo(a) : '', ...t.lecciones.map((l) => l.titulo), t.falloClave?.caso].join(' '),
  );
};

function FilaTema({ unidad, tema }: { unidad: Unidad; tema: Tema }) {
  const navegar = useNavigate();
  const hechas = useProgreso((s) => s.leccionesCompletadas);
  const a = articulo(tema.articuloId);
  const c = COLOR_UNIDAD[unidad.color];
  return (
    <li className="rounded-2xl border-2 border-borde bg-superficie p-3">
      <div className="flex flex-wrap items-center gap-2">
        {a && <InsigniaCodigo codigo={a.codigo} />}
        <span className="font-black">{a ? etiquetaArticulo(a) : tema.articuloId}</span>
        {a && <span className="text-sm font-semibold text-suave">· {a.epigrafe}</span>}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {tema.lecciones.map((l) => (
          <button
            key={l.id}
            onClick={() => navegar(`/leccion/${l.id}`)}
            className="rounded-xl border-2 px-3 py-1.5 text-left text-sm font-extrabold"
            style={{ borderColor: `${c.base}66` }}
          >
            {hechas[l.id] ? '✔ ' : ''}
            {l.titulo}
          </button>
        ))}
      </div>
    </li>
  );
}

function ResultadoArticulo({ a }: { a: Articulo }) {
  const navegar = useNavigate();
  const lecciones = leccionesDeArticulo(a.id);
  if (!lecciones.length) return null;
  return (
    <li>
      <button onClick={() => navegar(`/leccion/${lecciones[0]}`)} className="flex w-full items-start gap-2 rounded-2xl border-2 border-borde bg-superficie p-3 text-left hover:bg-superficie-2">
        <InsigniaCodigo codigo={a.codigo} />
        <span className="min-w-0">
          <span className="font-black">{etiquetaArticulo(a)}</span> <span className="font-semibold text-suave">· {a.epigrafe}</span>
          {a.ubicacion && <span className="block truncate text-xs font-semibold text-suave">{a.ubicacion}</span>}
        </span>
      </button>
    </li>
  );
}

/** Recorrido libre: entrar directo a cualquier tema sin desbloquear el camino. */
export function ElegirTema() {
  const navegar = useNavigate();
  const casos = useProgreso((s) => s.casosCompletados);
  const [q, setQ] = useState('');
  const busqueda = normalizar(q.trim());

  const temas = useMemo(() => {
    if (!busqueda) return null;
    const palabras = busqueda.split(/\s+/);
    return UNIDADES_NUCLEO.flatMap((u) => u.temas.filter((t) => palabras.every((p) => textoTema(u, t).includes(p))).map((t) => ({ u, t })));
  }, [busqueda]);

  const articulos = useMemo(() => {
    if (busqueda.length < 2) return [];
    const nucleo = new Set(UNIDADES_NUCLEO.flatMap((u) => u.temas.map((t) => t.articuloId)));
    const numero = busqueda.replace(/^art(iculo)?\.?\s*/, '');
    return todosLosArticulos()
      .filter((a) => !a.sintetico && !nucleo.has(a.id))
      .filter((a) => a.numero === numero || a.numero.startsWith(`${numero} `) || normalizar(`${a.epigrafe} ${a.ubicacion ?? ''}`).includes(busqueda))
      .sort((x, y) => Number(y.numero.split(' ')[0] === numero) - Number(x.numero.split(' ')[0] === numero))
      .slice(0, 25);
  }, [busqueda]);

  return (
    <div className="px-4 pt-3">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscá un tema o un artículo (p. ej. excarcelación, 448)…"
        aria-label="Buscar tema o artículo"
        className="w-full rounded-2xl border-2 border-borde bg-superficie px-4 py-3 font-semibold outline-none focus:border-azul-400"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {ATAJOS.map((t) => (
          <button
            key={t}
            onClick={() => setQ(q === t ? '' : t)}
            data-sel={q === t}
            className="rounded-full border-2 border-borde bg-superficie px-3 py-1 text-sm font-extrabold data-[sel=true]:border-azul-400 data-[sel=true]:bg-azul-50 dark:data-[sel=true]:bg-azul-700/30"
          >
            {t}
          </button>
        ))}
      </div>

      {temas ? (
        <div className="mt-4 space-y-2">
          {temas.length > 0 && (
            <ul className="space-y-2">
              {temas.map(({ u, t }) => (
                <FilaTema key={t.articuloId} unidad={u} tema={t} />
              ))}
            </ul>
          )}
          {articulos.length > 0 && (
            <>
              <p className="pt-2 text-xs font-black tracking-widest text-suave uppercase">Otros artículos</p>
              <ul className="space-y-2">
                {articulos.map((a) => (
                  <ResultadoArticulo key={a.id} a={a} />
                ))}
              </ul>
            </>
          )}
          {temas.length === 0 && articulos.length === 0 && <p className="p-4 text-center font-semibold text-suave">Sin resultados. Probá con otra palabra o con el número de artículo.</p>}
        </div>
      ) : (
        <div className="mt-4 space-y-5">
          {UNIDADES_NUCLEO.map((u) => {
            const c = COLOR_UNIDAD[u.color];
            return (
              <section key={u.id}>
                <h2 className="mb-2 flex items-center gap-2 text-lg font-black" style={{ color: c.base }}>
                  <span aria-hidden>{u.icono}</span> {u.titulo}
                  <span className="text-xs font-bold text-suave">· {u.etapa}</span>
                </h2>
                <ul className="space-y-2">
                  {u.temas.map((t) => (
                    <FilaTema key={t.articuloId} unidad={u} tema={t} />
                  ))}
                </ul>
                {u.caso && (
                  <button onClick={() => navegar(`/caso/${u.id}`)} className="mt-2 w-full rounded-2xl border-2 border-dashed border-borde p-3 text-left font-extrabold hover:bg-superficie-2">
                    🏛️ Audiencia: {u.caso.titulo} {casos[u.id] ? '✔' : ''}
                  </button>
                )}
              </section>
            );
          })}
          <p className="pb-4 text-center text-sm font-semibold text-suave">¿Buscás otro artículo? Escribí su número o una palabra arriba: cada artículo del CPPBA y del Código Penal tiene su lección.</p>
        </div>
      )}
    </div>
  );
}
