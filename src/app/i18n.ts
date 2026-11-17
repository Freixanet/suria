// Plataforma Súria (app): rutes i textos compartits en català i castellà.
// Cada vista té els seus textos propis; aquí només hi ha el que fan servir diverses pantalles.
export type Lang = 'ca' | 'es';
export type Ruta =
  | 'avui'
  | 'agenda'
  | 'comunitat'
  | 'comerc'
  | 'pregunta'
  | 'gestions'
  | 'benvinguda'
  | 'compte'
  | 'mes'
  | 'negocis'
  | 'descobreix';

export const slugs: Record<Ruta, Record<Lang, string>> = {
  avui: { ca: '', es: '' },
  agenda: { ca: 'agenda', es: 'agenda' },
  comunitat: { ca: 'comunitat', es: 'comunidad' },
  comerc: { ca: 'comerc', es: 'comercio' },
  pregunta: { ca: 'pregunta', es: 'pregunta' },
  gestions: { ca: 'gestions', es: 'gestiones' },
  benvinguda: { ca: 'benvinguda', es: 'bienvenida' },
  compte: { ca: 'compte', es: 'cuenta' },
  mes: { ca: 'mes', es: 'mas' },
  negocis: { ca: 'per-a-negocis', es: 'para-negocios' },
  descobreix: { ca: 'descobreix', es: 'descubre' },
};

const base = () => import.meta.env.BASE_URL.replace(/\/$/, '');

/** URL d'una pantalla de l'app; `sub` afegeix un fragment de ruta (p. ex. l'id d'una activitat). */
export function href(lang: Lang, ruta: Ruta, sub?: string): string {
  const prefix = lang === 'es' ? '/es/app' : '/app';
  const parts = [slugs[ruta][lang], sub].filter(Boolean).join('/');
  return `${base()}${prefix}/${parts ? parts + '/' : ''}`;
}

export const comu = {
  ca: {
    app: 'Súria',
    nav: {
      avui: 'Avui',
      agenda: 'Agenda',
      pregunta: 'Pregunta',
      comunitat: 'Comunitat',
      mes: 'Més',
      comerc: 'Comerç',
      gestions: 'Gestions',
      benvinguda: 'Nou a Súria',
      compte: 'El meu compte',
      negocis: 'Per a negocis',
      descobreix: 'Descobreix',
    },
    navPrincipal: 'Navegació principal',
    saltar: 'Salta al contingut',
    entrar: 'Entra',
    exemple: 'Exemple',
    exempleLlarg: 'Contingut d’exemple del prototip',
    oficial: 'Dada oficial',
    font: 'Font',
    veureTot: 'Veure-ho tot',
    tancar: 'Tanca',
    prototip: 'Prototip',
    independencia: 'Iniciativa independent. No és un servei de l’Ajuntament de Súria.',
    llengua: 'Llengua',
    altraLlengua: 'Castellano',
    perfil: 'Perfil',
    cercar: 'Cerca',
    gratuit: 'Gratuït',
    hiAniré: 'Hi aniré',
    hiVas: 'Hi vas',
    persones: 'persones',
    hiVan: 'hi van',
    gracies: 'Gràcies',
    respostes: 'respostes',
    resposta: 'resposta',
    obert: 'Obert segons horari comunicat',
    tancat: 'Tancat ara',
    preguntaPlaceholder: 'Pregunta el que vulguis sobre Súria…',
  },
  es: {
    app: 'Súria',
    nav: {
      avui: 'Hoy',
      agenda: 'Agenda',
      pregunta: 'Pregunta',
      comunitat: 'Comunidad',
      mes: 'Más',
      comerc: 'Comercio',
      gestions: 'Gestiones',
      benvinguda: 'Nuevo en Súria',
      compte: 'Mi cuenta',
      negocis: 'Para negocios',
      descobreix: 'Descubre',
    },
    navPrincipal: 'Navegación principal',
    saltar: 'Saltar al contenido',
    entrar: 'Entra',
    exemple: 'Ejemplo',
    exempleLlarg: 'Contenido de ejemplo del prototipo',
    oficial: 'Dato oficial',
    font: 'Fuente',
    veureTot: 'Verlo todo',
    tancar: 'Cerrar',
    prototip: 'Prototipo',
    independencia: 'Iniciativa independiente. No es un servicio del Ayuntamiento de Súria.',
    llengua: 'Idioma',
    altraLlengua: 'Català',
    perfil: 'Perfil',
    cercar: 'Buscar',
    gratuit: 'Gratis',
    hiAniré: 'Iré',
    hiVas: 'Vas',
    persones: 'personas',
    hiVan: 'van',
    gracies: 'Gracias',
    respostes: 'respuestas',
    resposta: 'respuesta',
    obert: 'Abierto según horario comunicado',
    tancat: 'Cerrado ahora',
    preguntaPlaceholder: 'Pregunta lo que quieras sobre Súria…',
  },
} as const;

/** Textos que necessita el JavaScript del navegador (avisos, xat, formularis). */
export const client = {
  ca: {
    copiat: 'Enllaç copiat',
    desat: 'Desat',
    tretDesat: 'Tret de desats',
    apuntat: 'T’hi has apuntat. Te’n recordarem el dia abans.',
    desapuntat: 'Ja no hi vas.',
    companyia: 'Fet. Si algú més busca companyia, us posarem en contacte.',
    publicat: 'Publicat. Gràcies per participar.',
    calEntrar: 'Entra per participar',
    benvingut: 'Benvingut/da, {nom}',
    sortit: 'Has sortit del compte',
    ajust: 'Canvi desat',
    araMateix: 'ara mateix',
    tu: 'Tu',
    nouVeí: 'Nou veí',
    pas: 'Pas completat',
    calendari: 'Afegit al teu calendari',
  },
  es: {
    copiat: 'Enlace copiado',
    desat: 'Guardado',
    tretDesat: 'Quitado de guardados',
    apuntat: 'Te has apuntado. Te lo recordaremos el día antes.',
    desapuntat: 'Ya no vas.',
    companyia: 'Hecho. Si alguien más busca compañía, os pondremos en contacto.',
    publicat: 'Publicado. Gracias por participar.',
    calEntrar: 'Entra para participar',
    benvingut: 'Te damos la bienvenida, {nom}',
    sortit: 'Has salido de la cuenta',
    ajust: 'Cambio guardado',
    araMateix: 'ahora mismo',
    tu: 'Tú',
    nouVeí: 'Nuevo vecino',
    pas: 'Paso completado',
    calendari: 'Añadido a tu calendario',
  },
} as const;
