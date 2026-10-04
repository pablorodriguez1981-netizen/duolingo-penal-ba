import { useMemo, useState } from 'react';
import { Boton } from '../components/Boton';
import { Hoja } from '../components/Hoja';
import { Llama } from '../components/Indicadores';
import { Marco, TituloSeccion } from '../components/Marco';
import { Mascota } from '../components/Mascota';
import { infoCodigos } from '../data/codigos';
import { UNIDADES_NUCLEO } from '../data/curriculo';
import { diaLocal, inicialDia, ultimosDias } from '../lib/fechas';
import { instalar, pedirPermisoNotificaciones, usePWA } from '../lib/pwa';
import { hablar, useVoces, vozDisponible } from '../lib/voz';
import { rachaVigente, useProgreso, type Tema } from '../store/progreso';

function Estadistica({ icono, valor, etiqueta }: { icono: string; valor: string | number; etiqueta: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border-2 border-borde bg-superficie p-3">
      <span className="text-2xl" aria-hidden>
        {icono}
      </span>
      <div className="min-w-0">
        <p className="text-xl leading-none font-black">{valor}</p>
        <p className="text-xs font-bold text-suave">{etiqueta}</p>
      </div>
    </div>
  );
}

function Interruptor({ activo, alCambiar, etiqueta }: { activo: boolean; alCambiar: (v: boolean) => void; etiqueta: string }) {
  return (
    <button
      role="switch"
      aria-checked={activo}
      aria-label={etiqueta}
      onClick={() => alCambiar(!activo)}
      className={`relative h-8 w-14 shrink-0 rounded-full transition ${activo ? 'bg-verde-500' : 'bg-borde'}`}
    >
      <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${activo ? 'left-7' : 'left-1'}`} />
    </button>
  );
}

function Fila({ titulo, detalle, children }: { titulo: string; detalle?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <p className="font-extrabold">{titulo}</p>
        {detalle && <p className="text-xs font-semibold text-suave">{detalle}</p>}
      </div>
      {children}
    </div>
  );
}

export function PantallaPerfil() {
  const s = useProgreso();
  const voces = useVoces();
  const pwa = usePWA();
  const [confirmar, setConfirmar] = useState<'reiniciar' | 'borrar' | null>(null);
  const [fuentes, setFuentes] = useState(false);
  const info = infoCodigos();
  const racha = rachaVigente(s.racha);
  const dias = ultimosDias(7);
  const maxXp = Math.max(10, ...dias.map((d) => s.historial[d] ?? 0));
  const lecciones = Object.keys(s.leccionesCompletadas).length;
  const stats = Object.values(s.preguntas);
  const precision = useMemo(() => {
    const vistas = stats.reduce((a, e) => a + e.vistas, 0);
    const errores = stats.reduce((a, e) => a + e.errores, 0);
    return vistas ? Math.round(((vistas - errores) / vistas) * 100) : 0;
  }, [stats]);
  const unidadesHechas = UNIDADES_NUCLEO.filter((u) => s.repasosCompletados[u.id]).length;
  const a = s.ajustes;

  return (
    <Marco>
      <TituloSeccion icono="👤" titulo="Tu perfil" />
      <div className="mx-4 flex items-center gap-4 rounded-3xl bg-azul-500 p-4 text-white shadow-[0_5px_0_0_#133b8a]">
        <Mascota tam={78} animo={racha > 0 ? 'festejo' : 'feliz'} />
        <div>
          <p className="text-xs font-black tracking-widest uppercase opacity-90">Estudiante de Derecho Penal BA</p>
          <p className="text-2xl font-black">⚡ {s.xp} XP</p>
          <p className="text-sm font-bold opacity-95">
            {unidadesHechas}/{UNIDADES_NUCLEO.length} unidades centrales · vuelta {s.vueltas + 1}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4">
        <div className="flex items-center gap-3 rounded-2xl border-2 border-borde bg-superficie p-3">
          <Llama activa={racha > 0} tam={30} />
          <div>
            <p className="text-xl leading-none font-black text-naranja-500">{racha}</p>
            <p className="text-xs font-bold text-suave">días de racha</p>
          </div>
        </div>
        <Estadistica icono="🏅" valor={s.racha.mejor} etiqueta="mejor racha" />
        <Estadistica icono="📚" valor={lecciones} etiqueta="lecciones completadas" />
        <Estadistica icono="🎯" valor={`${precision}%`} etiqueta="precisión histórica" />
        <Estadistica icono="⏱️" valor={s.supervivenciaRecord} etiqueta="récord supervivencia" />
        <Estadistica icono="⚖️" valor={Object.keys(s.casosCompletados).length} etiqueta="audiencias simuladas" />
      </div>

      <section className="mx-4 rounded-3xl border-2 border-borde bg-superficie p-4">
        <p className="mb-3 font-black">📈 Últimos 7 días</p>
        <div className="flex h-32 items-end justify-between gap-2" role="img" aria-label="XP por día en la última semana">
          {dias.map((d) => {
            const xp = s.historial[d] ?? 0;
            const hoy = d === diaLocal();
            return (
              <div key={d} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] font-black text-suave">{xp || ''}</span>
                <div className={`w-full rounded-t-lg ${xp ? (hoy ? 'bg-naranja-500' : 'bg-azul-400') : 'bg-borde'}`} style={{ height: `${Math.max(6, (xp / maxXp) * 90)}px` }} />
                <span className={`text-xs font-black ${hoy ? 'text-naranja-500' : 'text-suave'}`}>{inicialDia(d)}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-4 mt-4 divide-y-2 divide-borde rounded-3xl border-2 border-borde bg-superficie px-4">
        <p className="py-3 font-black">⚙️ Ajustes</p>
        <Fila titulo="Meta diaria" detalle="Artículos por día">
          <div className="flex gap-2">
            {([3, 4] as const).map((n) => (
              <button key={n} data-sel={a.metaDiaria === n} onClick={() => s.actualizarAjustes({ metaDiaria: n })} className="opcion px-3 py-1.5 font-black">
                {n}
              </button>
            ))}
          </div>
        </Fila>
        <Fila titulo="Efectos de sonido">
          <Interruptor etiqueta="Efectos de sonido" activo={a.sonido} alCambiar={(v) => s.actualizarAjustes({ sonido: v })} />
        </Fila>
        <Fila titulo="Tema" detalle="Claro, oscuro o el del sistema">
          <select
            value={a.tema}
            onChange={(e) => s.actualizarAjustes({ tema: e.target.value as Tema })}
            className="rounded-xl border-2 border-borde bg-superficie px-2 py-1.5 font-bold"
            aria-label="Tema"
          >
            <option value="sistema">Sistema</option>
            <option value="claro">Claro</option>
            <option value="oscuro">Oscuro</option>
          </select>
        </Fila>
        {vozDisponible() && (
          <>
            <Fila titulo="Velocidad de lectura" detalle={`${a.vozVelocidad.toFixed(1)}×`}>
              <input
                type="range"
                min={0.7}
                max={1.5}
                step={0.1}
                value={a.vozVelocidad}
                onChange={(e) => s.actualizarAjustes({ vozVelocidad: Number(e.target.value) })}
                aria-label="Velocidad de lectura"
                className="w-32 accent-azul-500"
              />
            </Fila>
            <Fila titulo="Voz" detalle={voces.length ? 'Voces en español del dispositivo' : 'No se encontraron voces en español'}>
              <div className="flex items-center gap-2">
                <select
                  value={a.vozURI ?? ''}
                  onChange={(e) => s.actualizarAjustes({ vozURI: e.target.value || null })}
                  className="max-w-36 rounded-xl border-2 border-borde bg-superficie px-2 py-1.5 text-sm font-bold"
                  aria-label="Voz"
                >
                  <option value="">Automática</option>
                  {voces.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
                <button
                  className="text-xl"
                  aria-label="Probar voz"
                  onClick={() => hablar('Artículo 1. Nadie podrá ser juzgado por otros jueces que los instituidos por la ley antes del hecho.', { velocidad: a.vozVelocidad, vozURI: a.vozURI, id: 'prueba' })}
                >
                  🔊
                </button>
              </div>
            </Fila>
          </>
        )}
        <Fila titulo="Recordatorio diario" detalle="Notificación local si todavía no practicaste">
          <Interruptor
            etiqueta="Recordatorio diario"
            activo={a.recordatorios}
            alCambiar={async (v) => {
              if (v && !(await pedirPermisoNotificaciones())) return;
              s.actualizarAjustes({ recordatorios: v });
            }}
          />
        </Fila>
        {a.recordatorios && (
          <Fila titulo="Hora del recordatorio">
            <select
              value={a.horaRecordatorio}
              onChange={(e) => s.actualizarAjustes({ horaRecordatorio: Number(e.target.value) })}
              className="rounded-xl border-2 border-borde bg-superficie px-2 py-1.5 font-bold"
              aria-label="Hora del recordatorio"
            >
              {Array.from({ length: 16 }, (_, i) => i + 7).map((h) => (
                <option key={h} value={h}>
                  {h}:00
                </option>
              ))}
            </select>
          </Fila>
        )}
      </section>

      <section className="mx-4 mt-4 space-y-3">
        {pwa.instalable && (
          <Boton ancho variante="azul" onClick={() => void instalar()}>
            📲 Instalar la app
          </Boton>
        )}
        {pwa.instalada && <p className="text-center text-sm font-bold text-verde-600">✔ App instalada en este dispositivo</p>}
        <Boton ancho variante="neutro" onClick={() => setFuentes(true)}>
          📚 Fuentes y fidelidad de los textos
        </Boton>
        <Boton ancho variante="neutro" onClick={() => setConfirmar('reiniciar')}>
          🔄 Reiniciar el camino
        </Boton>
        <Boton ancho variante="fantasma" className="text-rojo-500!" onClick={() => setConfirmar('borrar')}>
          Borrar todo mi progreso
        </Boton>
        <p className="pb-4 text-center text-xs text-suave">Carpi Penal · material de estudio. No reemplaza el asesoramiento profesional ni la consulta de las fuentes oficiales.</p>
      </section>

      <Hoja abierta={confirmar !== null} alCerrar={() => setConfirmar(null)} titulo={confirmar === 'borrar' ? '¿Borrar todo?' : '¿Reiniciar el camino?'}>
        <p className="mb-4 text-suave">
          {confirmar === 'borrar'
            ? 'Se borran XP, racha, estadísticas y ajustes de este dispositivo. No se puede deshacer.'
            : 'Las lecciones vuelven a bloquearse para recorrer el árbol otra vez. Conservás tu XP, racha y estadísticas de repaso.'}
        </p>
        <Boton
          ancho
          variante={confirmar === 'borrar' ? 'rojo' : 'azul'}
          onClick={() => {
            if (confirmar === 'borrar') s.borrarTodo();
            else s.reiniciarCamino();
            setConfirmar(null);
          }}
        >
          {confirmar === 'borrar' ? 'Sí, borrar' : 'Sí, reiniciar'}
        </Boton>
      </Hoja>

      <Hoja abierta={fuentes} alCerrar={() => setFuentes(false)} titulo="Fuentes y fidelidad">
        <div className="space-y-3 text-[15px] leading-relaxed">
          <p>
            <b>Código Penal:</b> texto literal importado del PDF provisto ({info.cp?.ley ?? 'Ley 11.179'}).{' '}
            {info.cp?.ultimaReformaDetectada && `Última reforma incluida en ese texto: ${info.cp.ultimaReformaDetectada}. `}
            Las reformas posteriores no están reflejadas: los artículos afectados que se usan en las lecciones llevan un aviso.
          </p>
          <p>
            <b>CPPBA (Ley 11.922):</b>{' '}
            {info.cppbaOficial
              ? `texto literal del documento que cargaste (${info.cppbaOficial.version ?? info.cppbaOficial.fuente}). Esa versión es de 2003 aprox.: los artículos que se reformaron después y se usan en las lecciones (144, 148, 157, 169, 171 y 395) muestran una versión actualizada de estudio, con una pestaña para ver el texto de tu documento.`
              : 'los artículos centrales se muestran en una versión de estudio (marcada 🧭) que debe cotejarse con el texto oficial vigente.'}
          </p>
          <p>
            Para cargar una versión más nueva del CPPBA (PDF o Word), ejecutá en el proyecto:
            <code className="mt-1 block rounded-lg bg-superficie-2 p-2 text-xs">npm run importar:codigo -- --codigo CPPBA --docx ruta/al/CPPBA.docx</code>
            Las lecciones y los módulos dinámicos se regeneran con ese texto.
          </p>
          <p>
            <b>Jurisprudencia:</b> síntesis didácticas de fallos conocidos (CSJN, Corte IDH, CIDH) y de líneas jurisprudenciales; verificá siempre el fallo completo antes de citarlo.
          </p>
          <p>
            <b>Casos prácticos:</b> ficticios, con fines didácticos.
          </p>
        </div>
      </Hoja>
    </Marco>
  );
}
