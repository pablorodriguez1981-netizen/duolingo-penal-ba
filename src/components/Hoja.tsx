import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';

interface Props {
  abierta: boolean;
  alCerrar: () => void;
  titulo?: ReactNode;
  children: ReactNode;
  /** Etiqueta accesible si no hay título visible. */
  etiqueta?: string;
}

/** Hoja inferior en celulares y diálogo centrado en escritorio. */
export function Hoja({ abierta, alCerrar, titulo, children, etiqueta }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierta) return;
    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && alCerrar();
    window.addEventListener('keydown', tecla);
    const previo = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    return () => {
      window.removeEventListener('keydown', tecla);
      previo?.focus?.();
    };
  }, [abierta, alCerrar]);

  return (
    <AnimatePresence>
      {abierta && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <motion.div
            className="absolute inset-0 bg-black/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={alCerrar}
          />
          <motion.div
            ref={ref}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={typeof titulo === 'string' ? titulo : etiqueta}
            className="relative max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-superficie p-5 pb-8 shadow-2xl outline-none sm:max-w-lg sm:rounded-3xl sm:pb-5"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          >
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-borde sm:hidden" />
            <div className="mb-2 flex items-start justify-between gap-3">
              {titulo ? <h2 className="text-lg leading-tight font-extrabold">{titulo}</h2> : <span />}
              <button
                onClick={alCerrar}
                aria-label="Cerrar"
                className="-mt-1 -mr-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-xl text-suave hover:bg-superficie-2"
              >
                ✕
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
