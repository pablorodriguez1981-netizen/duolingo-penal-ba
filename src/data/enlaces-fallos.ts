import type { EnlaceFallo } from './tipos';

/**
 * Enlaces al texto íntegro de los fallos, verificados el 05/10/2026 en los
 * sitios oficiales (buscador de la CSJN, SCBA, Corte IDH, CIDH).
 * Ver fuentes/fallos-csjn.tsv y scripts/resolver-fallos-csjn.py.
 */
const CSJN = 'https://sjconsulta.csjn.gov.ar/sjconsulta/documentos';
const csjn = (ruta: string, cita: string): EnlaceFallo => ({ etiqueta: `Fallo completo · CSJN, Fallos ${cita}`, url: `${CSJN}/${ruta}` });

export const ENLACES = {
  polak: csjn('verDocumentoSumario.html?idDocumentoSumario=7009', '321:2826'),
  mattei: csjn('verDocumentoByIdLinksJSP.html?idDocumento=7834641', '272:188'),
  mozzatti: csjn('verDocumentoSumario.html?idDocumentoSumario=16387', '300:1102'),
  montenegro: csjn('verDocumentoSumario.html?idDocumentoSumario=23105', '303:1938'),
  verbitsky: csjn('verDocumentoByIdLinksJSP.html?idDocumento=5824581', '328:1146'),
  napoli: csjn('verDocumentoByIdLinksJSP.html?idDocumento=4627541', '321:3630'),
  rayford: csjn('verDocumentoSumario.html?idDocumentoSumario=30882', '308:733'),
  llerena: csjn('verDocumentoByIdLinksJSP.html?idDocumento=5841071', '328:1491'),
  mostaccio: csjn('verDocumentoByIdLinksJSP.html?idDocumento=5534771', '327:120'),
  acosta: csjn('verDocumentoByIdLinksJSP.html?idDocumento=6424841', '331:858'),
  gongora: csjn('verDocumentoByIdLinksJSP.html?idDocumento=7008981', '336:392'),
  casal: csjn('verDocumentoByIdLinksJSP.html?idDocumento=5921391', '328:3399'),
  bulacio: { etiqueta: 'Sentencia completa · Corte IDH, Serie C 100', url: 'https://www.corteidh.or.cr/docs/casos/articulos/seriec_100_esp.pdf' },
  fernandezPrieto: { etiqueta: 'Sentencia completa · Corte IDH, Serie C 411', url: 'https://corteidh.or.cr/docs/casos/articulos/seriec_411_esp.pdf' },
  peiranoBasso: { etiqueta: 'Informe completo · CIDH, Informe 86/09', url: 'https://www.cidh.oas.org/annualrep/2009sp/uruguay12553.sp.htm' },
  scbaVerbitsky2022: { etiqueta: 'Resolución completa · SCBA, P. 83.909 (Word)', url: 'https://www-2020.scba.gov.ar/falloscompl/scba/inter/2022/05-03/p83909.doc' },
  scbaCarrascosa: { etiqueta: 'Sentencia completa · SCBA, P. 125.776 (Word)', url: 'https://www-2020.scba.gov.ar/falloscompl/scba/2016/06-01/p125776.doc' },
  scbaPitman: { etiqueta: 'Sentencia completa · SCBA, P. 137.668', url: 'https://www.scba.gov.ar/includes/descarga.asp?id=54082&n=Ver+sentencia+(causa+P137.668).pdf' },
  tcpAguero: { etiqueta: 'Sentencia completa · TCP, Sala V, causa 133.216', url: 'https://www.scba.gov.ar/includes/descarga.asp?id=55453&n=Ver+sentencia+(causa+N%C2%B0+133.216).pdf' },
  tcpGuerendiain: { etiqueta: 'Sentencia completa · TCP, Sala IV, causa 76.889', url: 'https://www.scba.gov.ar/includes/descarga.asp?id=35615&n=Ver+Sentencia+%2876889%29.pdf' },
} satisfies Record<string, EnlaceFallo>;
