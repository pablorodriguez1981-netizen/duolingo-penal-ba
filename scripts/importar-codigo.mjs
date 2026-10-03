#!/usr/bin/env node
/**
 * Importa el articulado de un código desde un PDF (o un .txt extraído con
 * `pdftotext -layout`) y lo guarda como JSON en src/data/codigos/.
 *
 * Uso:
 *   node scripts/importar-codigo.mjs --codigo CP    --pdf Codigo_Penal.pdf
 *   node scripts/importar-codigo.mjs --codigo CPPBA --pdf Ley_11922.pdf
 *   node scripts/importar-codigo.mjs --codigo CPPBA --txt cppba.txt
 *
 * El texto de cada artículo se conserva literal: sólo se reconstruyen los
 * párrafos cortados por el salto de línea del PDF y se separan las notas de
 * reforma ("Artículo sustituido por...") en el campo `notas`.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .reduce((acc, a, i, arr) => (a.startsWith('--') ? [...acc, [a.slice(2), arr[i + 1]]] : acc), []),
);

const codigo = (args.codigo || '').toUpperCase();
if (!['CP', 'CPPBA'].includes(codigo) || (!args.pdf && !args.txt)) {
  console.error('Uso: node scripts/importar-codigo.mjs --codigo CP|CPPBA --pdf archivo.pdf | --txt archivo.txt');
  process.exit(1);
}

const META = {
  CP: {
    nombre: 'Código Penal de la Nación Argentina',
    ley: 'Ley 11.179 (T.O. 1984 actualizado)',
  },
  CPPBA: {
    nombre: 'Código Procesal Penal de la Provincia de Buenos Aires',
    ley: 'Ley 11.922 y modificatorias',
  },
};

/** Títulos del CP con sus rangos (según el índice temático del propio código). */
const TITULOS_CP = [
  ['Libro Primero · Disposiciones generales', 'Título I · Aplicación de la ley penal', '1', '4'],
  ['Libro Primero · Disposiciones generales', 'Título II · De las penas', '5', '25'],
  ['Libro Primero · Disposiciones generales', 'Título III · Condenación condicional', '26', '29'],
  ['Libro Primero · Disposiciones generales', 'Título IV · Reparación de perjuicios', '30', '33'],
  ['Libro Primero · Disposiciones generales', 'Título V · Imputabilidad', '34', '41 quater'],
  ['Libro Primero · Disposiciones generales', 'Título VI · Tentativa', '42', '44'],
  ['Libro Primero · Disposiciones generales', 'Título VII · Participación criminal', '45', '49'],
  ['Libro Primero · Disposiciones generales', 'Título VIII · Reincidencia', '50', '53'],
  ['Libro Primero · Disposiciones generales', 'Título IX · Concurso de delitos', '54', '58'],
  ['Libro Primero · Disposiciones generales', 'Título X · Extinción de acciones y de penas', '59', '70'],
  ['Libro Primero · Disposiciones generales', 'Título XI · Del ejercicio de las acciones', '71', '76'],
  ['Libro Primero · Disposiciones generales', 'Título XII · De la suspensión del juicio a prueba', '76 bis', '76 quater'],
  ['Libro Primero · Disposiciones generales', 'Título XIII · Significación de conceptos empleados en el código', '77', '78 bis'],
  ['Libro Segundo · De los delitos', 'Título I · Delitos contra las personas', '79', '108'],
  ['Libro Segundo · De los delitos', 'Título II · Delitos contra el honor', '109', '117 bis'],
  ['Libro Segundo · De los delitos', 'Título III · Delitos contra la integridad sexual', '118', '133'],
  ['Libro Segundo · De los delitos', 'Título IV · Delitos contra el estado civil', '134', '139 bis'],
  ['Libro Segundo · De los delitos', 'Título V · Delitos contra la libertad', '140', '161'],
  ['Libro Segundo · De los delitos', 'Título VI · Delitos contra la propiedad', '162', '185'],
  ['Libro Segundo · De los delitos', 'Título VII · Delitos contra la seguridad pública', '186', '208'],
  ['Libro Segundo · De los delitos', 'Título VIII · Delitos contra el orden público', '209', '213 bis'],
  ['Libro Segundo · De los delitos', 'Título IX · Delitos contra la seguridad de la Nación', '214', '225'],
  ['Libro Segundo · De los delitos', 'Título X · Delitos contra los poderes públicos y el orden constitucional', '226', '236'],
  ['Libro Segundo · De los delitos', 'Título XI · Delitos contra la administración pública', '237', '281 bis'],
  ['Libro Segundo · De los delitos', 'Título XII · Delitos contra la fe pública', '282', '302'],
  ['Disposiciones complementarias', 'Disposiciones complementarias', '303', '305'],
];

