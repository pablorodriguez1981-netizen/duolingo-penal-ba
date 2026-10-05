/**
 * Generador de módulos dinámicos.
 *
 * Después de las unidades centrales (escritas a mano), el mapa sigue con
 * módulos que se construyen a partir del articulado:
 *  - Código Penal: texto literal importado del PDF (preguntas de completar,
 *    verdadero/falso sobre la pena, reconocimiento y reconstrucción del texto).
 *  - CPPBA: si se importó el texto oficial, se generan lecciones artículo por
 *    artículo; si no, se recorre la estructura del código (qué regula cada
 *    bloque y dónde está cada instituto).
 *
 * Todo es determinístico (semilla por id) para que los ids de preguntas sean
 * estables y el repaso espaciado funcione.
 */
import { elegir, rng, trocear } from '../lib/azar';
import {
  articulo,
  articulosCP,
  articulosCPPBAOficial,
  idDe,
  registrarArticulo,
  versionCodigos,
  type ArticuloImportado,
} from './codigos';
import { ESTRUCTURA_CPPBA, type BloqueCPPBA } from './estructura-cppba';
import { GLOSARIO } from './glosario';
import { comp, leccion, op, ord, vf, type PreguntaBorrador } from './helpers';
import type { Articulo, ColorUnidad, Leccion, Tema, Unidad } from './tipos';

const COLORES: ColorUnidad[] = ['turquesa', 'violeta', 'naranja', 'azul', 'rosa', 'verde', 'amarillo', 'rojo'];
const ARTICULOS_POR_MODULO = 4;

// ---------------------------------------------------------------------------
// Utilidades de texto
// ---------------------------------------------------------------------------

const NUM = '(?:[a-záéíóúñ]+|\\d+)';
const UNIDAD = '(?:d[ií]as?|mes(?:es)?|años?)';
const RE_PENA = new RegExp(
  `(reclusi[oó]n|prisi[oó]n|multa|inhabilitaci[oó]n)([^.;:]{0,60}?)\\bde\\s+(${NUM})(?:\\s+(${UNIDAD}))?\\s+a\\s+(${NUM})\\s+(${UNIDAD})`,
  'i',
);

export interface Pena {
  especie: string;
  minimo: string;
  maximo: string;
  /** Texto completo de la pena tal como aparece. */
  literal: string;
  /** Parte del máximo tal como aparece (para huecos). */
  maximoLiteral: string;
}

export function extraerPena(texto: string): Pena | null {
  const m = texto.match(RE_PENA);
  if (!m) return null;
  const [, especie, , min, uMin, max, uMax] = m;
  const minimo = `${min.toLowerCase()} ${(uMin ?? uMax).toLowerCase()}`;
  const maximoLiteral = `${max} ${uMax}`;
  return {
    especie: especie.toLowerCase(),
    minimo,
    maximo: `${max.toLowerCase()} ${uMax.toLowerCase()}`,
    literal: m[0].replace(/\s+/g, ' '),
    maximoLiteral,
  };
}

const PENAS_DISTRACTORAS = [
  'un mes',
  'seis meses',
  'un año',
  'dos años',
  'tres años',
  'cuatro años',
  'cinco años',
  'seis años',
  'ocho años',
  'diez años',
  'doce años',
  'quince años',
  'veinte años',
  'veinticinco años',
];

const NUM_DISTRACTORES = ['tres (3)', 'cinco (5)', 'diez (10)', 'quince (15)', 'veinte (20)', 'treinta (30)', 'veinticuatro (24)', 'cuarenta y ocho (48)', 'seis (6)', 'cuatro (4)', 'dos (2)', 'ocho (8)'];

function primeraOracion(texto: string): string {
  const p = texto.split('\n\n')[0];
  const m = p.match(/^.{20,}?[.:;](?=\s|$)/);
  return (m ? m[0] : p).trim();
}

function recortar(texto: string, max = 120): string {
  const limpio = texto.replace(/\s+/g, ' ').trim();
  if (limpio.length <= max) return limpio;
  return `${limpio.slice(0, max).replace(/\s+\S*$/, '')}…`;
}

