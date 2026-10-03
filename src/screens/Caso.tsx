import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Boton } from '../components/Boton';
import { TextoGlosario } from '../components/Glosario';
import { Hoja } from '../components/Hoja';
import { Mascota } from '../components/Mascota';
import { PantallaResultado } from '../components/Resultado';
import { CabeceraSesion, ConfirmarSalida } from '../components/Sesion';
import { BotonEscuchar, TarjetaArticulo } from '../components/TarjetaArticulo';
import { articulo, idDe } from '../data/codigos';
import { unidadPorId } from '../data/curriculo';
import type { Articulo } from '../data/tipos';
import { mezclar } from '../lib/azar';
import { sonidos } from '../lib/sonido';
import { detener } from '../lib/voz';
import { useProgreso, type ResultadoActividad } from '../store/progreso';

/** "Art. 148 CPPBA" / "Arts. 40 y 41 CP" → artículos del registro, si existen. */
function articulosDeNorma(norma: string): Articulo[] {
  const codigo = /\bCP\b/.test(norma) && !/CPPBA/.test(norma) ? 'cp' : /CPPBA/.test(norma) ? 'cppba' : null;
  if (!codigo) return [];
  const nums = norma.replace(/inc\.\s*\d+/g, '').match(/\d+(?:\s(?:bis|ter|quater))?/g) ?? [];
  return nums.map((n) => articulo(idDe(codigo, n))).filter((a): a is Articulo => !!a);
}

const VALORACION = {
  2: { texto: 'Estrategia óptima', color: 'bg-verde-500', borde: 'border-verde-500', icono: '🏆' },
  1: { texto: 'Viable, pero mejorable', color: 'bg-oro-500', borde: 'border-oro-500', icono: '🤔' },
  0: { texto: 'Estrategia equivocada', color: 'bg-rojo-500', borde: 'border-rojo-500', icono: '⚠️' },
} as const;

