import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAbrirGlosario } from '../components/Glosario';
import { Hoja } from '../components/Hoja';
import { Marco, TituloSeccion } from '../components/Marco';
import { Mascota } from '../components/Mascota';
import { BotonEscuchar, InsigniaCodigo, TarjetaArticulo } from '../components/TarjetaArticulo';
import { AMBITOS, TarjetaFallo } from '../components/TarjetaFallo';
import { articulo, articulosCP, etiquetaArticulo, fuenteDe, idDe, todosLosArticulos } from '../data/codigos';
import { preguntasVistas, temasConFallo, UNIDADES_NUCLEO, unidadesVisibles } from '../data/curriculo';
import { ESTRUCTURA_CPPBA } from '../data/estructura-cppba';
import { GLOSARIO } from '../data/glosario';
import type { AmbitoFallo, Articulo, FalloClave } from '../data/tipos';
import { COLOR_UNIDAD } from '../lib/colores';
import { errorFrecuente } from '../lib/repaso';
import { useProgreso } from '../store/progreso';

// ---------------------------------------------------------------------------
// Entrenar
// ---------------------------------------------------------------------------

function TarjetaModo({ a, icono, titulo, texto, color, extra }: { a: string; icono: string; titulo: string; texto: string; color: string; extra?: string }) {
  return (
    <Link
      to={a}
      className="flex items-center gap-4 rounded-3xl border-2 border-borde bg-superficie p-4 shadow-[0_4px_0_0_var(--borde)] transition active:translate-y-1 active:shadow-none"
    >
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl text-white" style={{ background: color }} aria-hidden>
        {icono}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg leading-tight font-black">{titulo}</span>
        <span className="block text-sm font-semibold text-suave">{texto}</span>
        {extra && <span className="mt-1 block text-xs font-black text-oro-500">{extra}</span>}
      </span>
      <span className="text-2xl text-suave" aria-hidden>
        ›
      </span>
    </Link>
  );
}

export function PantallaEntrenar() {
  const estado = useProgreso();
  const { unidades } = useMemo(() => unidadesVisibles(estado), [estado]);
  const vistas = useMemo(() => preguntasVistas(unidades, estado), [unidades, estado]);
  const errores = vistas.filter((q) => errorFrecuente(estado.preguntas[q.pregunta.id])).length;
  const casosHechos = UNIDADES_NUCLEO.filter((u) => estado.casosCompletados[u.id]);
  return (
    <Marco>
      <TituloSeccion icono="🏋️" titulo="Entrenar" bajada="Modos especiales para mantener la racha y no olvidar nada." />
      <div className="space-y-3 px-4">
        <TarjetaModo
          a="/supervivencia"
          icono="⏱️"
          titulo="Modo Supervivencia"
          texto="2 minutos a contrarreloj con artículos ya vistos y tus errores previos."
          color="#ff8a1f"
          extra={estado.supervivenciaRecord ? `🏅 Récord: ${estado.supervivenciaRecord}` : undefined}
        />
        <TarjetaModo a="/practica" icono="∞" titulo="Práctica rápida aleatoria" texto="Tandas infinitas de preguntas de todo lo estudiado." color="#1f5fd6" extra={`${vistas.length} preguntas disponibles`} />
        <TarjetaModo a="/practica?modo=errores" icono="🎯" titulo="Repasar mis errores" texto="Lo que más te cuesta, con repaso espaciado." color="#ef4b4b" extra={errores ? `${errores} preguntas para reforzar` : undefined} />
        <TarjetaModo a="/practica?modo=corazones" icono="❤️" titulo="Recuperar un corazón" texto="5 preguntas de repaso = 1 corazón." color="#ff5ea8" />
      </div>

      <h2 className="px-4 pt-6 pb-2 text-lg font-black">🏛️ Simulador de audiencias</h2>
      <div className="space-y-2 px-4">
        {UNIDADES_NUCLEO.map((u) => {
          const hecho = estado.casosCompletados[u.id];
          const disponible = hecho || u.temas.every((t) => t.lecciones.every((l) => estado.leccionesCompletadas[l.id]));
          return (
            <div key={u.id} className="flex items-center gap-3 rounded-2xl border-2 border-borde bg-superficie p-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xl text-white" style={{ background: COLOR_UNIDAD[u.color].base }} aria-hidden>
                {u.icono}
              </span>
              <div className="min-w-0 flex-1">
                <p className="leading-tight font-black">{u.caso?.titulo}</p>
                <p className="text-xs font-semibold text-suave">
                  Unidad {u.numero} · {u.caso?.rol}
                  {hecho ? ` · ⚖️ ${hecho.puntaje}/${hecho.maximo}` : ''}
                </p>
              </div>
              {disponible ? (
                <Link to={`/caso/${u.id}`} className="rounded-xl bg-azul-500 px-3 py-2 text-xs font-black text-white uppercase">
                  {hecho ? 'Repetir' : 'Jugar'}
                </Link>
              ) : (
                <span className="text-xl" title="Completá las lecciones de la unidad" aria-label="Bloqueado">
                  🔒
                </span>
              )}
            </div>
          );
        })}
        {casosHechos.length === 0 && <p className="px-1 text-sm text-suave">Los casos se desbloquean al terminar las lecciones de cada unidad.</p>}
      </div>
    </Marco>
  );
}

