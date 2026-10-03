#!/usr/bin/env node
/**
 * Genera los íconos PNG de la PWA a partir de public/favicon.svg usando el
 * Chromium de Playwright.
 *   NODE_PATH=$(npm root -g) node scripts/generar-iconos.mjs
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

// require() respeta NODE_PATH (permite usar un Playwright instalado globalmente).
const { chromium } = createRequire(import.meta.url)('playwright');

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(resolve(raiz, 'public/favicon.svg'), 'utf8');

const salidas = [
  { archivo: 'icons/icon-192.png', tam: 192, relleno: 0, redondo: true },
  { archivo: 'icons/icon-512.png', tam: 512, relleno: 0, redondo: true },
  // Maskable: el contenido dentro de la zona segura (80 %) y fondo a sangre.
  { archivo: 'icons/icon-maskable-512.png', tam: 512, relleno: 0.12, redondo: false },
  { archivo: 'icons/apple-touch-icon.png', tam: 180, relleno: 0.06, redondo: false },
];

const navegador = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const pagina = await navegador.newPage();
for (const s of salidas) {
  const interior = Math.round(s.tam * (1 - 2 * s.relleno));
  const contenido = svg.replace('<svg ', `<svg width="${interior}" height="${interior}" `);
  await pagina.setViewportSize({ width: s.tam, height: s.tam });
  await pagina.setContent(
    `<html><body style="margin:0;width:${s.tam}px;height:${s.tam}px;display:grid;place-items:center;background:${s.redondo ? 'transparent' : '#1f5fd6'}">${contenido}</body></html>`,
  );
  await pagina.screenshot({ path: resolve(raiz, 'public', s.archivo), omitBackground: s.redondo });
  console.log('✔', s.archivo);
}
await navegador.close();
