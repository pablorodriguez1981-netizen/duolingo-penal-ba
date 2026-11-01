/**
 * Inserta la imagen de la firma (PNG) en las hojas de un PDF con pdf-lib.
 * Funciona en el navegador y en Node (tests).
 */
import { PDFContentStream, PDFDocument, degrees, popGraphicsState, pushGraphicsState, type PDFPage } from 'pdf-lib';
import { aCoordenadasPdf, tamanoVisible, ubicarEnHoja, type Tamano, type Ubicacion } from './ubicacion';

export type Alcance = { tipo: 'una'; hoja: number } | { tipo: 'todas' };

export interface InfoPdf {
  hojas: Tamano[];
  /** Tiene firmas digitales (certificado): al modificarlo dejan de verificarse. */
  firmasDigitales: boolean;
}

export class PdfProtegidoError extends Error {
  constructor() {
    super('El PDF está protegido con contraseña o contra cambios.');
    this.name = 'PdfProtegidoError';
  }
}

async function cargar(pdf: Uint8Array) {
  try {
    // updateMetadata: false conserva los datos originales (autor, fecha de creación).
    return await PDFDocument.load(pdf, { updateMetadata: false });
  } catch (e) {
    if (e instanceof Error && /encrypt/i.test(e.message)) throw new PdfProtegidoError();
    throw e;
  }
}

export function tieneFirmasDigitales(pdf: Uint8Array): boolean {
  return new TextDecoder('latin1').decode(pdf).includes('/ByteRange');
}

/** Tamaño visible de cada hoja (en puntos, con la rotación aplicada). */
export async function leerInfoPdf(pdf: Uint8Array): Promise<InfoPdf> {
  const doc = await cargar(pdf);
  return {
    hojas: doc.getPages().map((p) => tamanoVisible(p.getCropBox(), p.getRotation().angle)),
    firmasDigitales: tieneFirmasDigitales(pdf),
  };
}

/**
 * Encierra el contenido existente de la hoja entre q … Q: si el PDF original
 * deja la matriz de transformación cambiada, la firma igual se ubica bien.
 */
function aislarContenido(doc: PDFDocument, pagina: PDFPage) {
  pagina.node.normalize();
  const ctx = doc.context;
  const inicio = ctx.register(PDFContentStream.of(ctx.obj({}), [pushGraphicsState()]));
  const fin = ctx.register(PDFContentStream.of(ctx.obj({}), [popGraphicsState()]));
  pagina.node.wrapContentStreams(inicio, fin);
}

export interface OpcionesEstampado {
  pdf: Uint8Array;
  /** Imagen PNG de la firma con los datos. */
  png: Uint8Array;
  /** Ancho / alto de la imagen. */
  aspecto: number;
  alcance: Alcance;
  ubicacion: Ubicacion;
}

/** Hojas (base 1) que se firman. */
export function hojasAFirmar(alcance: Alcance, total: number): number[] {
  if (alcance.tipo === 'todas') return Array.from({ length: total }, (_, i) => i + 1);
  return [Math.min(Math.max(1, Math.round(alcance.hoja)), total)];
}

export async function estamparFirma({ pdf, png, aspecto, alcance, ubicacion }: OpcionesEstampado): Promise<Uint8Array> {
  const doc = await cargar(pdf);
  const imagen = await doc.embedPng(png);
  const paginas = doc.getPages();
  for (const n of hojasAFirmar(alcance, paginas.length)) {
    const pagina = paginas[n - 1];
    const caja = pagina.getCropBox();
    const rotacion = pagina.getRotation().angle;
    const rect = ubicarEnHoja(ubicacion, tamanoVisible(caja, rotacion), aspecto);
    const c = aCoordenadasPdf(caja, rotacion, rect);
    aislarContenido(doc, pagina);
    pagina.drawImage(imagen, { x: c.x, y: c.y, width: c.width, height: c.height, rotate: degrees(c.rotate) });
  }
  doc.setModificationDate(new Date());
  return doc.save();
}
