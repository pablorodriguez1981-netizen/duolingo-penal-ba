import { describe, expect, it } from 'vitest';
import { PDFDocument, PDFName, PDFDict, degrees } from 'pdf-lib';
import {
  aCoordenadasPdf,
  tamanoVisible,
  ubicacionAbajo,
  ubicacionDesdeRect,
  ubicarEnHoja,
  type Caja,
  type Rect,
} from './ubicacion';
import { estamparFirma, hojasAFirmar, leerInfoPdf, tieneFirmasDigitales } from './estampar';
import { LinkInvalidoError, cifrarDocumento, descifrarDocumento, generarClave, generarId } from './cifrado';
import { crearEnlace, leerEnlace, repoDesdeUbicacion, urlDocumento } from './enlace';

/** Transformación de pdf.js (PageViewport) de espacio PDF a la hoja visible, en puntos, con origen arriba a la izquierda. */
function aVista(caja: Caja, rot: number, x: number, y: number): [number, number] {
  const { x: cx, y: cy, width: cw, height: ch } = caja;
  switch (rot) {
    case 0:
      return [x - cx, cy + ch - y];
    case 90:
      return [y - cy, x - cx];
    case 180:
      return [cx + cw - x, y - cy];
    default:
      return [cy + ch - y, cx + cw - x];
  }
}

/** Esquinas de la imagen dibujada por pdf-lib (traslación + rotación antihoraria + escala). */
function esquinasImagen(c: ReturnType<typeof aCoordenadasPdf>): [number, number][] {
  const t = (c.rotate * Math.PI) / 180;
  const ex = [Math.cos(t), Math.sin(t)];
  const ey = [-Math.sin(t), Math.cos(t)];
  return [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ].map(([a, b]) => [c.x + a * c.width * ex[0] + b * c.height * ey[0], c.y + a * c.width * ex[1] + b * c.height * ey[1]]);
}

