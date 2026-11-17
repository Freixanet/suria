// CONTINGUT D'EXEMPLE. Res d'aquí és una dada real de Súria: serveix per ensenyar com funcionarà
// la plataforma. A la interfície, tot el que surt d'aquest fitxer porta l'etiqueta «Exemple».
// Les dates són relatives a avui perquè el prototip sempre tingui vida.
import type { Bi } from './i18n';

export type Tone = 'sun' | 'coral' | 'mint' | 'lilac' | 'sky' | 'stone' | 'accent';

export type EventCat = 'cultura' | 'grans' | 'families' | 'natura' | 'veinat' | 'fires';
export const eventCats: Record<EventCat, { label: Bi; tone: Tone; icon: string }> = {
  cultura: { label: { ca: 'Cultura', es: 'Cultura' }, tone: 'sun', icon: 'MicVocal' },
  grans: { label: { ca: 'Gent gran', es: 'Mayores' }, tone: 'coral', icon: 'HeartHandshake' },
  families: { label: { ca: 'Famílies', es: 'Familias' }, tone: 'sky', icon: 'Baby' },
  natura: { label: { ca: 'Natura i esport', es: 'Naturaleza y deporte' }, tone: 'mint', icon: 'Trees' },
  veinat: { label: { ca: 'Veïnat', es: 'Vecindario' }, tone: 'lilac', icon: 'Users' },
  fires: { label: { ca: 'Fires i mercats', es: 'Ferias y mercados' }, tone: 'sun', icon: 'ShoppingBasket' },
};

export interface EventItem {
  id: string;
  day: number;
  start: string;
  end?: string;
  cat: EventCat;
  title: Bi;
  place: Bi;
  summary: Bi;
  expect: Bi;
  access: Bi;
  host: Bi;
  price?: Bi;
  spots?: number;
  going: number;
  buddies: number;
  firstTime?: boolean;
}

