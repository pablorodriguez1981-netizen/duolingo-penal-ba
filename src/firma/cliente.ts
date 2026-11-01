/**
 * Página del cliente: abre el PDF (desde un link del estudio o elegido del
 * dispositivo), toma los datos y la firma a mano, y genera el PDF firmado
 * en una hoja o en todas. Todo ocurre en el navegador.
 */
import SignaturePad, { type PointGroup } from 'signature_pad';
import './firma.css';
import { abrirPdf, Visor } from './visor';
import { componerImagen, fechaDeFirma, type ImagenFirma } from './imagen';
import { PdfProtegidoError, estamparFirma, leerInfoPdf, type Alcance } from './estampar';
import { ubicacionAbajo, ubicacionDesdeRect, ubicarEnHoja, type BordeH, type Rect, type Tamano, type Ubicacion } from './ubicacion';
import { leerEnlace, repoDesdeUbicacion, urlDocumento } from './enlace';
import { LinkInvalidoError, descifrarDocumento, type Cabecera } from './cifrado';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

const ANCHO_INICIAL_PT = 190; // ≈ 6,7 cm

const estado = {
  original: null as Uint8Array | null,
  nombre: 'documento.pdf',
  desdeLink: false,
  hojas: [] as Tamano[],
  visor: null as Visor | null,
  visorFirmado: null as Visor | null,
  alcance: 'una' as 'una' | 'todas',
  /** Hoja que se firma en modo "una" (base 1). */
  hoja: 1,
  /** Hoja que se muestra en el editor de ubicación. */
  hojaEditor: 1,
  ubic: null as Ubicacion | null,
  imagen: null as ImagenFirma | null,
  firmado: null as { pdf: Uint8Array; imagen: ImagenFirma } | null,
};

/* ───────────── Mensajes ───────────── */

function mostrarError(msg: string | null) {
  const el = $('error');
  el.textContent = msg ?? '';
  el.hidden = !msg;
  if (msg) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function cargando(msg: string | null) {
  $('cargando').hidden = !msg;
  if (msg) $('cargando-texto').textContent = msg;
}

function nombreBase() {
  return estado.nombre.replace(/\.pdf$/i, '');
}

function descargar(bytes: Uint8Array, nombre: string, tipo: string) {
  const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type: tipo }));
  const a = document.createElement('a');
  a.href = url;
  a.download = nombre;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

/* ───────────── Carga del documento ───────────── */

