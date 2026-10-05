import { useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Boton } from '../components/Boton';
import { Mascota } from '../components/Mascota';
import { PantallaResultado } from '../components/Resultado';
import { SesionPreguntas, type ResultadoSesion } from '../components/Sesion';
import { articulo, etiquetaArticulo } from '../data/codigos';
import { preguntasDeUnidad, preguntasParaPracticar, preguntasVistas, sinPenalidad, UNIDADES_NUCLEO, unidadesVisibles, unidadPorId } from '../data/curriculo';
import type { PreguntaEnContexto } from '../data/tipos';
import { armarRepasoDinamico, errorFrecuente, seleccionarParaRepaso } from '../lib/repaso';
import { volverAtras } from '../lib/navegacion';
import { useProgreso, type ResultadoActividad } from '../store/progreso';

const etiquetaDe = (q: PreguntaEnContexto) => {
  const a = articulo(q.articuloId);
  return a ? etiquetaArticulo(a) : undefined;
};

function Portada({ icono, titulo, texto, alEmpezar, alVolver, animo = 'pensando' }: { icono: string; titulo: string; texto: string; alEmpezar?: () => void; alVolver: () => void; animo?: 'pensando' | 'feliz' | 'triste' }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-fondo p-6 text-center">
      <Mascota animo={animo} tam={130} />
      <p className="text-5xl" aria-hidden>
        {icono}
      </p>
      <h1 className="text-2xl font-black">{titulo}</h1>
      <p className="max-w-md text-[16px] text-suave">{texto}</p>
      <div className="w-full max-w-sm space-y-2">
        {alEmpezar && (
          <Boton ancho onClick={alEmpezar}>
            Empezar
          </Boton>
        )}
        <Boton ancho variante="fantasma" onClick={alVolver}>
          Volver
        </Boton>
      </div>
    </div>
  );
}

/** Repaso dinámico obligatorio al final de cada unidad. */
export function PantallaRepaso() {
  const { unidadId = '' } = useParams();
  const navegar = useNavigate();
  const unidad = unidadPorId(unidadId);
  const estado = useProgreso();
  const [iniciado, setIniciado] = useState(false);
  const [fin, setFin] = useState<{ r: ResultadoSesion; a: ResultadoActividad } | null>(null);

  const preguntas = useMemo(() => {
    if (!unidad) return [];
    const { unidades } = unidadesVisibles(estado);
    const i = unidades.findIndex((u) => u.id === unidad.id);
    const anteriores = preguntasVistas(unidades.slice(0, Math.max(0, i)), estado);
    return armarRepasoDinamico(preguntasDeUnidad(unidad), anteriores, estado.preguntas);
    // Se arma una sola vez al entrar.
  }, [unidad?.id]);

  if (!unidad) return <Navigate to="/" replace />;

  if (fin) {
    return (
      <PantallaResultado
        titulo="¡Repaso superado! 🏆"
        aciertos={fin.r.aciertos}
        total={fin.r.total}
        segundos={fin.r.segundos}
        actividad={fin.a}
        extra={<p className="font-bold text-suave">Se habilitó el siguiente módulo y recuperaste un ❤️.</p>}
        alContinuar={() => navegar('/')}
      />
    );
  }

  if (!iniciado) {
    return (
      <Portada
        icono="🔁"
        titulo={`Repaso dinámico · ${unidad.titulo}`}
        texto="Antes de avanzar, Carpi mezcla preguntas de esta unidad con las que más te cuestan de unidades anteriores. Así no se olvida nada."
        alEmpezar={() => setIniciado(true)}
        alVolver={() => navegar('/')}
      />
    );
  }

  return (
    <SesionPreguntas
      preguntas={preguntas}
      usaVidas={!sinPenalidad(unidad.id)}
      etiqueta={etiquetaDe}
      alSalir={() => navegar('/')}
      alTerminar={(r) => setFin({ r, a: estado.completarRepaso(unidad.id, r.aciertos, r.total) })}
    />
  );
}

type Modo = 'rapida' | 'corazones' | 'errores';