export const events: EventItem[] = [
  {
    id: 'tauleta', day: 0, start: '17:00', end: '18:30', cat: 'grans', going: 12, buddies: 2, firstTime: true, spots: 14,
    title: { ca: 'Tarda de tauletes i mòbils', es: 'Tarde de tablets y móviles' },
    place: { ca: 'Biblioteca · sala 2', es: 'Biblioteca · sala 2' },
    summary: { ca: 'Videotrucades amb la família, fotos i WhatsApp. Amb el teu aparell i sense presses.', es: 'Videollamadas con la familia, fotos y WhatsApp. Con tu aparato y sin prisas.' },
    expect: { ca: 'Entres, et donen un cafè i et presenten la persona que t’ajudarà. Grups de tres. Pots preguntar el mateix deu vegades.', es: 'Entras, te dan un café y te presentan a la persona que te ayudará. Grupos de tres. Puedes preguntar lo mismo diez veces.' },
    access: { ca: 'Planta baixa, sense graons.', es: 'Planta baja, sin escalones.' },
    host: { ca: 'Joves voluntaris de l’institut', es: 'Jóvenes voluntarios del instituto' },
  },
  {
    id: 'passeig-riu', day: 0, start: '10:00', end: '11:30', cat: 'natura', going: 18, buddies: 1, firstTime: true,
    title: { ca: 'Passeig a ritme lent pel riu', es: 'Paseo a ritmo lento por el río' },
    place: { ca: 'Sortida des del pont vell', es: 'Salida desde el puente viejo' },
    summary: { ca: 'Una hora i mitja caminant pla, xerrant. El ritme el marca qui va més a poc a poc.', es: 'Hora y media caminando llano, charlando. El ritmo lo marca quien va más despacio.' },
    expect: { ca: 'El grup espera cinc minuts. Porta aigua i calçat còmode. A la meitat hi ha una parada amb bancs.', es: 'El grupo espera cinco minutos. Trae agua y calzado cómodo. A mitad hay una parada con bancos.' },
    access: { ca: 'Camí pla i ample.', es: 'Camino llano y ancho.' },
    host: { ca: 'Colla caminant', es: 'Grupo caminante' },
  },
  {
    id: 'cor-obert', day: 1, start: '20:00', end: '21:30', cat: 'cultura', going: 23, buddies: 1, firstTime: true,
    title: { ca: 'Assaig obert del cor', es: 'Ensayo abierto del coro' },
    place: { ca: 'Casal cultural', es: 'Casal cultural' },
    summary: { ca: 'Vine a escoltar. Si t’animes, busquen veus: no cal saber música.', es: 'Ven a escuchar. Si te animas, buscan voces: no hace falta saber música.' },
    expect: { ca: 'Seus al fons. Al descans et pregunten si vols provar una peça fàcil. Dir que no també està bé.', es: 'Te sientas al fondo. En el descanso te preguntan si quieres probar una pieza fácil. Decir que no también está bien.' },
    access: { ca: 'Entrada a peu de carrer.', es: 'Entrada a pie de calle.' },
    host: { ca: 'Cor del poble', es: 'Coro del pueblo' },
  },
  {
    id: 'contes', day: 1, start: '17:30', end: '18:15', cat: 'families', going: 29, buddies: 0,
    title: { ca: 'Contes amb llum de llanterna', es: 'Cuentos con luz de linterna' },
    place: { ca: 'Biblioteca · espai infantil', es: 'Biblioteca · espacio infantil' },
    summary: { ca: 'Per a infants de 3 a 7 anys. Porteu una llanterna si en teniu.', es: 'Para niños de 3 a 7 años. Traed una linterna si tenéis.' },
    expect: { ca: 'Els infants a terra amb coixins; les famílies, al darrere. Dura uns 40 minuts.', es: 'Los niños en el suelo con cojines; las familias, detrás. Dura unos 40 minutos.' },
    access: { ca: 'Lloc per a cotxets.', es: 'Sitio para carritos.' },
    host: { ca: 'Biblioteca', es: 'Biblioteca' },
  },
  {
    id: 'sopar-nous', day: 3, start: '20:30', end: '22:30', cat: 'veinat', going: 41, buddies: 5, firstTime: true, spots: 60,
    price: { ca: 'Porta un plat per compartir', es: 'Trae un plato para compartir' },
    title: { ca: 'Sopar de benvinguda als nous veïns', es: 'Cena de bienvenida a los nuevos vecinos' },
    place: { ca: 'Casal cultural', es: 'Casal cultural' },
    summary: { ca: 'Si fa menys de dos anys que hi vius, ets el convidat. Si en fa trenta, vine a rebre’ls.', es: 'Si hace menos de dos años que vives aquí, eres el invitado. Si hace treinta, ven a recibirlos.' },
    expect: { ca: 'Algú del veïnat t’espera a la porta i et presenta gent. Taules llargues, sense lloc fix. Al final, una taula amb totes les entitats.', es: 'Alguien del vecindario te espera en la puerta y te presenta gente. Mesas largas, sin sitio fijo. Al final, una mesa con todas las entidades.' },
    access: { ca: 'Opcions vegetarianes i sense gluten.', es: 'Opciones vegetarianas y sin gluten.' },
    host: { ca: 'Associació de veïns', es: 'Asociación de vecinos' },
  },
  {
    id: 'mercat-hivern', day: 4, start: '10:00', end: '20:00', cat: 'fires', going: 134, buddies: 0,
    title: { ca: 'Mercat d’hivern de productors', es: 'Mercado de invierno de productores' },
    place: { ca: 'Plaça major', es: 'Plaza mayor' },
    summary: { ca: 'Formatges, mel, verdura i artesania de la comarca. Compra aquí els regals.', es: 'Quesos, miel, verdura y artesanía de la comarca. Compra aquí los regalos.' },
    expect: { ca: 'Al matí és més tranquil. A la tarda hi ha música i més gent.', es: 'Por la mañana es más tranquilo. Por la tarde hay música y más gente.' },
    access: { ca: 'Plaça sense cotxes durant el mercat.', es: 'Plaza sin coches durante el mercado.' },
    host: { ca: 'Comerciants del poble', es: 'Comerciantes del pueblo' },
  },
  {
    id: 'ruta-historia', day: 4, start: '11:00', end: '12:30', cat: 'cultura', going: 17, buddies: 0, spots: 20,
    price: { ca: '4 €', es: '4 €' },
    title: { ca: 'Ruta: el poble que va créixer amb la mina', es: 'Ruta: el pueblo que creció con la mina' },
    place: { ca: 'Punt de trobada a la plaça', es: 'Punto de encuentro en la plaza' },
    summary: { ca: 'Explicada per veïns que hi van treballar. Grups petits, per respecte a qui hi viu.', es: 'Contada por vecinos que trabajaron allí. Grupos pequeños, por respeto a quien vive allí.' },
    expect: { ca: 'Hi ha pujades. Parlem baix als carrers estrets.', es: 'Hay subidas. Hablamos bajo en las calles estrechas.' },
    access: { ca: 'Recorregut amb pendent.', es: 'Recorrido con pendiente.' },
    host: { ca: 'Grup de memòria local', es: 'Grupo de memoria local' },
  },
  {
    id: 'ball', day: 5, start: '17:00', end: '19:30', cat: 'grans', going: 52, buddies: 2,
    title: { ca: 'Ball de diumenge', es: 'Baile de domingo' },
    place: { ca: 'Casal de la gent gran', es: 'Casal de los mayores' },
    summary: { ca: 'Música en directe i xocolata. No cal parella.', es: 'Música en directo y chocolate. No hace falta pareja.' },
    expect: { ca: 'Comença amb peces lentes. Hi ha cadires a tot el voltant.', es: 'Empieza con piezas lentas. Hay sillas alrededor.' },
    access: { ca: 'Lavabo adaptat.', es: 'Baño adaptado.' },
    host: { ca: 'Casal de la gent gran', es: 'Casal de los mayores' },
  },
  {
    id: 'reparem', day: 7, start: '10:00', end: '13:00', cat: 'veinat', going: 15, buddies: 0, firstTime: true,
    title: { ca: 'Reparem junts', es: 'Reparamos juntos' },
    place: { ca: 'Taller del casal', es: 'Taller del casal' },
    summary: { ca: 'Porta la làmpada, la cadira o els pantalons. Ho arreglem i aprens com.', es: 'Trae la lámpara, la silla o los pantalones. Lo arreglamos y aprendes cómo.' },
    expect: { ca: 'T’apuntes a l’entrada i esperes torn amb un cafè.', es: 'Te apuntas en la entrada y esperas turno con un café.' },
    access: { ca: 'Planta baixa.', es: 'Planta baja.' },
    host: { ca: 'Grup de reparació', es: 'Grupo de reparación' },
  },
  {
    id: 'factura', day: 8, start: '19:00', end: '20:00', cat: 'veinat', going: 27, buddies: 0,
    title: { ca: 'Xerrada: entén la teva factura de la llum', es: 'Charla: entiende tu factura de la luz' },
    place: { ca: 'Sala d’actes', es: 'Sala de actos' },
    summary: { ca: 'Potència, tarifes i ajuts. Porta una factura i te la miren.', es: 'Potencia, tarifas y ayudas. Trae una factura y te la miran.' },
    expect: { ca: 'Una hora d’explicació i mitja hora de preguntes.', es: 'Una hora de explicación y media hora de preguntas.' },
    access: { ca: 'Bucle magnètic per a audiòfons.', es: 'Bucle magnético para audífonos.' },
    host: { ca: 'Punt d’energia', es: 'Punto de energía' },
  },
  {
    id: 'cinema', day: 10, start: '18:00', end: '20:00', cat: 'cultura', going: 38, buddies: 1,
    price: { ca: '3 €', es: '3 €' },
    title: { ca: 'Cinema de diumenge', es: 'Cine de domingo' },
    place: { ca: 'Sala d’actes', es: 'Sala de actos' },
    summary: { ca: 'Una pel·lícula per a totes les edats, subtitulada.', es: 'Una película para todas las edades, subtitulada.' },
    expect: { ca: 'Seients lliures. Portes obertes mitja hora abans.', es: 'Asientos libres. Puertas abiertas media hora antes.' },
    access: { ca: 'Espai per a cadira de rodes.', es: 'Espacio para silla de ruedas.' },
    host: { ca: 'Cineclub', es: 'Cineclub' },
  },
];