async function abrirDesdeLink(): Promise<boolean> {
  if (!/[#&]d=/.test(location.hash)) return false;
  const datos = leerEnlace(location.hash, repoDesdeUbicacion(location));
  if (!datos || !datos.repo) {
    mostrarError('El link está incompleto. Copialo entero o pedile al estudio que te lo reenvíe.');
    return true;
  }
  estado.desdeLink = true;
  cargando('Descargando el documento…');
  try {
    let r: Response;
    try {
      r = await fetch(urlDocumento(datos.repo, datos.id), { cache: 'no-store' });
    } catch {
      throw new Error('No se pudo descargar el documento. Revisá tu conexión a internet y volvé a abrir el link.');
    }
    if (r.status === 404) throw new Error('Este documento ya no está disponible. Pedile al estudio que te mande un link nuevo.');
    if (!r.ok) throw new Error(`No se pudo descargar el documento (error ${r.status}). Probá de nuevo en un rato.`);
    cargando('Abriendo el documento…');
    const { cabecera, pdf } = await descifrarDocumento(new Uint8Array(await r.arrayBuffer()), datos.clave);
    aplicarCabecera(cabecera);
    await cargarPdf(pdf, cabecera.archivo || 'documento.pdf', cabecera);
  } catch (e) {
    mostrarError(
      e instanceof LinkInvalidoError
        ? 'El link está incompleto o el documento está dañado. Pedile al estudio que te lo reenvíe.'
        : e instanceof Error
          ? e.message
          : 'No se pudo abrir el documento.',
    );
  } finally {
    cargando(null);
  }
  return true;
}

function aplicarCabecera(c: Cabecera) {
  const titulo = c.titulo || c.archivo;
  $('titulo').textContent = titulo ? `Firmá: ${titulo}` : 'Firmá tu documento';
  document.title = titulo ? `Firmar · ${titulo}` : document.title;
  if (c.instrucciones?.trim()) {
    $('instrucciones-texto').textContent = c.instrucciones.trim();
    $('instrucciones').hidden = false;
  }
}

async function cargarPdf(bytes: Uint8Array, nombre: string, cabecera?: Cabecera) {
  mostrarError(null);
  let info;
  try {
    info = await leerInfoPdf(bytes);
  } catch (e) {
    throw new Error(
      e instanceof PdfProtegidoError
        ? 'Este PDF está protegido (con contraseña o contra cambios) y no se puede firmar. Hace falta una versión sin protección.'
        : 'No se pudo leer el archivo. ¿Es un PDF válido?',
    );
  }
  if (!info.hojas.length) throw new Error('El PDF no tiene hojas.');
  const doc = await abrirPdf(bytes);
  await estado.visor?.cerrar();
  await descartarFirmado();
  estado.original = bytes;
  estado.nombre = nombre;
  estado.hojas = info.hojas;
  const ancho = Math.max($('hojas').clientWidth || 600, 320);
  estado.visor = new Visor(doc, Math.min(1600, ancho * Math.min(window.devicePixelRatio || 1, 2)));
  const total = info.hojas.length;
  estado.alcance = cabecera?.alcance === 'todas' && total > 1 ? 'todas' : 'una';
  estado.hoja = total;
  estado.hojaEditor = total;
  const anterior = estado.ubic?.anchoPt;
  estado.ubic = ubicacionAbajo('der', anterior ?? ANCHO_INICIAL_PT, info.hojas[total - 1]);

  $('elegir').hidden = true;
  $('trabajo').hidden = false;
  $('cambiar').hidden = estado.desdeLink;
  $('doc-nombre').textContent = nombre;
  $('doc-hojas').textContent = total === 1 ? '1 hoja' : `${total} hojas`;
  $('aviso-firmas-digitales').hidden = !info.firmasDigitales;
  document.querySelectorAll<HTMLInputElement>('input[name=alcance]').forEach((r) => {
    r.checked = r.value === estado.alcance;
    r.disabled = total === 1 && r.value === 'todas';
  });
  const sel = $<HTMLSelectElement>('ed-hoja');
  sel.replaceChildren(
    ...info.hojas.map((_, i) => {
      const o = document.createElement('option');
      o.value = String(i + 1);
      o.textContent = `Hoja ${i + 1} de ${total}`;
      return o;
    }),
  );
  armarHojas(estado.visor, true);
  ajustarPad();
  actualizarEditor();
}

/* ───────────── Vista del documento ───────────── */

let observador: IntersectionObserver | null = null;

function armarHojas(visor: Visor, conFirma: boolean) {
  const cont = $('hojas');
  observador?.disconnect();
  cont.replaceChildren();
  const pedir = (n: number) => {
    const el = cont.querySelector<HTMLElement>(`[data-hoja="${n}"]`);
    const img = el?.querySelector<HTMLImageElement>('.hoja-img');
    if (!img || img.dataset.pedida) return;
    img.dataset.pedida = '1';
    visor
      .imagen(n)
      .then((url) => {
        img.src = url;
      })
      .catch(() => el?.classList.add('hoja-falla'));
  };
  observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        const n = Number((e.target as HTMLElement).dataset.hoja);
        pedir(n);
        if (n < estado.hojas.length) pedir(n + 1);
        observador?.unobserve(e.target);
      }
    },
    { rootMargin: '600px 0px' },
  );
  estado.hojas.forEach((t, i) => {
    const n = i + 1;
    const hoja = document.createElement('div');
    hoja.className = 'hoja';
    hoja.dataset.hoja = String(n);
    const lienzo = document.createElement('div');
    lienzo.className = 'hoja-lienzo';
    lienzo.style.aspectRatio = `${t.ancho} / ${t.alto}`;
    const img = document.createElement('img');
    img.className = 'hoja-img';
    img.alt = `Hoja ${n}`;
    lienzo.append(img);
    if (conFirma) {
      const firma = document.createElement('img');
      firma.className = 'hoja-firma';
      firma.alt = '';
      firma.hidden = true;
      lienzo.append(firma);
    }
    const pie = document.createElement('div');
    pie.className = 'hoja-pie';
    const num = document.createElement('span');
    num.textContent = `Hoja ${n} de ${estado.hojas.length}`;
    pie.append(num);
    if (conFirma) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'boton chico hoja-elegir';
      b.textContent = 'Firmar esta hoja';
      b.addEventListener('click', () => {
        elegirAlcance('una', n);
        $('paso-lugar').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      const marca = document.createElement('span');
      marca.className = 'hoja-marca';
      marca.textContent = '✍️ Se firma esta hoja';
      pie.append(b, marca);
    }
    hoja.append(lienzo, pie);
    cont.append(hoja);
    observador!.observe(hoja);
  });
  actualizarSuperposiciones();
}

