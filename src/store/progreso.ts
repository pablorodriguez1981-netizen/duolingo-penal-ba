/**
 * Progreso del usuario, 100% local (offline-first): se guarda en IndexedDB
 * (con respaldo en localStorage) y nunca sale del dispositivo.
 */
import { del, get, set } from 'idb-keyval';
import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';
import { ayer, diaLocal } from '../lib/fechas';
import { actualizarEstadistica, type EstadisticaPregunta } from '../lib/repaso';

export const CLAVE_PROGRESO = 'carpi-progreso';
export const MAX_VIDAS = 3;
export const RECARGA_VIDA_MS = 20 * 60 * 1000;

const almacenamiento: StateStorage = {
  async getItem(clave) {
    try {
      const v = await get<string>(clave);
      if (v != null) return v;
    } catch {
      /* IndexedDB no disponible */
    }
    try {
      return localStorage.getItem(clave);
    } catch {
      return null;
    }
  },
  async setItem(clave, valor) {
    try {
      await set(clave, valor);
      return;
    } catch {
      /* respaldo */
    }
    try {
      localStorage.setItem(clave, valor);
    } catch {
      /* sin almacenamiento: la sesión sigue en memoria */
    }
  },
  async removeItem(clave) {
    try {
      await del(clave);
    } catch {
      /* nada */
    }
    try {
      localStorage.removeItem(clave);
    } catch {
      /* nada */
    }
  },
};

export type Tema = 'sistema' | 'claro' | 'oscuro';

export interface Ajustes {
  sonido: boolean;
  vozVelocidad: number;
  vozURI: string | null;
  metaDiaria: 3 | 4;
  recordatorios: boolean;
  horaRecordatorio: number;
  tema: Tema;
}

export interface Vidas {
  cantidad: number;
  recargaDesde: number | null;
}

export interface DatosProgreso {
  leccionesCompletadas: Record<string, { fecha: string; aciertos: number; total: number }>;
  repasosCompletados: Record<string, string>;
  casosCompletados: Record<string, { puntaje: number; maximo: number; fecha: string }>;
  fallosLeidos: Record<string, string>;
  preguntas: Record<string, EstadisticaPregunta>;
  xp: number;
  racha: { actual: number; mejor: number; ultimoDia: string | null };
  hoy: { dia: string; articulos: string[]; xp: number };
  historial: Record<string, number>;
  vidas: Vidas;
  supervivenciaRecord: number;
  vueltas: number;
  ajustes: Ajustes;
  bienvenidaVista: boolean;
}

export interface ResultadoActividad {
  xp: number;
  rachaExtendida: boolean;
  racha: number;
  metaCumplida: boolean;
}

interface Acciones {
  completarLeccion(d: { leccionId: string; articuloId: string; aciertos: number; total: number }): ResultadoActividad;
  completarRepaso(unidadId: string, aciertos: number, total: number): ResultadoActividad;
  completarCaso(unidadId: string, puntaje: number, maximo: number): ResultadoActividad;
  completarSupervivencia(correctas: number): ResultadoActividad & { record: boolean };
  completarPractica(correctas: number, recuperaVida: boolean): ResultadoActividad;
  marcarFalloLeido(articuloId: string): void;
  registrarRespuesta(preguntaId: string, correcta: boolean): void;
  perderVida(): number;
  ganarVida(): void;
  sincronizarVidas(): void;
  actualizarAjustes(a: Partial<Ajustes>): void;
  marcarBienvenida(): void;
  reiniciarCamino(): void;
  borrarTodo(): void;
  /** Reemplaza el progreso por el de una copia de seguridad. */
  restaurar(datos: Partial<DatosProgreso>): void;
}

export type EstadoProgreso = DatosProgreso & Acciones;