// ---------------------------------------------------------------------------
// Banco de jurisprudencia
// ---------------------------------------------------------------------------

export function PantallaFallos() {
  const leidos = useProgreso((s) => s.fallosLeidos);
  const marcar = useProgreso((s) => s.marcarFalloLeido);
  const [ambito, setAmbito] = useState<AmbitoFallo | 'todos'>('todos');
  const fallos = useMemo(
    () =>
      temasConFallo(UNIDADES_NUCLEO).flatMap(({ unidad, tema }) =>
        [tema.falloClave, ...(tema.fallosRelacionados ?? [])].filter((f): f is FalloClave => !!f).map((fallo) => ({ unidad, tema, fallo })),
      ),
    [],
  );
  const visibles = fallos.filter((f) => ambito === 'todos' || f.fallo.ambito === ambito);
  return (
    <Marco>
      <TituloSeccion icono="⚖️" titulo="Banco de jurisprudencia" bajada="Fallos clave en lenguaje claro, con enlace al texto completo." />
      <div className="mb-3 flex gap-2 overflow-x-auto px-4 pb-1">
        {(['todos', 'bonaerense', 'nacional', 'interamericano'] as const).map((a) => (
          <button
            key={a}
            onClick={() => setAmbito(a)}
            data-sel={ambito === a}
            className="shrink-0 rounded-full border-2 border-borde bg-superficie px-3 py-1 text-sm font-extrabold data-[sel=true]:border-violeta-500 data-[sel=true]:bg-violeta-500/10"
          >
            {a === 'todos' ? `Todos (${fallos.length})` : `${AMBITOS[a].corta} (${fallos.filter((f) => f.fallo.ambito === a).length})`}
          </button>
        ))}
      </div>
      <div className="space-y-3 px-4">
        {visibles.map(({ unidad, tema, fallo }) => {
          const a = articulo(tema.articuloId);
          return (
            <div key={`${tema.articuloId}-${fallo.caso}`}>
              <p className="mb-1 flex items-center gap-2 px-1 text-xs font-black tracking-wider text-suave uppercase">
                {a && etiquetaArticulo(a)} · Unidad {unidad.numero}
                {fallo === tema.falloClave && leidos[tema.articuloId] && <span className="text-verde-500">✔ leído</span>}
              </p>
              <TarjetaFallo fallo={fallo} idArticulo={tema.articuloId} plegable alAbrir={() => marcar(tema.articuloId)} />
            </div>
          );
        })}
      </div>
      <p className="px-6 py-4 text-center text-xs font-semibold text-suave">Síntesis didácticas: leé el fallo completo antes de citarlo.</p>
    </Marco>
  );
}

// ---------------------------------------------------------------------------
// Glosario
// ---------------------------------------------------------------------------

