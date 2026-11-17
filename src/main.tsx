import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router';
import { MotionConfig } from 'motion/react';
import '@fontsource-variable/geist';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/ui.css';
import './styles/screens.css';
import { App } from './App';

// Dins d'un visor incrustat (artifact), les rutes van després de «#» i el tema el pot fixar l'amfitrió.
const Router = import.meta.env.VITE_HASH ? HashRouter : BrowserRouter;
const hostTheme = document.documentElement.dataset.theme;
if (hostTheme === 'dark' || hostTheme === 'light') (window as unknown as { __hostTheme?: string }).__hostTheme = hostTheme;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </Router>
  </StrictMode>,
);