function colocar(el: HTMLElement, r: Rect) {
  el.style.left = `${r.u * 100}%`;
  el.style.top = `${r.v * 100}%`;
  el.style.width = `${r.w * 100}%`;
  el.style.height = `${r.h * 100}%`;
}

const ASPECTO_PROVISORIO = 2.4;

function rectEnHoja(n: number): Rect | null {
  if (!estado.ubic) return null;
  return ubicarEnHoja(estado.ubic, estado.hojas[n - 1], estado.imagen?.aspecto ?? ASPECTO_PROVISORIO);
}

function seFirma(n: number) {
  return estado.alcance === 'todas' || n === estado.hoja;
}

function actualizarSuperposiciones() {
  document.querySelectorAll<HTMLElement>('#hojas .hoja').forEach((hoja) => {
    const n = Number(hoja.dataset.hoja);
    const firma = hoja.querySelector<HTMLImageElement>('.hoja-firma');
    hoja.classList.toggle('elegida', seFirma(n) && !estado.firmado);
    hoja.classList.toggle('modo-una', estado.alcance === 'una');
    if (!firma) return;
    const r = rectEnHoja(n);
    const ver = !!(estado.imagen && r && seFirma(n));
    firma.hidden = !ver;
    if (ver && r) {
      if (firma.src !== estado.imagen!.url) firma.src = estado.imagen!.url;
      colocar(firma, r);
    }
  });
}

/* ───────────── Editor de ubicación ───────────── */

function actualizarEditor() {
  if (!estado.visor || !estado.ubic) return;
  const n = estado.alcance === 'una' ? estado.hoja : estado.hojaEditor;
  estado.hojaEditor = n;
  const t = estado.hojas[n - 1];
  const cont = $('editor-hoja');
  cont.style.aspectRatio = `${t.ancho} / ${t.alto}`;
  const img = $<HTMLImageElement>('ed-img');
  if (img.dataset.hoja !== String(n)) {
    img.dataset.hoja = String(n);
    img.removeAttribute('src');
    const visor = estado.visor;
    visor.imagen(n).then((url) => {
      if (img.dataset.hoja === String(n) && estado.visor === visor) img.src = url;
    }, () => undefined);
  }
  $<HTMLSelectElement>('ed-hoja').value = String(n);
  $<HTMLButtonElement>('ed-ant').disabled = n <= 1;
  $<HTMLButtonElement>('ed-sig').disabled = n >= estado.hojas.length;

  const r = rectEnHoja(n)!;
  const firma = $('ed-firma');
  colocar(firma, r);
  firma.classList.toggle('vacia', !estado.imagen);
  const fimg = $<HTMLImageElement>('ed-firma-img');
  if (estado.imagen && fimg.src !== estado.imagen.url) fimg.src = estado.imagen.url;

  const rango = $<HTMLInputElement>('tamano');
  rango.max = String(Math.round(Math.min(420, t.ancho * 0.9)));
  const anchoReal = r.w * t.ancho;
  rango.value = String(Math.round(anchoReal));
  $('tamano-cm').textContent = `${((anchoReal / 72) * 2.54).toFixed(1).replace('.', ',')} cm`;
  actualizarSuperposiciones();
}

