import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Boton } from './components/Boton';
import { GlosarioProvider } from './components/Glosario';
import { configurarSonido } from './lib/sonido';
import { actualizarApp, cancelarRecordatorio, descartarAviso, programarRecordatorio, usePWA } from './lib/pwa';
import { detener } from './lib/voz';
import { Mascota } from './components/Mascota';
import { PantallaCamino } from './screens/Camino';
import { PantallaLeccion } from './screens/Leccion';
import { PantallaPractica, PantallaRepaso } from './screens/Repaso';

// Pantallas secundarias en chunks aparte: el arranque en Android es más liviano
// (igual quedan precacheadas por el service worker para usarlas sin conexión).
const PantallaCaso = lazy(() => import('./screens/Caso').then((m) => ({ default: m.PantallaCaso })));
const PantallaSupervivencia = lazy(() => import('./screens/Supervivencia').then((m) => ({ default: m.PantallaSupervivencia })));
const PantallaPerfil = lazy(() => import('./screens/Perfil').then((m) => ({ default: m.PantallaPerfil })));
const secciones = () => import('./screens/Secciones');
const PantallaEntrenar = lazy(() => secciones().then((m) => ({ default: m.PantallaEntrenar })));
const PantallaFallos = lazy(() => secciones().then((m) => ({ default: m.PantallaFallos })));
const PantallaGlosario = lazy(() => secciones().then((m) => ({ default: m.PantallaGlosario })));
const PantallaCodigos = lazy(() => secciones().then((m) => ({ default: m.PantallaCodigos })));
const NoEncontrada = lazy(() => secciones().then((m) => ({ default: m.NoEncontrada })));

function Cargando() {
  return (
    <div className="grid min-h-dvh place-items-center bg-fondo">
      <Mascota animo="pensando" tam={90} />
    </div>
  );
}
import { practicoHoy, rachaVigente, useProgreso } from './store/progreso';

/** Aplica el tema claro/oscuro según los ajustes y el sistema. */
function useTema() {
  const tema = useProgreso((s) => s.ajustes.tema);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const aplicar = () => {
      const oscuro = tema === 'oscuro' || (tema === 'sistema' && mq.matches);
      document.documentElement.dataset.tema = oscuro ? 'oscuro' : 'claro';
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', oscuro ? '#10141f' : '#1f5fd6');
    };
    aplicar();
    try {
      localStorage.setItem('carpi-tema', JSON.stringify(tema));
    } catch {
      /* sin almacenamiento */
    }
    mq.addEventListener('change', aplicar);
    return () => mq.removeEventListener('change', aplicar);
  }, [tema]);
}

function useRecordatorios() {
  const activos = useProgreso((s) => s.ajustes.recordatorios);
  const hora = useProgreso((s) => s.ajustes.horaRecordatorio);
  useEffect(() => {
    if (!activos) {
      cancelarRecordatorio();
      return;
    }
    programarRecordatorio(
      hora,
      () => practicoHoy(useProgreso.getState().racha),
      () => rachaVigente(useProgreso.getState().racha),
    );
    return cancelarRecordatorio;
  }, [activos, hora]);
}

function AvisoPWA() {
  const pwa = usePWA();
  const visible = pwa.actualizacion || pwa.offlineLista;
  useEffect(() => {
    if (!pwa.offlineLista || pwa.actualizacion) return;
    const t = window.setTimeout(descartarAviso, 4500);
    return () => window.clearTimeout(t);
  }, [pwa.offlineLista, pwa.actualizacion]);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          className="fixed inset-x-3 top-3 z-[70] mx-auto flex max-w-md items-center gap-3 rounded-2xl border-2 border-borde bg-superficie p-3 shadow-xl"
          role="status"
        >
          <span className="text-2xl" aria-hidden>
            {pwa.actualizacion ? '✨' : '📶'}
          </span>
          <p className="flex-1 text-sm font-bold">{pwa.actualizacion ? 'Hay una nueva versión de Carpi Penal.' : 'Lista para usar sin conexión.'}</p>
          {pwa.actualizacion ? (
            <Boton chico variante="verde" onClick={() => void actualizarApp()}>
              Actualizar
            </Boton>
          ) : (
            <button onClick={descartarAviso} aria-label="Cerrar" className="text-suave">
              ✕
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Rutas() {
  const ubicacion = useLocation();
  useEffect(() => {
    detener();
    window.scrollTo({ top: 0 });
  }, [ubicacion.pathname]);
  return (
    <Suspense fallback={<Cargando />}>
      <Routes>
        <Route path="/" element={<PantallaCamino />} />
        <Route path="/leccion/:leccionId" element={<PantallaLeccion />} />
        <Route path="/repaso/:unidadId" element={<PantallaRepaso />} />
        <Route path="/caso/:unidadId" element={<PantallaCaso />} />
        <Route path="/practica" element={<PantallaPractica />} />
        <Route path="/supervivencia" element={<PantallaSupervivencia />} />
        <Route path="/entrenar" element={<PantallaEntrenar />} />
        <Route path="/fallos" element={<PantallaFallos />} />
        <Route path="/glosario" element={<PantallaGlosario />} />
        <Route path="/codigos" element={<PantallaCodigos />} />
        <Route path="/perfil" element={<PantallaPerfil />} />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
    </Suspense>
  );
}

export function App() {
  useTema();
  useRecordatorios();
  const sonido = useProgreso((s) => s.ajustes.sonido);
  useEffect(() => configurarSonido(sonido), [sonido]);
  return (
    <HashRouter>
      <GlosarioProvider>
        <Rutas />
        <AvisoPWA />
      </GlosarioProvider>
    </HashRouter>
  );
}