const inicial = (): DatosProgreso => ({
  leccionesCompletadas: {},
  repasosCompletados: {},
  casosCompletados: {},
  fallosLeidos: {},
  preguntas: {},
  xp: 0,
  racha: { actual: 0, mejor: 0, ultimoDia: null },
  hoy: { dia: diaLocal(), articulos: [], xp: 0 },
  historial: {},
  vidas: { cantidad: MAX_VIDAS, recargaDesde: null },
  supervivenciaRecord: 0,
  vueltas: 0,
  ajustes: {
    sonido: true,
    vozVelocidad: 1,
    vozURI: null,
    metaDiaria: 3,
    recordatorios: false,
    horaRecordatorio: 20,
    tema: 'sistema',
  },
  bienvenidaVista: false,
});

/** Aplica la recarga por tiempo de las vidas. */
export function vidasActuales(v: Vidas, ahora = Date.now()): Vidas {
  if (v.cantidad >= MAX_VIDAS || v.recargaDesde == null) return { cantidad: Math.min(v.cantidad, MAX_VIDAS), recargaDesde: null };
  const recargadas = Math.floor((ahora - v.recargaDesde) / RECARGA_VIDA_MS);
  if (recargadas <= 0) return v;
  const cantidad = Math.min(MAX_VIDAS, v.cantidad + recargadas);
  return { cantidad, recargaDesde: cantidad >= MAX_VIDAS ? null : v.recargaDesde + recargadas * RECARGA_VIDA_MS };
}

export const msParaProximaVida = (v: Vidas, ahora = Date.now()) =>
  v.recargaDesde == null ? 0 : Math.max(0, v.recargaDesde + RECARGA_VIDA_MS - ahora);

/** Racha vigente: se mantiene si se practicó hoy o ayer. */
export function rachaVigente(r: DatosProgreso['racha'], hoy = diaLocal()): number {
  return r.ultimoDia === hoy || r.ultimoDia === ayer(hoy) ? r.actual : 0;
}

export const practicoHoy = (r: DatosProgreso['racha'], hoy = diaLocal()) => r.ultimoDia === hoy;