function elegirAlcance(alcance: 'una' | 'todas', hoja?: number) {
  estado.alcance = alcance;
  if (hoja) estado.hoja = hoja;
  if (alcance === 'una') estado.hojaEditor = estado.hoja;
  document.querySelectorAll<HTMLInputElement>('input[name=alcance]').forEach((r) => (r.checked = r.value === alcance));
  invalidarResultado();
  actualizarEditor();
}

function irAHoja(n: number) {
  n = Math.min(Math.max(1, n), estado.hojas.length);
  if (estado.alcance === 'una') estado.hoja = n;
  estado.hojaEditor = n;
  invalidarResultado();
  actualizarEditor();
}

function moverA(rect: Rect) {
  const t = estado.hojas[estado.hojaEditor - 1];
  rect.u = Math.min(Math.max(0, rect.u), 1 - rect.w);
  rect.v = Math.min(Math.max(0, rect.v), 1 - rect.h);
  estado.ubic = ubicacionDesdeRect(rect, t);
  invalidarResultado();
  actualizarEditor();
}

function prepararArrastre() {
  const cont = $('editor-hoja');
  const firma = $('ed-firma');

  // Arrastrar la firma (en la firma no se desplaza la página).
  let arrastre: { id: number; x: number; y: number; rect: Rect } | null = null;
  firma.addEventListener('pointerdown', (e) => {
    if (!estado.ubic || (e.pointerType === 'mouse' && e.button !== 0)) return;
    arrastre = { id: e.pointerId, x: e.clientX, y: e.clientY, rect: rectEnHoja(estado.hojaEditor)! };
    firma.setPointerCapture(e.pointerId);
    firma.classList.add('arrastrando');
    e.preventDefault();
    e.stopPropagation();
  });
  firma.addEventListener('pointermove', (e) => {
    if (!arrastre || e.pointerId !== arrastre.id) return;
    const caja = cont.getBoundingClientRect();
    moverA({
      ...arrastre.rect,
      u: arrastre.rect.u + (e.clientX - arrastre.x) / caja.width,
      v: arrastre.rect.v + (e.clientY - arrastre.y) / caja.height,
    });
  });
  const soltar = (e: PointerEvent) => {
    if (!arrastre || e.pointerId !== arrastre.id) return;
    arrastre = null;
    firma.classList.remove('arrastrando');
  };
  firma.addEventListener('pointerup', soltar);
  firma.addEventListener('pointercancel', soltar);

  // Tocar la hoja (sin deslizar): la firma se centra donde se tocó.
  let toque: { id: number; x: number; y: number } | null = null;
  cont.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    toque = { id: e.pointerId, x: e.clientX, y: e.clientY };
  });
  cont.addEventListener('pointercancel', () => (toque = null));
  cont.addEventListener('pointerup', (e) => {
    const t = toque;
    toque = null;
    if (!t || t.id !== e.pointerId || !estado.ubic || Math.hypot(e.clientX - t.x, e.clientY - t.y) > 10) return;
    const caja = cont.getBoundingClientRect();
    const rect = rectEnHoja(estado.hojaEditor)!;
    moverA({
      ...rect,
      u: (e.clientX - caja.left) / caja.width - rect.w / 2,
      v: (e.clientY - caja.top) / caja.height - rect.h / 2,
    });
  });
}

/* ───────────── Firma a mano ───────────── */

const lienzoPad = $<HTMLCanvasElement>('pad');
const pad = new SignaturePad(lienzoPad, {
  penColor: '#1b3a8a',
  velocityFilterWeight: 0.6,
  minDistance: 2,
});
let medidaPad = { ancho: 0, alto: 0 };

