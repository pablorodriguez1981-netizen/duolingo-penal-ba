import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Boton } from '../components/Boton';
import { AnilloProgreso } from '../components/Indicadores';
import { Mascota } from '../components/Mascota';
import { PantallaResultado } from '../components/Resultado';
import { ConfirmarSalida } from '../components/Sesion';
import { PreguntaInteractiva } from '../components/preguntas/PreguntaInteractiva';
import { articulo, etiquetaArticulo } from '../data/codigos';
import { preguntasParaPracticar, unidadesVisibles } from '../data/curriculo';
import type { PreguntaEnContexto } from '../data/tipos';
import { mmss } from '../lib/fechas';
import { volverAtras } from '../lib/navegacion';
import { seleccionarParaRepaso } from '../lib/repaso';
import { sonidos } from '../lib/sonido';
import { detener } from '../lib/voz';
import { useProgreso, type ResultadoActividad } from '../store/progreso';

const DURACION = 120;

/** Modo Supervivencia: 2 minutos a contrarreloj con preguntas ya vistas. */
export function PantallaSupervivencia() {
  const navegar = useNavigate();
  const estado = useProgreso();
  const record = useProgreso((s) => s.supervivenciaRecord);
  const [fase, setFase] = useState<'portada' | 'juego' | 'fin'>('portada');
  const [restante, setRestante] = useState(DURACION);
  const [indice, setIndice] = useState(0);
  /** Cuenta las preguntas mostradas: cambia sólo al pasar a la siguiente. */
  const [turno, setTurno] = useState(0);
  const [correctas, setCorrectas] = useState(0);
  const [respondidas, setRespondidas] = useState(0);
  const [salir, setSalir] = useState(false);
  const [resultado, setResultado] = useState<(ResultadoActividad & { record: boolean }) | null>(null);
  const inicio = useRef(0);
  const terminado = useRef(false);
  /** Mientras se lee la explicación de un error, el reloj queda en pausa. */
  const pausaDesde = useRef<number | null>(null);

  const pool = useMemo(() => {
    const { unidades } = unidadesVisibles(estado);
    return preguntasParaPracticar(unidades, estado);
    // El pozo se arma al entrar.
  }, []);

  // Secuencia larga priorizando errores previos; si se agota, se vuelve a mezclar.
  const [cola, setCola] = useState<PreguntaEnContexto[]>([]);
  const empezar = () => {
    setCola(seleccionarParaRepaso(pool, estado.preguntas, pool.length));
    setIndice(0);
    setTurno(0);
    setCorrectas(0);
    setRespondidas(0);
    setRestante(DURACION);
    inicio.current = Date.now();
    terminado.current = false;
    pausaDesde.current = null;
    setFase('juego');
  };

  const terminar = useCallback(() => {
    if (terminado.current) return;
    terminado.current = true;
    detener();
    setResultado(useProgreso.getState().completarSupervivencia(correctas));
    setFase('fin');
  }, [correctas]);

  useEffect(() => {
    if (fase !== 'juego') return;
    const id = window.setInterval(() => {
      if (pausaDesde.current !== null) return;
      const r = Math.max(0, DURACION - Math.floor((Date.now() - inicio.current) / 1000));
      setRestante(r);
      if (r <= 10 && r > 0) sonidos.tic();
    }, 1000);
    return () => window.clearInterval(id);
  }, [fase]);

  useEffect(() => {
    if (fase === 'juego' && restante <= 0) terminar();
  }, [fase, restante, terminar]);

  const alResponder = useCallback(
    (ok: boolean) => {
      const q = cola[indice];
      if (!q) return;
      useProgreso.getState().registrarRespuesta(q.pregunta.id, ok);
      setRespondidas((n) => n + 1);
      if (ok) setCorrectas((n) => n + 1);
      else pausaDesde.current = Date.now();
    },
    [cola, indice],
  );

  const alContinuar = useCallback(() => {
    if (terminado.current) return;
    if (pausaDesde.current !== null) {
      inicio.current += Date.now() - pausaDesde.current;
      pausaDesde.current = null;
    }
    setTurno((t) => t + 1);
    if (indice + 1 >= cola.length) {
      // Vuelta nueva: se re-prioriza sin repetir de inmediato la última pregunta.
      setCola((c) => {
        const nueva = seleccionarParaRepaso(c, useProgreso.getState().preguntas, c.length);
        const ultima = c[c.length - 1];
        if (nueva.length > 1 && nueva[0] === ultima) nueva.push(nueva.shift()!);
        return nueva;
      });
      setIndice(0);
    } else setIndice((i) => i + 1);
  }, [indice, cola.length]);

  if (fase === 'fin' && resultado) {
    return (
      <PantallaResultado
        titulo={resultado.record ? '¡Nuevo récord! 🏅' : '¡Tiempo!'}
        aciertos={correctas}
        total={Math.max(respondidas, 1)}
        segundos={DURACION}
        actividad={resultado}
        extra={
          <p className="font-bold text-suave">
            {correctas} respuestas correctas · Récord: {Math.max(record, correctas)}
          </p>
        }
        textoBoton="Volver"
        alContinuar={() => volverAtras(navegar)}
      />
    );
  }

  if (fase === 'portada') {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-fondo p-6 text-center">
        <Mascota animo="sorpresa" tam={130} />
        <p className="text-5xl" aria-hidden>
          ⏱️
        </p>
        <h1 className="text-2xl font-black">Modo Supervivencia</h1>
        <p className="max-w-md text-suave">
          2 minutos a contrarreloj con preguntas al azar de artículos que ya viste, priorizando tus errores. Si fallás, el reloj se detiene mientras leés la explicación. Suma para tu racha diaria. ¡Sin corazones!
        </p>
        {record > 0 && <p className="font-black text-oro-500">🏅 Tu récord: {record} correctas</p>}
        <div className="w-full max-w-sm space-y-2">
          {pool.length > 0 ? (
            <Boton ancho variante="naranja" onClick={empezar}>
              ¡Arrancar!
            </Boton>
          ) : (
            <p className="rounded-2xl bg-superficie-2 p-3 font-bold text-suave">🔒 Completá al menos una lección del camino para desbloquearlo.</p>
          )}
          <Boton ancho variante="fantasma" onClick={() => volverAtras(navegar)}>
            Volver
          </Boton>
        </div>
      </div>
    );
  }

  const q = cola[indice];
  const urgente = restante <= 15;
  const a = q ? articulo(q.articuloId) : undefined;
  return (
    <div className="flex min-h-dvh flex-col bg-fondo">
      <div className="safe-top sticky top-0 z-20 bg-fondo/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <button onClick={() => setSalir(true)} aria-label="Salir" className="grid h-10 w-10 place-items-center rounded-full text-2xl text-suave hover:bg-superficie-2">
            ✕
          </button>
          <motion.div animate={urgente ? { scale: [1, 1.08, 1] } : {}} transition={{ duration: 0.6, repeat: Infinity }}>
            <AnilloProgreso valor={restante / DURACION} tam={52} grosor={6} color={urgente ? 'var(--color-rojo-500)' : 'var(--color-naranja-500)'}>
              <span className={`text-[13px] tabular-nums ${urgente ? 'text-rojo-500' : ''}`}>{mmss(restante)}</span>
            </AnilloProgreso>
          </motion.div>
          <div className="flex-1" />
          <span className="text-lg font-black text-verde-500">✔ {correctas}</span>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
        {q && (
          <motion.div key={turno} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="flex flex-1 flex-col">
            <PreguntaInteractiva
              pregunta={q.pregunta}
              alResponder={alResponder}
              alContinuar={alContinuar}
              rapido
              etiquetaContexto={a ? etiquetaArticulo(a) : undefined}
              avisoError="⏸️ El reloj se detiene mientras leés por qué fallaste."
            />
          </motion.div>
        )}
      </div>
      <ConfirmarSalida abierta={salir} alCerrar={() => setSalir(false)} alSalir={() => volverAtras(navegar)} />
    </div>
  );
}
