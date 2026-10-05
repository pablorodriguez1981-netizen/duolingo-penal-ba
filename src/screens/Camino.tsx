import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Boton } from '../components/Boton';
import { Hoja } from '../components/Hoja';
import { AnilloProgreso } from '../components/Indicadores';
import { Marco } from '../components/Marco';
import { Mascota } from '../components/Mascota';
import { InsigniaCodigo, TarjetaArticulo } from '../components/TarjetaArticulo';
import { TarjetaFallo } from '../components/TarjetaFallo';
import { articulo, etiquetaArticulo } from '../data/codigos';
import { estadoCamino, unidadesVisibles, type EstadoNodo } from '../data/curriculo';
import type { Unidad } from '../data/tipos';
import { COLOR_UNIDAD } from '../lib/colores';
import { diaLocal } from '../lib/fechas';
import { usePWA, instalar } from '../lib/pwa';
import { useProgreso } from '../store/progreso';
import { ElegirTema } from './ElegirTema';

const DESPLAZAMIENTOS = [0, 44, 72, 44, 0, -44, -72, -44];
const PASO_Y = 132;

/** Nombre corto que se muestra debajo de cada nodo. */
function etiquetaNodo(e: EstadoNodo): string {
  const n = e.nodo;
  if (n.tipo === 'repaso') return 'Repaso';
  if (n.tipo === 'fallo') return n.titulo.replace(/^«([^,»]+).*$/, '«$1»');
  return n.titulo.replace(/\s*\((?:art|arts)\.[^)]*\)\s*$/i, '').replace(/^Art\. /, 'Art. ');
}

function useProgresoCamino() {
  const leccionesCompletadas = useProgreso((s) => s.leccionesCompletadas);
  const repasosCompletados = useProgreso((s) => s.repasosCompletados);
  const casosCompletados = useProgreso((s) => s.casosCompletados);
  const fallosLeidos = useProgreso((s) => s.fallosLeidos);
  return useMemo(
    () => ({ leccionesCompletadas, repasosCompletados, casosCompletados, fallosLeidos }),
    [leccionesCompletadas, repasosCompletados, casosCompletados, fallosLeidos],
  );
}

const ICONO_NODO = { leccion: '⭐', caso: '🏛️', repaso: '🔁', fallo: '⚖️' } as const;

function BotonNodo({ e, unidad, alTocar, chico }: { e: EstadoNodo; unidad: Unidad; alTocar: () => void; chico?: boolean }) {
  const c = COLOR_UNIDAD[unidad.color];
  const tam = chico ? 58 : 74;
  const fondo = e.completo || e.desbloqueado ? (e.nodo.tipo === 'fallo' ? '#7c5cff' : c.base) : 'var(--superficie-2)';
  const sombra = e.completo || e.desbloqueado ? (e.nodo.tipo === 'fallo' ? '#4b33b8' : c.oscuro) : 'var(--borde)';
  const icono = e.completo ? (e.nodo.tipo === 'repaso' ? '🏆' : e.nodo.tipo === 'leccion' ? '✔' : ICONO_NODO[e.nodo.tipo]) : e.desbloqueado ? ICONO_NODO[e.nodo.tipo] : '🔒';
  return (
    <div className="relative" id={e.actual ? 'nodo-actual' : undefined}>
      {e.actual && (
        <motion.div
          className="absolute -top-11 left-1/2 z-10 -translate-x-1/2 rounded-xl border-2 border-borde bg-superficie px-3 py-1.5 text-sm font-black whitespace-nowrap uppercase"
          style={{ color: c.base }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          {e.nodo.tipo === 'repaso' ? 'Repaso' : e.nodo.tipo === 'caso' ? 'Audiencia' : '¡Empezar!'}
          <span className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r-2 border-b-2 border-borde bg-superficie" />
        </motion.div>
      )}
      {e.actual && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: `0 0 0 6px ${c.base}55` }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.9, 0.2, 0.9] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          aria-hidden
        />
      )}
      <button
        onClick={alTocar}
        className="btn-3d relative mx-auto grid place-items-center rounded-full! text-white"
        style={{ width: tam, height: tam, background: fondo, ['--sombra' as string]: sombra, fontSize: chico ? 24 : 30 }}
        aria-label={`${e.nodo.titulo}${e.completo ? ' (completado)' : e.desbloqueado ? '' : ' (bloqueado)'}`}
      >
        <span className={e.desbloqueado || e.completo ? '' : 'opacity-60 grayscale'}>{icono}</span>
      </button>
      <button
        onClick={alTocar}
        tabIndex={-1}
        aria-hidden
        className={`absolute left-1/2 mt-2 line-clamp-2 -translate-x-1/2 rounded-md bg-fondo/90 px-1.5 text-center text-[11px] leading-tight font-extrabold ${
          e.desbloqueado || e.completo ? 'text-texto' : 'text-suave'
        }`}
        style={{ width: chico ? 92 : 118 }}
      >
        {etiquetaNodo(e)}
      </button>
    </div>
  );
}