function grosores(ancho: number) {
  const f = ancho / 560;
  return { minWidth: 0.9 * f, maxWidth: 3.1 * f };
}

function ajustarPad() {
  const ancho = lienzoPad.offsetWidth;
  const alto = lienzoPad.offsetHeight;
  if (!ancho || !alto || (ancho === medidaPad.ancho && alto === medidaPad.alto)) return;
  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  const datos = pad.toData();
  const ex = medidaPad.ancho ? ancho / medidaPad.ancho : 1;
  const ey = medidaPad.alto ? alto / medidaPad.alto : 1;
  lienzoPad.width = Math.round(ancho * ratio);
  lienzoPad.height = Math.round(alto * ratio);
  lienzoPad.getContext('2d')!.scale(ratio, ratio);
  const g = grosores(ancho);
  pad.minWidth = g.minWidth;
  pad.maxWidth = g.maxWidth;
  pad.clear();
  if (datos.length) {
    pad.fromData(
      datos.map((grupo) => ({ ...grupo, ...g, points: grupo.points.map((p) => ({ ...p, x: p.x * ex, y: p.y * ey })) })),
    );
  }
  medidaPad = { ancho, alto };
}

function cambioEnFirma() {
  $('pad-guia').hidden = !pad.isEmpty();
  invalidarResultado();
  programarImagen();
}

function rehacerTrazos(grupos: PointGroup[]) {
  pad.clear();
  if (grupos.length) pad.fromData(grupos);
  cambioEnFirma();
}

function prepararPad() {
  new ResizeObserver(() => ajustarPad()).observe(lienzoPad);
  pad.addEventListener('endStroke', cambioEnFirma);
  const deshacer = () => rehacerTrazos(pad.toData().slice(0, -1));
  const borrar = () => rehacerTrazos([]);
  $('deshacer').addEventListener('click', deshacer);
  $('pf-deshacer').addEventListener('click', deshacer);
  $('borrar').addEventListener('click', borrar);
  $('pf-borrar').addEventListener('click', borrar);
  document.querySelectorAll<HTMLButtonElement>('.tinta').forEach((b) =>
    b.addEventListener('click', () => {
      const color = b.dataset.color!;
      pad.penColor = color;
      document.querySelectorAll<HTMLButtonElement>('.tinta').forEach((x) => {
        x.classList.toggle('activa', x === b);
        x.setAttribute('aria-checked', String(x === b));
      });
      rehacerTrazos(pad.toData().map((g) => ({ ...g, penColor: color })));
    }),
  );

  // Pantalla completa: el mismo recuadro se pasa a una capa grande.
  const marco = $('pad-marco');
  const pantalla = $('pantalla-firma');
  const ajustarGrande = () => {
    const disponibleAncho = window.innerWidth - 24;
    const disponibleAlto = window.innerHeight - 120;
    const ancho = Math.min(disponibleAncho, disponibleAlto * 2.5, 1100);
    marco.style.width = `${Math.floor(ancho)}px`;
  };
  $('ampliar').addEventListener('click', () => {
    pantalla.hidden = false;
    $('pf-lugar').append(marco);
    document.body.classList.add('sin-scroll');
    ajustarGrande();
    window.addEventListener('resize', ajustarGrande);
  });
  $('pf-listo').addEventListener('click', () => {
    window.removeEventListener('resize', ajustarGrande);
    marco.style.width = '';
    $('pad-lugar').append(marco);
    pantalla.hidden = true;
    document.body.classList.remove('sin-scroll');
    $('paso-firma').scrollIntoView({ block: 'center' });
  });
}

/* ───────────── Imagen de la firma con los datos ───────────── */

let temporizador = 0;
let version = 0;

function programarImagen() {
  clearTimeout(temporizador);
  temporizador = window.setTimeout(() => void generarImagen(), 180);
}

