import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PreguntaEnContexto } from '../data/tipos';
import { mmss } from '../lib/fechas';
import { detener } from '../lib/voz';
import { useProgreso } from '../store/progreso';
import { Boton } from './Boton';
import { Hoja } from './Hoja';
import { AnilloProgreso, Corazones, useVidas } from './Indicadores';
import { Mascota } from './Mascota';
import { PreguntaInteractiva } from './preguntas/PreguntaInteractiva';

/** Cronómetro visual de la lección (objetivo: 3 a 5 minutos). */
export function useCronometro() {
  const inicio = useRef(Date.now());
  const [seg, setSeg] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setSeg(Math.floor((Date.now() - inicio.current) / 1000)), 1000);
    return () => window.clearInterval(id);
  }, []);
  return seg;
}

export function Cronometro({ segundos, objetivoMin }: { segundos: number; objetivoMin: number }) {
  const pasado = segundos > objetivoMin * 60;
  return (
    <div className="flex items-center gap-1.5" title={`Objetivo: ${objetivoMin} minutos`} aria-label={`Tiempo: ${mmss(segundos)} de ${objetivoMin} minutos`}>
      <AnilloProgreso valor={segundos / (objetivoMin * 60)} tam={30} grosor={4} color={pasado ? 'var(--color-naranja-500)' : 'var(--color-azul-400)'}>
        <span className="text-[9px]">⏱</span>
      </AnilloProgreso>
      <span className={`text-xs font-black tabular-nums ${pasado ? 'text-naranja-500' : 'text-suave'}`}>{mmss(segundos)}</span>
    </div>
  );
}

/** Encabezado de sesión: salir, barra de progreso, cronómetro y vidas. */
export function CabeceraSesion({
  progreso,
  vidas,
  derecha,
  alSalir,
}: {
  progreso: number;
  vidas?: number;
  derecha?: ReactNode;
  alSalir: () => void;
}) {
  return (
    <div className="safe-top sticky top-0 z-20 bg-fondo/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
        <button onClick={alSalir} aria-label="Salir" className="grid h-10 w-10 place-items-center rounded-full text-2xl text-suave hover:bg-superficie-2">
          ✕
        </button>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-borde" role="progressbar" aria-valuenow={Math.round(progreso * 100)} aria-valuemin={0} aria-valuemax={100}>
          <motion.div
            className="relative h-full rounded-full bg-verde-500"
            animate={{ width: `${Math.max(4, progreso * 100)}%` }}
            transition={{ type: 'spring', damping: 20, stiffness: 140 }}
          >
            <div className="absolute inset-x-2 top-1 h-1 rounded-full bg-white/35" />
          </motion.div>
        </div>
        {derecha}
        {vidas !== undefined && <Corazones cantidad={vidas} compacto />}
      </div>
    </div>
  );
}

export function ConfirmarSalida({ abierta, alCerrar, alSalir }: { abierta: boolean; alCerrar: () => void; alSalir: () => void }) {
  return (
    <Hoja abierta={abierta} alCerrar={alCerrar} etiqueta="Salir de la sesión">
      <div className="flex flex-col items-center gap-3 text-center">
        <Mascota animo="triste" tam={96} />
        <p className="text-xl font-black">¿Seguro que querés salir?</p>
        <p className="text-suave">Vas a perder el avance de esta sesión.</p>
        <Boton ancho variante="azul" onClick={alCerrar}>
          Seguir estudiando
        </Boton>
        <Boton ancho variante="fantasma" className="text-rojo-500!" onClick={alSalir}>
          Salir igual
        </Boton>
      </div>
    </Hoja>
  );
}

export function SinVidas({ abierta, alSeguir, alSalir }: { abierta: boolean; alSeguir: () => void; alSalir: () => void }) {
  const { cantidad, proxima } = useVidas();
  const navegar = useNavigate();
  return (
    <Hoja abierta={abierta} alCerrar={alSalir} etiqueta="Sin corazones">
      <div className="flex flex-col items-center gap-3 text-center">
        <Mascota animo="triste" tam={110} />
        <p className="text-2xl font-black">¡Te quedaste sin corazones!</p>
        <p className="text-suave">
          Tranqui: hasta los mejores litigantes pierden una audiencia. Recuperá un corazón practicando lo que ya viste o esperá a que se recargue.
        </p>
        {cantidad > 0 ? (
          <Boton ancho variante="verde" onClick={alSeguir}>
            ¡Se recargó un corazón! Seguir
          </Boton>
        ) : (
          <p className="font-black text-rojo-500">❤️ Próximo corazón en {mmss(proxima / 1000)}</p>
        )}
        <Boton ancho variante="azul" onClick={() => navegar('/practica?modo=corazones')}>
          Practicar para recuperar ❤️
        </Boton>
        <Boton ancho variante="fantasma" onClick={alSalir}>
          Volver al camino
        </Boton>
      </div>
    </Hoja>
  );
}