export type Channel = 'avisos' | 'preguntes' | 'recomanacions' | 'perdut' | 'regalo' | 'ajuda' | 'hola';
export const channels: Record<Channel, { label: Bi; tone: Tone; icon: string }> = {
  avisos: { label: { ca: 'Avisos', es: 'Avisos' }, tone: 'coral', icon: 'Megaphone' },
  preguntes: { label: { ca: 'Preguntes', es: 'Preguntas' }, tone: 'sky', icon: 'MessageCircleQuestionMark' },
  recomanacions: { label: { ca: 'Recomanacions', es: 'Recomendaciones' }, tone: 'sun', icon: 'Star' },
  perdut: { label: { ca: 'Perdut i trobat', es: 'Perdido y encontrado' }, tone: 'lilac', icon: 'Search' },
  regalo: { label: { ca: 'Regalo i canvio', es: 'Regalo y cambio' }, tone: 'mint', icon: 'Gift' },
  ajuda: { label: { ca: 'Dono un cop de mà', es: 'Echo una mano' }, tone: 'mint', icon: 'HandHeart' },
  hola: { label: { ca: 'Hola, sóc nou', es: 'Hola, soy nuevo' }, tone: 'sky', icon: 'Hand' },
};

export interface Post {
  id: string;
  channel: Channel;
  author: string;
  initials: string;
  tone: Tone;
  badge?: Bi;
  mins: number;
  text: string; // cadascú escriu en la seva llengua
  thanks: number;
  replies: { author: string; initials: string; tone: Tone; text: string }[];
  solved?: boolean;
}

