#!/usr/bin/env node
/**
 * Importa el articulado de un código desde un PDF, un .docx o un .txt y lo
 * guarda como JSON en src/data/codigos/.
 *
 * Uso:
 *   node scripts/importar-codigo.mjs --codigo CP    --pdf Codigo_Penal.pdf
 *   node scripts/importar-codigo.mjs --codigo CPPBA --docx Ley_11922.docx
 *   node scripts/importar-codigo.mjs --codigo CPPBA --html V9OGJUPx.html   (normas.gba.gob.ar)
 *   node scripts/importar-codigo.mjs --codigo CPPBA --txt cppba.txt
 *
 * Requiere `pdftotext` (poppler-utils) para PDF y `python3` para .docx.
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
if (!['CP', 'CPPBA'].includes(codigo) || (!args.pdf && !args.txt && !args.docx && !args.html)) {
  console.error('Uso: node scripts/importar-codigo.mjs --codigo CP|CPPBA --pdf archivo.pdf | --docx archivo.docx | --html archivo.html | --txt archivo.txt');
  process.exit(1);
}

/** En PDF (pdftotext -layout) los encabezados se reconocen por estar centrados; en texto plano, por su forma. */
const modoPlano = !args.pdf;

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
  ['Libro Primero · Disposiciones generales', 'Título V · Imputabilidad', '34', '41 quinquies'],
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
  ['Libro Segundo · De los delitos', 'Título XIII · Delitos contra el orden económico y financiero', '303', '313'],
  ['Disposiciones complementarias', 'Disposiciones complementarias', '314', '316'],
];

/** Epígrafes de varias oraciones que la heurística no puede separar del texto. */
const EPIGRAFES_CPPBA = {
  1: 'Juez natural y juicio por jurados. Juicio previo. Principio de inocencia. Non bis in idem. Inviolabilidad de la defensa. Favor rei.',
  '334 bis': 'Pedido de sobreseimiento del Fiscal. Acusación Particular.',
};

/** Rúbricas que continúan después del primer punto ("Calidad. Instancias. Se considerará…"). */
const CONTINUACION_EPIGRAFE_CPPBA = {
  60: 'Instancias.',
  92: 'Sustitución.',
  142: 'Efectos. Obligación Fiscal.',
  338: 'Citación a Juicio.',
  '338 bis': 'Condiciones. Impedimentos. Remuneración.',
  339: 'Luego de la instrucción suplementaria. Indemnización y anticipo de gastos.',
  370: 'Grabación y versión taquigráfica.',
  483: 'Plazo.',
};

const SUFIJOS = ['bis', 'ter', 'quater', 'quinquies', 'sexies', 'septies', 'octies', 'nonies', 'decies'];

/** "76 bis" -> 76.01 ; permite ordenar y comparar rangos. */
export function ordenDe(numero) {
  const [n, suf] = numero.split(' ');
  const i = suf ? SUFIJOS.indexOf(suf) + 1 : 0;
  return Number(n) + i / 100;
}

