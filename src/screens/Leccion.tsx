import { motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Boton } from '../components/Boton';
import { ParrafosGlosario } from '../components/Glosario';
import { Hoja } from '../components/Hoja';
import { useVidas } from '../components/Indicadores';
import { Mascota } from '../components/Mascota';
import { PantallaResultado } from '../components/Resultado';
import { CabeceraSesion, ConfirmarSalida, Cronometro, SesionPreguntas, SinVidas, useCronometro, type ResultadoSesion } from '../components/Sesion';
import { BotonEscuchar, TarjetaArticulo } from '../components/TarjetaArticulo';
import { TarjetaFallo } from '../components/TarjetaFallo';
import { articulo, etiquetaArticulo } from '../data/codigos';
import { buscarLeccion, sinPenalidad } from '../data/curriculo';
import type { Articulo } from '../data/tipos';
import { locuciones } from '../lib/locucion';
import { detener } from '../lib/voz';
import { useProgreso, type ResultadoActividad } from '../store/progreso';

type Paso = 'intro' | 'lectura' | 'preguntas' | 'fin';

function BarraInferior({ children }: { children: React.ReactNode }) {
  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t-2 border-borde bg-fondo/95 px-4 py-4 backdrop-blur">
      <div className="mx-auto max-w-2xl">{children}</div>
    </div>
  );
}

