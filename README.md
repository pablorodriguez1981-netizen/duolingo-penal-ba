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
| Racha, vidas, XP | Racha diaria con llama animada, 3 corazones que se recargan cada 20 min o con repasos, XP. La Unidad 1 es de práctica libre (no resta corazones) y para recuperar corazones se repasan las preguntas ya intentadas. |
| Dos recorridos | «Camino guiado» (desbloqueo progresivo, con el nombre de cada paso bajo su nodo) o «Elegir tema»: entrar directo a cualquier tema o artículo (p. ej., excarcelación, casación, art. 448 bis). |
| Repaso dinámico obligatorio | Al final de cada unidad: mezcla preguntas de la unidad y de unidades anteriores (repaso espaciado de Leitner). |
| Bucle infinito | Al completar el árbol: práctica rápida infinita o reiniciar el camino (nueva vuelta). |
| Modo 1: Simulador de audiencias | 8 casos ficticios bonaerenses (uno por unidad), con decisiones valoradas como óptimas, viables o equivocadas, y las normas aplicables. |
| Modo 2: El Fallo Clave | Síntesis de fallos (CSJN, SCBA, Tribunal de Casación bonaerense, Corte IDH, CIDH) con enlace «Ver fallo» al texto completo en el sitio oficial; banco de jurisprudencia filtrable. |
| Modo 3: Supervivencia | 2 minutos a contrarreloj con preguntas ya vistas, priorizando errores. |
| Módulos dinámicos | Después de las 8 unidades centrales, el mapa genera nuevos módulos a partir del articulado completo del CPPBA y del Código Penal (260 hoy). |
| Offline / PWA | Service worker con precache de toda la app, manifiesto instalable, atajos, recordatorios locales de racha. |
| Progreso local | IndexedDB (con respaldo en localStorage). Nada sale del dispositivo. En Perfil se puede guardar una copia (archivo JSON) y restaurarla en otro teléfono, sin cuentas. |

### Contenido central (escrito a mano)

1. **Garantías del proceso**: arts. 1, 2 y 141 CPPBA + art. 2 CP.
2. **Fiscal, imputado y declaración**: arts. 56, 60 y 308 CPPBA + arts. 71 y 72 CP.
3. **Medidas de coerción y prisión preventiva**: arts. 144, 146, 148, 153/154, 157, 158, 159, 163 y 168 bis CPPBA.
4. **Excarcelación y eximición**: arts. 169, 171 y 185 CPPBA + arts. 26, 162, 164 y 166 CP.
5. **Nulidades y prueba**: arts. 201 a 203 y 209 a 211 CPPBA.
6. **IPP y elevación a juicio**: arts. 266, 282, 334 y 336 CPPBA.
7. **Juicio oral y veredicto**: arts. 338, 342, 358 (Ley 15.004), 371 y 371 quater (jurados) CPPBA + arts. 40 y 41 CP.
8. **Abreviado, probation y casación**: arts. 395 y 448 CPPBA + arts. 76 bis y ter CP.

## Fuentes de los textos

Revisadas el **05/10/2026**. Cada tarjeta de lectura muestra sólo «Texto vigente · revisado el … · Ver en (fuente oficial)».

- **CPPBA (Ley 11.922)**: texto actualizado de [normas.gba.gob.ar](https://normas.gba.gob.ar/documentos/V9OGJUPx.html), con las reformas hasta la **Ley 15.232** (incluida la Ley 15.004 sobre el art. 358). Los fragmentos observados (vetados) por decreto de promulgación se excluyen del texto y quedan en el historial de reformas.
- **Código Penal (Ley 11.179)**: texto actualizado de [InfoLEG / argentina.gob.ar](https://www.argentina.gob.ar/normativa/nacional/ley-11179-16546/actualizacion), con las reformas hasta la **Ley 27.786** (B.O. 10/3/2025).
- **Jurisprudencia**: síntesis didácticas con enlace al texto completo (buscador oficial de la CSJN, SCBA, Corte IDH, CIDH), listados en `src/data/enlaces-fallos.ts`.
- **Casos prácticos**: ficticios.

### Actualizar los textos

Las fuentes oficiales se descargan con el workflow **«Descargar normativa y jurisprudencia»** (`.github/workflows/descargar-normativa.yml`, lista en `fuentes/urls.tsv`; los enlaces a fallos de la CSJN se resuelven con `scripts/resolver-fallos-csjn.py`). El resultado queda en la rama `fuentes-normativa`. Luego:

```bash
node scripts/importar-codigo.mjs --codigo CPPBA --html fuentes/cppba-normas-gba.html \
  --fuente "Texto actualizado publicado por el Sistema de Información Normativa de la Provincia de Buenos Aires" \
  --enlace "https://normas.gba.gob.ar/documentos/V9OGJUPx.html"
node scripts/importar-codigo.mjs --codigo CP --html fuentes/cp-infoleg.htm \
  --fuente "Texto actualizado publicado por InfoLEG (Ministerio de Justicia de la Nación)" \
  --enlace "https://www.argentina.gob.ar/normativa/nacional/ley-11179-16546/actualizacion"
npm test && npm run build
```

El importador también acepta `--pdf`, `--docx` y `--txt`. Un test verifica que cada fragmento resaltado en las lecciones aparezca literalmente en el artículo que se lee: si una reforma cambia la redacción, indica qué lección revisar.

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
    meta-cp.ts, glosario.ts, estructura-cppba.ts, enlaces-fallos.ts
    codigos/       articulado vigente importado (cp.json, cppba.json) y registro
    generador.ts   módulos dinámicos a partir del articulado
    curriculo.ts   camino, desbloqueo y banco de preguntas
  store/           progreso offline (racha, vidas, XP, estadísticas)
  lib/             voz (TTS), sonidos, repaso espaciado, PWA y recordatorios
  components/      mascota, tarjetas, glosario, preguntas, sesión
  screens/         camino, lección, repaso, práctica, caso, supervivencia, perfil…
  sw.ts            service worker
scripts/
  importar-codigo.mjs   HTML/PDF/Word → JSON de artículos
  html-a-texto.py       HTML oficial → texto
  resolver-fallos-csjn.py  enlaces a fallos completos de la CSJN
  generar-iconos.mjs    íconos PNG de la PWA
```

## Publicar e instalar en Android

El build (`dist/`) es estático: se puede publicar en cualquier hosting (Netlify, Vercel, Cloudflare Pages, GitHub Pages). Si se publica en un subdirectorio, definí `BASE_PATH` (p. ej. `BASE_PATH=/duolingo-penal-ba/ npm run build`).

Este repo incluye un workflow de **GitHub Pages** (`.github/workflows/pages.yml`): activá *Settings → Pages → Source: GitHub Actions* y se publica en cada push a `main` (o a mano desde *Actions*).

En Android: abrí la URL en Chrome → menú ⋮ → **Instalar app** (o el botón "Instalar" del perfil). Para recordatorios de racha, activalos en *Perfil → Ajustes*.
