import { businessesHandler } from './server/businesses.mjs';
import { weatherHandler } from './server/weather.mjs';
import { agendaHandler } from './server/agenda.mjs';
import { defineConfig, loadEnv } from 'vite';
import { createSearchAiHandler } from './server/search-ai.mjs';
import { alsaHandler } from './server/alsa.mjs';
import { dutyHandler } from './server/duty.mjs';
export default defineConfig(({mode})=>{const env=loadEnv(mode,process.cwd(),'');const searchAi=createSearchAiHandler(process.env.GEMINI_API_KEY || env.GEMINI_API_KEY);return { plugins:[{name:'municipal-duty',configureServer(server){server.middlewares.use('/api/farmacia-guardia',dutyHandler);server.middlewares.use('/api/alsa',alsaHandler);server.middlewares.use('/api/agenda',agendaHandler);server.middlewares.use('/api/weather',weatherHandler);server.middlewares.use('/api/businesses',businessesHandler);server.middlewares.use('/api/search-ai',searchAi)},configurePreviewServer(server){server.middlewares.use('/api/farmacia-guardia',dutyHandler);server.middlewares.use('/api/alsa',alsaHandler);server.middlewares.use('/api/agenda',agendaHandler);server.middlewares.use('/api/weather',weatherHandler);server.middlewares.use('/api/businesses',businessesHandler);server.middlewares.use('/api/search-ai',searchAi)}}] }});