export function PantallaLeccion() {
  const { leccionId = '' } = useParams();
  const ubicacion = useMemo(() => buscarLeccion(leccionId), [leccionId]);
  const navegar = useNavigate();
  const [paso, setPaso] = useState<Paso>('intro');
  const [salir, setSalir] = useState(false);
  const [relacionado, setRelacionado] = useState<Articulo | null>(null);
  const [fin, setFin] = useState<{ r: ResultadoSesion; a: ResultadoActividad } | null>(null);
  const segundos = useCronometro();
  const segundosAlEmpezar = useRef(0);
  const { cantidad } = useVidas();
  const completar = useProgreso((s) => s.completarLeccion);
  const marcarFallo = useProgreso((s) => s.marcarFalloLeido);

  if (!ubicacion) return <Navigate to="/" replace />;
  const { unidad, tema, leccion, indiceEnTema } = ubicacion;
  const art = articulo(tema.articuloId);
  const libre = sinPenalidad(unidad.id);
  const volver = () => {
    detener();
    navegar('/');
  };

  if (paso === 'fin' && fin) {
    return (
      <PantallaResultado
        titulo={fin.r.aciertos === fin.r.total ? '¡Lección perfecta!' : '¡Lección completada!'}
        aciertos={fin.r.aciertos}
        total={fin.r.total}
        segundos={fin.r.segundos}
        actividad={fin.a}
        alContinuar={volver}
      />
    );
  }

  if (paso === 'preguntas') {
    return (
      <SesionPreguntas
        preguntas={leccion.preguntas.map((pregunta) => ({ pregunta, unidadId: unidad.id, leccionId: leccion.id, articuloId: tema.articuloId }))}
        objetivoMin={leccion.minutos}
        usaVidas={!libre}
        progresoInicial={0.25}
        segundosIniciales={segundosAlEmpezar.current}
        alSalir={volver}
        alTerminar={(r) => {
          const a = completar({ leccionId: leccion.id, articuloId: tema.articuloId, aciertos: r.aciertos, total: r.total });
          setFin({ r, a });
          setPaso('fin');
        }}
      />
    );
  }

  const cabecera = (
    <CabeceraSesion
      progreso={paso === 'intro' ? 0.08 : 0.18}
      vidas={libre ? undefined : cantidad}
      derecha={<Cronometro segundos={segundos} objetivoMin={leccion.minutos} />}
      alSalir={() => setSalir(true)}
    />
  );

  return (
    <div className="min-h-dvh bg-fondo">
      {cabecera}
      <div className="mx-auto max-w-2xl px-4 pt-2 pb-32">
        <p className="text-xs font-black tracking-widest text-suave uppercase">
          {unidad.generada ? 'Módulo' : 'Unidad'} {unidad.numero} · {art ? etiquetaArticulo(art) : ''} · Lección {indiceEnTema + 1} de {tema.lecciones.length}
        </p>
        <h1 className="mt-1 mb-4 text-2xl font-black">{leccion.titulo}</h1>

        {paso === 'intro' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex items-end gap-3">
              <Mascota tam={92} animo="feliz" className="shrink-0" />
              <div className="relative mb-6 rounded-2xl border-2 border-borde bg-superficie px-4 py-3 text-lg font-extrabold">
                {leccion.intro.titulo}
                <span className="absolute bottom-3 -left-2 h-4 w-4 rotate-45 border-b-2 border-l-2 border-borde bg-superficie" aria-hidden />
              </div>
            </div>
            {libre && indiceEnTema === 0 && (
              <p className="rounded-2xl bg-verde-100 px-4 py-2 text-sm font-bold text-verde-700 dark:bg-verde-700/30 dark:text-verde-500">
                🎈 Unidad de práctica libre: acá los errores no te quitan corazones.
              </p>
            )}
            <div className="space-y-3 text-[17px] leading-relaxed">
              <ParrafosGlosario parrafos={leccion.intro.parrafos} />
            </div>
            {leccion.intro.enLaPractica && (
              <div className="rounded-2xl border-2 border-azul-400/40 bg-azul-50 p-4 dark:bg-azul-700/25">
                <p className="text-xs font-black tracking-widest text-azul-500 uppercase">🏛️ En los tribunales bonaerenses</p>
                <div className="mt-1 text-[16px] leading-relaxed">
                  <ParrafosGlosario parrafos={[leccion.intro.enLaPractica]} />
                </div>
              </div>
            )}
            <BotonEscuchar
              id={`intro-${leccion.id}`}
              etiqueta="Escuchar explicación"
              texto={locuciones.intro(leccion).texto}
            />
          </motion.div>
        )}

        {paso === 'lectura' && art && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <p className="font-bold text-suave">📜 Leé la norma. Tocá las palabras subrayadas para ver su significado sin salir de la lección.</p>
            <TarjetaArticulo articulo={art} foco={leccion.foco} />
            {tema.relacionados && tema.relacionados.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-black tracking-widest text-suave uppercase">Leé también</p>
                <div className="flex flex-wrap gap-2">
                  {tema.relacionados.map((id) => {
                    const r = articulo(id);
                    return r ? (
                      <button key={id} onClick={() => setRelacionado(r)} className="opcion px-3 py-2 text-sm font-extrabold">
                        {etiquetaArticulo(r)} · {r.epigrafe}
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            )}
            {tema.falloClave && <TarjetaFallo fallo={tema.falloClave} idArticulo={tema.articuloId} plegable alAbrir={() => marcarFallo(tema.articuloId)} />}
            {tema.fallosRelacionados?.map((f) => (
              <TarjetaFallo key={f.caso} fallo={f} idArticulo={tema.articuloId} plegable />
            ))}
          </motion.div>
        )}
      </div>

      <BarraInferior>
        {paso === 'intro' ? (
          <Boton
            ancho
            variante="azul"
            onClick={() => {
              detener();
              setPaso('lectura');
              window.scrollTo({ top: 0 });
            }}
          >
            Leer la norma 📜
          </Boton>
        ) : (
          <Boton
            ancho
            onClick={() => {
              detener();
              segundosAlEmpezar.current = segundos;
              setPaso('preguntas');
            }}
          >
            ¡A practicar!
          </Boton>
        )}
      </BarraInferior>

      <Hoja abierta={!!relacionado} alCerrar={() => setRelacionado(null)} etiqueta="Artículo relacionado">
        {relacionado && <TarjetaArticulo articulo={relacionado} compacta />}
      </Hoja>
      <ConfirmarSalida abierta={salir} alCerrar={() => setSalir(false)} alSalir={volver} />
      <SinVidas abierta={!libre && cantidad <= 0} alSalir={volver} alSeguir={() => undefined} />
    </div>
  );
}