function SeccionUnidad({ unidad, estados, alTocarNodo, alVerGuia }: { unidad: Unidad; estados: EstadoNodo[]; alTocarNodo: (e: EstadoNodo) => void; alVerGuia: () => void }) {
  const c = COLOR_UNIDAD[unidad.color];
  const principales = estados.filter((e) => e.nodo.tipo !== 'fallo');
  const completos = principales.filter((e) => e.completo).length;
  const indiceActual = principales.findIndex((e) => e.actual);

  // Posiciones de nodos principales y ramas.
  const pos = new Map<string, { x: number; y: number }>();
  principales.forEach((e, k) => pos.set(e.nodo.id, { x: DESPLAZAMIENTOS[k % DESPLAZAMIENTOS.length], y: 40 + k * PASO_Y }));
  const ramas = estados.filter((e) => e.nodo.tipo === 'fallo');
  for (const r of ramas) {
    // la rama sale de la última lección del tema
    const padre = [...principales].reverse().find((e) => e.nodo.tipo === 'leccion' && e.nodo.articuloId === r.nodo.articuloId);
    const p = padre ? pos.get(padre.nodo.id)! : { x: 0, y: 40 };
    pos.set(r.nodo.id, { x: p.x >= 0 ? p.x - 128 : p.x + 128, y: p.y + PASO_Y / 2 });
  }
  // Carpi acompaña al nodo actual, en el primer lugar libre (sin tapar nodos ni ramas).
  const posMascota = (() => {
    if (indiceActual < 0) return null;
    const actual = pos.get(principales[indiceActual].nodo.id)!;
    const [opuesto, mismo] = actual.x >= 0 ? [actual.x - 150, actual.x + 70] : [actual.x + 70, actual.x - 150];
    const candidatos = [
      { x: opuesto, y: actual.y - 10 },
      { x: mismo, y: actual.y - 10 },
      { x: opuesto, y: actual.y - 70 },
      { x: mismo, y: actual.y - 70 },
    ];
    const ocupados = estados.map((e) => {
      const p = pos.get(e.nodo.id)!;
      const r = e.nodo.tipo === 'fallo' ? 29 : 37;
      const ancho = e.nodo.tipo === 'fallo' ? 46 : 59; // la etiqueta es más ancha que el nodo
      return { x0: p.x - ancho, x1: p.x + ancho, y0: p.y, y1: p.y + 2 * r + 38 };
    });
    return (
      candidatos.find(
        (c) => c.x >= -185 && c.x <= 105 && !ocupados.some((o) => o.x0 < c.x + 80 && o.x1 > c.x && o.y0 < c.y + 84 && o.y1 > c.y),
      ) ?? null
    );
  })();
  const alto = 40 + principales.length * PASO_Y - 20;
  const centro = 160;

  return (
    <section className="px-4 pt-4" aria-label={`Unidad ${unidad.numero}: ${unidad.titulo}`}>
      <div className="rounded-3xl p-4 text-white shadow-[0_5px_0_0_var(--s)]" style={{ background: c.base, ['--s' as string]: c.oscuro }}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-black tracking-widest uppercase opacity-90">
              {unidad.generada ? 'Módulo' : 'Unidad'} {unidad.numero} · {unidad.etapa}
            </p>
            <h2 className="mt-0.5 text-xl leading-tight font-black">
              <span aria-hidden>{unidad.icono}</span> {unidad.titulo}
            </h2>
            <p className="mt-1 text-sm font-semibold opacity-95">{unidad.subtitulo}</p>
          </div>
          <button
            onClick={alVerGuia}
            className="shrink-0 rounded-2xl border-2 border-white/40 bg-white/15 px-3 py-2 text-xs font-black tracking-wide uppercase hover:bg-white/25"
          >
            📘 Guía
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-black/20">
            <div className="h-full rounded-full bg-white" style={{ width: `${(completos / principales.length) * 100}%` }} />
          </div>
          <span className="text-xs font-black">
            {completos}/{principales.length}
          </span>
        </div>
      </div>
      {unidad.aviso && <p className="mt-2 px-1 text-xs font-semibold text-suave">ℹ️ {unidad.aviso}</p>}

      <div className="relative mx-auto mt-6" style={{ height: alto, width: centro * 2 }}>
        <svg className="absolute inset-0 overflow-visible" width={centro * 2} height={alto} aria-hidden>
          {principales.slice(1).map((e, k) => {
            const a = pos.get(principales[k].nodo.id)!;
            const b = pos.get(e.nodo.id)!;
            const hecho = principales[k].completo;
            return (
              <path
                key={e.nodo.id}
                d={`M ${centro + a.x} ${a.y + 37} C ${centro + a.x} ${(a.y + b.y) / 2 + 37}, ${centro + b.x} ${(a.y + b.y) / 2 + 37}, ${centro + b.x} ${b.y + 37}`}
                stroke={hecho ? c.base : 'var(--borde)'}
                strokeWidth={10}
                strokeLinecap="round"
                fill="none"
                opacity={hecho ? 0.45 : 1}
              />
            );
          })}
          {ramas.map((r) => {
            const padre = [...principales].reverse().find((e) => e.nodo.tipo === 'leccion' && e.nodo.articuloId === r.nodo.articuloId);
            if (!padre) return null;
            const a = pos.get(padre.nodo.id)!;
            const b = pos.get(r.nodo.id)!;
            return (
              <path
                key={r.nodo.id}
                d={`M ${centro + a.x} ${a.y + 37} Q ${centro + (a.x + b.x) / 2} ${a.y + 37}, ${centro + b.x} ${b.y + 29}`}
                stroke="#7c5cff"
                strokeWidth={4}
                strokeDasharray="2 10"
                strokeLinecap="round"
                fill="none"
                opacity={r.desbloqueado ? 0.8 : 0.3}
              />
            );
          })}
        </svg>
        {estados.map((e) => {
          const p = pos.get(e.nodo.id)!;
          const chico = e.nodo.tipo === 'fallo';
          const mitad = chico ? 29 : 37;
          return (
            <div key={e.nodo.id} className="absolute" style={{ left: centro + p.x - mitad, top: p.y }}>
              <BotonNodo e={e} unidad={unidad} chico={chico} alTocar={() => alTocarNodo(e)} />
            </div>
          );
        })}
        {posMascota && (
          <div className="pointer-events-none absolute" style={{ left: centro + posMascota.x, top: posMascota.y }}>
            <Mascota tam={80} />
          </div>
        )}
      </div>
    </section>
  );
}

