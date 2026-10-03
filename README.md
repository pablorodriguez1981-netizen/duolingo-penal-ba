# Carpi Penal ⚖️🦫

PWA gamificada, estilo Duolingo, para estudiar el **Código Procesal Penal de la Provincia de Buenos Aires (Ley 11.922)** combinado con el **Código Penal de la Nación**. Funciona en Android (navegador o instalada en la pantalla de inicio) y en escritorio, y anda sin conexión.

La mascota es **Carpi**, un carpincho con toga.

## Qué incluye

| Requerimiento | Implementación |
| --- | --- |
| Lecciones de 3 a 5 minutos | Cada lección tiene intro en lenguaje llano + "En los tribunales bonaerenses", lectura de la norma y 3–5 preguntas. Cronómetro visual con el objetivo de minutos. |
| 3–4 artículos por día | Meta diaria configurable (3 o 4 artículos) con anillo de progreso. |
| 1 a 5 lecciones por artículo | Artículos densos (p. ej. art. 169, art. 148, art. 1) se desglosan en varias lecciones. |
| Lectura de la norma + audio | Tarjeta "pergamino" con el texto, foco resaltado y botón 🔊 (SpeechSynthesis, voz es-AR si existe). |
| Glosario desplegable | 59 términos enlazados automáticamente en todos los textos; se abren en una hoja sin salir de la lección. |
| Preguntas gamificadas | Opción múltiple, verdadero/falso, ordenar pasos y completar el hueco, con feedback inmediato y explicación. |
| Mapa interactivo | Camino en zigzag por unidades y etapas procesales, nodos bloqueados/desbloqueados, ramas opcionales de "Fallo clave". |
| Racha, vidas, XP | Racha diaria con llama animada, 3 corazones que se recargan cada 20 min o con repasos, XP. |
| Repaso dinámico obligatorio | Al final de cada unidad: mezcla preguntas de la unidad y de unidades anteriores (repaso espaciado de Leitner). |
| Bucle infinito | Al completar el árbol: práctica rápida infinita o reiniciar el camino (nueva vuelta). |
| Modo 1: Simulador de audiencias | 8 casos ficticios bonaerenses (uno por unidad), con decisiones valoradas como óptimas, viables o equivocadas, y las normas aplicables. |
| Modo 2: El Fallo Clave | Síntesis de fallos (CSJN, Corte IDH, CIDH) en los artículos más densos + banco de jurisprudencia. |
| Modo 3: Supervivencia | 2 minutos a contrarreloj con preguntas ya vistas, priorizando errores. |
| Módulos dinámicos | Después de las 8 unidades centrales, el mapa genera nuevos módulos a partir del articulado (137 hoy). |
| Offline / PWA | Service worker con precache de toda la app, manifiesto instalable, atajos, recordatorios locales de racha. |
| Progreso local | IndexedDB (con respaldo en localStorage). Nada sale del dispositivo. |

### Contenido central (escrito a mano)

1. **Garantías del proceso**: arts. 1, 2 y 141 CPPBA + art. 2 CP.
2. **Fiscal, imputado y declaración**: arts. 56, 60 y 308 CPPBA + arts. 71 y 72 CP.
3. **Medidas de coerción y prisión preventiva**: arts. 144, 146, 148, 153/154, 157, 158 y 159 CPPBA.
4. **Excarcelación y eximición**: arts. 169, 171 y 185 CPPBA + arts. 26, 162, 164 y 166 CP.
5. **Nulidades y prueba**: arts. 201 a 203 y 209 a 211 CPPBA.
6. **IPP y elevación a juicio**: arts. 266, 282, 334 y 336 CPPBA.
7. **Juicio oral y veredicto**: arts. 338, 342 y 371 CPPBA + arts. 40 y 41 CP.
8. **Abreviado, probation y casación**: arts. 395 y 448 CPPBA + arts. 76 bis y ter CP.

## Fuentes y fidelidad de los textos ⚠️

- **Código Penal**: texto **literal**, importado del PDF provisto (`src/data/codigos/cp.json`). Ese PDF está actualizado hasta 2009 aprox. (última reforma detectada: Ley 26.551), así que **no refleja reformas posteriores** (p. ej., Ley 27.147 sobre los arts. 59 y 71, Ley 26.791 sobre el art. 80). Los artículos que se usan en las lecciones y tienen reformas conocidas muestran un aviso.
- **CPPBA**: no se adjuntó el texto oficial. Los artículos centrales se muestran en una **versión de estudio** (marcada 🧭 en la app) que hay que cotejar con el texto vigente. El resto del código se recorre por su estructura (índice de libros, títulos y capítulos).
- **Jurisprudencia**: síntesis didácticas; verificá siempre el fallo completo antes de citarlo.
- **Casos prácticos**: ficticios.

### Cargar el texto oficial del CPPBA

Con el PDF oficial de la Ley 11.922 (texto actualizado):

```bash
npm run importar:codigo -- --codigo CPPBA --pdf ruta/al/CPPBA.pdf
npm run build
```

El script (requiere `pdftotext`, de poppler-utils) genera `src/data/codigos/cppba.json`. Desde ese momento:

- las lecciones muestran el texto **literal** de cada artículo (desaparece la marca 🧭);
- los módulos dinámicos del CPPBA se generan **artículo por artículo** a partir del texto oficial.

El mismo comando sirve para actualizar el Código Penal (`--codigo CP`).

## Desarrollo

```bash
npm install
npm run dev        # servidor de desarrollo
npm test           # tests (integridad del contenido, generador, racha, vidas, repaso)
npm run build      # typecheck + build de producción con service worker
npm run preview    # sirve el build (probalo en el celular con la IP de tu PC)
```

Stack: React 19 + TypeScript + Vite, Tailwind CSS v4, framer-motion, zustand (persistencia en IndexedDB con idb-keyval), vite-plugin-pwa (Workbox, estrategia injectManifest), canvas-confetti. Tipografía Nunito empaquetada localmente (sin depender de la red).

```
src/
  data/            contenido y lógica de currículo
    unidades/      las 8 unidades centrales (lecciones, fallos, casos)
    articulos-cppba.ts, meta-cp.ts, glosario.ts, estructura-cppba.ts
    codigos/       articulado importado (cp.json; cppba.json si se importa) y registro
    generador.ts   módulos dinámicos a partir del articulado
    curriculo.ts   camino, desbloqueo y banco de preguntas
  store/           progreso offline (racha, vidas, XP, estadísticas)
  lib/             voz (TTS), sonidos, repaso espaciado, PWA y recordatorios
  components/      mascota, tarjetas, glosario, preguntas, sesión
  screens/         camino, lección, repaso, práctica, caso, supervivencia, perfil…
  sw.ts            service worker
scripts/
  importar-codigo.mjs   PDF → JSON de artículos
  generar-iconos.mjs    íconos PNG de la PWA
```

## Publicar e instalar en Android

El build (`dist/`) es estático: se puede publicar en cualquier hosting (Netlify, Vercel, Cloudflare Pages, GitHub Pages). Si se publica en un subdirectorio, definí `BASE_PATH` (p. ej. `BASE_PATH=/duolingo-penal-ba/ npm run build`).

Este repo incluye un workflow de **GitHub Pages** (`.github/workflows/pages.yml`): activá *Settings → Pages → Source: GitHub Actions* y se publica en cada push a `main` (o a mano desde *Actions*).

En Android: abrí la URL en Chrome → menú ⋮ → **Instalar app** (o el botón "Instalar" del perfil). Para recordatorios de racha, activalos en *Perfil → Ajustes*.
