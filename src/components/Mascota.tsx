import { motion } from 'framer-motion';

export type Animo = 'feliz' | 'festejo' | 'pensando' | 'triste' | 'sorpresa';

interface Props {
  animo?: Animo;
  tam?: number;
  className?: string;
  /** Desactiva el balanceo (por ejemplo, en listas). */
  quieta?: boolean;
}

/**
 * Carpi: un carpincho con toga de abogado/a. Ilustración vectorial propia,
 * con expresiones para dar feedback emocional.
 */
export function Mascota({ animo = 'feliz', tam = 120, className, quieta }: Props) {
  const ojos = (() => {
    switch (animo) {
      case 'festejo':
        return (
          <g stroke="#2b1d12" strokeWidth="5" strokeLinecap="round" fill="none">
            <path d="M60 84 q12 -12 24 0" />
            <path d="M116 84 q12 -12 24 0" />
          </g>
        );
      case 'triste':
        return (
          <g>
            <circle cx="72" cy="86" r="12" fill="#fff" />
            <circle cx="128" cy="86" r="12" fill="#fff" />
            <circle cx="72" cy="90" r="6.5" fill="#2b1d12" />
            <circle cx="128" cy="90" r="6.5" fill="#2b1d12" />
            <path d="M58 70 l24 -6" stroke="#5a3a22" strokeWidth="4" strokeLinecap="round" />
            <path d="M142 70 l-24 -6" stroke="#5a3a22" strokeWidth="4" strokeLinecap="round" />
            <path d="M138 100 q4 10 0 14 q-6 -2 0 -14z" fill="#7cc4ff" />
          </g>
        );
      case 'pensando':
        return (
          <g>
            <circle cx="72" cy="84" r="12" fill="#fff" />
            <circle cx="128" cy="84" r="12" fill="#fff" />
            <circle cx="76" cy="79" r="6.5" fill="#2b1d12" />
            <circle cx="132" cy="79" r="6.5" fill="#2b1d12" />
            <circle cx="78" cy="77" r="2" fill="#fff" />
            <circle cx="134" cy="77" r="2" fill="#fff" />
            <path d="M116 64 q12 -8 24 -2" stroke="#5a3a22" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        );
      case 'sorpresa':
        return (
          <g>
            <circle cx="72" cy="84" r="14" fill="#fff" />
            <circle cx="128" cy="84" r="14" fill="#fff" />
            <circle cx="72" cy="84" r="6" fill="#2b1d12" />
            <circle cx="128" cy="84" r="6" fill="#2b1d12" />
          </g>
        );
      default:
        return (
          <g>
            <circle cx="72" cy="84" r="12" fill="#fff" />
            <circle cx="128" cy="84" r="12" fill="#fff" />
            <circle cx="73" cy="86" r="7" fill="#2b1d12" />
            <circle cx="129" cy="86" r="7" fill="#2b1d12" />
            <circle cx="75.5" cy="83" r="2.4" fill="#fff" />
            <circle cx="131.5" cy="83" r="2.4" fill="#fff" />
          </g>
        );
    }
  })();

  const boca = (() => {
    switch (animo) {
      case 'festejo':
        return (
          <g>
            <path d="M84 124 q16 20 32 0 z" fill="#7a2e2e" />
            <path d="M92 130 q8 6 16 0 q-8 -4 -16 0z" fill="#ff8fa3" />
          </g>
        );
      case 'triste':
        return <path d="M88 132 q12 -9 24 0" stroke="#4a2c18" strokeWidth="4" strokeLinecap="round" fill="none" />;
      case 'pensando':
        return <path d="M90 128 q6 -3 10 0 t10 0" stroke="#4a2c18" strokeWidth="4" strokeLinecap="round" fill="none" />;
      case 'sorpresa':
        return <ellipse cx="100" cy="130" rx="7" ry="9" fill="#7a2e2e" />;
      default:
        return <path d="M86 124 q14 14 28 0" stroke="#4a2c18" strokeWidth="4" strokeLinecap="round" fill="none" />;
    }
  })();

  const cuerpo = (
    <svg viewBox="0 0 200 210" width={tam} height={(tam * 210) / 200} role="img" aria-label={`Carpi, la mascota (${animo})`}>
      {/* Toga */}
      <path d="M38 210 q-2 -52 26 -70 h72 q28 18 26 70z" fill="#1f2638" />
      <path d="M64 140 l36 46 l36 -46" fill="#2c3550" />
      {/* Golilla (cuello blanco de la toga) */}
      <path d="M84 146 h32 l-8 22 h-16z" fill="#ffffff" />
      <path d="M100 150 v16" stroke="#d7dce8" strokeWidth="2" />
      {/* Medalla */}
      <circle cx="100" cy="186" r="9" fill="#ffc53d" stroke="#d69200" strokeWidth="2" />
      <path d="M96 186 l3 3 l6 -6" stroke="#8a5b00" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Orejas */}
      <ellipse cx="54" cy="40" rx="11" ry="9" fill="#8a5a33" />
      <ellipse cx="146" cy="40" rx="11" ry="9" fill="#8a5a33" />
      <ellipse cx="55" cy="41" rx="5" ry="4" fill="#d99a8a" />
      <ellipse cx="145" cy="41" rx="5" ry="4" fill="#d99a8a" />
      {/* Cabeza */}
      <rect x="30" y="32" width="140" height="126" rx="46" fill="#b07a4a" />
      <path d="M40 70 q60 -40 120 0" fill="#a06c3f" opacity="0.5" />
      {/* Hocico */}
      <ellipse cx="100" cy="120" rx="56" ry="37" fill="#c99566" />
      {/* Nariz */}
      <rect x="74" y="97" width="52" height="19" rx="9.5" fill="#4a2c18" />
      <ellipse cx="92" cy="107" rx="3.5" ry="4" fill="#2b1a0e" />
      <ellipse cx="108" cy="107" rx="3.5" ry="4" fill="#2b1a0e" />
      {/* Mejillas */}
      <ellipse cx="50" cy="112" rx="11" ry="7" fill="#ff8f8f" opacity="0.45" />
      <ellipse cx="150" cy="112" rx="11" ry="7" fill="#ff8f8f" opacity="0.45" />
      {ojos}
      {boca}
    </svg>
  );

  if (quieta) return <div className={className}>{cuerpo}</div>;

  return (
    <motion.div
      className={className}
      animate={
        animo === 'festejo'
          ? { y: [0, -14, 0], rotate: [0, -4, 4, 0] }
          : animo === 'triste'
            ? { y: [0, 2, 0] }
            : { y: [0, -4, 0] }
      }
      transition={{ duration: animo === 'festejo' ? 0.7 : 2.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {cuerpo}
    </motion.div>
  );
}