function DetalleNodo({ e, unidad, alCerrar }: { e: EstadoNodo; unidad: Unidad; alCerrar: () => void }) {
  const navegar = useNavigate();
  const marcarFallo = useProgreso((s) => s.marcarFalloLeido);
  const n = e.nodo;
  const art = n.articuloId ? articulo(n.articuloId) : undefined;
  const tema = unidad.temas.find((t) => t.articuloId === n.articuloId);
  const leccion = tema?.lecciones.find((l) => l.id === n.leccionId);

  useEffect(() => {
    if (n.tipo === 'fallo' && e.desbloqueado && n.articuloId) marcarFallo(n.articuloId);
  }, [n, e.desbloqueado, marcarFallo]);

  if (n.tipo === 'fallo' && tema?.falloClave) {
    return e.desbloqueado ? (
      <div className="space-y-3">
        {art && <p className="text-sm font-bold text-suave">Rama opcional · {etiquetaArticulo(art)}</p>}
        <TarjetaFallo fallo={tema.falloClave} idArticulo={tema.articuloId} />
      </div>
    ) : (
      <p className="text-suave">🔒 Esta rama opcional se habilita cuando completes la primera lección del {art ? etiquetaArticulo(art) : 'tema'}.</p>
    );
  }

  const destino = n.tipo === 'leccion' ? `/leccion/${n.leccionId}` : n.tipo === 'caso' ? `/caso/${unidad.id}` : `/repaso/${unidad.id}`;
  return (
    <div className="space-y-3">
      {n.tipo === 'leccion' && art && (
        <div className="flex flex-wrap items-center gap-2">
          <InsigniaCodigo codigo={art.codigo} />
          <span className="text-sm font-black text-suave">{etiquetaArticulo(art)}</span>
          {leccion && <span className="text-sm font-bold text-suave">· ⏱ {leccion.minutos} min</span>}
        </div>
      )}
      {n.tipo === 'caso' && unidad.caso && (
        <p className="text-[15px] text-suave">
          <b>Simulador de audiencia.</b> Rol: {unidad.caso.rol}. {unidad.caso.sede}.
        </p>
      )}
      {n.tipo === 'repaso' && (
        <p className="text-[15px] text-suave">
          <b>Repaso dinámico obligatorio.</b> Mezcla preguntas de esta unidad con las que más te cuestan de unidades anteriores. Al completarlo se habilita el siguiente módulo y recuperás un ❤️.
        </p>
      )}
      {e.desbloqueado ? (
        <Boton
          ancho
          variante={e.completo ? 'azul' : 'verde'}
          onClick={() => {
            alCerrar();
            navegar(destino);
          }}
        >
          {e.completo ? 'Repetir (+XP)' : n.tipo === 'caso' ? 'Entrar a la audiencia' : 'Empezar'}
        </Boton>
      ) : n.tipo === 'repaso' ? (
        <p className="rounded-2xl bg-superficie-2 p-3 text-center font-bold text-suave">🔒 Completá los pasos anteriores para desbloquear.</p>
      ) : (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-suave">El camino guiado sugiere hacer antes los pasos anteriores, pero podés estudiar este tema ahora.</p>
          <Boton
            ancho
            variante="azul"
            onClick={() => {
              alCerrar();
              navegar(destino);
            }}
          >
            Estudiar este tema igual
          </Boton>
        </div>
      )}
    </div>
  );
}

