import '@fontsource/nunito/400.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import '@fontsource/nunito/900.css';
import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { cargarCodigos } from './data/codigos';
import { escucharInstalacion, registrarServiceWorker } from './lib/pwa';
import { esperarHidratacion } from './store/progreso';

escucharInstalacion();
void registrarServiceWorker();

const raiz = createRoot(document.getElementById('root')!);

// Arranca cuando están listos el articulado (chunk aparte) y el progreso local.
// Si IndexedDB tarda (modo privado), no bloquea más de 3 segundos.
const limite = new Promise<void>((r) => window.setTimeout(r, 3000));
Promise.all([cargarCodigos(), Promise.race([esperarHidratacion(), limite])])
  .then(() => {
    document.getElementById('splash')?.remove();
    raiz.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  })
  .catch((e: unknown) => {
    console.error(e);
    raiz.render(
      <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
        <h1>No se pudo iniciar Carpi Penal</h1>
        <p>Recargá la página. Si el problema sigue, borrá los datos del sitio.</p>
      </div>,
    );
  });
