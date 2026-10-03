import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { BarraEstado } from './Indicadores';
import { Mascota } from './Mascota';

const SECCIONES = [
  { a: '/', icono: '🗺️', texto: 'Camino' },
  { a: '/entrenar', icono: '🏋️', texto: 'Entrenar' },
  { a: '/fallos', icono: '⚖️', texto: 'Fallos' },
  { a: '/glosario', icono: '📖', texto: 'Glosario' },
  { a: '/codigos', icono: '📜', texto: 'Códigos' },
  { a: '/perfil', icono: '👤', texto: 'Perfil' },
];

/** Estructura general: riel lateral en escritorio, barra inferior en celulares. */
export function Marco({ children, lateral }: { children: ReactNode; lateral?: ReactNode }) {
  return (
    <div className="min-h-dvh bg-fondo lg:flex">
      {/* Riel lateral (escritorio) */}
      <nav className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-1 border-r-2 border-borde px-3 py-5 lg:flex" aria-label="Secciones">
        <div className="mb-5 flex items-center gap-2 px-2">
          <Mascota tam={44} quieta />
          <div className="leading-tight">
            <p className="text-xl font-black text-azul-500">Carpi Penal</p>
            <p className="text-xs font-bold text-suave">CPPBA + Código Penal</p>
          </div>
        </div>
        {SECCIONES.map((s) => (
          <NavLink
            key={s.a}
            to={s.a}
            end={s.a === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl border-2 px-3 py-2.5 font-extrabold tracking-wide uppercase ${
                isActive ? 'border-azul-400 bg-azul-50 text-azul-600 dark:bg-azul-700/30 dark:text-azul-100' : 'border-transparent text-suave hover:bg-superficie-2'
              }`
            }
          >
            <span className="text-2xl" aria-hidden>
              {s.icono}
            </span>
            <span className="text-sm">{s.texto}</span>
          </NavLink>
        ))}
      </nav>

      <div className="flex min-w-0 flex-1 justify-center gap-8">
        <div className="w-full max-w-2xl min-w-0 pb-24 lg:pb-8">
          <header className="safe-top sticky top-0 z-20 border-b-2 border-borde bg-fondo/95 px-3 py-2 backdrop-blur lg:hidden">
            <BarraEstado />
          </header>
          <main>{children}</main>
        </div>
        {/* Panel derecho (escritorio ancho) */}
        <aside className="sticky top-0 hidden h-dvh w-80 shrink-0 space-y-4 overflow-y-auto py-6 pr-4 xl:block">
          <div className="rounded-2xl border-2 border-borde bg-superficie p-3">
            <BarraEstado />
          </div>
          {lateral}
        </aside>
      </div>

      {/* Barra inferior (celulares) */}
      <nav
        className="safe-bottom fixed inset-x-0 bottom-0 z-30 grid grid-cols-6 border-t-2 border-borde bg-superficie/95 backdrop-blur lg:hidden"
        aria-label="Secciones"
      >
        {SECCIONES.map((s) => (
          <NavLink
            key={s.a}
            to={s.a}
            end={s.a === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-2 text-[10px] font-extrabold tracking-wide uppercase ${isActive ? 'text-azul-500' : 'text-suave'}`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`grid h-9 w-11 place-items-center rounded-xl text-[22px] ${isActive ? 'bg-azul-50 ring-2 ring-azul-400 dark:bg-azul-700/40' : ''}`} aria-hidden>
                  {s.icono}
                </span>
                {s.texto}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

/** Encabezado de sección dentro del marco. */
export function TituloSeccion({ titulo, bajada, icono }: { titulo: string; bajada?: string; icono?: string }) {
  return (
    <div className="px-4 pt-5 pb-3">
      <h1 className="flex items-center gap-2 text-2xl font-black">
        {icono && <span aria-hidden>{icono}</span>}
        {titulo}
      </h1>
      {bajada && <p className="mt-1 text-[15px] font-semibold text-suave">{bajada}</p>}
    </div>
  );
}
