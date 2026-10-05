import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Pregunta, PreguntaCompletar, PreguntaOpcion, PreguntaOrdenar, PreguntaVF } from '../../data/tipos';
import { mezclar } from '../../lib/azar';
import { sonidos, vibrar } from '../../lib/sonido';
import { Boton } from '../Boton';
import { TextoGlosario } from '../Glosario';
import { Mascota } from '../Mascota';
import { BotonEscuchar } from '../TarjetaArticulo';
import { locuciones } from '../../lib/locucion';

const FRASES_OK = ['¡Excelente!', '¡Muy bien!', '¡Impecable!', '¡Eso es!', '¡Bien ahí!', '¡Brillante, colega!'];
const FRASES_MAL = ['¡Casi! Así se aprende.', 'Ojo con este detalle.', 'Los mejores abogados también se equivocan.', 'Tranqui: este error ya no se repite.'];

const azarFrase = (l: string[]) => l[Math.floor(Math.random() * l.length)];

const TITULO_TIPO: Record<Pregunta['tipo'], string> = {
  opcion: 'Elegí la respuesta correcta',
  vf: '¿Verdadero o falso?',
  ordenar: 'Ordená los pasos',
  completar: 'Completá el espacio',
};

interface Props {
  pregunta: Pregunta;
  /** Se llama al comprobar (para vidas/estadísticas). */
  alResponder: (correcta: boolean) => void;
  /** Se llama al tocar "Continuar" después del feedback. */
  alContinuar: () => void;
  /** Modo supervivencia: feedback breve y avance automático. */
  rapido?: boolean;
  etiquetaContexto?: string;
  /** Aviso extra cuando la respuesta es incorrecta (p. ej., «vuelve al final»). */
  avisoError?: string;
}

type Respuesta = { tipo: 'indice'; valor: number } | { tipo: 'bool'; valor: boolean } | { tipo: 'orden'; valor: number[] } | null;

function respuestaCorrectaTexto(p: Pregunta): string {
  switch (p.tipo) {
    case 'opcion':
    case 'completar':
      return p.opciones[p.correcta];
    case 'vf':
      return p.correcta ? 'Verdadero' : 'Falso';
    case 'ordenar':
      return p.pasos.map((x, i) => `${i + 1}. ${x}`).join('  ');
  }
}