export const useProgreso = create<EstadoProgreso>()(
  persist(
    (setState, getState) => {
      /** Suma XP y actualiza racha, meta diaria e historial. */
      const actividad = (xp: number, articuloId?: string): ResultadoActividad => {
        const dia = diaLocal();
        const s = getState();
        const hoy = s.hoy.dia === dia ? s.hoy : { dia, articulos: [], xp: 0 };
        const articulosAntes = hoy.articulos.length;
        const articulos = articuloId && !hoy.articulos.includes(articuloId) ? [...hoy.articulos, articuloId] : hoy.articulos;
        let { actual, mejor, ultimoDia } = s.racha;
        const rachaExtendida = ultimoDia !== dia;
        if (rachaExtendida) {
          actual = ultimoDia === ayer(dia) ? actual + 1 : 1;
          ultimoDia = dia;
          mejor = Math.max(mejor, actual);
        }
        const meta = s.ajustes.metaDiaria;
        setState({
          xp: s.xp + xp,
          hoy: { dia, articulos, xp: hoy.xp + xp },
          historial: { ...s.historial, [dia]: (s.historial[dia] ?? 0) + xp },
          racha: { actual, mejor, ultimoDia },
        });
        return { xp, rachaExtendida, racha: actual, metaCumplida: articulosAntes < meta && articulos.length >= meta };
      };

      return {
        ...inicial(),

        completarLeccion({ leccionId, articuloId, aciertos, total }) {
          const s = getState();
          const yaEstaba = Boolean(s.leccionesCompletadas[leccionId]);
          setState({
            leccionesCompletadas: { ...s.leccionesCompletadas, [leccionId]: { fecha: diaLocal(), aciertos, total } },
          });
          const xp = (yaEstaba ? 5 : 10) + (aciertos === total ? 5 : 0);
          return actividad(xp, articuloId);
        },

        completarRepaso(unidadId, aciertos, total) {
          const s = getState();
          setState({ repasosCompletados: { ...s.repasosCompletados, [unidadId]: diaLocal() } });
          getState().ganarVida(); // los repasos recuperan un corazón
          return actividad(15 + (aciertos === total ? 5 : 0));
        },

        completarCaso(unidadId, puntaje, maximo) {
          const s = getState();
          const previo = s.casosCompletados[unidadId];
          const mejor = previo && previo.puntaje > puntaje ? previo : { puntaje, maximo, fecha: diaLocal() };
          setState({ casosCompletados: { ...s.casosCompletados, [unidadId]: mejor } });
          return actividad(5 + puntaje * 3);
        },

        completarSupervivencia(correctas) {
          const s = getState();
          const record = correctas > s.supervivenciaRecord;
          if (record) setState({ supervivenciaRecord: correctas });
          return { ...actividad(Math.max(1, correctas * 2)), record };
        },

        completarPractica(correctas, recuperaVida) {
          if (recuperaVida) getState().ganarVida();
          return actividad(Math.max(1, correctas));
        },

        marcarFalloLeido(articuloId) {
          const s = getState();
          if (s.fallosLeidos[articuloId]) return;
          setState({ fallosLeidos: { ...s.fallosLeidos, [articuloId]: diaLocal() } });
          actividad(5);
        },

        registrarRespuesta(preguntaId, correcta) {
          const s = getState();
          setState({ preguntas: { ...s.preguntas, [preguntaId]: actualizarEstadistica(s.preguntas[preguntaId], correcta) } });
        },

        perderVida() {
          const v = vidasActuales(getState().vidas);
          const cantidad = Math.max(0, v.cantidad - 1);
          setState({ vidas: { cantidad, recargaDesde: v.recargaDesde ?? Date.now() } });
          return cantidad;
        },

        ganarVida() {
          const v = vidasActuales(getState().vidas);
          const cantidad = Math.min(MAX_VIDAS, v.cantidad + 1);
          setState({ vidas: { cantidad, recargaDesde: cantidad >= MAX_VIDAS ? null : (v.recargaDesde ?? Date.now()) } });
        },

        sincronizarVidas() {
          const actual = getState().vidas;
          const v = vidasActuales(actual);
          if (v.cantidad !== actual.cantidad || v.recargaDesde !== actual.recargaDesde) setState({ vidas: v });
        },

        actualizarAjustes(a) {
          setState({ ajustes: { ...getState().ajustes, ...a } });
        },

        marcarBienvenida() {
          setState({ bienvenidaVista: true });
        },

        reiniciarCamino() {
          const s = getState();
          setState({
            leccionesCompletadas: {},
            repasosCompletados: {},
            casosCompletados: {},
            fallosLeidos: {},
            vueltas: s.vueltas + 1,
          });
        },

        borrarTodo() {
          setState({ ...inicial(), bienvenidaVista: true });
        },

        restaurar(datos) {
          const base = inicial();
          setState({ ...base, ...datos, ajustes: { ...base.ajustes, ...(datos.ajustes ?? {}) }, bienvenidaVista: true });
        },
      };
    },
    {
      name: CLAVE_PROGRESO,
      version: 1,
      storage: createJSONStorage(() => almacenamiento),
      // Se guardan sólo los datos (las acciones se recrean).
      partialize: (s) => Object.fromEntries(Object.entries(s).filter(([, v]) => typeof v !== 'function')) as unknown as DatosProgreso,
      merge: (persistido, actual) => {
        const p = (persistido ?? {}) as Partial<DatosProgreso>;
        return { ...actual, ...p, ajustes: { ...actual.ajustes, ...(p.ajustes ?? {}) } };
      },
    },
  ),
);

export const esperarHidratacion = () =>
  new Promise<void>((resolve) => {
    if (useProgreso.persist.hasHydrated()) resolve();
    else {
      const quitar = useProgreso.persist.onFinishHydration(() => {
        quitar();
        resolve();
      });
    }
  });