describe('ubicación de la firma', () => {
  const caja: Caja = { x: 10, y: 20, width: 595, height: 842 };

  for (const rot of [0, 90, 180, 270]) {
    it(`se ve derecha y en su lugar con la hoja girada ${rot}°`, () => {
      const vis = tamanoVisible(caja, rot);
      const rect: Rect = { u: 0.55, v: 0.7, w: 0.35, h: 0.12 };
      const c = aCoordenadasPdf(caja, rot, rect);
      const vista = esquinasImagen(c).map(([x, y]) => aVista(caja, rot, x, y));
      // (0,0) de la imagen = abajo a la izquierda de la firma tal como se ve.
      const [abIzq, abDer, arIzq] = vista;
      const izq = rect.u * vis.ancho;
      const der = (rect.u + rect.w) * vis.ancho;
      const arriba = rect.v * vis.alto;
      const abajo = (rect.v + rect.h) * vis.alto;
      expect(abIzq[0]).toBeCloseTo(izq);
      expect(abIzq[1]).toBeCloseTo(abajo);
      expect(abDer[0]).toBeCloseTo(der);
      expect(abDer[1]).toBeCloseTo(abajo);
      expect(arIzq[0]).toBeCloseTo(izq);
      expect(arIzq[1]).toBeCloseTo(arriba);
    });
  }

  it('las hojas giradas 90° se ven apaisadas', () => {
    expect(tamanoVisible(caja, 90)).toEqual({ ancho: 842, alto: 595 });
    expect(tamanoVisible(caja, -90)).toEqual({ ancho: 842, alto: 595 });
    expect(tamanoVisible(caja, 540)).toEqual({ ancho: 595, alto: 842 });
  });

  it('mantiene el mismo tamaño y los márgenes en hojas distintas', () => {
    const a4 = { ancho: 595, alto: 842 };
    const oficio = { ancho: 612, alto: 1008 };
    const ubic = ubicacionAbajo('der', 200, a4);
    const r1 = ubicarEnHoja(ubic, a4, 2);
    const r2 = ubicarEnHoja(ubic, oficio, 2);
    expect(r1.w * a4.ancho).toBeCloseTo(200);
    expect(r2.w * oficio.ancho).toBeCloseTo(200);
    // Margen derecho e inferior iguales (en puntos).
    expect((1 - r1.u - r1.w) * a4.ancho).toBeCloseTo((1 - r2.u - r2.w) * oficio.ancho);
    expect((1 - r1.v - r1.h) * a4.alto).toBeCloseTo((1 - r2.v - r2.h) * oficio.alto);
  });

  it('si crece el texto, la firma sigue pegada abajo', () => {
    const a4 = { ancho: 595, alto: 842 };
    const ubic = ubicacionAbajo('izq', 200, a4);
    const corta = ubicarEnHoja(ubic, a4, 3);
    const larga = ubicarEnHoja(ubic, a4, 1);
    expect(corta.v + corta.h).toBeCloseTo(larga.v + larga.h);
    expect(larga.h).toBeGreaterThan(corta.h);
  });

  it('nunca se sale de la hoja', () => {
    const hoja = { ancho: 300, alto: 200 };
    const r = ubicarEnHoja({ anchoPt: 1000, h: { borde: 'der', margen: -50 }, v: { borde: 'abajo', margen: -50 } }, hoja, 1);
    expect(r.u).toBeGreaterThanOrEqual(0);
    expect(r.v).toBeGreaterThanOrEqual(0);
    expect(r.u + r.w).toBeLessThanOrEqual(1 + 1e-9);
    expect(r.v + r.h).toBeLessThanOrEqual(1 + 1e-9);
  });

  it('arrastrar y volver a ubicar da el mismo lugar', () => {
    const hoja = { ancho: 595, alto: 842 };
    for (const rect of [
      { u: 0.05, v: 0.06, w: 0.3, h: 0.1 },
      { u: 0.33, v: 0.45, w: 0.34, h: 0.1 },
      { u: 0.6, v: 0.8, w: 0.35, h: 0.12 },
    ]) {
      const ubic = ubicacionDesdeRect(rect, hoja);
      const vuelta = ubicarEnHoja(ubic, hoja, (rect.w * hoja.ancho) / (rect.h * hoja.alto));
      expect(vuelta.u).toBeCloseTo(rect.u);
      expect(vuelta.v).toBeCloseTo(rect.v);
      expect(vuelta.w).toBeCloseTo(rect.w);
      expect(vuelta.h).toBeCloseTo(rect.h);
    }
  });
});

// PNG de 2×1 píxeles.
const PNG = Uint8Array.from(
  atob('iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAEUlEQVR4nGM4wcDwn4HhRAMADVQDEKtTJIQAAAAASUVORK5CYII='),
  (c) => c.charCodeAt(0),
);

async function pdfDePrueba(rotaciones: number[]) {
  const doc = await PDFDocument.create();
  doc.setTitle('Poder especial');
  for (const r of rotaciones) {
    const p = doc.addPage([595, 842]);
    p.drawText('Texto de la hoja', { x: 50, y: 800 });
    p.setRotation(degrees(r));
  }
  return doc.save();
}

function imagenesDeHoja(doc: PDFDocument, i: number): number {
  const recursos = doc.getPage(i).node.Resources();
  const xobj = recursos?.lookupMaybe(PDFName.of('XObject'), PDFDict);
  return xobj ? xobj.keys().length : 0;
}