const SUFIJOS = ['bis', 'ter', 'quater', 'quinquies', 'sexies', 'septies', 'octies', 'nonies', 'decies'];

/** "76 bis" -> 76.01 ; permite ordenar y comparar rangos. */
export function ordenDe(numero) {
  const [n, suf] = numero.split(' ');
  const i = suf ? SUFIJOS.indexOf(suf) + 1 : 0;
  return Number(n) + i / 100;
}

function extraerTexto() {
  if (args.txt) return readFileSync(args.txt, 'utf8');
  return execFileSync('pdftotext', ['-layout', '-enc', 'UTF-8', args.pdf, '-'], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
}

const RE_ARTICULO =
  /^ART[IÍ]CULO\s+(\d+)\s*(?:[º°o](?=[\s.\-–—:]))?\s*(bis|ter|quater|quinquies|sexies|septies|octies|nonies|decies)?\b\s*[º°]?\s*[.\-–—:]*\s*(.*)$/i;
const RE_NOTA =
  /\s*\((?=[^()]*(?:sustituid[oa]s?|incorporad[oa]s?|derogad[oa]s?|modificad[oa]s?|vetad[oa]s?|actualizad[oa]s?|Nota Infoleg|observad[oa]))[^()]*\)\s*/g;
const RE_CAPITULO = /^\s{8,}Cap[ií]tulo\s+([IVXLC]+(?:\s+bis)?)\b\.?\s*(.*)$/i;
const RE_TITULO = /^\s{8,}T[IÍ]TULO\s+([IVXLC]+)\s*$/i;

function limpiarLinea(l) {
  return l.replace(/ /g, ' ').replace(/[ \t]+/g, ' ').trim();
}

function parsear(texto) {
  const lineas = texto
    .replace(/\f/g, '\n\n')
    // artículos pegados al final de otro párrafo: "...penado.ARTICULO 301 bis.-"
    .replace(/([.;:)])\s*(ART[IÍ]CULO\s+\d)/g, '$1\n\n$2')
    .split('\n');

  const articulos = [];
  let actual = null;
  let capitulo = null;
  let esperandoNombreCapitulo = false;
  let parrafo = [];

  const cerrarParrafo = () => {
    if (!actual || parrafo.length === 0) return;
    actual.parrafos.push(parrafo.join(' '));
    parrafo = [];
  };

  for (const original of lineas) {
    const cap = original.match(RE_CAPITULO);
    if (cap) {
      cerrarParrafo();
      capitulo = { numero: cap[1], nombre: limpiarLinea(cap[2] || '') };
      esperandoNombreCapitulo = !capitulo.nombre;
      continue;
    }
    if (RE_TITULO.test(original)) {
      cerrarParrafo();
      capitulo = null;
      continue;
    }
    const linea = limpiarLinea(original);
    if (!linea) {
      cerrarParrafo();
      continue;
    }
    // Encabezados centrados (rúbricas de capítulo, nombres de título)
    const centrado = /^\s{15,}/.test(original) && !RE_ARTICULO.test(linea);
    if (centrado) {
      cerrarParrafo();
      if (esperandoNombreCapitulo && capitulo) {
        capitulo.nombre = linea;
        esperandoNombreCapitulo = false;
      } else if (linea.length > 3 && linea === linea.toUpperCase()) {
        capitulo = null; // nombre de un nuevo título o "DISPOSICIONES COMPLEMENTARIAS"
      }
      continue;
    }
    const m = linea.match(RE_ARTICULO);
    if (m) {
      cerrarParrafo();
      esperandoNombreCapitulo = false;
      const numero = m[2] ? `${m[1]} ${m[2].toLowerCase()}` : m[1];
      actual = {
        numero,
        capitulo: capitulo ? `Capítulo ${capitulo.numero}${capitulo.nombre ? ` · ${capitulo.nombre}` : ''}` : null,
        parrafos: [],
      };
      articulos.push(actual);
      if (m[3]) parrafo.push(m[3]);
      continue;
    }
    if (/^Antecedentes Normativos$/i.test(linea)) {
      cerrarParrafo();
      actual = null; // lo que sigue es el historial de reformas, no texto legal
      continue;
    }
    if (actual) parrafo.push(linea);
  }
  cerrarParrafo();
  return articulos;
}

