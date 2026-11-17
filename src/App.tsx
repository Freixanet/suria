import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { Shell } from './components/Shell';
import { Home } from './screens/Home';
import { useStore } from './lib/store';

const Agenda = lazy(() => import('./screens/Agenda'));
const EventPage = lazy(() => import('./screens/EventPage'));
const Ask = lazy(() => import('./screens/Ask'));
const Community = lazy(() => import('./screens/Community'));
const Voice = lazy(() => import('./screens/Voice'));
const Town = lazy(() => import('./screens/Town'));
const Shops = lazy(() => import('./screens/Shops'));
const ShopPage = lazy(() => import('./screens/ShopPage'));
const Services = lazy(() => import('./screens/Services'));
const Report = lazy(() => import('./screens/Report'));
const Welcome = lazy(() => import('./screens/Welcome'));
const Visit = lazy(() => import('./screens/Visit'));
const Business = lazy(() => import('./screens/Business'));
const SignIn = lazy(() => import('./screens/SignIn'));
const Me = lazy(() => import('./screens/Me'));
const Notifications = lazy(() => import('./screens/Notifications'));
const NotFound = lazy(() => import('./screens/NotFound'));

/** Aplica les preferències de lectura (mida, tema, contrast) a tota l'app. */
function usePrefs() {
  const prefs = useStore((s) => s.prefs);
  useEffect(() => {
    const d = document.documentElement;
    const apply = () => {
      if (prefs.text !== 'm') d.dataset.text = prefs.text; else delete d.dataset.text;
      if (prefs.contrast) d.dataset.contrast = 'high'; else delete d.dataset.contrast;
      const host = (window as unknown as { __hostTheme?: string }).__hostTheme;
      const system = host ? host === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      const dark = prefs.theme === 'dark' || (prefs.theme === 'system' && system);
      if (dark) d.dataset.theme = 'dark'; else delete d.dataset.theme;
    };
    apply();
    const mq = matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [prefs.text, prefs.theme, prefs.contrast]);
}

export function App() {
  usePrefs();
  return (
    <Shell>
      <Suspense fallback={<div className="wrap" style={{ minHeight: '60vh' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/agenda/:id" element={<EventPage />} />
          <Route path="/pregunta" element={<Ask />} />
          <Route path="/comunitat" element={<Community />} />
          <Route path="/comunitat/veu" element={<Voice />} />
          <Route path="/poble" element={<Town />} />
          <Route path="/poble/comerc" element={<Shops />} />
          <Route path="/poble/comerc/:id" element={<ShopPage />} />
          <Route path="/poble/tramits" element={<Services />} />
          <Route path="/poble/incidencia" element={<Report />} />
          <Route path="/poble/benvinguda" element={<Welcome />} />
          <Route path="/poble/descobreix" element={<Visit />} />
          <Route path="/negocis" element={<Business />} />
          <Route path="/entrar" element={<SignIn />} />
          <Route path="/jo" element={<Me />} />
          <Route path="/avisos" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Shell>
  );
}
