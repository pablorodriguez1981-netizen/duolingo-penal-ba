import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { diaLocal, mmss } from '../lib/fechas';
import { MAX_VIDAS, msParaProximaVida, rachaVigente, practicoHoy, useProgreso, vidasActuales } from '../store/progreso';

export function AnilloProgreso({
  valor,
  tam = 44,
  grosor = 5,
  color = 'var(--color-verde-500)',
  children,
}: {
  valor: number;
  tam?: number;
  grosor?: number;
  color?: string;
  children?: React.ReactNode;
}) {
  const r = (tam - grosor) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, valor));
  return (
    <div className="relative grid place-items-center" style={{ width: tam, height: tam }}>
      <svg width={tam} height={tam} className="-rotate-90" aria-hidden>
        <circle cx={tam / 2} cy={tam / 2} r={r} stroke="var(--borde)" strokeWidth={grosor} fill="none" />
        <circle
          cx={tam / 2}
          cy={tam / 2}
          r={r}
          stroke={color}
          strokeWidth={grosor}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          style={{ transition: 'stroke-dashoffset 400ms ease' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-xs font-black">{children}</div>
    </div>
  );
}

export function Llama({ activa, tam = 26 }: { activa: boolean; tam?: number }) {
  return (
    <motion.svg
      viewBox="0 0 24 32"
      width={tam}
      height={(tam * 32) / 24}
      aria-hidden
      animate={activa ? { scale: [1, 1.08, 1], rotate: [0, -3, 3, 0] } : {}}
      transition={{ duration: 1.6, repeat: Infinity }}
    >
      <path
        d="M12 1C13 7 20 10 20 19a8 8 0 0 1-16 0c0-4 2-6 3-8 1 3 2 4 3 4-1-5 0-10 2-14z"
        fill={activa ? '#ff8a1f' : '#c3cad8'}
      />
      <path d="M12 14c1 3 4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4 0 1 1 2 2 2-.5-2 0-4 0-6z" fill={activa ? '#ffd23f' : '#e3e7ef'} />
    </motion.svg>
  );
}

export function Corazones({ cantidad, compacto }: { cantidad: number; compacto?: boolean }) {
  if (compacto)
    return (
      <span className="flex items-center gap-1 font-black text-rojo-500">
        <span aria-hidden>❤️</span>
        {cantidad}
      </span>
    );
  return (
    <span className="flex items-center gap-0.5" aria-label={`${cantidad} de ${MAX_VIDAS} vidas`}>
      {Array.from({ length: MAX_VIDAS }, (_, i) => (
        <motion.span key={i} animate={i < cantidad ? { scale: 1 } : { scale: 0.85 }} className={i < cantidad ? '' : 'opacity-30 grayscale'} aria-hidden>
          ❤️
        </motion.span>
      ))}
    </span>
  );
}

/** Vidas con recarga en vivo. */
export function useVidas() {
  const vidas = useProgreso((s) => s.vidas);
  const sincronizar = useProgreso((s) => s.sincronizarVidas);
  const [, tic] = useState(0);
  useEffect(() => {
    sincronizar();
    const id = window.setInterval(() => {
      sincronizar();
      tic((x) => x + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [sincronizar]);
  const actual = vidasActuales(vidas);
  return { cantidad: actual.cantidad, proxima: msParaProximaVida(actual) };
}

/** Barra de estado: racha, meta diaria, XP y vidas. */
export function BarraEstado() {
  const racha = useProgreso((s) => s.racha);
  const hoy = useProgreso((s) => s.hoy);
  const xp = useProgreso((s) => s.xp);
  const meta = useProgreso((s) => s.ajustes.metaDiaria);
  const { cantidad, proxima } = useVidas();
  const n = rachaVigente(racha);
  const activa = practicoHoy(racha);
  const articulosHoy = hoy.dia === diaLocal() ? hoy.articulos.length : 0;
  return (
    <div className="flex items-center justify-between gap-2 text-[15px]">
      <Link to="/perfil" className="flex items-center gap-1 rounded-xl px-2 py-1 font-black hover:bg-superficie-2" aria-label={`Racha de ${n} días`}>
        <Llama activa={activa} />
        <span className={activa ? 'text-naranja-500' : 'text-suave'}>{n}</span>
      </Link>
      <Link to="/perfil" className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-superficie-2" aria-label={`Meta diaria: ${articulosHoy} de ${meta} artículos`}>
        <AnilloProgreso valor={articulosHoy / meta} tam={34} grosor={4}>
          <span className="text-[10px]">
            {Math.min(articulosHoy, meta)}/{meta}
          </span>
        </AnilloProgreso>
        <span className="hidden text-xs leading-tight font-bold text-suave sm:block">
          artículos
          <br />
          hoy
        </span>
      </Link>
      <span className="flex items-center gap-1 px-2 py-1 font-black text-oro-500" aria-label={`${xp} puntos de experiencia`}>
        <span aria-hidden>⚡</span>
        {xp}
      </span>
      <Link
        to="/practica?modo=corazones"
        className="flex items-center gap-1 rounded-xl px-2 py-1 hover:bg-superficie-2"
        title={cantidad < MAX_VIDAS ? `Próximo corazón en ${mmss(proxima / 1000)}` : 'Vidas completas'}
      >
        <Corazones cantidad={cantidad} compacto />
        {cantidad < MAX_VIDAS && <span className="text-xs font-bold text-suave tabular-nums">{mmss(proxima / 1000)}</span>}
      </Link>
    </div>
  );
}