/** Recorta alrededor de un índice para que la frase con hueco no sea eterna. */
function ventana(texto: string, desde: number, hasta: number, margen = 110): string {
  const ini = Math.max(0, desde - margen);
  const fin = Math.min(texto.length, hasta + margen);
  let s = texto.slice(ini, fin);
  if (ini > 0) s = `…${s.replace(/^\S*\s/, '')}`;
  if (fin < texto.length) s = `${s.replace(/\s\S*$/, '')}…`;
  return s.replace(/\s+/g, ' ');
}

const PALABRAS_VACIAS = new Set(
  'artículo artículos presente siguiente siguientes anterior cualquier cuando además respecto mediante durante también aquellos aquellas establecido establecida previstos prevista previsto dispuesto conforme'.split(
    ' ',
  ),
);

function palabrasLargas(texto: string): string[] {
  return [...new Set((texto.match(/[a-záéíóúñü]{9,}/gi) ?? []).map((p) => p.toLowerCase()))].filter(
    (p) => !PALABRAS_VACIAS.has(p),
  );
}

/** Correcta primero + distractores sin repetidos (ni entre sí ni con la correcta). */
function unicas(correcta: string, distractores: string[], max = 3): string[] {
  const vistos = new Set([correcta.toLowerCase()]);
  const out = [correcta];
  for (const d of distractores) {
    const k = d.toLowerCase();
    if (vistos.has(k)) continue;
    vistos.add(k);
    out.push(d);
    if (out.length > max) break;
  }
  return out;
}

const etiqueta = (a: Pick<Articulo, 'codigo' | 'numero'>) => `art. ${a.numero} ${a.codigo === 'CP' ? 'CP' : 'CPPBA'}`;

// ---------------------------------------------------------------------------
// Preguntas a partir del texto de un artículo
// ---------------------------------------------------------------------------

function preguntaCompletar(a: Articulo, vecinos: Articulo[], azar: () => number): PreguntaBorrador | null {
  const texto = a.texto.replace(/\n\n/g, ' ');
  const pena = extraerPena(texto);
  if (pena) {
    const idx = texto.indexOf(pena.literal);
    const idxMax = idx + pena.literal.lastIndexOf(pena.maximoLiteral);
    const frase = ventana(texto, idxMax, idxMax + pena.maximoLiteral.length).replace(pena.maximoLiteral, '___');
    if (frase.includes('___')) {
      const distractores = elegir(
        PENAS_DISTRACTORAS.filter((p) => p !== pena.maximo && p !== pena.minimo),
        3,
        azar,
      );
      return comp(
        `Completá la pena del ${etiqueta(a)}.`,
        frase,
        unicas(pena.maximo, distractores),
        `El ${etiqueta(a)} prevé ${pena.especie} de ${pena.minimo} a ${pena.maximo}.`,
      );
    }
  }
  // Plazos con números entre paréntesis: "veinticuatro (24) horas"
  const plazo = texto.match(/\b([a-záéíóúñ]+(?:\s+y\s+[a-záéíóúñ]+)?\s+\(\d+\))\s+(días|horas|meses|años)/i);
  if (plazo && plazo.index !== undefined) {
    const correcto = plazo[1];
    const frase = ventana(texto, plazo.index, plazo.index + correcto.length).replace(correcto, '___');
    return comp(
      `Completá el plazo del ${etiqueta(a)}.`,
      frase,
      unicas(correcto, elegir(NUM_DISTRACTORES, 4, azar)),
      `El ${etiqueta(a)} fija ${correcto} ${plazo[2]}.`,
    );
  }
  // Términos del glosario presentes en el texto
  const lower = texto.toLowerCase();
  const terminos = GLOSARIO.flatMap((t) => t.variantes.map((v) => ({ v, t })))
    .filter(({ v }) => v.length > 5 && new RegExp(`\\b${v.toLowerCase()}\\b`).test(lower))
    .sort((x, y) => y.v.length - x.v.length);
  const candidata = terminos[0];
  if (candidata) {
    const i = lower.indexOf(candidata.v.toLowerCase());
    const literal = texto.slice(i, i + candidata.v.length);
    const otros = elegir(
      GLOSARIO.filter((t) => t.id !== candidata.t.id).map((t) => t.termino.toLowerCase()),
      3,
      azar,
    );
    return comp(
      `Completá el ${etiqueta(a)}.`,
      ventana(texto, i, i + literal.length).replace(literal, '___'),
      unicas(literal, otros),
      `La palabra correcta es «${literal}». ${candidata.t.definicion}`,
    );
  }
  // Palabra larga del texto, con distractores de artículos vecinos
  const propias = palabrasLargas(texto);
  const ajenas = vecinos.flatMap((v) => palabrasLargas(v.texto)).filter((p) => !lower.includes(p));
  if (propias.length && ajenas.length >= 3) {
    const palabra = propias[Math.floor(azar() * propias.length)];
    const i = lower.indexOf(palabra);
    const literal = texto.slice(i, i + palabra.length);
    return comp(
      `Completá el ${etiqueta(a)} con la palabra exacta.`,
      ventana(texto, i, i + literal.length).replace(literal, '___'),
      unicas(literal, elegir([...new Set(ajenas)], 4, azar)),
      `El texto legal dice «${literal}».`,
    );
  }
  return null;
}