async function generarImagen(fecha = new Date()): Promise<ImagenFirma | null> {
  const v = ++version;
  const img = await componerImagen({
    svg: pad.isEmpty() ? null : pad.toDataURL('image/svg+xml'),
    texto: $<HTMLTextAreaElement>('texto').value,
    fecha: $<HTMLInputElement>('con-fecha').checked ? fechaDeFirma(fecha) : null,
    color: pad.penColor,
  });
  if (v !== version) {
    if (img) URL.revokeObjectURL(img.url);
    return null;
  }
  const anterior = estado.imagen;
  estado.imagen = img;
  // La imagen anterior puede seguir en uso por el resultado firmado.
  if (anterior && anterior !== estado.firmado?.imagen) URL.revokeObjectURL(anterior.url);
  actualizarEditor();
  return img;
}

/* ───────────── Firmar y descargar ───────────── */

async function descartarFirmado() {
  if (!estado.firmado) return;
  if (estado.firmado.imagen !== estado.imagen) URL.revokeObjectURL(estado.firmado.imagen.url);
  estado.firmado = null;
  await estado.visorFirmado?.cerrar();
  estado.visorFirmado = null;
}

function invalidarResultado() {
  if (!estado.firmado) return;
  void descartarFirmado();
  $('resultado').hidden = true;
  $('firmar').hidden = false;
  $('aviso-firmado').hidden = true;
  if (estado.visor) armarHojas(estado.visor, true);
}