describe('estampar la firma en el PDF', () => {
  it('firma una sola hoja', async () => {
    const pdf = await pdfDePrueba([0, 0, 0]);
    const ubic = ubicacionAbajo('der', 200, { ancho: 595, alto: 842 });
    const firmado = await estamparFirma({ pdf, png: PNG, aspecto: 2, alcance: { tipo: 'una', hoja: 3 }, ubicacion: ubic });
    const doc = await PDFDocument.load(firmado);
    expect(doc.getPageCount()).toBe(3);
    expect([0, 1, 2].map((i) => imagenesDeHoja(doc, i))).toEqual([0, 0, 1]);
    expect(doc.getTitle()).toBe('Poder especial');
  });

  it('firma todas las hojas, también las giradas', async () => {
    const pdf = await pdfDePrueba([0, 90, 180, 270]);
    const ubic = ubicacionAbajo('centro', 180, { ancho: 595, alto: 842 });
    const firmado = await estamparFirma({ pdf, png: PNG, aspecto: 2, alcance: { tipo: 'todas' }, ubicacion: ubic });
    const doc = await PDFDocument.load(firmado);
    expect([0, 1, 2, 3].map((i) => imagenesDeHoja(doc, i))).toEqual([1, 1, 1, 1]);
    const info = await leerInfoPdf(firmado);
    expect(info.hojas[1]).toEqual({ ancho: 842, alto: 595 });
    expect(info.firmasDigitales).toBe(false);
  });

  it('elige hojas válidas', () => {
    expect(hojasAFirmar({ tipo: 'todas' }, 3)).toEqual([1, 2, 3]);
    expect(hojasAFirmar({ tipo: 'una', hoja: 9 }, 3)).toEqual([3]);
    expect(hojasAFirmar({ tipo: 'una', hoja: 0 }, 3)).toEqual([1]);
  });

  it('detecta firmas digitales previas', () => {
    expect(tieneFirmasDigitales(new TextEncoder().encode('<< /Type /Sig /ByteRange [0 1 2 3] >>'))).toBe(true);
    expect(tieneFirmasDigitales(new TextEncoder().encode('%PDF-1.7'))).toBe(false);
  });
});

describe('documentos cifrados y links', () => {
  it('cifra y descifra el PDF con su cabecera', async () => {
    const pdf = await pdfDePrueba([0]);
    const clave = generarClave();
    const cab = { titulo: 'Poder', archivo: 'poder.pdf', instrucciones: 'Firmá todas las hojas', alcance: 'todas' as const, creado: '2026-11-01' };
    const cifrado = await cifrarDocumento(pdf, cab, clave);
    expect(new TextDecoder().decode(cifrado).includes('Poder')).toBe(false);
    const { cabecera, pdf: vuelta } = await descifrarDocumento(cifrado, clave);
    expect(cabecera).toEqual(cab);
    expect(vuelta).toEqual(pdf);
  });

  it('rechaza una clave equivocada o un archivo dañado', async () => {
    const cifrado = await cifrarDocumento(new Uint8Array([1, 2, 3]), { titulo: 't', archivo: 'a.pdf', creado: 'x' }, generarClave());
    await expect(descifrarDocumento(cifrado, generarClave())).rejects.toBeInstanceOf(LinkInvalidoError);
    await expect(descifrarDocumento(new Uint8Array(40), generarClave())).rejects.toBeInstanceOf(LinkInvalidoError);
  });

  it('arma y lee links', () => {
    const repo = repoDesdeUbicacion({ hostname: 'estudio.github.io', pathname: '/mi-repo/firma/' });
    expect(repo).toBe('estudio/mi-repo');
    expect(repoDesdeUbicacion({ hostname: 'estudio.github.io', pathname: '/firma/' })).toBe('estudio/estudio.github.io');
    expect(repoDesdeUbicacion({ hostname: 'localhost', pathname: '/firma/' })).toBeNull();

    const datos = { id: generarId(), clave: generarClave(), repo: 'estudio/mi-repo' };
    const link = crearEnlace('https://estudio.github.io/mi-repo/firma/', datos, repo);
    expect(link).not.toContain('r=');
    expect(leerEnlace(new URL(link).hash, repo)).toEqual(datos);

    const otro = crearEnlace('http://localhost:5173/firma/', datos, null);
    expect(leerEnlace(new URL(otro).hash, null)).toEqual(datos);
    expect(leerEnlace('#d=zz&k=abc', repo)).toBeNull();
    expect(urlDocumento('estudio/mi-repo', 'abc123')).toBe(
      'https://raw.githubusercontent.com/estudio/mi-repo/firmas-casos/casos/abc123.firma',
    );
  });
});