/** Práctica rápida infinita, recuperación de corazones y repaso de errores. */
export function PantallaPractica() {
  const [params] = useSearchParams();
  const modo = (params.get('modo') as Modo) ?? 'rapida';
  const navegar = useNavigate();
  const estado = useProgreso();
  const [tanda, setTanda] = useState(0);
  const [iniciado, setIniciado] = useState(modo !== 'rapida');
  const [fin, setFin] = useState<{ r: ResultadoSesion; a: ResultadoActividad } | null>(null);

  const pool = useMemo(() => {
    const { unidades } = unidadesVisibles(estado);
    const practicadas = preguntasParaPracticar(unidades, estado);
    // Quien recién empieza (o se quedó sin corazones en su primera lección)
    // recupera repasando la Unidad 1.
    if (practicadas.length < 5 && modo === 'corazones') {
      const ids = new Set(practicadas.map((q) => q.pregunta.id));
      return [...practicadas, ...preguntasDeUnidad(UNIDADES_NUCLEO[0]).filter((q) => !ids.has(q.pregunta.id))];
    }
    return practicadas;
  }, []);

  const preguntas = useMemo(() => {
    if (modo === 'errores') {
      const conErrores = pool.filter((q) => errorFrecuente(estado.preguntas[q.pregunta.id]));
      return seleccionarParaRepaso(conErrores.length ? conErrores : pool, estado.preguntas, 8);
    }
    return seleccionarParaRepaso(pool, estado.preguntas, modo === 'corazones' ? 5 : 10);
  }, [pool, modo, tanda]);

  const titulos: Record<Modo, { icono: string; titulo: string; texto: string }> = {
    rapida: { icono: '∞', titulo: 'Práctica rápida aleatoria', texto: 'Tandas de 10 preguntas al azar de todo lo que ya estudiaste, priorizando lo que más se te olvida. Sin corazones: practicá todo lo que quieras.' },
    corazones: { icono: '❤️', titulo: 'Recuperá un corazón', texto: 'Respondé 5 preguntas de repaso para recuperar un corazón.' },
    errores: { icono: '🎯', titulo: 'Repasar mis errores', texto: 'Preguntas que fallaste recientemente, para que no vuelvan a aparecer en una audiencia.' },
  };
  const t = titulos[modo] ?? titulos.rapida;

  if (pool.length === 0) {
    return (
      <Portada
        icono="🌱"
        titulo={t.titulo}
        texto="Todavía no respondiste preguntas. Empezá la primera lección del camino (o elegí un tema) y acá vas a poder repasar todo lo que hayas intentado."
        alVolver={() => navegar('/')}
        animo="pensando"
      />
    );
  }

  if (fin) {
    return (
      <PantallaResultado
        titulo={modo === 'corazones' ? '¡Recuperaste un ❤️!' : '¡Tanda completada!'}
        aciertos={fin.r.aciertos}
        total={fin.r.total}
        segundos={fin.r.segundos}
        actividad={fin.a}
        textoBoton={modo === 'rapida' ? 'Otra tanda ∞' : 'Continuar'}
        extra={
          modo === 'rapida' ? (
            <button className="font-black text-azul-500" onClick={() => navegar('/entrenar')}>
              Terminar por hoy
            </button>
          ) : undefined
        }
        alContinuar={() => {
          if (modo === 'rapida') {
            setFin(null);
            setTanda((n) => n + 1);
          } else volverAtras(navegar);
        }}
      />
    );
  }

  if (!iniciado) return <Portada icono={t.icono} titulo={t.titulo} texto={t.texto} alEmpezar={() => setIniciado(true)} alVolver={() => volverAtras(navegar)} animo="feliz" />;

  return (
    <SesionPreguntas
      key={tanda}
      preguntas={preguntas}
      usaVidas={false}
      etiqueta={etiquetaDe}
      alSalir={() => volverAtras(navegar)}
      alTerminar={(r) => setFin({ r, a: estado.completarPractica(r.aciertos, modo === 'corazones') })}
    />
  );
}