function preguntaPena(a: Articulo, azar: () => number): PreguntaBorrador | null {
  const pena = extraerPena(a.texto);
  if (!pena) return null;
  const verdadera = azar() < 0.5;
  const maximo = verdadera ? pena.maximo : elegir(PENAS_DISTRACTORAS.filter((p) => p !== pena.maximo && p !== pena.minimo), 1, azar)[0];
  return vf(
    `Según el ${etiqueta(a)}, la escala es de ${pena.especie} de ${pena.minimo} a ${maximo}.`,
    verdadera,
    `${verdadera ? 'Verdadero' : 'Falso'}: la escala prevista es de ${pena.minimo} a ${pena.maximo}.`,
  );
}

/** Sección (capítulo o título) donde se ubica el artículo. */
const seccion = (a: Articulo) => a.ubicacion?.split(' · ').at(-1) ?? '';

let seccionesCP: string[] | null = null;
function todasLasSecciones(a: Articulo): string[] {
  if (a.codigo === 'CPPBA') return ESTRUCTURA_CPPBA.map(nombreBloque);
  if (!seccionesCP) {
    seccionesCP = [
      ...new Set(
        articulosCP()
          .map((x) => (x.capitulo ?? x.titulo ?? '').split(' · ').slice(1).join(' · '))
          .filter(Boolean),
      ),
    ];
  }
  return seccionesCP;
}

function preguntaUbicacion(a: Articulo, azar: () => number): PreguntaBorrador | null {
  const propia = seccion(a);
  if (!propia) return null;
  const otras = todasLasSecciones(a).filter((x) => x && !x.includes(propia) && !propia.includes(x));
  if (otras.length === 0) return null;
  const verdadera = azar() < 0.5;
  const mostrada = verdadera ? propia : otras[Math.floor(azar() * otras.length)];
  return vf(`El ${etiqueta(a)} se ubica en «${mostrada}».`, verdadera, `Se ubica en: ${a.ubicacion}.`);
}

function preguntaReconocer(a: Articulo, vecinos: Articulo[], azar: () => number): PreguntaBorrador | null {
  const otros = vecinos.filter((v) => v.id !== a.id && recortar(v.texto) !== recortar(a.texto));
  if (otros.length < 2) return null;
  const opciones = unicas(recortar(a.texto, 110), elegir(otros, otros.length, azar).map((v) => recortar(v.texto, 110)));
  if (opciones.length < 3) return null;
  return op(
    `¿Cuál de estos textos corresponde al ${etiqueta(a)}?`,
    opciones,
    `El ${etiqueta(a)} comienza: «${recortar(a.texto, 160)}»`,
  );
}

function preguntaOrdenar(a: Articulo): PreguntaBorrador | null {
  const oracion = primeraOracion(a.texto);
  const palabras = oracion.split(/\s+/);
  if (palabras.length < 12 || palabras.length > 60) return null;
  const partes = 4;
  const tam = Math.ceil(palabras.length / partes);
  const pasos = trocear(palabras, tam).map((p) => p.join(' '));
  if (new Set(pasos).size !== pasos.length) return null;
  return ord(
    `Reconstruí el comienzo del ${etiqueta(a)}:`,
    pasos,
    `El texto dice: «${oracion}»`,
  );
}