export const posts: Post[] = [
  {
    id: 'p1', channel: 'hola', author: 'Irene V.', initials: 'IV', tone: 'sky', badge: { ca: 'Nova veïna', es: 'Nueva vecina' }, mins: 22,
    text: 'Hola a tothom! Fa un mes que vivim aquí amb la meva filla de 5 anys. Busquem un parc tranquil per les tardes i, si hi ha altres famílies noves, ens encantaria conèixer-vos.',
    thanks: 21,
    replies: [
      { author: 'Rosa M.', initials: 'RM', tone: 'coral', text: 'Benvingudes! Els divendres som unes quantes famílies al parc del riu cap a les sis.' },
      { author: 'Pau G.', initials: 'PG', tone: 'sun', text: 'Demà hi ha contes a la biblioteca, és un bon lloc per començar 🙂' },
    ],
  },
  {
    id: 'p2', channel: 'avisos', author: 'Toni R.', initials: 'TR', tone: 'coral', mins: 70,
    text: 'Ojo: esta mañana hay obras en la entrada del pueblo y un solo carril. Salid con tiempo si bajáis a la ciudad.',
    thanks: 36, replies: [{ author: 'Marta F.', initials: 'MF', tone: 'lilac', text: 'Gràcies! A les 8 ja hi havia cua.' }],
  },
  {
    id: 'p3', channel: 'preguntes', author: 'Karim B.', initials: 'KB', tone: 'sun', badge: { ca: 'Nou veí', es: 'Nuevo vecino' }, mins: 140, solved: true,
    text: '¿Cómo se pide la recogida de muebles viejos? Tengo un colchón y no quiero dejarlo mal en la calle.',
    thanks: 9, replies: [{ author: 'Laura P.', initials: 'LP', tone: 'mint', text: 'Es demana abans. A «Tràmits» ho tens explicat pas a pas 👍' }],
  },
  {
    id: 'p4', channel: 'perdut', author: 'Montse C.', initials: 'MC', tone: 'lilac', mins: 200,
    text: 'He trobat unes ulleres de lectura amb funda vermella al banc de la plaça. Les tinc a casa; escriviu-me.',
    thanks: 14, replies: [],
  },
  {
    id: 'p5', channel: 'ajuda', author: 'Associació de veïns', initials: 'AV', tone: 'mint', badge: { ca: 'Entitat', es: 'Entidad' }, mins: 1500,
    text: 'Busquem dues persones que puguin acompanyar a comprar, un matí a la setmana, a veïnes grans que viuen soles. Una hora, sense compromís llarg.',
    thanks: 48, replies: [{ author: 'Irene V.', initials: 'IV', tone: 'sky', text: 'Jo puc els dimecres!' }],
  },
  {
    id: 'p6', channel: 'recomanacions', author: 'Jordi S.', initials: 'JS', tone: 'sun', mins: 2000,
    text: 'Recomano el taller de reparació del casal: em van arreglar la ràdio de l’avi i vaig aprendre a soldar un cable. Gent encantadora.',
    thanks: 27, replies: [],
  },
  {
    id: 'p7', channel: 'regalo', author: 'Núria T.', initials: 'NT', tone: 'mint', mins: 2900,
    text: 'Regalo un cotxet de bebè en bon estat. Només cal venir-lo a buscar.',
    thanks: 6, replies: [],
  },
];

export const weeklyQuestion = {
  text: { ca: 'Quin racó del poble ensenyaries a algú que acaba d’arribar?', es: '¿Qué rincón del pueblo enseñarías a alguien que acaba de llegar?' },
  answers: 58,
  samples: [
    { initials: 'RM', tone: 'coral' as Tone, text: { ca: 'El mirador al capvespre.', es: 'El mirador al atardecer.' } },
    { initials: 'PG', tone: 'sun' as Tone, text: { ca: 'El forn del carrer de dalt, a les 7 del matí.', es: 'El horno de la calle de arriba, a las 7 de la mañana.' } },
  ],
};

export type ShopKind = 'forn' | 'bar' | 'menjar' | 'botiga' | 'serveis' | 'cura';
export const shopKinds: Record<ShopKind, { label: Bi; icon: string }> = {
  forn: { label: { ca: 'Forns', es: 'Panaderías' }, icon: 'Croissant' },
  bar: { label: { ca: 'Bars i cafès', es: 'Bares y cafés' }, icon: 'Coffee' },
  menjar: { label: { ca: 'Per menjar', es: 'Para comer' }, icon: 'UtensilsCrossed' },
  botiga: { label: { ca: 'Botigues', es: 'Tiendas' }, icon: 'ShoppingBag' },
  serveis: { label: { ca: 'Oficis', es: 'Oficios' }, icon: 'Wrench' },
  cura: { label: { ca: 'Cura personal', es: 'Cuidado personal' }, icon: 'Scissors' },
};

export type Hours = string[][]; // índex = dia de la setmana (0 diumenge), trams 'HH:MM-HH:MM'
const wk = (t: string[], sat: string[] = t, sun: string[] = []): Hours => [sun, t, t, t, t, t, sat];

export interface Shop {
  id: string;
  name: string;
  kind: ShopKind;
  tone: Tone;
  area: Bi;
  blurb: Bi;
  craft: Bi;
  offer?: Bi;
  hours: Hours;
  updated: number; // minuts des que el negoci va confirmar
  featured?: boolean;
  card?: Bi; // avantatge amb el Carnet Súria
  tags: Bi[];
}