function GuiaUnidad({ unidad }: { unidad: Unidad }) {
  return (
    <div className="space-y-4">
      <p className="text-[15px] text-suave">Artículos de esta unidad. Tocá 🔊 para escucharlos mientras viajás.</p>
      {unidad.temas.map((t) => {
        const a = articulo(t.articuloId);
        return a ? <TarjetaArticulo key={t.articuloId} articulo={a} compacta /> : null;
      })}
    </div>
  );
}

function Bienvenida() {
  const marcar = useProgreso((s) => s.marcarBienvenida);
  const actualizar = useProgreso((s) => s.actualizarAjustes);
  const meta = useProgreso((s) => s.ajustes.metaDiaria);
  return (
    <Hoja abierta alCerrar={marcar} etiqueta="Bienvenida">
      <div className="flex flex-col items-center gap-3 text-center">
        <Mascota animo="festejo" tam={120} />
        <h2 className="text-2xl font-black">¡Hola! Soy Carpi 👋</h2>
        <p className="text-[15.5px] text-suave">
          Vamos a recorrer el <b>Código Procesal Penal bonaerense</b> combinado con el <b>Código Penal</b>, en lecciones de 3 a 5 minutos: explicación simple, lectura de la norma con audio y práctica.
        </p>
        <div className="w-full">
          <p className="mb-2 text-sm font-black tracking-wide text-suave uppercase">Tu meta diaria</p>
          <div className="grid grid-cols-2 gap-3">
            {([3, 4] as const).map((n) => (
              <button key={n} data-sel={meta === n} onClick={() => actualizar({ metaDiaria: n })} className="opcion px-3 py-3 font-black">
                {n} artículos/día
                <span className="block text-xs font-bold text-suave">{n === 3 ? 'Ritmo constante' : 'Ritmo intenso'}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-suave">Tu progreso se guarda en este dispositivo (podés guardar una copia desde Perfil) y la app funciona sin conexión.</p>
        <Boton ancho onClick={marcar}>
          ¡Empezar!
        </Boton>
      </div>
    </Hoja>
  );
}

function PanelLateral() {
  const pwa = usePWA();
  const hoy = useProgreso((s) => s.hoy);
  const meta = useProgreso((s) => s.ajustes.metaDiaria);
  const n = hoy.dia === diaLocal() ? hoy.articulos.length : 0;
  return (
    <>
      <div className="rounded-2xl border-2 border-borde bg-superficie p-4">
        <p className="font-black">🎯 Meta diaria</p>
        <div className="mt-2 flex items-center gap-3">
          <AnilloProgreso valor={n / meta} tam={56} grosor={6}>
            {Math.min(n, meta)}/{meta}
          </AnilloProgreso>
          <p className="text-sm font-semibold text-suave">{n >= meta ? '¡Meta cumplida! Podés seguir sumando.' : `Estudiá ${meta - n} artículo(s) más hoy.`}</p>
        </div>
      </div>
      <Link to="/supervivencia" className="block rounded-2xl border-2 border-borde bg-superficie p-4 hover:bg-superficie-2">
        <p className="font-black">⏱️ Modo Supervivencia</p>
        <p className="text-sm font-semibold text-suave">2 minutos a contrarreloj para mantener la racha.</p>
      </Link>
      {pwa.instalable && (
        <button onClick={() => void instalar()} className="w-full rounded-2xl border-2 border-azul-400 bg-azul-50 p-4 text-left dark:bg-azul-700/30">
          <p className="font-black text-azul-600 dark:text-azul-100">📲 Instalá la app</p>
          <p className="text-sm font-semibold text-suave">Abrila como app nativa, también sin conexión.</p>
        </button>
      )}
    </>
  );
}

export function PantallaCamino() {
  const p = useProgresoCamino();
  const bienvenidaVista = useProgreso((s) => s.bienvenidaVista);
  const vueltas = useProgreso((s) => s.vueltas);
  const reiniciar = useProgreso((s) => s.reiniciarCamino);
  const { unidades, hayMas, totalGenerados } = useMemo(() => unidadesVisibles(p), [p]);
  const estados = useMemo(() => estadoCamino(unidades, p), [unidades, p]);
  const [nodo, setNodo] = useState<{ e: EstadoNodo; u: Unidad } | null>(null);
  const [guia, setGuia] = useState<Unidad | null>(null);
  const navegar = useNavigate();
  const todoCompleto = !hayMas && unidades.every((u) => p.repasosCompletados[u.id]);
  const generadosVisibles = unidades.filter((u) => u.generada).length;
  const [params, setParams] = useSearchParams();
  const vista = params.get('vista') === 'temas' ? 'temas' : 'camino';

  useEffect(() => {
    if (vista !== 'camino') return;
    const t = window.setTimeout(() => document.getElementById('nodo-actual')?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 250);
    return () => window.clearTimeout(t);
  }, [vista]);

  const selector = (
    <div className="sticky top-0 z-20 bg-fondo/95 px-4 pt-3 pb-2 backdrop-blur">
      <div className="grid grid-cols-2 gap-1 rounded-2xl bg-superficie-2 p-1" role="tablist" aria-label="Forma de estudiar">
        {(
          [
            ['camino', '🧭 Camino guiado'],
            ['temas', '📚 Elegir tema'],
          ] as const
        ).map(([v, etiqueta]) => (
          <button
            key={v}
            role="tab"
            aria-selected={vista === v}
            onClick={() => {
              setParams(v === 'temas' ? { vista: 'temas' } : {}, { replace: true });
              window.scrollTo({ top: 0 });
            }}
            className={`rounded-xl py-2 text-sm font-black ${vista === v ? 'bg-superficie shadow' : 'text-suave'}`}
          >
            {etiqueta}
          </button>
        ))}
      </div>
    </div>
  );

  if (vista === 'temas') {
    return (
      <Marco lateral={<PanelLateral />}>
        {selector}
        <ElegirTema />
        {!bienvenidaVista && <Bienvenida />}
      </Marco>
    );
  }

  return (
    <Marco lateral={<PanelLateral />}>
      {selector}
      {vueltas > 0 && <p className="px-4 pt-3 text-center text-sm font-black text-violeta-500">🔄 Vuelta {vueltas + 1} del camino</p>}
      {unidades.map((u) => (
        <SeccionUnidad key={u.id} unidad={u} estados={estados.get(u.id) ?? []} alTocarNodo={(e) => setNodo({ e, u })} alVerGuia={() => setGuia(u)} />
      ))}

      {hayMas && (
        <div className="mx-4 my-6 rounded-3xl border-2 border-dashed border-borde p-5 text-center">
          <p className="text-3xl" aria-hidden>
            🔒
          </p>
          <p className="mt-1 font-black">Próximo módulo</p>
          <p className="text-sm font-semibold text-suave">
            Se genera automáticamente a partir del articulado del CPPBA y del Código Penal cuando completes el repaso anterior.
            {totalGenerados > 0 && ` Módulos dinámicos: ${generadosVisibles} de ${totalGenerados}.`}
          </p>
        </div>
      )}

      {todoCompleto && (
        <div className="mx-4 my-6 flex flex-col items-center gap-3 rounded-3xl bg-superficie p-6 text-center shadow-[0_5px_0_0_var(--borde)]">
          <Mascota animo="festejo" tam={110} />
          <p className="text-2xl font-black">¡Completaste todo el árbol curricular!</p>
          <p className="text-suave">Mantené el entrenamiento jurídico activo con práctica infinita o arrancá una nueva vuelta.</p>
          <Boton ancho variante="verde" onClick={() => navegar('/practica')}>
            Práctica rápida infinita ∞
          </Boton>
          <Boton ancho variante="neutro" onClick={reiniciar}>
            Reiniciar el camino (vuelta {vueltas + 2})
          </Boton>
        </div>
      )}

      <Hoja abierta={!!nodo} alCerrar={() => setNodo(null)} titulo={nodo?.e.nodo.titulo}>
        {nodo && <DetalleNodo e={nodo.e} unidad={nodo.u} alCerrar={() => setNodo(null)} />}
      </Hoja>
      <Hoja abierta={!!guia} alCerrar={() => setGuia(null)} titulo={guia ? `Guía · ${guia.titulo}` : undefined}>
        {guia && <GuiaUnidad unidad={guia} />}
      </Hoja>
      {!bienvenidaVista && <Bienvenida />}
    </Marco>
  );
}