/** Une párrafos partidos por un salto de página (el siguiente empieza en minúscula). */
function unirCortes(parrafos) {
  const out = [];
  for (const p of parrafos) {
    const prev = out[out.length - 1];
    if (prev && !/[.:;)\-]$/.test(prev) && /^[a-záéíóúñ]/.test(p)) out[out.length - 1] = `${prev} ${p}`;
    else out.push(p);
  }
  return out;
}

function normalizar(articulos) {
  const vistos = new Set();
  const resultado = [];
  for (const a of articulos) {
    if (vistos.has(a.numero)) continue; // ignora duplicados (p. ej. índices)
    vistos.add(a.numero);
    const notas = [];
    const parrafos = unirCortes(a.parrafos)
      .map((p) =>
        p.replace(RE_NOTA, (nota) => {
          notas.push(nota.trim().replace(/^\(|\)$/g, '').replace(/\s+/g, ' '));
          return ' ';
        }),
      )
      .map((p) => p.replace(/\s+/g, ' ').replace(/^[-–—.\s]+/, '').replace(/\.-$/, '.').trim())
      .filter((p) => p && !/^Ver Antecedentes Normativos$/i.test(p));
    const texto = parrafos.join('\n\n');
    const derogado = !texto || /^derogado\.?$/i.test(texto) || /^\(?\s*art[ií]culo derogado/i.test(texto) || (notas.some((n) => /derogad/i.test(n)) && texto.length < 5);
    const ubicacion = codigo === 'CP' ? ubicarCP(a.numero) : { libro: null, titulo: null };
    resultado.push({
      numero: a.numero,
      orden: ordenDe(a.numero),
      ...ubicacion,
      capitulo: a.capitulo,
      texto,
      notas,
      derogado,
    });
  }
  return resultado.sort((x, y) => x.orden - y.orden);
}

function ubicarCP(numero) {
  const o = ordenDe(numero);
  const t = TITULOS_CP.find(([, , desde, hasta]) => o >= ordenDe(desde) && o <= ordenDe(hasta) + 0.0999);
  return t ? { libro: t[0], titulo: t[1] } : { libro: null, titulo: null };
}

const texto = extraerTexto();
const articulos = normalizar(parsear(texto));
const ultimaReforma = [...texto.matchAll(/Ley N?°?\s*(\d{2}\.\d{3})[^)]{0,40}?B\.?\s*O\.?\s*(\d{1,2}\/\d{1,2}\/\d{4})/g)]
  .map((m) => ({ ley: m[1], fecha: m[2], n: Number(m[1].replace('.', '')) }))
  .sort((a, b) => b.n - a.n)[0];

const salida = {
  codigo,
  ...META[codigo],
  fuente: args.pdf ? `PDF importado: ${args.pdf.split('/').pop()}` : 'Texto importado',
  ultimaReformaDetectada: ultimaReforma ? `Ley ${ultimaReforma.ley} (B.O. ${ultimaReforma.fecha})` : null,
  importadoEl: new Date().toISOString().slice(0, 10),
  articulos,
};

const destino = resolve(raiz, args.out || `src/data/codigos/${codigo.toLowerCase()}.json`);
mkdirSync(dirname(destino), { recursive: true });
writeFileSync(destino, `${JSON.stringify(salida, null, 1)}\n`);
console.log(
  `✔ ${articulos.length} artículos (${articulos.filter((a) => !a.derogado).length} vigentes) → ${destino}` +
    (ultimaReforma ? `\n  Última reforma detectada en el texto: ${salida.ultimaReformaDetectada}` : ''),
);