export interface ResultadoSesion {
  aciertos: number;
  total: number;
  segundos: number;
}

interface PropsSesion {
  preguntas: PreguntaEnContexto[];
  usaVidas?: boolean;
  reencolarErrores?: boolean;
  objetivoMin?: number;
  /** Progreso previo (p. ej., pasos de intro y lectura de la lección). */
  progresoInicial?: number;
  etiqueta?: (q: PreguntaEnContexto) => string | undefined;
  alTerminar: (r: ResultadoSesion) => void;
  alSalir: () => void;
  segundosIniciales?: number;
}

/** Motor de sesión de preguntas: progreso, vidas, reencolado de errores y estadísticas. */
export function SesionPreguntas({
  preguntas,
  usaVidas = true,
  reencolarErrores = true,
  objetivoMin,
  progresoInicial = 0,
  etiqueta,
  alTerminar,
  alSalir,
  segundosIniciales = 0,
}: PropsSesion) {
  const [cola, setCola] = useState(preguntas);
  const [indice, setIndice] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [reencoladas, setReencoladas] = useState<Set<string>>(new Set());
  const [sinVidas, setSinVidas] = useState(false);
  const [salir, setSalir] = useState(false);
  const registrar = useProgreso((s) => s.registrarRespuesta);
  const perderVida = useProgreso((s) => s.perderVida);
  const { cantidad } = useVidas();
  const seg = useCronometro();
  const segTotal = seg + segundosIniciales;
  const primerIntento = useRef(new Set<string>());

  const actual = cola[indice];

  const alResponder = useCallback(
    (ok: boolean) => {
      if (!actual) return;
      const id = actual.pregunta.id;
      registrar(id, ok);
      const primera = !primerIntento.current.has(id);
      primerIntento.current.add(id);
      if (ok && primera) setAciertos((a) => a + 1);
      if (!ok) {
        if (reencolarErrores && !reencoladas.has(id)) {
          setReencoladas((r) => new Set(r).add(id));
          setCola((c) => [...c, actual]);
        }
        if (usaVidas) {
          const restantes = perderVida();
          if (restantes <= 0) window.setTimeout(() => setSinVidas(true), 700);
        }
      }
    },
    [actual, registrar, reencolarErrores, reencoladas, usaVidas, perderVida],
  );

  const alContinuar = useCallback(() => {
    detener();
    if (usaVidas && sinVidas) return;
    if (indice + 1 >= cola.length) {
      alTerminar({ aciertos, total: preguntas.length, segundos: segTotal });
    } else {
      setIndice((i) => i + 1);
    }
  }, [indice, cola.length, alTerminar, aciertos, preguntas.length, segTotal, usaVidas, sinVidas]);

  const progreso = progresoInicial + (1 - progresoInicial) * (indice / Math.max(1, cola.length));

  return (
    <div className="flex min-h-dvh flex-col bg-fondo">
      <CabeceraSesion
        progreso={progreso}
        vidas={usaVidas ? cantidad : undefined}
        derecha={objetivoMin ? <Cronometro segundos={segTotal} objetivoMin={objetivoMin} /> : undefined}
        alSalir={() => setSalir(true)}
      />
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
        {actual && (
          <motion.div key={`${actual.pregunta.id}-${indice}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="flex flex-1 flex-col">
            <PreguntaInteractiva pregunta={actual.pregunta} alResponder={alResponder} alContinuar={alContinuar} etiquetaContexto={etiqueta?.(actual)} />
          </motion.div>
        )}
      </div>
      <ConfirmarSalida abierta={salir} alCerrar={() => setSalir(false)} alSalir={alSalir} />
      <SinVidas
        abierta={sinVidas}
        alSalir={alSalir}
        alSeguir={() => {
          setSinVidas(false);
          if (indice + 1 >= cola.length) alTerminar({ aciertos, total: preguntas.length, segundos: segTotal });
          else setIndice((i) => i + 1);
        }}
      />
    </div>
  );
}