async function firmar() {
  const falta = $('falta');
  falta.textContent = '';
  if (!estado.original || !estado.ubic) return;
  if (pad.isEmpty()) {
    falta.textContent = 'Falta tu firma (paso 2).';
    $('paso-firma').scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  if (!$<HTMLTextAreaElement>('texto').value.trim() && !confirm('No escribiste tus datos debajo de la firma. ¿Firmar igual?')) {
    $('texto').focus();
    return;
  }
  const boton = $<HTMLButtonElement>('firmar');
  boton.disabled = true;
  boton.textContent = 'Firmando…';
  try {
    clearTimeout(temporizador);
    const imagen = await generarImagen(new Date());
    if (!imagen) throw new Error('No se pudo armar la imagen de la firma.');
    const alcance: Alcance = estado.alcance === 'todas' ? { tipo: 'todas' } : { tipo: 'una', hoja: estado.hoja };
    const pdf = await estamparFirma({ pdf: estado.original, png: imagen.png, aspecto: imagen.aspecto, alcance, ubicacion: estado.ubic });
    await descartarFirmado();
    estado.firmado = { pdf, imagen };
    // Vista del resultado: el PDF firmado tal como quedó.
    const visorFirmado = new Visor(await abrirPdf(pdf), Math.min(1600, Math.max($('hojas').clientWidth, 320) * Math.min(window.devicePixelRatio || 1, 2)));
    estado.visorFirmado = visorFirmado;
    armarHojas(visorFirmado, false);
    $('aviso-firmado').hidden = false;
    $('resultado').hidden = false;
    boton.hidden = true;
    const archivo = new File([pdf as BlobPart], `${nombreBase()} - firmado.pdf`, { type: 'application/pdf' });
    $('compartir').hidden = !(navigator.canShare && navigator.canShare({ files: [archivo] }));
    $('resultado').scrollIntoView({ behavior: 'smooth', block: 'center' });
    const primera = estado.alcance === 'todas' ? 1 : estado.hoja;
    document.querySelector(`#hojas [data-hoja="${primera}"]`)?.scrollIntoView({ block: 'nearest' });
  } catch (e) {
    mostrarError(e instanceof Error ? `No se pudo firmar: ${e.message}` : 'No se pudo firmar el documento.');
  } finally {
    boton.disabled = false;
    boton.textContent = 'Firmar el documento';
  }
}

function prepararResultado() {
  $('firmar').addEventListener('click', () => void firmar());
  $('descargar').addEventListener('click', () => {
    if (estado.firmado) descargar(estado.firmado.pdf, `${nombreBase()} - firmado.pdf`, 'application/pdf');
  });
  $('descargar-imagen').addEventListener('click', () => {
    if (estado.firmado) descargar(estado.firmado.imagen.png, `Firma - ${nombreBase()}.png`, 'image/png');
  });
  $('compartir').addEventListener('click', async () => {
    if (!estado.firmado) return;
    const archivo = new File([estado.firmado.pdf as BlobPart], `${nombreBase()} - firmado.pdf`, { type: 'application/pdf' });
    try {
      await navigator.share({ files: [archivo], title: archivo.name });
    } catch (e) {
      if (!(e instanceof DOMException && e.name === 'AbortError')) {
        descargar(estado.firmado.pdf, archivo.name, 'application/pdf');
      }
    }
  });
  $('editar').addEventListener('click', () => {
    invalidarResultado();
    $('paso-datos').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* ───────────── Inicio ───────────── */

async function abrirArchivo(f: File | undefined) {
  if (!f) return;
  if (f.type && f.type !== 'application/pdf' && !/\.pdf$/i.test(f.name)) {
    mostrarError('El archivo tiene que ser un PDF.');
    return;
  }
  cargando('Abriendo el documento…');
  try {
    await cargarPdf(new Uint8Array(await f.arrayBuffer()), f.name);
  } catch (e) {
    mostrarError(e instanceof Error ? e.message : 'No se pudo abrir el archivo.');
  } finally {
    cargando(null);
  }
}

function prepararEleccion() {
  const input = $<HTMLInputElement>('archivo');
  input.addEventListener('change', () => {
    void abrirArchivo(input.files?.[0]);
    input.value = '';
  });
  const zona = $('soltar');
  document.addEventListener('dragover', (e) => {
    if (estado.desdeLink) return;
    e.preventDefault();
    zona.classList.add('encima');
  });
  document.addEventListener('dragleave', (e) => {
    if (!e.relatedTarget) zona.classList.remove('encima');
  });
  document.addEventListener('drop', (e) => {
    if (estado.desdeLink) return;
    e.preventDefault();
    zona.classList.remove('encima');
    void abrirArchivo(e.dataTransfer?.files[0]);
  });
  $('cambiar').addEventListener('click', () => input.click());
}

function prepararControles() {
  $('texto').addEventListener('input', () => {
    invalidarResultado();
    programarImagen();
  });
  $('con-fecha').addEventListener('change', () => {
    invalidarResultado();
    programarImagen();
  });
  document.querySelectorAll<HTMLInputElement>('input[name=alcance]').forEach((r) =>
    r.addEventListener('change', () => r.checked && elegirAlcance(r.value as 'una' | 'todas')),
  );
  $('ed-hoja').addEventListener('change', (e) => irAHoja(Number((e.target as HTMLSelectElement).value)));
  $('ed-ant').addEventListener('click', () => irAHoja(estado.hojaEditor - 1));
  $('ed-sig').addEventListener('click', () => irAHoja(estado.hojaEditor + 1));
  document.querySelectorAll<HTMLButtonElement>('.rapidos [data-pos]').forEach((b) =>
    b.addEventListener('click', () => {
      if (!estado.ubic) return;
      const t = estado.hojas[estado.hojaEditor - 1];
      const ancho = rectEnHoja(estado.hojaEditor)!.w * t.ancho;
      estado.ubic = ubicacionAbajo(b.dataset.pos as BordeH, ancho, t);
      invalidarResultado();
      actualizarEditor();
    }),
  );
  $('tamano').addEventListener('input', (e) => {
    if (!estado.ubic) return;
    estado.ubic = { ...estado.ubic, anchoPt: Number((e.target as HTMLInputElement).value) };
    invalidarResultado();
    actualizarEditor();
  });
  prepararArrastre();
}

async function iniciar() {
  prepararPad();
  prepararControles();
  prepararResultado();
  prepararEleccion();
  window.addEventListener('hashchange', () => location.reload());
  const conLink = await abrirDesdeLink();
  if (!conLink) {
    $('elegir').hidden = false;
    $('pie-estudio').hidden = false;
  }
}

void iniciar();