const normalizar = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export function PantallaGlosario() {
  const [q, setQ] = useState('');
  const abrir = useAbrirGlosario();
  const lista = useMemo(() => {
    const n = normalizar(q.trim());
    return [...GLOSARIO]
      .sort((a, b) => a.termino.localeCompare(b.termino, 'es'))
      .filter((t) => !n || normalizar(`${t.termino} ${t.variantes.join(' ')} ${t.definicion}`).includes(n));
  }, [q]);
  return (
    <Marco>
      <TituloSeccion icono="📖" titulo="Glosario jurídico" bajada={`${GLOSARIO.length} términos procesales y de fondo, en lenguaje claro.`} />
      <div className="sticky top-14 z-10 bg-fondo px-4 pb-3 lg:top-0">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar: excarcelación, IPP, dolo…"
          aria-label="Buscar en el glosario"
          className="w-full rounded-2xl border-2 border-borde bg-superficie px-4 py-3 font-semibold outline-none focus:border-azul-400"
        />
      </div>
      <ul className="space-y-2 px-4">
        {lista.map((t) => (
          <li key={t.id}>
            <button onClick={() => abrir(t.id)} className="opcion w-full px-4 py-3 text-left">
              <span className="block font-black">{t.termino}</span>
              <span className="line-clamp-2 block text-sm font-semibold text-suave">{t.definicion}</span>
            </button>
          </li>
        ))}
        {lista.length === 0 && <li className="p-4 text-center text-suave">No hay términos con «{q}».</li>}
      </ul>
    </Marco>
  );
}

// ---------------------------------------------------------------------------
// Explorador de códigos
// ---------------------------------------------------------------------------