export const shops: Shop[] = [
  {
    id: 'forn-alba', name: 'Forn de l’Alba', kind: 'forn', tone: 'sun',
    area: { ca: 'Centre', es: 'Centro' },
    blurb: { ca: 'Pa de llenya, coca de vidre i croissants de mantega.', es: 'Pan de leña, coca de cristal y cruasanes de mantequilla.' },
    craft: { ca: 'Enfornem a les cinc del matí, cada dia.', es: 'Horneamos a las cinco de la mañana, cada día.' },
    offer: { ca: 'Dijous: segona barra a meitat de preu', es: 'Jueves: segunda barra a mitad de precio' },
    hours: wk(['07:00-14:00', '17:00-20:00'], ['07:00-14:00'], ['08:00-13:30']), updated: 45,
    card: { ca: '−5% amb el Carnet Súria', es: '−5% con el Carnet Súria' },
    tags: [{ ca: 'Encàrrecs', es: 'Encargos' }, { ca: 'Sense gluten (dv)', es: 'Sin gluten (vi)' }],
  },
  {
    id: 'cafe-plaça', name: 'Cafè de la Plaça', kind: 'bar', tone: 'coral', featured: true,
    area: { ca: 'Plaça major', es: 'Plaza mayor' },
    blurb: { ca: 'Esmorzars de forquilla, menú del dia i terrassa al sol.', es: 'Almuerzos de tenedor, menú del día y terraza al sol.' },
    craft: { ca: 'Cuina oberta fins a les 15.30 h; després, entrepans.', es: 'Cocina abierta hasta las 15:30 h; después, bocadillos.' },
    offer: { ca: 'Menú del dia: 13,50 €', es: 'Menú del día: 13,50 €' },
    hours: wk(['07:00-20:00'], ['08:00-15:00'], []), updated: 12,
    tags: [{ ca: 'Terrassa', es: 'Terraza' }, { ca: 'Accessible', es: 'Accesible' }],
  },
  {
    id: 'hort-verd', name: 'L’Hort Verd', kind: 'botiga', tone: 'mint',
    area: { ca: 'Barri del riu', es: 'Barrio del río' },
    blurb: { ca: 'Fruita i verdura de pagès de la comarca. Portem la compra a casa a la gent gran.', es: 'Fruta y verdura de payés de la comarca. Llevamos la compra a casa a los mayores.' },
    craft: { ca: 'Sabem de quin camp ve cada caixa.', es: 'Sabemos de qué campo viene cada caja.' },
    hours: wk(['08:30-13:30', '17:00-20:00'], ['08:30-14:00']), updated: 300,
    card: { ca: 'Entrega gratis amb el Carnet', es: 'Entrega gratis con el Carnet' },
    tags: [{ ca: 'A domicili', es: 'A domicilio' }, { ca: 'Targeta', es: 'Tarjeta' }],
  },
  {
    id: 'ferreteria-pons', name: 'Ferreteria Pons', kind: 'serveis', tone: 'stone',
    area: { ca: 'Centre', es: 'Centro' },
    blurb: { ca: 'Claus, cargols, pintura i el consell que no et donarà cap app.', es: 'Llaves, tornillos, pintura y el consejo que no te dará ninguna app.' },
    craft: { ca: 'Copiem claus al moment.', es: 'Copiamos llaves al momento.' },
    hours: wk(['09:00-13:00', '16:30-19:30'], ['09:00-13:00']), updated: 2880,
    tags: [{ ca: 'Còpia de claus', es: 'Copia de llaves' }],
  },
  {
    id: 'perruqueria-lola', name: 'Perruqueria Lola', kind: 'cura', tone: 'lilac',
    area: { ca: 'Centre', es: 'Centro' },
    blurb: { ca: 'Tall, color i pentinats. Dimarts al matí, a domicili per a gent gran.', es: 'Corte, color y peinados. Martes por la mañana, a domicilio para mayores.' },
    craft: { ca: 'Amb cita, per no fer esperar ningú.', es: 'Con cita, para no hacer esperar a nadie.' },
    hours: wk(['09:30-19:00'], ['09:00-14:00']), updated: 600,
    card: { ca: '−10% el primer servei', es: '−10% el primer servicio' },
    tags: [{ ca: 'Cita prèvia', es: 'Cita previa' }, { ca: 'A domicili', es: 'A domicilio' }],
  },
  {
    id: 'taverna', name: 'La Taverna del Pont', kind: 'menjar', tone: 'coral',
    area: { ca: 'Vora el pont', es: 'Junto al puente' },
    blurb: { ca: 'Tapes, braves i plats de cullera. Divendres, cuina fins a les 23 h.', es: 'Tapas, bravas y platos de cuchara. Viernes, cocina hasta las 23 h.' },
    craft: { ca: 'Diem l’hora real de cuina, no la d’obertura.', es: 'Decimos la hora real de cocina, no la de apertura.' },
    offer: { ca: 'Dimecres: tapa + canya, 4 €', es: 'Miércoles: tapa + caña, 4 €' },
    hours: [['12:00-16:00'], [], ['12:00-16:00'], ['12:00-16:00', '19:30-23:00'], ['12:00-16:00', '19:30-23:00'], ['12:00-16:00', '19:30-23:30'], ['12:00-16:00', '19:30-23:30']],
    updated: 30,
    tags: [{ ca: 'Cuina fins tard', es: 'Cocina hasta tarde' }],
  },
  {
    id: 'llibreria', name: 'Llibreria Paraula', kind: 'botiga', tone: 'sky',
    area: { ca: 'Centre', es: 'Centro' },
    blurb: { ca: 'Llibres, papereria i encàrrecs en 48 hores. Racó infantil.', es: 'Libros, papelería y encargos en 48 horas. Rincón infantil.' },
    craft: { ca: 'Si no el tenim, te’l portem.', es: 'Si no lo tenemos, te lo traemos.' },
    hours: wk(['09:30-13:30', '17:00-20:00'], ['10:00-13:30']), updated: 1440,
    card: { ca: '−5% en llibres', es: '−5% en libros' },
    tags: [{ ca: 'Encàrrecs', es: 'Encargos' }, { ca: 'Llibres de text', es: 'Libros de texto' }],
  },
  {
    id: 'bicis', name: 'Bicis del Cardener', kind: 'serveis', tone: 'mint',
    area: { ca: 'Barri del riu', es: 'Barrio del río' },
    blurb: { ca: 'Reparació de bicis i patinets. Lloguer per fer el camí del riu.', es: 'Reparación de bicis y patinetes. Alquiler para hacer el camino del río.' },
    craft: { ca: 'Diagnosi gratuïta en cinc minuts.', es: 'Diagnóstico gratuito en cinco minutos.' },
    hours: wk(['10:00-14:00', '16:30-19:30'], ['10:00-14:00']), updated: 900,
    tags: [{ ca: 'Lloguer', es: 'Alquiler' }],
  },
];

