import { motion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import { lanzarConfeti } from '../lib/confeti';
import { mmss } from '../lib/fechas';
import { sonidos } from '../lib/sonido';
import type { ResultadoActividad } from '../store/progreso';
import { Boton } from './Boton';
import { Llama } from './Indicadores';
import { Mascota } from './Mascota';

interface Props {
  titulo: string;
  aciertos?: number;
  total?: number;
  segundos?: number;
  actividad: ResultadoActividad;
  extra?: ReactNode;
  alContinuar: () => void;
  textoBoton?: string;
  /** Si es false, no hay confeti (p. ej., un caso perdido). */
  celebrar?: boolean;
}

function Ficha({ etiqueta, valor, color }: { etiqueta: string; valor: string; color: string }) {
  return (
    <div className="w-28 overflow-hidden rounded-2xl border-2 text-center" style={{ borderColor: color }}>
      <p className="py-1 text-[11px] font-black tracking-wider text-white uppercase" style={{ background: color }}>
        {etiqueta}
      </p>
      <p className="py-2.5 text-xl font-black" style={{ color }}>
        {valor}
      </p>
    </div>
  );
}

/** Pantalla de cierre con celebración, XP, precisión y racha. */
export function PantallaResultado({ titulo, aciertos, total, segundos, actividad, extra, alContinuar, textoBoton = 'Continuar', celebrar = true }: Props) {
  const [verRacha, setVerRacha] = useState(false);
  const precision = total ? Math.round(((aciertos ?? 0) / total) * 100) : null;
  const perfecta = precision === 100;

  useEffect(() => {
    if (!celebrar) return;
    sonidos.victoria();
    lanzarConfeti(perfecta || actividad.metaCumplida);
  }, [celebrar, perfecta, actividad.metaCumplida]);

  if (verRacha) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-fondo p-6 text-center">
        <motion.div initial={{ scale: 0.3, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', damping: 10 }}>
          <Llama activa tam={120} />
        </motion.div>
        <motion.p className="text-7xl font-black text-naranja-500" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          {actividad.racha}
        </motion.p>
        <p className="text-2xl font-black">{actividad.racha === 1 ? '¡Empezaste tu racha!' : `¡${actividad.racha} días de racha!`}</p>
        <p className="max-w-sm text-suave">Volvé mañana para mantenerla encendida. La constancia es la mejor estrategia procesal. 🔥</p>
        <div className="w-full max-w-sm">
          <Boton ancho variante="naranja" onClick={alContinuar}>
            {textoBoton}
          </Boton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-fondo p-6 text-center">
      <Mascota animo={celebrar ? 'festejo' : 'pensando'} tam={150} />
      <h1 className={`text-3xl font-black ${celebrar ? 'text-oro-500' : 'text-azul-500'}`}>{titulo}</h1>
      {actividad.metaCumplida && (
        <p className="rounded-full bg-verde-100 px-4 py-1.5 font-black text-verde-700">🎯 ¡Cumpliste tu meta diaria de artículos!</p>
      )}
      <div className="flex w-full max-w-md justify-center gap-3">
        <Ficha etiqueta="XP" valor={`+${actividad.xp}`} color="#f5a800" />
        {precision !== null && <Ficha etiqueta="Precisión" valor={`${precision}%`} color={perfecta ? '#22b35e' : '#1f5fd6'} />}
        {segundos !== undefined && <Ficha etiqueta="Tiempo" valor={mmss(segundos)} color="#7c5cff" />}
      </div>
      {extra}
      <div className="w-full max-w-md">
        <Boton
          ancho
          variante="verde"
          onClick={() => {
            if (actividad.rachaExtendida) {
              sonidos.racha();
              setVerRacha(true);
            } else alContinuar();
          }}
        >
          {textoBoton}
        </Boton>
      </div>
    </div>
  );
}