export function leccionDeArticulo(a: Articulo, vecinos: Articulo[], idLeccion: string): Leccion {
  const azar = rng(idLeccion);
  const candidatas = [
    preguntaCompletar(a, vecinos, azar),
    preguntaPena(a, azar),
    preguntaReconocer(a, vecinos, azar),
    preguntaOrdenar(a),
    preguntaUbicacion(a, azar),
  ].filter((p): p is PreguntaBorrador => p !== null);
  const preguntas = candidatas.slice(0, 4);
  if (preguntas.length < 2) {
    preguntas.push(
      vf(
        `El ${etiqueta(a)} integra «${a.ubicacion ?? a.epigrafe}».`,
        true,
        `Verdadero: ${a.ubicacion ?? a.epigrafe}.`,
      ),
    );
  }
  const pena = extraerPena(a.texto);
  const codigo = a.codigo === 'CP' ? 'Código Penal' : 'Código Procesal Penal bonaerense';
  return leccion({
    id: idLeccion,
    titulo: `Art. ${a.numero} · ${a.epigrafe}`,
    minutos: Math.min(5, Math.max(3, Math.round(a.texto.length / 450) + 2)),
    intro: {
      titulo: a.epigrafe,
      parrafos: [
        `Artículo ${a.numero} del ${codigo}${a.ubicacion ? ` (${a.ubicacion})` : ''}.`,
        pena
          ? `Escala penal: ${pena.especie} de ${pena.minimo} a ${pena.maximo}. Recordá que el máximo define, entre otras cosas, la excarcelación (art. 169 CPPBA) y la probation (art. 76 bis CP).`
          : 'Leelo con atención: identificá a quién se dirige la norma, qué exige o permite y cuál es su consecuencia.',
        'Esta lección se generó automáticamente a partir del texto legal: las preguntas se basan en la letra del artículo.',
      ],
    },
    preguntas,
  });
}

// ---------------------------------------------------------------------------
// Lecciones a partir de la estructura del CPPBA (sin texto oficial)
// ---------------------------------------------------------------------------

const nombreBloque = (b: BloqueCPPBA) => (b.capitulo ?? b.titulo).split(' · ').slice(1).join(' · ') || b.titulo;
const libroCorto = (b: BloqueCPPBA) => b.libro.split(' · ')[0];

function articuloDeBloque(b: BloqueCPPBA): Articulo {
  const a: Articulo = {
    id: `cppba-bloque-${b.id}`,
    codigo: 'CPPBA',
    numero: `${b.desde} a ${b.hasta}`,
    epigrafe: nombreBloque(b),
    texto: [b.libro, b.titulo, b.capitulo, b.descripcion].filter(Boolean).join('\n\n'),
    ubicacion: `${b.libro} · ${b.titulo}`,
    sintetico: true,
  };
  registrarArticulo(a);
  return a;
}

function leccionDeBloque(b: BloqueCPPBA, idLeccion: string): Leccion {
  const azar = rng(idLeccion);
  const i = ESTRUCTURA_CPPBA.indexOf(b);
  const otros = ESTRUCTURA_CPPBA.filter((x) => x.id !== b.id);
  const distractores = elegir(otros, 3, azar);
  const otroLibro = elegir(
    [...new Set(ESTRUCTURA_CPPBA.map(libroCorto))].filter((l) => l !== libroCorto(b)),
    1,
    azar,
  )[0];
  const verdadera = azar() < 0.5;
  const desde = Math.max(0, Math.min(i, ESTRUCTURA_CPPBA.length - 4));
  const vecinos = ESTRUCTURA_CPPBA.slice(desde, desde + 4);
  const nombresVecinos = vecinos.map(nombreBloque);
  const preguntas: PreguntaBorrador[] = [
    op(
      `¿Qué regulan los arts. ${b.desde} a ${b.hasta} del CPPBA?`,
      unicas(recortar(b.descripcion, 115), distractores.map((d) => recortar(d.descripcion, 115))),
      `Los arts. ${b.desde} a ${b.hasta} (${nombreBloque(b)}): ${b.descripcion}`,
    ),
    op(
      `¿En qué artículos del CPPBA se regula «${nombreBloque(b)}»?`,
      unicas(`Arts. ${b.desde} a ${b.hasta}`, distractores.map((d) => `Arts. ${d.desde} a ${d.hasta}`)),
      `«${nombreBloque(b)}» está en los arts. ${b.desde} a ${b.hasta}.`,
    ),
    vf(
      `«${nombreBloque(b)}» integra el ${verdadera ? libroCorto(b) : otroLibro} del CPPBA.`,
      verdadera,
      `Integra el ${b.libro}.`,
    ),
  ];
  if (new Set(nombresVecinos).size === nombresVecinos.length && nombresVecinos.length >= 3) {
    preguntas.push(
      ord(
        'Ordená estos bloques según su ubicación en el código:',
        nombresVecinos,
        `Orden en el código: ${vecinos.map((v) => `${nombreBloque(v)} (arts. ${v.desde}-${v.hasta})`).join(' → ')}.`,
      ),
    );
  }
  return leccion({
    id: idLeccion,
    titulo: nombreBloque(b),
    minutos: 3,
    intro: {
      titulo: `Arts. ${b.desde} a ${b.hasta} · ${nombreBloque(b)}`,
      parrafos: [
        `${b.libro} › ${b.titulo}${b.capitulo ? ` › ${b.capitulo}` : ''}.`,
        b.descripcion,
        'Saber dónde está cada instituto en el código es clave para encontrarlo rápido en una audiencia o al redactar un escrito.',
      ],
    },
    preguntas,
  });
}