export interface Group { id: string; name: Bi; tone: Tone; icon: string; members: number; next: Bi }
export const groups: Group[] = [
  { id: 'cor', name: { ca: 'Cor del poble', es: 'Coro del pueblo' }, tone: 'sun', icon: 'MicVocal', members: 34, next: { ca: 'Assaig dimarts', es: 'Ensayo el martes' } },
  { id: 'caminants', name: { ca: 'Colla caminant', es: 'Grupo caminante' }, tone: 'mint', icon: 'Footprints', members: 61, next: { ca: 'Dissabte, 9 h', es: 'Sábado, 9 h' } },
  { id: 'reparacio', name: { ca: 'Grup de reparació', es: 'Grupo de reparación' }, tone: 'coral', icon: 'Wrench', members: 12, next: { ca: 'Un dissabte al mes', es: 'Un sábado al mes' } },
  { id: 'lectura', name: { ca: 'Club de lectura', es: 'Club de lectura' }, tone: 'lilac', icon: 'BookOpen', members: 22, next: { ca: 'Un llibre al mes', es: 'Un libro al mes' } },
  { id: 'acompanyament', name: { ca: 'Acompanyament a grans', es: 'Acompañamiento a mayores' }, tone: 'sky', icon: 'HandHeart', members: 27, next: { ca: 'Cada setmana', es: 'Cada semana' } },
];

export type ProposalStatus = 'oberta' | 'estudi' | 'feta';
export interface Proposal { id: string; title: Bi; body: Bi; author: string; supports: number; goal: number; status: ProposalStatus; tone: Tone; icon: string }
export const proposals: Proposal[] = [
  {
    id: 'bancs', tone: 'mint', icon: 'Armchair', author: 'Rosa M.', supports: 212, goal: 250, status: 'oberta',
    title: { ca: 'Més bancs a la pujada del centre', es: 'Más bancos en la subida del centro' },
    body: { ca: 'Per a la gent gran, la pujada sense cap lloc per descansar és una barrera. Proposem tres bancs.', es: 'Para los mayores, la subida sin sitio para descansar es una barrera. Proponemos tres bancos.' },
  },
  {
    id: 'pati', tone: 'sky', icon: 'School', author: 'AFA escola', supports: 168, goal: 250, status: 'oberta',
    title: { ca: 'Obrir el pati de l’escola els caps de setmana', es: 'Abrir el patio de la escuela los fines de semana' },
    body: { ca: 'Un espai segur de joc quan plou poc i fa fred al parc.', es: 'Un espacio seguro de juego cuando el parque está frío.' },
  },
  {
    id: 'llum', tone: 'sun', icon: 'Lightbulb', author: 'Veïns del riu', supports: 250, goal: 250, status: 'estudi',
    title: { ca: 'Il·luminar el camí del riu fins al pont', es: 'Iluminar el camino del río hasta el puente' },
    body: { ca: 'Molta gent hi camina a l’hivern quan ja és fosc.', es: 'Mucha gente camina allí en invierno cuando ya es de noche.' },
  },
  {
    id: 'font', tone: 'lilac', icon: 'Droplets', author: 'Joan T.', supports: 250, goal: 250, status: 'feta',
    title: { ca: 'Font d’aigua a la plaça', es: 'Fuente de agua en la plaza' },
    body: { ca: 'Ja hi és! Gràcies als 250 suports.', es: '¡Ya está! Gracias a los 250 apoyos.' },
  },
];