function extraerTexto() {
  if (args.txt) return readFileSync(args.txt, 'utf8');
  if (args.html) {
    return execFileSync('python3', [resolve(raiz, 'scripts/html-a-texto.py'), args.html], {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    });
  }
  if (args.docx) {
    return execFileSync('python3', [resolve(raiz, 'scripts/docx-a-texto.py'), args.docx], {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    });
  }
  return execFileSync('pdftotext', ['-layout', '-enc', 'UTF-8', args.pdf, '-'], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
}

const RE_ARTICULO =
  /^ART[IÍ]CULO\s+(\d+)\s*(?:[º°o](?=[\s.\-–—:]))?\s*(bis|ter|qu[aá]ter|cuater|quinquies|sexies|septies|octies|nonies|decies)?(?![a-záéíóúñ])\s*[º°]?\s*[.\-–—:]*\s*(.*)$/i;
const RE_NOTA =
  /\s*\((?=[^()]*(?:sustituid[oa]s?|incorporad[oa]s?|derogad[oa]s?|modificad[oa]s?|vetad[oa]s?|actualizad[oa]s?|renumerad[oa]s?|Nota Infoleg|observad[oa]))[^()]*\)\s*/g;
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

  let previaEsEncabezado = false;
  for (const original of lineas) {
    if (modoPlano) {
      const l = limpiarLinea(original);
      if (!l) {
        cerrarParrafo();
        continue;
      }
      // Fin del articulado: fórmula de promulgación o notas finales.
      if (/^(Dada en la Sala|REGISTRADA bajo|NOTA\s*:)/i.test(l)) {
        cerrarParrafo();
        actual = null;
        continue;
      }
      if (!RE_ARTICULO.test(l)) {
        const esEncabezado =
          /^(LIBRO|T[IÍ]TULO|CAP[IÍ]TULO|Cap[ií]tulo|SECCI[OÓ]N|Secci[oó]n)\b/.test(l) ||
          (/[A-ZÁÉÍÓÚÑ]/.test(l) && !/[a-záéíóúñ]/.test(l) && l.length <= 140) ||
          (previaEsEncabezado && l.length <= 90 && !/[.:;]$/.test(l) && !/^\d/.test(l));
        if (esEncabezado) {
          cerrarParrafo();
          previaEsEncabezado = true;
          continue;
        }
      }
      previaEsEncabezado = false;
    }
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
      const numero = m[2] ? `${m[1]} ${m[2].toLowerCase().replace(/^(qu[aá]|cua)ter$/, 'quater')}` : m[1];
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
      .map((p) =>
        p
          .replace(/\s+/g, ' ')
          .replace(/\s+([.,;:])/g, '$1')
          .replace(/\.\s*\.(?!\.)/g, '.')
          .replace(/^[-–—.\s]+/, '')
          .replace(/\.-$/, '.')
          .trim(),
      )
      .filter((p) => p && !/^Ver Antecedentes Normativos$/i.test(p));
    // CPPBA: "(Texto según Ley 12.059) Acción pública.- La acción penal..." → nota + epígrafe + texto.
    let epigrafe = null;
    if (parrafos.length) {
      let primero = parrafos[0];
      // Notas de reforma al comienzo: "(Texto según Ley 15004)", "(Ver Ley 13811)", "(Texto según Ley 13252 Requisitos..." (sin cerrar).
      const previas = [];
      for (;;) {
        const segun =
          primero.match(/^\(\s*(Texto(?:\s+seg[uú]n)?\s+Ley[^)]*|Texto seg[uú]n[^)]*|Texto sustituido[^)]*|Art[ií]culo\s+\w+[^)]*|Incorporado[^)]*|Sustituido[^)]*|Ver\s+Ley[^)]*)\)\s*[-–.]*\s*/i) ??
          primero.match(/^\(\s*(Texto seg[uú]n Ley \d+)\s+(?=[A-ZÁÉÍÓÚÑ])/);
        if (!segun) break;
        previas.push(segun[1].replace(/\s+/g, ' ').trim());
        primero = primero.slice(segun[0].length);
      }
      notas.unshift(...previas);
      if (codigo === 'CPPBA' && EPIGRAFES_CPPBA[a.numero] && primero.startsWith(EPIGRAFES_CPPBA[a.numero])) {
        epigrafe = EPIGRAFES_CPPBA[a.numero].replace(/\.$/, '');
        primero = primero.slice(EPIGRAFES_CPPBA[a.numero].length);
      }
      // Epígrafe en un párrafo propio: "Debate ante el Tribunal de jurados ."
      const propio = parrafos.length > 1 && primero.match(/^([A-ZÁÉÍÓÚÑ][^.:;]{2,90}?)\s*\.?\s*$/);
      const dosPuntos = primero.match(/^([A-ZÁÉÍÓÚÑ][^.:;]{2,80}?)\s*:\s*(?=[A-ZÁÉÍÓÚÑ(])/);
      const conGuion = primero.match(/^([^.]{0,40}?[A-ZÁÉÍÓÚÑ][^]{2,170}?)\s*\.\s*-\s*(?=\S)/);
      const corto = primero.match(/^([A-ZÁÉÍÓÚÑ][^.:;]{2,90}?)\.\s+(?=[A-ZÁÉÍÓÚÑ(])/);
      const mayusculas = primero.match(/^([A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ ]{2,40}?)\s*:\s*/);
      const soloGuion = primero.match(/^([A-ZÁÉÍÓÚÑ][^.:;]{2,90}?)-\s+(?=[A-ZÁÉÍÓÚÑ])/);
      if (epigrafe) {
        // definido por EPIGRAFES_CPPBA
      } else if (codigo === 'CPPBA' && propio && propio[1].split(/\s+/).length <= 10 && !/[a-záéíóúñ]+r(á|án)(?![a-záéíóúñ])|\b(es|son)\b/i.test(propio[1])) {
        epigrafe = propio[1].trim();
        primero = '';
      } else if (codigo === 'CPPBA' && mayusculas) {
        const e = mayusculas[1].trim().toLowerCase();
        epigrafe = e.charAt(0).toUpperCase() + e.slice(1);
        primero = primero.slice(mayusculas[0].length);
      } else if (codigo === 'CPPBA' && conGuion && !/\b(será|podrá|deberá|se\s+\w+rá)\b/i.test(conGuion[1])) {
        epigrafe = conGuion[1].trim();
        primero = primero.slice(conGuion[0].length);
      } else if (codigo === 'CPPBA' && dosPuntos && dosPuntos[1].split(/\s+/).length <= 8 && !/\b\w+(r[aá]n?|ndo|an|en)\b\s*$/.test(dosPuntos[1])) {
        epigrafe = dosPuntos[1].trim();
        primero = primero.slice(dosPuntos[0].length);
      } else if (codigo === 'CPPBA' && corto && corto[1].split(/\s+/).length <= 10) {
        epigrafe = corto[1].trim();
        primero = primero.slice(corto[0].length);
      } else if (codigo === 'CPPBA' && soloGuion && soloGuion[1].split(/\s+/).length <= 8) {
        epigrafe = soloGuion[1].trim();
        primero = primero.slice(soloGuion[0].length);
      }
      const sigue = codigo === 'CPPBA' && epigrafe && CONTINUACION_EPIGRAFE_CPPBA[a.numero];
      if (sigue && primero.replace(/^[-–—.\s]+/, '').startsWith(sigue)) {
        epigrafe = `${epigrafe.replace(/\.$/, '')}. ${sigue.replace(/\.$/, '')}`;
        primero = primero.replace(/^[-–—.\s]+/, '').slice(sigue.length);
      }
      parrafos[0] = primero.replace(/^[-–—.\s]+/, '');
      if (!parrafos[0]) parrafos.shift();
    }
    // Texto observado por el decreto de promulgación (subrayado en la fuente): no es ley vigente.
    const esNotaVeto = (p) => /^[·*•]?\s*Los? subrayado/i.test(p.replace(/[⟦⟧]/g, ''));
    const hayVeto = parrafos.some(esNotaVeto) || notas.some((n) => /subrayad/i.test(n));
    for (let i = parrafos.length - 1; i >= 0; i--) {
      if (esNotaVeto(parrafos[i])) notas.push(parrafos.splice(i, 1)[0].replace(/[⟦⟧]/g, '').replace(/^[·*•]\s*/, ''));
    }
    for (let i = 0; i < parrafos.length; i++) {
      let quitado = false;
      parrafos[i] = parrafos[i]
        .replace(/⟦([^⟧]*)⟧/g, (_, observado) => {
          if (!hayVeto || !observado.trim()) return observado;
          notas.push(`Texto observado (no vigente): «${observado.trim()}»`);
          quitado = true;
          return '';
        })
        .replace(/[⟦⟧]/g, '')
        .replace(/\s+([.,;:])/g, '$1')
        .replace(/\s{2,}/g, ' ')
        .trim();
      if (quitado && /[\p{L})]$/u.test(parrafos[i])) parrafos[i] += '.';
    }
    if (epigrafe) epigrafe = epigrafe.replace(/[⟦⟧]/g, '').trim();
    for (let i = parrafos.length - 1; i >= 0; i--) if (!parrafos[i]) parrafos.splice(i, 1);
    const texto = parrafos.join('\n\n').replace(/\s*\.-$/, '.');
    const derogado = !texto || /^\(?\s*derogado\b/i.test(texto) || /^\(?\s*art[ií]culo derogado/i.test(texto) || (notas.some((n) => /derogad/i.test(n)) && texto.length < 5);
    const ubicacion = codigo === 'CP' ? ubicarCP(a.numero) : { libro: null, titulo: null };
    resultado.push({
      numero: a.numero,
      orden: ordenDe(a.numero),
      ...(epigrafe ? { epigrafe } : {}),
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

// "(Texto actualizado con las modificaciones introducidas por las Leyes ...)" al inicio del documento.
const version =
  (texto.slice(0, 3000).match(/\(\s*(Texto\s+actualizado[^)]+)\)/i) ?? texto.slice(0, 3000).match(/^\s*(Texto\s+actualizado[^\n]+?)\.?\s*$/im))?.[1]
    .replace(/\s+/g, ' ')
    .replace(/\s+,/g, ',')
    .trim() ?? null;

const salida = {
  codigo,
  ...META[codigo],
  version,
  fuente: args.fuente ?? `Documento importado: ${(args.pdf ?? args.docx ?? args.html ?? args.txt).split('/').pop()}`,
  ultimaReformaDetectada: ultimaReforma
    ? `Ley ${ultimaReforma.ley} (B.O. ${ultimaReforma.fecha})`
    : version?.match(/(\d{2})\.?(\d{3})\s*$/)
      ? `Ley ${version.match(/(\d{2})\.?(\d{3})\s*$/).slice(1).join('.')}`
      : null,
  ...(args.enlace ? { enlace: args.enlace } : {}),
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
