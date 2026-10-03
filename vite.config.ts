/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// BASE_PATH permite publicar en un subdirectorio (p. ej. GitHub Pages: /duolingo-penal-ba/).
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      injectRegister: false,
      registerType: 'prompt',
      includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png'],
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,webmanifest}'],
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
      output: {
        // Librerías en chunks estables: una actualización de contenido no obliga a re-descargarlas.
        manualChunks(id) {
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