export const poll = {
  id: 'nadal',
  q: { ca: 'On t’agradaria que fos el mercat de Nadal?', es: '¿Dónde te gustaría que fuera el mercado de Navidad?' },
  options: [
    { id: 'placa', label: { ca: 'A la plaça major', es: 'En la plaza mayor' }, votes: 143 },
    { id: 'riu', label: { ca: 'Al passeig del riu', es: 'En el paseo del río' }, votes: 88 },
    { id: 'casal', label: { ca: 'Dins del casal (si plou)', es: 'Dentro del casal (si llueve)' }, votes: 41 },
  ],
  daysLeft: 4,
};

export interface Note { id: string; icon: string; tone: Tone; text: Bi; mins: number; to: string }
export const notes: Note[] = [
  { id: 'n1', icon: 'Megaphone', tone: 'coral', text: { ca: 'Tall d’aigua demà de 9 a 11 h al barri del riu.', es: 'Corte de agua mañana de 9 a 11 h en el barrio del río.' }, mins: 35, to: '/comunitat' },
  { id: 'n2', icon: 'CalendarCheck', tone: 'sun', text: { ca: 'Demà: assaig obert del cor. Hi vas?', es: 'Mañana: ensayo abierto del coro. ¿Vas?' }, mins: 180, to: '/agenda/cor-obert' },
  { id: 'n3', icon: 'Vote', tone: 'mint', text: { ca: 'La proposta «Il·luminar el camí del riu» ha arribat als 250 suports.', es: 'La propuesta «Iluminar el camino del río» ha llegado a 250 apoyos.' }, mins: 1500, to: '/comunitat/veu' },
  { id: 'n4', icon: 'Store', tone: 'accent', text: { ca: 'Forn de l’Alba: oferta de dijous.', es: 'Forn de l’Alba: oferta del jueves.' }, mins: 2800, to: '/poble/comerc/forn-alba' },
];

/** Recollida de residus per dia de la setmana (exemple). */
export const bins: Bi[] = [
  { ca: 'Sense recollida', es: 'Sin recogida' },
  { ca: 'Orgànica i resta', es: 'Orgánica y resto' },
  { ca: 'Envasos', es: 'Envases' },
  { ca: 'Orgànica i paper', es: 'Orgánica y papel' },
  { ca: 'Resta', es: 'Resto' },
  { ca: 'Orgànica i envasos', es: 'Orgánica y envases' },
  { ca: 'Orgànica', es: 'Orgánica' },
];

/** Horari de bus d'exemple cap a la ciutat i des de la ciutat. */
export const bus = {
  out: { ca: 'Cap a Manresa', es: 'Hacia Manresa' },
  in: { ca: 'Des de Manresa', es: 'Desde Manresa' },
  weekday: { out: ['06:50', '07:55', '08:40', '09:55', '11:00', '12:05', '13:10', '14:50', '16:25', '17:20', '18:45', '19:45'], in: ['07:20', '08:30', '09:30', '10:30', '12:15', '13:00', '14:00', '15:00', '16:00', '17:20', '18:20', '19:30', '21:20'] },
  weekend: { out: ['08:40', '12:05', '17:20'], in: ['07:20', '13:00', '16:00', '21:00'] },
};

