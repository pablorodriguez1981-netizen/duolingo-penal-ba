/// <reference types="vitest/config" />
import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// BASE_PATH permite publicar en un subdirectorio (p. ej. GitHub Pages: /duolingo-penal-ba/).
const base = process.env.BASE_PATH ?? '/';

/**
 * Herramienta de firma (firma/): copia los recursos de pdf.js (fuentes estándar,
 * mapas de caracteres y decodificadores de imágenes de documentos escaneados)
 * y agrega una política de seguridad estricta a sus páginas.
 */
function firmaPdf(): Plugin {
  const origen = resolve(__dirname, 'node_modules/pdfjs-dist');
  const carpetas = ['cmaps', 'standard_fonts', 'wasm', 'iccs'];
  // QuickJS sólo sirve para ejecutar JavaScript embebido en PDF (desactivado).
  const omitir = (nombre: string) => nombre.startsWith('quickjs');
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'wasm-unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self' data: blob: https://api.github.com https://raw.githubusercontent.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
  ].join('; ');
  return {
    name: 'firma-pdf',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const m = /\/firma\/pdfjs\/([\w-]+)\/([\w.-]+)$/.exec((req.url ?? '').split('?')[0]);
        if (!m || !carpetas.includes(m[1])) return next();
        try {
          res.end(readFileSync(join(origen, m[1], m[2])));
        } catch {
          next();
        }
      });
    },
    generateBundle() {
      for (const carpeta of carpetas) {
        for (const nombre of readdirSync(join(origen, carpeta))) {
          if (omitir(nombre)) continue;
          this.emitFile({ type: 'asset', fileName: `firma/pdfjs/${carpeta}/${nombre}`, source: readFileSync(join(origen, carpeta, nombre)) });
        }
      }
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.path.includes('/firma/') || ctx.server) return html;
        return html.replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`);
      },
    },
  };
}

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    firmaPdf(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      injectRegister: false,
      registerType: 'prompt',
      includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png'],
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,webmanifest}'],
        // La herramienta de firma no forma parte de la app offline.
        globIgnores: ['firma/**', 'assets/firma-*'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
      manifest: {
        id: base,
        name: 'Carpi Penal · CPPBA y Código Penal',
        short_name: 'Carpi Penal',
        description:
          'Aprendé el Código Procesal Penal bonaerense (Ley 11.922) y el Código Penal con lecciones de 3 a 5 minutos, rachas, casos prácticos y repaso inteligente.',
        lang: 'es-AR',
        dir: 'ltr',
        start_url: base,
        scope: base,
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone'],
        orientation: 'any',
        theme_color: '#1f5fd6',
        background_color: '#f4f7ff',
        categories: ['education', 'books'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
          { name: 'Modo Supervivencia', short_name: 'Supervivencia', url: `${base}#/supervivencia` },
          { name: 'Práctica rápida', short_name: 'Práctica', url: `${base}#/practica` },
          { name: 'Glosario jurídico', short_name: 'Glosario', url: `${base}#/glosario` },
        ],
      },
      devOptions: { enabled: false, type: 'module' },
    }),
  ],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'firma-cliente': resolve(__dirname, 'firma/index.html'),
        'firma-estudio': resolve(__dirname, 'firma/estudio/index.html'),
      },
      output: {
        // Librerías en chunks estables: una actualización de contenido no obliga a re-descargarlas.
        manualChunks(id) {
          // Ayudantes de CommonJS: los usan la app y pdf-lib; aparte, para que la app no cargue pdf-lib.
          if (id.includes('commonjsHelpers')) return 'cjs';
          if (/node_modules\/pdfjs-dist\//.test(id)) return 'firma-pdfjs';
          if (/node_modules\/(pdf-lib|@pdf-lib|pako)\//.test(id)) return 'firma-pdflib';
          if (/node_modules\/signature_pad\//.test(id)) return 'firma-trazo';
          // Sólo lo que comparten la página del cliente y el panel del estudio.
          if (/\/src\/firma\/(cifrado|enlace|estampar|ubicacion)\.ts$|\/src\/firma\/firma\.css$/.test(id)) return 'firma-comun';
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) return 'react';
          if (/node_modules\/(framer-motion|motion-dom|motion-utils|canvas-confetti)\//.test(id)) return 'animacion';
          if (id.includes('/src/data/unidades/')) return 'unidades';
        },
      },
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