/** Simulador de audiencias y casos prácticos (cierre de cada unidad). */
export function PantallaCaso() {
  const { unidadId = '' } = useParams();
  const navegar = useNavigate();
  const unidad = unidadPorId(unidadId);
  const caso = unidad?.caso;
  const completarCaso = useProgreso((s) => s.completarCaso);
  const [etapa, setEtapa] = useState(-1);
  const [elegida, setElegida] = useState<number | null>(null);
  const [puntaje, setPuntaje] = useState(0);
  const [salir, setSalir] = useState(false);
  const [norma, setNorma] = useState<Articulo | null>(null);
  const [fin, setFin] = useState<ResultadoActividad | null>(null);

  const ordenes = useMemo(() => caso?.etapas.map((e) => mezclar(e.opciones.map((_, i) => i))) ?? [], [caso]);

  if (!unidad || !caso) return <Navigate to="/" replace />;
  const maximo = caso.etapas.length * 2;
  const volver = () => {
    detener();
    navegar('/');
  };

  if (fin) {
    const pct = puntaje / maximo;
    const veredicto = pct >= 0.85 ? '¡Caso ganado! ⚖️' : pct >= 0.5 ? 'Resultado parcial' : 'Caso perdido… ¡a repasar!';
    return (
      <PantallaResultado
        titulo={veredicto}
        actividad={fin}
        celebrar={pct >= 0.5}
        extra={
          <div className="w-full max-w-md space-y-3 text-left">
            <p className="text-center text-lg font-black">
              Puntaje: {puntaje} / {maximo}
            </p>
            <div className="rounded-2xl border-2 border-borde bg-superficie p-4">
              <p className="font-black">{caso.cierre.titulo}</p>
              <p className="mt-1 text-[15px] text-suave">
                <TextoGlosario texto={caso.cierre.texto} />
              </p>
            </div>
          </div>
        }
        alContinuar={volver}
      />
    );
  }

  if (etapa < 0) {
    return (
      <div className="min-h-dvh bg-fondo">
        <CabeceraSesion progreso={0.05} alSalir={volver} />
        <div className="mx-auto max-w-2xl space-y-4 px-4 pt-2 pb-32">
          <p className="text-xs font-black tracking-widest text-violeta-500 uppercase">🏛️ Simulador de audiencia</p>
          <h1 className="text-3xl font-black">{caso.titulo}</h1>
          <div className="flex flex-wrap gap-2 text-sm font-extrabold">
            <span className="rounded-full bg-azul-100 px-3 py-1 text-azul-600 dark:bg-azul-700/40 dark:text-azul-100">🎭 Tu rol: {caso.rol}</span>
            <span className="rounded-full bg-superficie-2 px-3 py-1 text-suave">📍 {caso.sede}</span>
          </div>
          <div className="flex items-start gap-3 rounded-3xl border-2 border-borde bg-superficie p-4">
            <Mascota animo="pensando" tam={80} className="shrink-0" />
            <div className="space-y-2 text-[16.5px] leading-relaxed">
              {caso.hechos.map((h, i) => (
                <p key={i}>
                  <TextoGlosario texto={h} />
                </p>
              ))}
            </div>
          </div>
          <BotonEscuchar id={`caso-${caso.id}`} etiqueta="Escuchar los hechos" texto={caso.hechos.join(' ')} />
          <p className="text-sm font-semibold text-suave">
            Vas a enfrentar {caso.etapas.length} decisiones. Cada una se valora como óptima, viable o equivocada según el CPPBA y el Código Penal. Caso ficticio con fines didácticos.
          </p>
        </div>
        <div className="safe-bottom fixed inset-x-0 bottom-0 border-t-2 border-borde bg-fondo/95 px-4 py-4 backdrop-blur">
          <div className="mx-auto max-w-2xl">
            <Boton ancho variante="azul" onClick={() => setEtapa(0)}>
              Entrar a la audiencia
            </Boton>
          </div>
        </div>
      </div>
    );
  }

  const e = caso.etapas[etapa];
  const opcionElegida = elegida !== null ? e.opciones[elegida] : null;
  const v = opcionElegida ? VALORACION[opcionElegida.puntaje] : null;

  const siguiente = () => {
    detener();
    setElegida(null);
    if (etapa + 1 >= caso.etapas.length) setFin(completarCaso(unidad.id, puntaje, maximo));
    else setEtapa(etapa + 1);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-dvh bg-fondo">
      <CabeceraSesion
        progreso={(etapa + (elegida !== null ? 1 : 0)) / caso.etapas.length}
        alSalir={() => setSalir(true)}
        derecha={<span className="text-sm font-black text-oro-500">⚖️ {puntaje}</span>}
      />
      <div className="mx-auto max-w-2xl space-y-4 px-4 pt-2 pb-48">
        <p className="text-xs font-black tracking-widest text-violeta-500 uppercase">
          Decisión {etapa + 1} de {caso.etapas.length} · {e.momento}
        </p>
        <div className="rounded-3xl border-2 border-borde bg-superficie p-4 text-[16.5px] leading-relaxed">
          <TextoGlosario texto={e.situacion} />
        </div>
        <h2 className="text-xl font-black">{e.pregunta}</h2>
        <div className="grid gap-3">
          {ordenes[etapa].map((i) => {
            const o = e.opciones[i];
            const val = elegida !== null ? VALORACION[o.puntaje] : null;
            return (
              <button
                key={i}
                disabled={elegida !== null}
                data-sel={elegida === i}
                onClick={() => {
                  setElegida(i);
                  setPuntaje((p) => p + o.puntaje);
                  if (o.puntaje === 2) sonidos.acierto();
                  else if (o.puntaje === 0) sonidos.error();
                  else sonidos.toque();
                }}
                className={`opcion px-4 py-3.5 text-left text-[15.5px] leading-snug font-semibold ${elegida !== null && val ? `${val.borde}` : ''} ${
                  elegida !== null && elegida !== i ? 'opacity-60' : ''
                }`}
              >
                {elegida !== null && val && (
                  <span className={`mr-2 inline-block rounded-md px-1.5 py-0.5 text-[11px] font-black text-white uppercase ${val.color}`}>{val.icono}</span>
                )}
                {o.texto}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {opcionElegida && v && (
          <motion.div
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t-2 border-borde bg-superficie px-4 py-4 shadow-2xl"
          >
            <div className="mx-auto max-w-2xl space-y-3">
              <div className="flex items-start gap-3">
                <Mascota animo={opcionElegida.puntaje === 2 ? 'festejo' : opcionElegida.puntaje === 1 ? 'pensando' : 'triste'} tam={56} className="shrink-0" />
                <div className="min-w-0">
                  <p className={`inline-block rounded-lg px-2 py-0.5 text-sm font-black text-white ${v.color}`}>
                    {v.icono} {v.texto} (+{opcionElegida.puntaje})
                  </p>
                  <p className="mt-1 max-h-32 overflow-y-auto text-[15px] leading-snug">
                    <TextoGlosario texto={opcionElegida.devolucion} />
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {e.normas.map((n) => {
                  const arts = articulosDeNorma(n);
                  return arts.length ? (
                    arts.map((a) => (
                      <button key={`${n}-${a.id}`} onClick={() => setNorma(a)} className="rounded-full bg-azul-100 px-3 py-1 text-xs font-black text-azul-600 dark:bg-azul-700/40 dark:text-azul-100">
                        📜 Art. {a.numero} {a.codigo === 'CP' ? 'CP' : 'CPPBA'}
                      </button>
                    ))
                  ) : (
                    <span key={n} className="rounded-full bg-superficie-2 px-3 py-1 text-xs font-black text-suave">
                      📜 {n}
                    </span>
                  );
                })}
              </div>
              <Boton ancho variante={opcionElegida.puntaje === 2 ? 'verde' : opcionElegida.puntaje === 1 ? 'naranja' : 'rojo'} onClick={siguiente}>
                {etapa + 1 >= caso.etapas.length ? 'Ver el resultado' : 'Siguiente decisión'}
              </Boton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Hoja abierta={!!norma} alCerrar={() => setNorma(null)} etiqueta="Norma aplicable">
        {norma && <TarjetaArticulo articulo={norma} compacta />}
      </Hoja>
      <ConfirmarSalida abierta={salir} alCerrar={() => setSalir(false)} alSalir={volver} />
    </div>
  );
}
