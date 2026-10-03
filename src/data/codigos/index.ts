import { ARTICULOS_CPPBA } from '../articulos-cppba';
import { bloqueDeArticulo } from '../estructura-cppba';
import { AVISO_CP_GENERAL, META_CP } from '../meta-cp';
import type { Articulo } from '../tipos';

export interface ArticuloImportado {
  numero: string;
  orden: number;
  libro: string | null;
  titulo: string | null;
  capitulo: string | null;
  texto: string;
  notas: string[];
  derogado: boolean;
}

export interface CodigoImportado {
  codigo: 'CP' | 'CPPBA';
  nombre: string;
  ley: string;
  fuente: string;
  ultimaReformaDetectada: string | null;
  importadoEl: string;
  articulos: ArticuloImportado[];
}

interface EstadoCodigos {
  cp: CodigoImportado | null;
  cppbaOficial: CodigoImportado | null;
  registro: Map<string, Articulo>;
  /** Artículos importados (con ubicación) por código, en orden. */
  cpArticulos: ArticuloImportado[];
  cppbaArticulos: ArticuloImportado[];
}

const estado: EstadoCodigos = {
  cp: null,
  cppbaOficial: null,
  registro: new Map(),
  cpArticulos: [],
  cppbaArticulos: [],
};

let carga: Promise<void> | null = null;
let version = 0;

/** Cambia cada vez que se recargan los códigos (invalida cachés derivadas). */
export const versionCodigos = () => version;

export const idDe = (codigo: 'cp' | 'cppba', numero: string) =>
  `${codigo}-${numero.trim().toLowerCase().replace(/\s+/g, '-')}`;

function ubicacionCP(a: ArticuloImportado) {
  return [a.libro, a.titulo, a.capitulo].filter(Boolean).join(' · ');
}

function epigrafeCP(a: ArticuloImportado) {
  const meta = META_CP[a.numero];
  if (meta) return meta.epigrafe;
  const cap = a.capitulo?.split(' · ')[1];
  if (cap) return cap;
  return a.titulo?.split(' · ')[1] ?? 'Código Penal';
}

/** Construye el registro de artículos a partir de los códigos cargados. */
export function construirRegistro(cp: CodigoImportado | null, cppbaOficial: CodigoImportado | null) {
  const registro = new Map<string, Articulo>();

  for (const a of ARTICULOS_CPPBA) registro.set(a.id, a);

  if (cppbaOficial) {
    for (const o of cppbaOficial.articulos) {
      if (o.derogado || !o.texto) continue;
      const id = idDe('cppba', o.numero);
      const previo = registro.get(id);
      const bloque = bloqueDeArticulo(o.numero);
      registro.set(id, {
        id,
        codigo: 'CPPBA',
        numero: o.numero,
        epigrafe: previo?.epigrafe ?? bloque?.capitulo?.split(' · ')[1] ?? bloque?.titulo.split(' · ')[1] ?? 'CPPBA',
        texto: o.texto,
        fidelidad: 'oficial',
        ubicacion: previo?.ubicacion ?? (bloque ? `${bloque.libro} · ${bloque.titulo}` : undefined),
        notas: o.notas,
      });
    }
  }

  if (cp) {
    for (const a of cp.articulos) {
      if (a.derogado || !a.texto) continue;
      const id = idDe('cp', a.numero);
      registro.set(id, {
        id,
        codigo: 'CP',
        numero: a.numero,
        epigrafe: epigrafeCP(a),
        texto: a.texto,
        fidelidad: 'oficial',
        ubicacion: ubicacionCP(a),
        notas: a.notas,
        avisoVigencia: META_CP[a.numero]?.avisoVigencia,
      });
    }
  }
  return registro;
}

export function inicializarCodigos(cp: CodigoImportado | null, cppbaOficial: CodigoImportado | null) {
  estado.cp = cp;
  estado.cppbaOficial = cppbaOficial;
  estado.cpArticulos = cp?.articulos.filter((a) => !a.derogado && a.texto) ?? [];
  estado.cppbaArticulos = cppbaOficial?.articulos.filter((a) => !a.derogado && a.texto) ?? [];
  estado.registro = construirRegistro(cp, cppbaOficial);
  version++;
}

/** Registra artículos sintéticos (p. ej., bloques de la estructura del CPPBA). */
export function registrarArticulo(a: Articulo) {
  estado.registro.set(a.id, a);
}

/** Carga perezosa del articulado (chunk separado, cacheado por el service worker). */
export function cargarCodigos(): Promise<void> {
  if (!carga) {
    carga = (async () => {
      const cpMod = await import('./cp.json');
      const opcionales = import.meta.glob<{ default: CodigoImportado }>('./cppba.json');
      const cargarOficial = opcionales['./cppba.json'];
      const oficial = cargarOficial ? (await cargarOficial()).default : null;
      inicializarCodigos(cpMod.default as unknown as CodigoImportado, oficial);
    })();
  }
  return carga;
}

export function articulo(id: string): Articulo | undefined {
  return estado.registro.get(id);
}

export function articuloOFalla(id: string): Articulo {
  const a = estado.registro.get(id);
  if (!a) throw new Error(`Artículo inexistente: ${id}`);
  return a;
}

export const infoCodigos = () => ({
  cp: estado.cp,
  cppbaOficial: estado.cppbaOficial,
  avisoCP: AVISO_CP_GENERAL,
});

export const articulosCP = () => estado.cpArticulos;
export const articulosCPPBAOficial = () => estado.cppbaArticulos;
export const todosLosArticulos = () => [...estado.registro.values()];

export function etiquetaArticulo(a: Pick<Articulo, 'codigo' | 'numero'>) {
  return `Art. ${a.numero} ${a.codigo === 'CP' ? 'CP' : 'CPPBA'}`;
}