export function PreguntaInteractiva({ pregunta, alResponder, alContinuar, rapido, etiquetaContexto, avisoError }: Props) {
  const [respuesta, setRespuesta] = useState<Respuesta>(null);
  const [resultado, setResultado] = useState<boolean | null>(null);
  const frase = useMemo(() => ({ ok: azarFrase(FRASES_OK), mal: azarFrase(FRASES_MAL) }), []);

  // Orden mezclado (estable para esta pregunta)
  const ordenOpciones = useMemo(() => {
    if (pregunta.tipo === 'opcion' || pregunta.tipo === 'completar') return mezclar(pregunta.opciones.map((_, i) => i));
    if (pregunta.tipo === 'ordenar') {
      let m = mezclar(pregunta.pasos.map((_, i) => i));
      if (m.every((v, i) => v === i)) m = [...m.slice(1), m[0]];
      return m;
    }
    return [];
  }, [pregunta]);

  const lista = respuesta !== null;
  const completa =
    respuesta?.tipo === 'orden' ? pregunta.tipo === 'ordenar' && respuesta.valor.length === pregunta.pasos.length : lista;

  const comprobar = useCallback(() => {
    if (!completa || resultado !== null || !respuesta) return;
    let ok = false;
    if ((pregunta.tipo === 'opcion' || pregunta.tipo === 'completar') && respuesta.tipo === 'indice') ok = respuesta.valor === pregunta.correcta;
    if (pregunta.tipo === 'vf' && respuesta.tipo === 'bool') ok = respuesta.valor === pregunta.correcta;
    if (pregunta.tipo === 'ordenar' && respuesta.tipo === 'orden') ok = respuesta.valor.every((v, i) => v === i);
    setResultado(ok);
    if (ok) sonidos.acierto();
    else {
      sonidos.error();
      vibrar([60, 40, 60]);
    }
    alResponder(ok);
  }, [completa, resultado, respuesta, pregunta, alResponder]);

  // Modo rápido: avanza solo después de un instante.
  useEffect(() => {
    if (!rapido || resultado === null) return;
    const t = window.setTimeout(alContinuar, resultado ? 650 : 1600);
    return () => window.clearTimeout(t);
  }, [rapido, resultado, alContinuar]);

  // Atajos de teclado (escritorio): 1-4 para elegir, Enter para comprobar/continuar.
  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'Enter') {
        if (resultado === null) comprobar();
        else alContinuar();
        return;
      }
      const n = Number(e.key);
      if (resultado !== null || !n) return;
      if ((pregunta.tipo === 'opcion' || pregunta.tipo === 'completar') && n <= ordenOpciones.length)
        setRespuesta({ tipo: 'indice', valor: ordenOpciones[n - 1] });
      if (pregunta.tipo === 'vf' && n <= 2) setRespuesta({ tipo: 'bool', valor: n === 1 });
    };
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, [comprobar, alContinuar, resultado, pregunta, ordenOpciones]);

  const bloqueada = resultado !== null;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 px-4 pt-2 pb-40 sm:px-0">
        <p className="mb-1 text-xs font-black tracking-widest text-suave uppercase">
          {TITULO_TIPO[pregunta.tipo]}
          {etiquetaContexto ? ` · ${etiquetaContexto}` : ''}
        </p>
        <div className="mb-5 flex items-start gap-3">
          <h2 className="flex-1 text-xl leading-snug font-extrabold sm:text-2xl">
            <TextoGlosario texto={pregunta.enunciado} />
          </h2>
          <BotonEscuchar
            id={`preg-${pregunta.id}`}
            etiqueta="Oír"
            texto={locuciones.pregunta(pregunta).texto}
          />
        </div>

        {pregunta.tipo === 'opcion' && (
          <OpcionMultiple p={pregunta} orden={ordenOpciones} respuesta={respuesta} setRespuesta={setRespuesta} resultado={resultado} bloqueada={bloqueada} />
        )}
        {pregunta.tipo === 'vf' && <VerdaderoFalso p={pregunta} respuesta={respuesta} setRespuesta={setRespuesta} resultado={resultado} bloqueada={bloqueada} />}
        {pregunta.tipo === 'completar' && (
          <Completar p={pregunta} orden={ordenOpciones} respuesta={respuesta} setRespuesta={setRespuesta} resultado={resultado} bloqueada={bloqueada} />
        )}
        {pregunta.tipo === 'ordenar' && (
          <Ordenar p={pregunta} orden={ordenOpciones} respuesta={respuesta} setRespuesta={setRespuesta} resultado={resultado} bloqueada={bloqueada} />
        )}
      </div>

      {/* Barra inferior: comprobar / feedback */}
      <div className="fixed inset-x-0 bottom-0 z-30">
        <AnimatePresence mode="wait">
          {resultado === null ? (
            <motion.div
              key="comprobar"
              className="safe-bottom border-t-2 border-borde bg-fondo/95 px-4 py-4 backdrop-blur"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mx-auto max-w-2xl">
                <Boton ancho variante="verde" disabled={!completa} onClick={comprobar}>
                  Comprobar
                </Boton>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="feedback"
              role="status"
              aria-live="polite"
              className={`safe-bottom border-t-2 px-4 pt-4 pb-4 ${
                resultado ? 'border-verde-500/40 bg-verde-50 dark:bg-[#123222]' : 'border-rojo-500/40 bg-rojo-50 dark:bg-[#3a181b]'
              }`}
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            >
              <div className="mx-auto flex max-w-2xl flex-col gap-3">
                <div className="flex items-start gap-3">
                  <Mascota animo={resultado ? 'festejo' : 'triste'} tam={58} quieta={rapido} className="shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className={`text-xl font-black ${resultado ? 'text-verde-600 dark:text-verde-500' : 'text-rojo-600 dark:text-rojo-500'}`}>
                      {resultado ? frase.ok : frase.mal}
                    </p>
                    {!resultado && (
                      <p className="mt-0.5 text-sm font-bold text-rojo-700 dark:text-rojo-100">
                        Respuesta correcta: <span className="font-extrabold">{respuestaCorrectaTexto(pregunta)}</span>
                      </p>
                    )}
                    {!rapido && (
                      <p className={`mt-1 max-h-32 overflow-y-auto text-[15px] leading-snug ${resultado ? 'text-verde-700 dark:text-verde-100' : 'text-rojo-700 dark:text-rojo-100'}`}>
                        <TextoGlosario texto={pregunta.explicacion} />
                      </p>
                    )}
                    {!resultado && avisoError && <p className="mt-1 text-sm font-black text-rojo-700 dark:text-rojo-100">{avisoError}</p>}
                  </div>
                </div>
                {!rapido && (
                  <Boton ancho variante={resultado ? 'verde' : 'rojo'} onClick={alContinuar} autoFocus>
                    Continuar
                  </Boton>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface PropsTipo<P> {
  p: P;
  respuesta: Respuesta;
  setRespuesta: (r: Respuesta) => void;
  resultado: boolean | null;
  bloqueada: boolean;
  orden?: number[];
}

function estadoOpcion(indice: number, correcta: number, elegida: number | null, resultado: boolean | null) {
  if (resultado === null) return undefined;
  if (indice === correcta) return 'ok';
  if (indice === elegida) return 'mal';
  return undefined;
}

function OpcionMultiple({ p, orden = [], respuesta, setRespuesta, resultado, bloqueada }: PropsTipo<PreguntaOpcion>) {
  const elegida = respuesta?.tipo === 'indice' ? respuesta.valor : null;
  return (
    <div className="grid gap-3" role="radiogroup">
      {orden.map((i, pos) => (
        <button
          key={i}
          role="radio"
          aria-checked={elegida === i}
          disabled={bloqueada}
          data-sel={elegida === i}
          data-estado={estadoOpcion(i, p.correcta, elegida, resultado)}
          onClick={() => {
            sonidos.toque();
            setRespuesta({ tipo: 'indice', valor: i });
          }}
          className="opcion flex items-center gap-3 px-4 py-3.5 text-left text-[16px] leading-snug font-semibold"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 border-borde text-sm font-black text-suave">{pos + 1}</span>
          <span>{p.opciones[i]}</span>
        </button>
      ))}
    </div>
  );
}

function VerdaderoFalso({ p, respuesta, setRespuesta, resultado, bloqueada }: PropsTipo<PreguntaVF>) {
  const elegida = respuesta?.tipo === 'bool' ? respuesta.valor : null;
  const estado = (v: boolean) => (resultado === null ? undefined : v === p.correcta ? 'ok' : v === elegida ? 'mal' : undefined);
  return (
    <div className="grid grid-cols-2 gap-3" role="radiogroup">
      {[true, false].map((v) => (
        <button
          key={String(v)}
          role="radio"
          aria-checked={elegida === v}
          disabled={bloqueada}
          data-sel={elegida === v}
          data-estado={estado(v)}
          onClick={() => {
            sonidos.toque();
            setRespuesta({ tipo: 'bool', valor: v });
          }}
          className="opcion flex flex-col items-center gap-2 px-4 py-6 text-lg font-black"
        >
          <span className="text-4xl" aria-hidden>
            {v ? '✅' : '❌'}
          </span>
          {v ? 'Verdadero' : 'Falso'}
        </button>
      ))}
    </div>
  );
}

function Completar({ p, orden = [], respuesta, setRespuesta, resultado, bloqueada }: PropsTipo<PreguntaCompletar>) {
  const elegida = respuesta?.tipo === 'indice' ? respuesta.valor : null;
  const [antes, despues] = p.frase.split('___');
  const colorHueco =
    resultado === null ? 'border-azul-400 text-azul-600 dark:text-azul-100' : resultado ? 'border-verde-500 text-verde-700' : 'border-rojo-500 text-rojo-600';
  return (
    <div>
      <div className="mb-6 rounded-2xl border-2 border-borde bg-superficie p-4 font-serif text-[17px] leading-loose">
        <TextoGlosario texto={antes} />
        <span className={`mx-1 inline-block min-w-24 rounded-lg border-b-4 px-2 text-center font-sans font-extrabold ${colorHueco}`}>
          {elegida !== null ? p.opciones[elegida] : ' '}
        </span>
        {despues && <TextoGlosario texto={despues} />}
      </div>
      <div className="flex flex-wrap justify-center gap-2.5">
        {orden.map((i) => (
          <button
            key={i}
            disabled={bloqueada}
            data-sel={elegida === i}
            data-estado={estadoOpcion(i, p.correcta, elegida, resultado)}
            onClick={() => {
              sonidos.toque();
              setRespuesta(elegida === i ? null : { tipo: 'indice', valor: i });
            }}
            className="opcion px-4 py-2.5 text-[15.5px] font-bold"
          >
            {p.opciones[i]}
          </button>
        ))}
      </div>
    </div>
  );
}

function Ordenar({ p, orden = [], respuesta, setRespuesta, resultado, bloqueada }: PropsTipo<PreguntaOrdenar>) {
  const elegidos = respuesta?.tipo === 'orden' ? respuesta.valor : [];
  const disponibles = orden.filter((i) => !elegidos.includes(i));
  const poner = (i: number) => {
    sonidos.toque();
    setRespuesta({ tipo: 'orden', valor: [...elegidos, i] });
  };
  const sacar = (i: number) => {
    sonidos.toque();
    const resto = elegidos.filter((x) => x !== i);
    setRespuesta(resto.length ? { tipo: 'orden', valor: resto } : null);
  };
  return (
    <div>
      <ol className="mb-5 min-h-28 space-y-2 rounded-2xl border-2 border-dashed border-borde p-2" aria-label="Tu orden">
        {elegidos.length === 0 && <li className="p-3 text-center text-sm font-semibold text-suave">Tocá los pasos en el orden correcto</li>}
        <AnimatePresence initial={false}>
          {elegidos.map((i, pos) => (
            <motion.li key={i} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <button
                disabled={bloqueada}
                onClick={() => sacar(i)}
                data-estado={resultado === null ? undefined : i === pos ? 'ok' : 'mal'}
                className="opcion flex w-full items-center gap-3 px-3 py-2.5 text-left text-[15px] font-semibold"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-azul-500 text-sm font-black text-white">{pos + 1}</span>
                {p.pasos[i]}
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
      <div className="space-y-2">
        {disponibles.map((i) => (
          <motion.button
            layout
            key={i}
            disabled={bloqueada}
            onClick={() => poner(i)}
            className="opcion block w-full px-3 py-2.5 text-left text-[15px] font-semibold"
          >
            {p.pasos[i]}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