export function PantallaCodigos() {
  const [pestana, setPestana] = useState<'CPPBA' | 'CP'>('CPPBA');
  const [abierto, setAbierto] = useState<string | null>(null);
  const [art, setArt] = useState<Articulo | null>(null);
  const [q, setQ] = useState('');
  const fuenteCodigo = fuenteDe(pestana);

  const cppbaDisponibles = useMemo(() => todosLosArticulos().filter((a) => a.codigo === 'CPPBA' && !a.id.startsWith('cppba-bloque')), []);
  const gruposCP = useMemo(() => {
    const m = new Map<string, Articulo[]>();
    for (const a of articulosCP()) {
      const r = articulo(idDe('cp', a.numero));
      if (!r) continue;
      const clave = a.titulo ?? 'Otros';
      if (!m.has(clave)) m.set(clave, []);
      m.get(clave)!.push(r);
    }
    return [...m.entries()];
  }, []);

  const busqueda = normalizar(q.trim());
  const resultados = useMemo(() => {
    if (!busqueda) return null;
    const lista = pestana === 'CP' ? gruposCP.flatMap(([, l]) => l) : cppbaDisponibles;
    return lista.filter((a) => a.numero === busqueda || normalizar(`${a.epigrafe} ${a.texto}`).includes(busqueda)).slice(0, 40);
  }, [busqueda, pestana, gruposCP, cppbaDisponibles]);

  const filaArticulo = (a: Articulo) => (
    <li key={a.id}>
      <button onClick={() => setArt(a)} className="w-full rounded-xl px-3 py-2 text-left hover:bg-superficie-2">
        <span className="font-black">Art. {a.numero}</span> <span className="font-semibold text-suave">· {a.epigrafe}</span>
      </button>
    </li>
  );

  return (
    <Marco>
      <TituloSeccion icono="📜" titulo="Códigos" bajada="Leé y escuchá el articulado completo, por libro y título." />
      <div className="px-4">
        <div className="mb-3 grid grid-cols-2 gap-2 rounded-2xl bg-superficie-2 p-1">
          {(['CPPBA', 'CP'] as const).map((c) => (
            <button
              key={c}
              onClick={() => {
                setPestana(c);
                setAbierto(null);
              }}
              className={`rounded-xl py-2 font-black ${pestana === c ? 'bg-superficie shadow' : 'text-suave'}`}
              aria-pressed={pestana === c}
            >
              {c === 'CPPBA' ? 'CPPBA (Ley 11.922)' : 'Código Penal'}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por número o palabra…"
          aria-label="Buscar en el código"
          className="mb-3 w-full rounded-2xl border-2 border-borde bg-superficie px-4 py-3 font-semibold outline-none focus:border-azul-400"
        />
        {fuenteCodigo && (
          <p className="mb-3 text-xs font-semibold text-suave">
            Texto vigente{fuenteCodigo.ultimaReforma ? ` (última reforma: ${fuenteCodigo.ultimaReforma})` : ''} · revisado el {fuenteCodigo.revisado}
            {fuenteCodigo.enlace && (
              <>
                {' · '}
                <a href={fuenteCodigo.enlace} target="_blank" rel="noopener noreferrer" className="font-bold text-azul-500 underline">
                  fuente oficial ↗
                </a>
              </>
            )}
          </p>
        )}
      </div>

      {resultados ? (
        <ul className="space-y-1 px-4">
          {resultados.map(filaArticulo)}
          {resultados.length === 0 && <li className="p-4 text-center text-suave">Sin resultados.</li>}
        </ul>
      ) : pestana === 'CPPBA' ? (
        <div className="space-y-2 px-4">
          {ESTRUCTURA_CPPBA.map((b) => {
            const arts = cppbaDisponibles.filter((a) => {
              const n = parseInt(a.numero, 10);
              return n >= b.desde && n <= b.hasta;
            });
            const nombre = b.capitulo ?? b.titulo;
            return (
              <div key={b.id} className="rounded-2xl border-2 border-borde bg-superficie">
                <button className="flex w-full items-start justify-between gap-2 p-3 text-left" onClick={() => setAbierto(abierto === b.id ? null : b.id)} aria-expanded={abierto === b.id}>
                  <span>
                    <span className="block text-xs font-black tracking-wide text-suave uppercase">
                      {b.libro.split(' · ')[0]} · arts. {b.desde}–{b.hasta}
                    </span>
                    <span className="block leading-tight font-black">{nombre}</span>
                  </span>
                  <span className="text-sm font-black text-azul-500">{arts.length > 0 ? `${arts.length} art.` : ''}</span>
                </button>
                {abierto === b.id && (
                  <div className="border-t-2 border-borde p-3 pt-2">
                    <p className="mb-2 text-sm text-suave">{b.descripcion}</p>
                    {arts.length > 0 ? <ul>{arts.map(filaArticulo)}</ul> : <p className="text-sm font-semibold text-suave">Sin artículos vigentes en este bloque.</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2 px-4">
          {gruposCP.map(([titulo, arts]) => (
            <div key={titulo} className="rounded-2xl border-2 border-borde bg-superficie">
              <button className="flex w-full items-center justify-between gap-2 p-3 text-left" onClick={() => setAbierto(abierto === titulo ? null : titulo)} aria-expanded={abierto === titulo}>
                <span className="leading-tight font-black">{titulo}</span>
                <span className="text-sm font-black text-azul-500">{arts.length} art.</span>
              </button>
              {abierto === titulo && (
                <div className="border-t-2 border-borde p-3 pt-2">
                  <div className="mb-2">
                    <BotonEscuchar id={`titulo-${titulo}`} etiqueta="Escuchar el título completo" texto={arts.map((a) => `Artículo ${a.numero}. ${a.texto}`).join(' ')} />
                  </div>
                  <ul>{arts.map(filaArticulo)}</ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Hoja abierta={!!art} alCerrar={() => setArt(null)} etiqueta="Artículo">
        {art && (
          <div className="space-y-2">
            <InsigniaCodigo codigo={art.codigo} />
            <TarjetaArticulo articulo={art} compacta />
          </div>
        )}
      </Hoja>
    </Marco>
  );
}

export function NoEncontrada() {
  return (
    <Marco>
      <div className="flex flex-col items-center gap-3 p-10 text-center">
        <Mascota animo="sorpresa" tam={120} />
        <p className="text-xl font-black">Esta página no existe</p>
        <Link to="/" className="font-black text-azul-500">
          Volver al camino
        </Link>
      </div>
    </Marco>
  );
}