export interface Task { id: string; title: Bi; short: Bi; steps: Bi[]; needs: Bi[]; time: Bi; online: boolean }
export interface ServiceArea { id: string; title: Bi; icon: string; tone: Tone; tasks: Task[] }
export const services: ServiceArea[] = [
  {
    id: 'arribar', title: { ca: 'Acabo d’arribar', es: 'Acabo de llegar' }, icon: 'House', tone: 'sky',
    tasks: [
      { id: 'padro', online: true, title: { ca: 'Empadronar-me', es: 'Empadronarme' }, short: { ca: 'És la porta de tot: metge, escola, ajuts i votar.', es: 'Es la puerta de todo: médico, escuela, ayudas y votar.' },
        steps: [{ ca: 'Prepara el DNI o NIE i el contracte de lloguer o l’escriptura.', es: 'Prepara el DNI o NIE y el contrato de alquiler o la escritura.' }, { ca: 'Demana-ho a la seu electrònica o a l’oficina d’atenció ciutadana.', es: 'Pídelo en la sede electrónica o en la oficina de atención ciudadana.' }, { ca: 'Guarda el justificant: te’l demanaran per al CAP i l’escola.', es: 'Guarda el justificante: te lo pedirán en el CAP y la escuela.' }],
        needs: [{ ca: 'DNI, NIE o passaport', es: 'DNI, NIE o pasaporte' }, { ca: 'Contracte o escriptura', es: 'Contrato o escritura' }], time: { ca: '10 minuts en línia', es: '10 minutos en línea' } },
      { id: 'cap', online: true, title: { ca: 'Tenir metge de capçalera', es: 'Tener médico de cabecera' }, short: { ca: 'Amb el padró, demana la targeta sanitària.', es: 'Con el padrón, pide la tarjeta sanitaria.' },
        steps: [{ ca: 'Empadrona’t primer.', es: 'Empadrónate primero.' }, { ca: 'Ves al CAP amb el justificant i el document d’identitat.', es: 'Ve al CAP con el justificante y el documento de identidad.' }], needs: [{ ca: 'Justificant del padró', es: 'Justificante del padrón' }], time: { ca: 'Una visita', es: 'Una visita' } },
    ],
  },
  {
    id: 'casa', title: { ca: 'Casa i residus', es: 'Casa y residuos' }, icon: 'Recycle', tone: 'mint',
    tasks: [
      { id: 'mobles', online: true, title: { ca: 'Llençar mobles o un matalàs', es: 'Tirar muebles o un colchón' }, short: { ca: 'Es recull a la porta, demanant-ho abans.', es: 'Se recoge en la puerta, pidiéndolo antes.' },
        steps: [{ ca: 'Demana la recollida amb una setmana d’antelació.', es: 'Pide la recogida con una semana de antelación.' }, { ca: 'Deixa-ho al costat de la porta la nit abans.', es: 'Déjalo junto a la puerta la noche antes.' }], needs: [{ ca: 'Adreça i què vols llençar', es: 'Dirección y qué quieres tirar' }], time: { ca: '2 minuts per demanar-ho', es: '2 minutos para pedirlo' } },
      { id: 'deixalleria', online: false, title: { ca: 'Anar a la deixalleria', es: 'Ir al punto limpio' }, short: { ca: 'Pintures, piles, electrodomèstics i runa.', es: 'Pinturas, pilas, electrodomésticos y escombros.' },
        steps: [{ ca: 'Consulta l’horari abans d’anar-hi.', es: 'Consulta el horario antes de ir.' }, { ca: 'Separa-ho per tipus al cotxe: aniràs més ràpid.', es: 'Sepáralo por tipo en el coche: irás más rápido.' }], needs: [], time: { ca: 'Una visita', es: 'Una visita' } },
    ],
  },
  {
    id: 'familia', title: { ca: 'Família i escola', es: 'Familia y escuela' }, icon: 'Baby', tone: 'sun',
    tasks: [
      { id: 'escola', online: true, title: { ca: 'Inscriure a l’escola', es: 'Inscribir en la escuela' }, short: { ca: 'Preinscripció a la primavera; a mig curs, demana plaça directament.', es: 'Preinscripción en primavera; a mitad de curso, pide plaza directamente.' },
        steps: [{ ca: 'Consulta les escoles i les dates de preinscripció.', es: 'Consulta las escuelas y las fechas de preinscripción.' }, { ca: 'Si arribes a mig curs, contacta amb l’oficina d’escolarització.', es: 'Si llegas a mitad de curso, contacta con la oficina de escolarización.' }], needs: [{ ca: 'Llibre de família o DNI de l’infant', es: 'Libro de familia o DNI del niño' }, { ca: 'Padró', es: 'Padrón' }], time: { ca: 'Depèn del calendari', es: 'Depende del calendario' } },
    ],
  },
  {
    id: 'diners', title: { ca: 'Impostos i ajuts', es: 'Impuestos y ayudas' }, icon: 'Wallet', tone: 'lilac',
    tasks: [
      { id: 'ajuts', online: true, title: { ca: 'Saber quins ajuts em toquen', es: 'Saber qué ayudas me tocan' }, short: { ca: 'Habitatge, energia, menjador, gent gran.', es: 'Vivienda, energía, comedor, mayores.' },
        steps: [{ ca: 'Demana cita amb serveis socials: t’orienten sense compromís.', es: 'Pide cita con servicios sociales: te orientan sin compromiso.' }], needs: [{ ca: 'Ingressos de la unitat familiar', es: 'Ingresos de la unidad familiar' }], time: { ca: 'Una cita', es: 'Una cita' } },
      { id: 'ibi', online: true, title: { ca: 'Pagar o fraccionar l’IBI', es: 'Pagar o fraccionar el IBI' }, short: { ca: 'Domicilia’l i evita recàrrecs.', es: 'Domicílialo y evita recargos.' },
        steps: [{ ca: 'Entra a l’oficina virtual de tributs.', es: 'Entra en la oficina virtual de tributos.' }, { ca: 'Tria domiciliació o pagament fraccionat.', es: 'Elige domiciliación o pago fraccionado.' }], needs: [{ ca: 'Certificat digital o idCAT', es: 'Certificado digital o idCAT' }], time: { ca: '5 minuts', es: '5 minutos' } },
    ],
  },
];
