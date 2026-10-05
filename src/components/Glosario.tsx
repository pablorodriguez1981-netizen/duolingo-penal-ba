import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { GLOSARIO } from '../data/glosario';
import type { TerminoGlosario } from '../data/tipos';
import { useProgreso } from '../store/progreso';
import { hablar } from '../lib/voz';
import { locuciones } from '../lib/locucion';
import { Hoja } from './Hoja';

const CtxGlosario = createContext<(id: string) => void>(() => {});

const escapar = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Índice variante → término, y una expresión que las busca de la más larga a la más corta. */
const indice = (() => {
  const mapa = new Map<string, TerminoGlosario>();
  for (const t of GLOSARIO) for (const v of t.variantes) mapa.set(v.toLowerCase(), t);
  const variantes = [...mapa.keys()].sort((a, b) => b.length - a.length).map(escapar);
  const re = new RegExp(`(?<![\\p{L}\\p{N}])(${variantes.join('|')})(?![\\p{L}\\p{N}])`, 'giu');
  return { mapa, re };
})();

export function GlosarioProvider({ children }: { children: ReactNode }) {
  const [abierto, setAbierto] = useState<TerminoGlosario | null>(null);
  const ajustes = useProgreso((s) => s.ajustes);
  const abrir = useCallback((id: string) => setAbierto(GLOSARIO.find((t) => t.id === id) ?? null), []);
  const cerrar = useCallback(() => setAbierto(null), []);
  return (
    <CtxGlosario.Provider value={abrir}>
      {children}
      <Hoja abierta={!!abierto} alCerrar={cerrar} titulo={abierto?.termino} etiqueta="Glosario">
        {abierto && (
          <div className="space-y-3">
            <p className="text-[17px] leading-relaxed">{abierto.definicion}</p>
            {abierto.fuente && (
              <p className="inline-block rounded-full bg-naranja-100 px-3 py-1 text-sm font-bold text-naranja-600">📚 {abierto.fuente}</p>
            )}
            <div>
              <button
                className="text-sm font-bold text-azul-500"
                onClick={() =>
                  hablar(locuciones.glosario(abierto).texto, { velocidad: ajustes.vozVelocidad, vozURI: ajustes.vozURI, id: 'glosario', natural: ajustes.vozNatural })
                }
              >
                🔊 Escuchar definición
              </button>
            </div>
          </div>
        )}
      </Hoja>
    </CtxGlosario.Provider>
  );
}

export const useAbrirGlosario = () => useContext(CtxGlosario);

/** Enlaza la primera aparición de cada término del glosario dentro del texto. */
function enlazar(texto: string, vistos: Set<string>, abrir: (id: string) => void, clave: string): ReactNode[] {
  const out: ReactNode[] = [];
  let ultimo = 0;
  for (const m of texto.matchAll(indice.re)) {
    const t = indice.mapa.get(m[0].toLowerCase());
    if (!t || vistos.has(t.id) || m.index === undefined) continue;
    vistos.add(t.id);
    if (m.index > ultimo) out.push(texto.slice(ultimo, m.index));
    out.push(
      <button key={`${clave}-${m.index}`} type="button" className="termino" onClick={() => abrir(t.id)} aria-label={`${m[0]}: ver definición`}>
        {m[0]}
      </button>,
    );
    ultimo = m.index + m[0].length;
  }
  if (ultimo < texto.length) out.push(texto.slice(ultimo));
  return out;
}

function conFoco(texto: string, foco: string | undefined, vistos: Set<string>, abrir: (id: string) => void, clave: string): ReactNode[] {
  const i = foco ? texto.indexOf(foco) : -1;
  if (i < 0 || !foco) return enlazar(texto, vistos, abrir, clave);
  return [
    ...enlazar(texto.slice(0, i), vistos, abrir, `${clave}a`),
    <mark key={`${clave}-foco`} className="foco-articulo text-inherit">
      {enlazar(foco, vistos, abrir, `${clave}f`)}
    </mark>,
    ...enlazar(texto.slice(i + foco.length), vistos, abrir, `${clave}b`),
  ];
}

/** Texto con términos del glosario enlazados y, opcionalmente, un fragmento resaltado. */
export function TextoGlosario({ texto, foco }: { texto: string; foco?: string }) {
  const abrir = useAbrirGlosario();
  const nodos = useMemo(() => conFoco(texto, foco, new Set(), abrir, 't'), [texto, foco, abrir]);
  return <>{nodos}</>;
}

/** Varios párrafos que comparten el registro de términos ya enlazados (sólo se enlaza la primera aparición). */
export function ParrafosGlosario({ parrafos, foco, className }: { parrafos: string[]; foco?: string; className?: string }) {
  const abrir = useAbrirGlosario();
  const nodos = useMemo(() => {
    const vistos = new Set<string>();
    return parrafos.map((p, i) => conFoco(p, foco, vistos, abrir, `p${i}`));
  }, [parrafos, foco, abrir]);
  return (
    <>
      {nodos.map((n, i) => (
        <p key={i} className={className}>
          {n}
        </p>
      ))}
    </>
  );
}
