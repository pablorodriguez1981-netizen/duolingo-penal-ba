/**
 * Integración PWA: instalación, actualización del service worker y
 * recordatorios locales de racha.
 */
import { useSyncExternalStore } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface EstadoPWA {
  instalable: boolean;
  instalada: boolean;
  actualizacion: boolean;
  offlineLista: boolean;
}

let estado: EstadoPWA = {
  instalable: false,
  instalada: typeof window !== 'undefined' && window.matchMedia?.('(display-mode: standalone)').matches,
  actualizacion: false,
  offlineLista: false,
};
let eventoInstalacion: BeforeInstallPromptEvent | null = null;
let aplicarActualizacion: (() => Promise<void>) | null = null;
const oyentes = new Set<() => void>();

function set(parcial: Partial<EstadoPWA>) {
  estado = { ...estado, ...parcial };
  oyentes.forEach((f) => f());
}

export function usePWA() {
  return useSyncExternalStore(
    (f) => {
      oyentes.add(f);
      return () => oyentes.delete(f);
    },
    () => estado,
    () => estado,
  );
}

export function escucharInstalacion() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    eventoInstalacion = e as BeforeInstallPromptEvent;
    set({ instalable: true });
  });
  window.addEventListener('appinstalled', () => {
    eventoInstalacion = null;
    set({ instalable: false, instalada: true });
  });
}

export async function instalar() {
  if (!eventoInstalacion) return false;
  await eventoInstalacion.prompt();
  const { outcome } = await eventoInstalacion.userChoice;
  eventoInstalacion = null;
  set({ instalable: false, instalada: outcome === 'accepted' });
  return outcome === 'accepted';
}

export async function registrarServiceWorker() {
  if (!('serviceWorker' in navigator) || import.meta.env.DEV) return;
  const { registerSW } = await import('virtual:pwa-register');
  const actualizar = registerSW({
    onNeedRefresh: () => set({ actualizacion: true }),
    onOfflineReady: () => set({ offlineLista: true }),
    onRegisteredSW: (_url, registro) => {
      if (registro) void registrarSyncPeriodica(registro);
    },
  });
  aplicarActualizacion = () => actualizar(true);
}

export const actualizarApp = () => aplicarActualizacion?.();
export const descartarAviso = () => set({ offlineLista: false, actualizacion: false });

// --- Recordatorios -----------------------------------------------------------

interface RegistroConSync extends ServiceWorkerRegistration {
  periodicSync?: { register: (tag: string, opts: { minInterval: number }) => Promise<void> };
}

async function registrarSyncPeriodica(registro: ServiceWorkerRegistration) {
  const r = registro as RegistroConSync;
  if (!r.periodicSync || Notification?.permission !== 'granted') return;
  try {
    const permiso = await navigator.permissions.query({ name: 'periodic-background-sync' as PermissionName });
    if (permiso.state === 'granted') await r.periodicSync.register('recordatorio-racha', { minInterval: 6 * 60 * 60 * 1000 });
  } catch {
    // No soportado: quedan los recordatorios mientras la app está abierta.
  }
}

export async function pedirPermisoNotificaciones(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const r = await Notification.requestPermission();
  if (r === 'granted' && 'serviceWorker' in navigator) {
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg) void registrarSyncPeriodica(reg);
  }
  return r === 'granted';
}

export async function notificar(titulo: string, cuerpo: string) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const reg = 'serviceWorker' in navigator ? await navigator.serviceWorker.getRegistration() : undefined;
  const opciones: NotificationOptions = { body: cuerpo, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', tag: 'racha' };
  if (reg) await reg.showNotification(titulo, opciones);
  else new Notification(titulo, opciones);
}

let temporizador: number | undefined;

/**
 * Mientras la app está abierta (o en segundo plano en el navegador), programa
 * un aviso a la hora elegida si todavía no se practicó hoy.
 */
export function programarRecordatorio(hora: number, yaPracticoHoy: () => boolean, rachaActual: () => number) {
  window.clearTimeout(temporizador);
  const ahora = new Date();
  const objetivo = new Date();
  objetivo.setHours(hora, 0, 0, 0);
  if (objetivo <= ahora) objetivo.setDate(objetivo.getDate() + 1);
  temporizador = window.setTimeout(() => {
    if (!yaPracticoHoy()) {
      const n = rachaActual();
      void notificar(
        n > 0 ? `¡Tu racha de ${n} ${n === 1 ? 'día' : 'días'} está en juego! 🔥` : '¡Hora de estudiar con Carpi! ⚖️',
        'Una lección de 3 minutos alcanza para sumar el día.',
      );
    }
    programarRecordatorio(hora, yaPracticoHoy, rachaActual);
  }, objetivo.getTime() - ahora.getTime());
}

export const cancelarRecordatorio = () => window.clearTimeout(temporizador);
