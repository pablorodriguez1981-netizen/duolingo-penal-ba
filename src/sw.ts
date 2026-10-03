/// <reference lib="webworker" />
/**
 * Service worker de Carpi Penal: precache de toda la app (funciona sin
 * conexión), navegación SPA y recordatorios de racha en segundo plano.
 */
import { get } from 'idb-keyval';
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

declare let self: ServiceWorkerGlobalScope;

interface PeriodicSyncEvent extends ExtendableEvent {
  tag: string;
}

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')));

self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') void self.skipWaiting();
});

function diaLocal(f = new Date()) {
  return `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, '0')}-${String(f.getDate()).padStart(2, '0')}`;
}

async function recordarRacha() {
  const crudo = await get<string>('carpi-progreso');
  if (!crudo) return;
  const { state } = JSON.parse(crudo) as {
    state: { racha?: { actual: number; ultimoDia: string | null }; ajustes?: { recordatorios: boolean; horaRecordatorio: number } };
  };
  if (!state.ajustes?.recordatorios) return;
  const ahora = new Date();
  if (ahora.getHours() < (state.ajustes.horaRecordatorio ?? 20)) return;
  if (state.racha?.ultimoDia === diaLocal(ahora)) return;
  const n = state.racha?.actual ?? 0;
  await self.registration.showNotification(
    n > 0 ? `¡Tu racha de ${n} ${n === 1 ? 'día' : 'días'} está en juego! 🔥` : '¡Hora de estudiar con Carpi! ⚖️',
    { body: 'Una lección de 3 minutos alcanza para sumar el día.', icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', tag: 'racha' },
  );
}

self.addEventListener('periodicsync', (evento) => {
  const e = evento as PeriodicSyncEvent;
  if (e.tag === 'recordatorio-racha') e.waitUntil(recordarRacha());
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    (async () => {
      const clientes = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      const abierto = clientes[0];
      if (abierto) return abierto.focus();
      return self.clients.openWindow(self.registration.scope);
    })(),
  );
});
