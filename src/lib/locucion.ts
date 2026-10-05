/**
 * Textos que la app lee en voz alta. Los usan la interfaz (para reproducir)
 * y el generador de audios (scripts/generar-audios.ts), así cada audio
 * grabado corresponde exactamente al texto que se muestra.
 *
 * - `texto`: lo que se muestra y se usa como clave del audio.
 * - `guion`: lo que se envía a la voz natural, con abreviaturas desarrolladas
 *   y etiquetas de interpretación de Eleven v4 («[pause]», tono, etc.).
 */
import { etiquetaArticulo } from '../data/codigos';
import type { Articulo, CasoPractico, FalloClave, Leccion, Pregunta, TerminoGlosario } from '../data/tipos';

export type TipoLocucion = 'intro' | 'articulo' | 'fallo' | 'pregunta' | 'caso' | 'glosario';

export interface Locucion {
  tipo: TipoLocucion;
  texto: string;
  guion: string;
}

/** Adapta abreviaturas jurídicas para que la voz las lea bien. */
export function textoParaVoz(texto: string): string {
  return texto
    .replace(/\bCPPBA\b/g, 'Código Procesal Penal bonaerense')
    .replace(/\bCP\b/g, 'Código Penal')
    .replace(/\bCN\b/g, 'Constitución Nacional')
    .replace(/\bCADH\b/g, 'Convención Americana sobre Derechos Humanos')
    .replace(/\bPIDCP\b/g, 'Pacto Internacional de Derechos Civiles y Políticos')
    .replace(/\bIPP\b/g, 'I P P')
    .replace(/\bUFI\b/g, 'U F I')
    .replace(/\bSCBA\b/g, 'Suprema Corte bonaerense')
    .replace(/\bCSJN\b/g, 'Corte Suprema')
    .replace(/\bTCP\b/g, 'Tribunal de Casación Penal')
    .replace(/\bCorte IDH\b/g, 'Corte Interamericana')
    .replace(/\bCIDH\b/g, 'Comisión Interamericana')
    .replace(/\barts?\.\s/gi, (m) => (m.toLowerCase().startsWith('arts') ? 'artículos ' : 'artículo '))
    .replace(/\bincs?\.\s/gi, (m) => (m.toLowerCase().startsWith('incs') ? 'incisos ' : 'inciso '))
    .replace(/\bap\.\s/gi, 'apartado ')
    .replace(/\bB\.\s?O\.\s?/g, 'Boletín Oficial ')
    .replace(/\s\(\d+\)/g, '')
    .replace(/\(\d+\)\s/g, '')
    .replace(/(\d+)\s?[º°]/g, '$1.º')
    .replace(/^(\d+)\s?[.)]-?\s*/gm, '$1. ')
    .replace(/___/g, 'espacio en blanco');
}

const unir = (partes: (string | undefined | null)[]) => partes.filter((p): p is string => !!p && !!p.trim()).join('. ');
const pausas = (partes: (string | undefined | null)[]) =>
  partes
    .filter((p): p is string => !!p && !!p.trim())
    .map((p) => textoParaVoz(p.trim()).replace(/[.\s]+$/, '.'))
    .join(' [pause] ');

export const locuciones = {
  intro(l: Leccion): Locucion {
    return {
      tipo: 'intro',
      texto: unir([l.intro.titulo, ...l.intro.parrafos, l.intro.enLaPractica]),
      guion: `[warm, friendly tutor explaining to a law student] ${pausas([l.intro.titulo, ...l.intro.parrafos])}${
        l.intro.enLaPractica ? ` [pause] [practical, conversational] En los tribunales bonaerenses: ${textoParaVoz(l.intro.enLaPractica)}` : ''
      }`,
    };
  },
  articulo(a: Articulo): Locucion {
    const etiqueta = etiquetaArticulo(a);
    return {
      tipo: 'articulo',
      texto: `${etiqueta}. ${a.epigrafe}. ${a.texto}`,
      guion: `[calm, clear, measured reading of a legal text] ${pausas([etiqueta, a.epigrafe, ...a.texto.split('\n\n')])}`,
    };
  },
  fallo(f: FalloClave): Locucion {
    return {
      tipo: 'fallo',
      texto: `${f.caso}. ${f.resumen}. La regla: ${f.regla}`,
      guion: `[engaging, clear storytelling] ${pausas([f.caso, f.resumen])} [pause] [emphatic, memorable] La regla: ${textoParaVoz(f.regla)}`,
    };
  },
  pregunta(q: Pregunta): Locucion {
    const texto = q.tipo === 'completar' ? `${q.enunciado} ${q.frase}` : q.enunciado;
    return { tipo: 'pregunta', texto, guion: `[friendly, curious question] ${textoParaVoz(texto)}` };
  },
  caso(c: CasoPractico): Locucion {
    return { tipo: 'caso', texto: c.hechos.join(' '), guion: `[neutral narrator presenting the facts of a case] ${pausas(c.hechos)}` };
  },
  glosario(t: TerminoGlosario): Locucion {
    return {
      tipo: 'glosario',
      texto: `${t.termino}. ${t.definicion}`,
      guion: `[clear, friendly definition] ${textoParaVoz(t.termino)}. [pause] ${textoParaVoz(t.definicion)}`,
    };
  },
};

/** Clave estable de un texto (nombre del archivo de audio). */
export function claveLocucion(texto: string): string {
  let a = 0x811c9dc5;
  let b = 0x01000193 ^ texto.length;
  for (let i = 0; i < texto.length; i++) {
    const c = texto.charCodeAt(i);
    a = Math.imul(a ^ c, 0x01000193);
    b = Math.imul(b ^ c, 0x5bd1e995) ^ (b >>> 13);
  }
  return `${(a >>> 0).toString(16).padStart(8, '0')}${(b >>> 0).toString(16).padStart(8, '0')}`;
}