// ---------------------------------------------------------------------------
// Módulos
// ---------------------------------------------------------------------------

const rango = (desde: string, hasta: string) => (desde === hasta ? `art. ${desde}` : `arts. ${desde} a ${hasta}`);

function slug(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
}

interface Plantilla {
  id: string;
  titulo: string;
  subtitulo: string;
  etapa: string;
  icono: string;
  aviso?: string;
  /** Ids de los artículos que trata el módulo (para elegir un tema sin materializarlo). */
  articulos: string[];
  temas: () => Tema[];
}

function plantillasCP(excluir: Set<string>): Plantilla[] {
  const grupos = new Map<string, ArticuloImportado[]>();
  for (const a of articulosCP()) {
    if (excluir.has(idDe('cp', a.numero))) continue;
    const clave = `${a.titulo ?? ''}|${a.capitulo ?? ''}`;
    if (!grupos.has(clave)) grupos.set(clave, []);
    grupos.get(clave)!.push(a);
  }
  const out: Plantilla[] = [];
  for (const [clave, lista] of grupos) {
    const [titulo, capitulo] = clave.split('|');
    const partes = trocear(lista, ARTICULOS_POR_MODULO);
    partes.forEach((parte, i) => {
      const nombre = (capitulo ? capitulo.split(' · ')[1] : null) ?? titulo.split(' · ')[1] ?? 'Código Penal';
      const id = `g-cp-${slug(titulo)}-${slug(capitulo || 'general')}-${i + 1}`;
      out.push({
        id,
        titulo: `${nombre}${partes.length > 1 ? ` (${i + 1}/${partes.length})` : ''}`,
        subtitulo: `Código Penal · ${rango(parte[0].numero, parte[parte.length - 1].numero)}`,
        etapa: lista[0].libro?.startsWith('Libro Segundo') ? 'Código Penal · Parte especial' : 'Código Penal · Parte general',
        icono: '📕',
        articulos: parte.map((p) => idDe('cp', p.numero)),
        temas: () => {
          const arts = parte.map((p) => articulo(idDe('cp', p.numero))).filter((x): x is Articulo => !!x);
          const vecinos = lista
            .map((p) => articulo(idDe('cp', p.numero)))
            .filter((x): x is Articulo => !!x);
          return arts.map((a) => ({
            articuloId: a.id,
            lecciones: [leccionDeArticulo(a, vecinos.length > 3 ? vecinos : articulosVecinosCP(a), `${id}-${a.id}`)],
          }));
        },
      });
    });
  }
  return out;
}

function articulosVecinosCP(a: Articulo): Articulo[] {
  const lista = articulosCP();
  const i = lista.findIndex((x) => x.numero === a.numero);
  return lista
    .slice(Math.max(0, i - 4), i + 5)
    .map((x) => articulo(idDe('cp', x.numero)))
    .filter((x): x is Articulo => !!x);
}

function plantillasCPPBA(excluir: Set<string>): Plantilla[] {
  const oficiales = articulosCPPBAOficial();
  if (oficiales.length > 0) {
    const out: Plantilla[] = [];
    for (const b of ESTRUCTURA_CPPBA) {
      const delBloque = oficiales.filter((o) => {
        const n = parseInt(o.numero, 10);
        return n >= b.desde && n <= b.hasta && !excluir.has(idDe('cppba', o.numero));
      });
      const partes = trocear(delBloque, ARTICULOS_POR_MODULO);
      partes.forEach((parte, i) => {
        const id = `g-cppba-${b.id}-${i + 1}`;
        out.push({
          id,
          titulo: `${nombreBloque(b)}${partes.length > 1 ? ` (${i + 1}/${partes.length})` : ''}`,
          subtitulo: `CPPBA · ${rango(parte[0].numero, parte[parte.length - 1].numero)}`,
          etapa: b.libro,
          icono: '📘',
          articulos: parte.map((p) => idDe('cppba', p.numero)),
          temas: () => {
            const vecinos = delBloque.map((p) => articulo(idDe('cppba', p.numero))).filter((x): x is Articulo => !!x);
            return parte
              .map((p) => articulo(idDe('cppba', p.numero)))
              .filter((x): x is Articulo => !!x)
              .map((a) => ({ articuloId: a.id, lecciones: [leccionDeArticulo(a, vecinos, `${id}-${a.id}`)] }));
          },
        });
      });
    }
    return out;
  }
  // Sin texto oficial: recorrido por la estructura, de a 3 bloques del mismo libro.
  const porLibro = new Map<string, BloqueCPPBA[]>();
  for (const b of ESTRUCTURA_CPPBA) {
    if (!porLibro.has(b.libro)) porLibro.set(b.libro, []);
    porLibro.get(b.libro)!.push(b);
  }
  const out: Plantilla[] = [];
  for (const [libro, bloques] of porLibro) {
    trocear(bloques, 3).forEach((grupo) => {
      const id = `g-cppba-estructura-${grupo[0].id}`;
      out.push({
        id,
        titulo: `Mapa del CPPBA: ${nombreBloque(grupo[0])}${grupo.length > 1 ? ' y más' : ''}`,
        subtitulo: `${libro} · arts. ${grupo[0].desde} a ${grupo[grupo.length - 1].hasta}`,
        etapa: libro,
        icono: '🗺️',
        aviso: 'Módulo generado desde la estructura del CPPBA.',
        articulos: grupo.map((b) => `cppba-bloque-${b.id}`),
        temas: () =>
          grupo.map((b) => {
            const a = articuloDeBloque(b);
            return { articuloId: a.id, lecciones: [leccionDeBloque(b, `${id}-${b.id}`)] };
          }),
      });
    });
  }
  return out;
}

function intercalar<T>(a: T[], b: T[]): T[] {
  const out: T[] = [];
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) {
    if (i < a.length) out.push(a[i]);
    if (i < b.length) out.push(b[i]);
  }
  return out;
}

let cache: { clave: string; plantillas: Plantilla[]; unidades: Map<string, Unidad> } | null = null;

/** Lista (perezosa) de módulos generados, en el orden en que aparecen en el mapa. */
export function plantillasGeneradas(excluir: Set<string>, numeroInicial: number) {
  const clave = `${versionCodigos()}-${excluir.size}`;
  if (!cache || cache.clave !== clave) {
    cache = {
      clave,
      plantillas: intercalar(plantillasCPPBA(excluir), plantillasCP(excluir)),
      unidades: new Map(),
    };
  }
  const { plantillas, unidades } = cache;
  return {
    total: plantillas.length,
    ids: plantillas.map((p) => p.id),
    /** Lección generada para un artículo (id de lección), sin materializar el módulo. */
    leccionDe(articuloId: string): string | undefined {
      const p = plantillas.find((x) => x.articulos.includes(articuloId));
      return p ? `${p.id}-${articuloId}` : undefined;
    },
    /** Materializa (y memoriza) el módulo i-ésimo. */
    unidad(i: number): Unidad | undefined {
      const p = plantillas[i];
      if (!p) return undefined;
      let u = unidades.get(p.id);
      if (!u) {
        u = {
          id: p.id,
          numero: numeroInicial + i,
          titulo: p.titulo,
          subtitulo: p.subtitulo,
          etapa: p.etapa,
          color: COLORES[i % COLORES.length],
          icono: p.icono,
          temas: p.temas(),
          generada: true,
          aviso: p.aviso,
        };
        unidades.set(p.id, u);
      }
      return u;
    },
  };
}
