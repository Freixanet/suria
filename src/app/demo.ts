// Contingut D'EXEMPLE de la plataforma (activitats, veïns, comerços i entitats).
// No són dades reals de Súria: serveixen per ensenyar com funcionarà. A la interfície sempre porten l'etiqueta «Exemple».
// Les dates són relatives al dia de compilació (Europe/Madrid) perquè el prototip no quedi buit.
import type { Lang } from './i18n.ts';
import type { IconName } from './icons.ts';

type B = Record<Lang, string>;
export type Facana = 'ocre' | 'teula' | 'rosa' | 'cel' | 'turo' | 'pissarra';

export type Categoria = 'cultura' | 'gent-gran' | 'families' | 'esport' | 'comunitat' | 'mercat';
export const categories: Record<Categoria, { nom: B; facana: Facana; icona: IconName }> = {
  cultura: { nom: { ca: 'Cultura', es: 'Cultura' }, facana: 'ocre', icona: 'music' },
  'gent-gran': { nom: { ca: 'Gent gran', es: 'Personas mayores' }, facana: 'rosa', icona: 'heart' },
  families: { nom: { ca: 'Famílies', es: 'Familias' }, facana: 'cel', icona: 'family' },
  esport: { nom: { ca: 'Esport i natura', es: 'Deporte y naturaleza' }, facana: 'turo', icona: 'leaf' },
  comunitat: { nom: { ca: 'Veïnat', es: 'Vecindario' }, facana: 'teula', icona: 'people' },
  mercat: { nom: { ca: 'Mercat i fires', es: 'Mercado y ferias' }, facana: 'teula', icona: 'bag' },
};

export interface Activitat {
  id: string;
  dia: number; // dies des d'avui
  inici: string;
  fi?: string;
  cat: Categoria;
  titol: B;
  lloc: B;
  resum: B;
  esperar: B; // «Primera vegada?»: què passarà, pas a pas
  accessible: B;
  organitza: B;
  preu?: B;
  places?: number;
  hiVan: number;
  primeraVegada?: boolean;
  companyia?: number; // persones que busquen companyia per anar-hi
}

export const activitats: Activitat[] = [
  {
    id: 'mobil-sense-por', dia: 0, inici: '17:00', fi: '18:30', cat: 'gent-gran', hiVan: 14, companyia: 2, primeraVegada: true, places: 16,
    titol: { ca: 'El mòbil sense por', es: 'El móvil sin miedo' },
    lloc: { ca: 'Biblioteca, sala polivalent', es: 'Biblioteca, sala polivalente' },
    resum: { ca: 'Taller pràctic: videotrucades, fotos i WhatsApp, al teu ritme i amb el teu propi mòbil.', es: 'Taller práctico: videollamadas, fotos y WhatsApp, a tu ritmo y con tu propio móvil.' },
    esperar: { ca: 'Arriba cinc minuts abans i porta el mòbil carregat. Seurem en grups petits; cada grup té una persona voluntària. Pots preguntar tantes vegades com calgui.', es: 'Llega cinco minutos antes y trae el móvil cargado. Nos sentaremos en grupos pequeños; cada grupo tiene una persona voluntaria. Puedes preguntar tantas veces como haga falta.' },
    accessible: { ca: 'Planta baixa, sense graons. Lletra gran als materials.', es: 'Planta baja, sin escalones. Letra grande en los materiales.' },
    organitza: { ca: 'Voluntariat digital', es: 'Voluntariado digital' },
  },
  {
    id: 'caminada-cardener', dia: 0, inici: '10:00', fi: '11:30', cat: 'esport', hiVan: 21, primeraVegada: true,
    titol: { ca: 'Caminada suau vora el Cardener', es: 'Caminata suave junto al Cardener' },
    lloc: { ca: 'Sortida des del pont', es: 'Salida desde el puente' },
    resum: { ca: 'Una hora i mitja de passeig pla, sense presses. Ideal per conèixer gent.', es: 'Hora y media de paseo llano, sin prisas. Ideal para conocer gente.' },
    esperar: { ca: 'El grup espera fins a les deu i cinc. Calçat còmode i aigua. Ningú es queda enrere: el ritme el marca qui va més a poc a poc.', es: 'El grupo espera hasta las diez y cinco. Calzado cómodo y agua. Nadie se queda atrás: el ritmo lo marca quien va más despacio.' },
    accessible: { ca: 'Camí pla i ample. Hi ha bancs cada pocs minuts.', es: 'Camino llano y ancho. Hay bancos cada pocos minutos.' },
    organitza: { ca: 'Colla de caminants', es: 'Grupo de caminantes' },
  },
  {
    id: 'club-lectura', dia: 1, inici: '18:30', fi: '20:00', cat: 'cultura', hiVan: 9, primeraVegada: true,
    titol: { ca: 'Club de lectura', es: 'Club de lectura' },
    lloc: { ca: 'Biblioteca', es: 'Biblioteca' },
    resum: { ca: 'Parlem del llibre del mes. No cal haver-lo acabat; el que compta és la conversa.', es: 'Hablamos del libro del mes. No hace falta haberlo terminado; lo que cuenta es la conversación.' },
    esperar: { ca: 'Ens presentem en una ronda curta. Pots només escoltar. Hi ha cafè.', es: 'Nos presentamos en una ronda corta. Puedes solo escuchar. Hay café.' },
    accessible: { ca: 'Accés amb ascensor.', es: 'Acceso con ascensor.' },
    organitza: { ca: 'Biblioteca', es: 'Biblioteca' },
  },
  {
    id: 'coral-oberta', dia: 1, inici: '20:00', fi: '21:30', cat: 'cultura', hiVan: 26, companyia: 1, primeraVegada: true,
    titol: { ca: 'Assaig obert de la coral', es: 'Ensayo abierto de la coral' },
    lloc: { ca: 'Casal', es: 'Casal' },
    resum: { ca: 'Vine a escoltar. Si t’hi animes, busquem veus noves: no cal saber solfeig.', es: 'Ven a escuchar. Si te animas, buscamos voces nuevas: no hace falta saber solfeo.' },
    esperar: { ca: 'Seu al fons i escolta. Al descans, la directora et preguntarà si vols provar. Pots dir que no.', es: 'Siéntate al fondo y escucha. En el descanso, la directora te preguntará si quieres probar. Puedes decir que no.' },
    accessible: { ca: 'Entrada sense graons.', es: 'Entrada sin escalones.' },
    organitza: { ca: 'Coral', es: 'Coral' },
  },
  {
    id: 'contes', dia: 2, inici: '17:30', fi: '18:15', cat: 'families', hiVan: 32,
    titol: { ca: 'L’hora del conte', es: 'La hora del cuento' },
    lloc: { ca: 'Biblioteca, espai infantil', es: 'Biblioteca, espacio infantil' },
    resum: { ca: 'Contes per a infants de 3 a 7 anys. Les famílies hi són benvingudes.', es: 'Cuentos para niños de 3 a 7 años. Las familias son bienvenidas.' },
    esperar: { ca: 'Els infants seuen a terra en coixins; les famílies, al darrere.', es: 'Los niños se sientan en cojines en el suelo; las familias, detrás.' },
    accessible: { ca: 'Espai per a cotxets.', es: 'Espacio para carritos.' },
    organitza: { ca: 'Biblioteca', es: 'Biblioteca' },
  },
  {
    id: 'sopar-benvinguda', dia: 3, inici: '20:30', fi: '22:30', cat: 'comunitat', hiVan: 38, companyia: 4, primeraVegada: true, places: 60,
    preu: { ca: 'Porta un plat per compartir', es: 'Trae un plato para compartir' },
    titol: { ca: 'Sopar de benvinguda per a nous veïns', es: 'Cena de bienvenida para nuevos vecinos' },
    lloc: { ca: 'Casal', es: 'Casal' },
    resum: { ca: 'Si fa menys de dos anys que vius a Súria, aquest sopar és per a tu. I si en fa molts, vine a rebre’ls.', es: 'Si hace menos de dos años que vives en Súria, esta cena es para ti. Y si hace muchos, ven a recibirlos.' },
    esperar: { ca: 'Una persona del veïnat t’esperarà a la porta i et presentarà gent. Taules llargues, sense lloc assignat. Acabem amb un mapa de les entitats per si en vols conèixer alguna.', es: 'Una persona del vecindario te esperará en la puerta y te presentará a gente. Mesas largas, sin sitio asignado. Acabamos con un mapa de las entidades por si quieres conocer alguna.' },
    accessible: { ca: 'Planta baixa. Opcions sense gluten i vegetarianes.', es: 'Planta baja. Opciones sin gluten y vegetarianas.' },
    organitza: { ca: 'Comissió de veïnat', es: 'Comisión vecinal' },
  },
  {
    id: 'fira-nadal', dia: 4, inici: '10:00', fi: '20:00', cat: 'mercat', hiVan: 112,
    titol: { ca: 'Fira d’hivern: artesania i producte local', es: 'Feria de invierno: artesanía y producto local' },
    lloc: { ca: 'Carrers del centre', es: 'Calles del centro' },
    resum: { ca: 'Parades de comerços i artesans del poble. Compra aquí el que regalaràs aquest hivern.', es: 'Puestos de comercios y artesanos del pueblo. Compra aquí lo que regalarás este invierno.' },
    esperar: { ca: 'Les parades obren a les deu. A la tarda hi ha més gent: si busques calma, vine al matí.', es: 'Los puestos abren a las diez. Por la tarde hay más gente: si buscas calma, ven por la mañana.' },
    accessible: { ca: 'Carrers sense cotxes durant la fira.', es: 'Calles sin coches durante la feria.' },
    organitza: { ca: 'Associació de comerciants', es: 'Asociación de comerciantes' },
  },
  {
    id: 'poble-vell-guiat', dia: 4, inici: '11:00', fi: '12:30', cat: 'cultura', hiVan: 19, places: 25,
    preu: { ca: '5 €', es: '5 €' },
    titol: { ca: 'Pujada guiada al Poble Vell', es: 'Subida guiada al Poble Vell' },
    lloc: { ca: 'Punt de trobada a peu del Poble Vell', es: 'Punto de encuentro al pie del Poble Vell' },
    resum: { ca: 'Història del nucli antic, explicada per gent que hi ha crescut. Grups petits per respectar qui hi viu.', es: 'Historia del núcleo antiguo, contada por gente que ha crecido allí. Grupos pequeños para respetar a quien vive allí.' },
    esperar: { ca: 'Hi ha pujada i alguns graons. Parlem baix als carrers on viu gent.', es: 'Hay subida y algunos escalones. Hablamos bajo en las calles donde vive gente.' },
    accessible: { ca: 'Recorregut amb pendent i graons.', es: 'Recorrido con pendiente y escalones.' },
    organitza: { ca: 'Entitat de patrimoni', es: 'Entidad de patrimonio' },
  },
  {
    id: 'ball-tarda', dia: 5, inici: '17:00', fi: '19:30', cat: 'gent-gran', hiVan: 47, companyia: 1,
    titol: { ca: 'Ball de tarda', es: 'Baile de tarde' },
    lloc: { ca: 'Casal de la gent gran', es: 'Casal de las personas mayores' },
    resum: { ca: 'Música en directe i berenar. No cal venir en parella.', es: 'Música en directo y merienda. No hace falta venir en pareja.' },
    esperar: { ca: 'Les primeres peces són tranquil·les. Hi ha cadires al voltant de la pista.', es: 'Las primeras piezas son tranquilas. Hay sillas alrededor de la pista.' },
    accessible: { ca: 'Sense graons. Lavabo adaptat.', es: 'Sin escalones. Baño adaptado.' },
    organitza: { ca: 'Casal de la gent gran', es: 'Casal de las personas mayores' },
  },
  {
    id: 'repair-cafe', dia: 7, inici: '10:00', fi: '13:00', cat: 'comunitat', hiVan: 17, primeraVegada: true,
    titol: { ca: 'Taller de reparació', es: 'Taller de reparación' },
    lloc: { ca: 'Casal', es: 'Casal' },
    resum: { ca: 'Porta la torradora, la cadira o la jaqueta. Ho arreglem junts i aprens com.', es: 'Trae la tostadora, la silla o la chaqueta. Lo arreglamos juntos y aprendes cómo.' },
    esperar: { ca: 'T’apuntes a la taula de l’entrada i esperes torn amb un cafè.', es: 'Te apuntas en la mesa de la entrada y esperas turno con un café.' },
    accessible: { ca: 'Planta baixa.', es: 'Planta baja.' },
    organitza: { ca: 'Grup de reparació', es: 'Grupo de reparación' },
  },
  {
    id: 'xerrada-llum', dia: 8, inici: '19:00', fi: '20:00', cat: 'comunitat', hiVan: 23,
    titol: { ca: 'Xerrada: paga menys llum aquest hivern', es: 'Charla: paga menos luz este invierno' },
    lloc: { ca: 'Sala d’actes', es: 'Sala de actos' },
    resum: { ca: 'Com llegir la factura, quina potència et cal i quins ajuts existeixen.', es: 'Cómo leer la factura, qué potencia necesitas y qué ayudas existen.' },
    esperar: { ca: 'Porta una factura si vols que te la mirin al final.', es: 'Trae una factura si quieres que te la miren al final.' },
    accessible: { ca: 'Bucle magnètic per a audiòfons.', es: 'Bucle magnético para audífonos.' },
    organitza: { ca: 'Punt d’energia', es: 'Punto de energía' },
  },
  {
    id: 'cinema', dia: 10, inici: '18:00', fi: '20:00', cat: 'cultura', hiVan: 41,
    preu: { ca: '3 €', es: '3 €' },
    titol: { ca: 'Cinema de diumenge', es: 'Cine de domingo' },
    lloc: { ca: 'Sala d’actes', es: 'Sala de actos' },
    resum: { ca: 'Una pel·lícula per a totes les edats, en català i amb subtítols.', es: 'Una película para todas las edades, en catalán y con subtítulos.' },
    esperar: { ca: 'Seients sense numerar. Obrim portes mitja hora abans.', es: 'Asientos sin numerar. Abrimos puertas media hora antes.' },
    accessible: { ca: 'Espai per a cadira de rodes a la primera fila.', es: 'Espacio para silla de ruedas en la primera fila.' },
    organitza: { ca: 'Cineclub', es: 'Cineclub' },
  },
];

export type Canal = 'avisos' | 'preguntes' | 'recomanacions' | 'perdut' | 'mercat' | 'voluntariat' | 'benvinguda';
export const canals: Record<Canal, { nom: B; facana: Facana; icona: IconName }> = {
  avisos: { nom: { ca: 'Avisos', es: 'Avisos' }, facana: 'teula', icona: 'megaphone' },
  preguntes: { nom: { ca: 'Preguntes', es: 'Preguntas' }, facana: 'cel', icona: 'chat' },
  recomanacions: { nom: { ca: 'Recomanacions', es: 'Recomendaciones' }, facana: 'ocre', icona: 'star' },
  perdut: { nom: { ca: 'Perdut i trobat', es: 'Perdido y encontrado' }, facana: 'rosa', icona: 'search' },
  mercat: { nom: { ca: 'Dono i canvio', es: 'Doy y cambio' }, facana: 'turo', icona: 'bag' },
  voluntariat: { nom: { ca: 'Dono un cop de mà', es: 'Echo una mano' }, facana: 'turo', icona: 'hand' },
  benvinguda: { nom: { ca: 'Benvinguda', es: 'Bienvenida' }, facana: 'cel', icona: 'wave' },
};

export interface Publicacio {
  id: string;
  canal: Canal;
  autor: string;
  inicials: string;
  facana: Facana;
  etiquetaAutor?: B; // «Nova veïna», «Comerç local»…
  fa: B;
  text: string; // la gent escriu en la seva llengua: no es tradueix
  gracies: number;
  respostes: { autor: string; inicials: string; facana: Facana; text: string }[];
  resolt?: boolean;
}

export const publicacions: Publicacio[] = [
  {
    id: 'p1', canal: 'benvinguda', autor: 'Laia M.', inicials: 'LM', facana: 'cel', etiquetaAutor: { ca: 'Nova veïna', es: 'Nueva vecina' },
    fa: { ca: 'fa 25 min', es: 'hace 25 min' },
    text: 'Hola! Fa tres setmanes que vivim a Súria amb la meva parella i un nen de 4 anys. Algú ens recomana un parc tranquil per anar-hi a la tarda? I si hi ha altres famílies noves, ens encantaria conèixer-vos 🙂',
    gracies: 18,
    respostes: [
      { autor: 'Montse R.', inicials: 'MR', facana: 'rosa', text: 'Benvinguts! Divendres a la tarda som unes quantes famílies al parc de vora el riu. Escriu-me i us presento.' },
      { autor: 'Jordi P.', inicials: 'JP', facana: 'ocre', text: 'Dijous hi ha l’hora del conte a la biblioteca, és un bon lloc per començar.' },
    ],
  },
  {
    id: 'p2', canal: 'avisos', autor: 'Pere V.', inicials: 'PV', facana: 'teula',
    fa: { ca: 'fa 1 h', es: 'hace 1 h' },
    text: 'Aviso: esta mañana han cortado un carril de la carretera por obras cerca de la entrada del pueblo. Id con calma si bajáis a Manresa.',
    gracies: 31, respostes: [{ autor: 'Anna S.', inicials: 'AS', facana: 'cel', text: 'Gràcies! A les 9 ja hi havia cua.' }],
  },
  {
    id: 'p3', canal: 'preguntes', autor: 'Youssef A.', inicials: 'YA', facana: 'ocre', etiquetaAutor: { ca: 'Nou veí', es: 'Nuevo vecino' },
    fa: { ca: 'fa 2 h', es: 'hace 2 h' },
    text: '¿Alguien sabe qué días pasan a recoger muebles viejos? Tengo un sofá y no quiero dejarlo en la calle mal.',
    gracies: 7, resolt: true,
    respostes: [{ autor: 'Núria C.', inicials: 'NC', facana: 'turo', text: 'S’ha de demanar abans. A «Gestions» hi ha l’enllaç oficial de recollida de voluminosos 👍' }],
  },
  {
    id: 'p4', canal: 'perdut', autor: 'Rosa G.', inicials: 'RG', facana: 'rosa',
    fa: { ca: 'fa 3 h', es: 'hace 3 h' },
    text: 'He trobat unes claus amb un clauer blau al banc de davant de la farmàcia. Les tinc jo; escriviu-me amb la descripció.',
    gracies: 12, resolt: false, respostes: [],
  },
  {
    id: 'p5', canal: 'recomanacions', autor: 'Marc T.', inicials: 'MT', facana: 'ocre',
    fa: { ca: 'ahir', es: 'ayer' },
    text: 'Recomano molt el taller de reparació del Casal: em van arreglar el llum de la tauleta i vaig aprendre a canviar l’endoll. Gent encantadora.',
    gracies: 24, respostes: [],
  },
  {
    id: 'p6', canal: 'voluntariat', autor: 'Teresa F.', inicials: 'TF', facana: 'turo', etiquetaAutor: { ca: 'Entitat', es: 'Entidad' },
    fa: { ca: 'ahir', es: 'ayer' },
    text: 'Busquem dues persones que puguin acompanyar a comprar, un matí per setmana, a veïnes grans que viuen soles. Una hora, sense compromís llarg.',
    gracies: 40, respostes: [{ autor: 'Laia M.', inicials: 'LM', facana: 'cel', text: 'Jo podria els dimecres!' }],
  },
  {
    id: 'p7', canal: 'mercat', autor: 'Sergi L.', inicials: 'SL', facana: 'turo',
    fa: { ca: 'fa 2 dies', es: 'hace 2 días' },
    text: 'Dono cadireta de cotxe per a nadó, en bon estat. Només recollir.',
    gracies: 5, respostes: [],
  },
];

export const preguntaSetmana: { text: B; respostes: number } = {
  text: {
    ca: 'Quin racó de Súria ensenyaries a algú que acaba d’arribar?',
    es: '¿Qué rincón de Súria enseñarías a alguien que acaba de llegar?',
  },
  respostes: 63,
};

export type TipusComerc = 'forn' | 'cafe' | 'menjar' | 'botiga' | 'serveis' | 'salut';
export const tipusComerc: Record<TipusComerc, { nom: B; icona: IconName }> = {
  forn: { nom: { ca: 'Forns', es: 'Panaderías' }, icona: 'bread' },
  cafe: { nom: { ca: 'Bars i cafès', es: 'Bares y cafés' }, icona: 'coffee' },
  menjar: { nom: { ca: 'Menjar', es: 'Comida' }, icona: 'fork' },
  botiga: { nom: { ca: 'Botigues', es: 'Tiendas' }, icona: 'bag' },
  serveis: { nom: { ca: 'Serveis', es: 'Servicios' }, icona: 'wrench' },
  salut: { nom: { ca: 'Cura personal', es: 'Cuidado personal' }, icona: 'scissors' },
};

/** Horari per dia de la setmana (0 = diumenge): llista de trams 'HH:MM-HH:MM'. */
export type Horari = Record<0 | 1 | 2 | 3 | 4 | 5 | 6, string[]>;
const feiners = (trams: string[], ds: string[] = trams, dg: string[] = []): Horari => ({ 0: dg, 1: trams, 2: trams, 3: trams, 4: trams, 5: trams, 6: ds });

export interface Comerc {
  id: string;
  nom: string;
  tipus: TipusComerc;
  facana: Facana;
  zona: B;
  descripcio: B;
  ofici: B; // una frase sobre l'ofici, no publicitat
  oferta?: B;
  horari: Horari;
  actualitzat: B;
  destacat?: boolean; // patrocinat: sempre etiquetat
  serveis: B[];
}

export const comercos: Comerc[] = [
  {
    id: 'forn-sal-i-pa', nom: 'Forn Sal i Pa', tipus: 'forn', facana: 'ocre',
    zona: { ca: 'Centre', es: 'Centro' },
    descripcio: { ca: 'Pa de massa mare, coca de recapte i pastes de tota la vida.', es: 'Pan de masa madre, coca de recapte y pastas de toda la vida.' },
    ofici: { ca: 'Tercera generació pastant a la mateixa cantonada.', es: 'Tercera generación amasando en la misma esquina.' },
    oferta: { ca: 'Dimecres, la segona barra a meitat de preu', es: 'Los miércoles, la segunda barra a mitad de precio' },
    horari: feiners(['07:00-14:00', '17:00-20:00'], ['07:00-14:00'], ['08:00-13:30']),
    actualitzat: { ca: 'Horari comunicat pel negoci fa 2 dies', es: 'Horario comunicado por el negocio hace 2 días' },
    serveis: [{ ca: 'Encàrrecs per WhatsApp', es: 'Encargos por WhatsApp' }, { ca: 'Sense gluten els divendres', es: 'Sin gluten los viernes' }],
  },
  {
    id: 'cafe-la-vall', nom: 'Cafè La Vall', tipus: 'cafe', facana: 'teula', destacat: true,
    zona: { ca: 'Centre', es: 'Centro' },
    descripcio: { ca: 'Esmorzars de forquilla, menú de migdia i terrassa al sol.', es: 'Almuerzos de tenedor, menú de mediodía y terraza al sol.' },
    ofici: { ca: 'Cuina casolana; la cuina tanca a les 15.30 h.', es: 'Cocina casera; la cocina cierra a las 15:30 h.' },
    oferta: { ca: 'Menú de migdia: 13,50 €', es: 'Menú de mediodía: 13,50 €' },
    horari: feiners(['07:00-16:00'], ['08:00-15:00'], []),
    actualitzat: { ca: 'Horari comunicat pel negoci avui', es: 'Horario comunicado por el negocio hoy' },
    serveis: [{ ca: 'Menú diari', es: 'Menú diario' }, { ca: 'Terrassa', es: 'Terraza' }, { ca: 'Accessible', es: 'Accesible' }],
  },
  {
    id: 'fruites-cardener', nom: 'Fruites Cardener', tipus: 'botiga', facana: 'turo',
    zona: { ca: 'Prop del mercat', es: 'Cerca del mercado' },
    descripcio: { ca: 'Fruita i verdura de pagesos del Bages, i encàrrecs a domicili per a gent gran.', es: 'Fruta y verdura de payeses del Bages, y encargos a domicilio para personas mayores.' },
    ofici: { ca: 'Producte de proximitat: sabem de quin camp ve cada caixa.', es: 'Producto de proximidad: sabemos de qué campo viene cada caja.' },
    horari: feiners(['08:30-13:30', '17:00-20:00'], ['08:30-14:00']),
    actualitzat: { ca: 'Horari comunicat pel negoci fa 5 dies', es: 'Horario comunicado por el negocio hace 5 días' },
    serveis: [{ ca: 'Portem a casa', es: 'Llevamos a casa' }, { ca: 'Paga amb targeta', es: 'Paga con tarjeta' }],
  },
  {
    id: 'ferreteria-clau', nom: 'Ferreteria Clau', tipus: 'serveis', facana: 'pissarra',
    zona: { ca: 'Centre', es: 'Centro' },
    descripcio: { ca: 'Claus, cargols, pintura i el consell que no trobaràs en una gran superfície.', es: 'Llaves, tornillos, pintura y el consejo que no encontrarás en una gran superficie.' },
    ofici: { ca: 'Copiem claus al moment.', es: 'Copiamos llaves al momento.' },
    horari: feiners(['09:00-13:00', '16:30-19:30'], ['09:00-13:00']),
    actualitzat: { ca: 'Horari comunicat pel negoci fa 1 setmana', es: 'Horario comunicado por el negocio hace 1 semana' },
    serveis: [{ ca: 'Còpia de claus', es: 'Copia de llaves' }, { ca: 'Petites reparacions', es: 'Pequeñas reparaciones' }],
  },
  {
    id: 'perruqueria-bucle', nom: 'Perruqueria Bucle', tipus: 'salut', facana: 'rosa',
    zona: { ca: 'Centre', es: 'Centro' },
    descripcio: { ca: 'Tall, color i pentinats. Dimarts al matí, servei a domicili per a gent gran.', es: 'Corte, color y peinados. Martes por la mañana, servicio a domicilio para personas mayores.' },
    ofici: { ca: 'Hora concertada per evitar esperes.', es: 'Cita previa para evitar esperas.' },
    horari: feiners(['09:30-19:00'], ['09:00-14:00']),
    actualitzat: { ca: 'Horari comunicat pel negoci fa 3 dies', es: 'Horario comunicado por el negocio hace 3 días' },
    serveis: [{ ca: 'Cita prèvia', es: 'Cita previa' }, { ca: 'A domicili', es: 'A domicilio' }],
  },
  {
    id: 'taverna-turo', nom: 'Taverna del Turó', tipus: 'menjar', facana: 'teula',
    zona: { ca: 'Peu del Poble Vell', es: 'Pie del Poble Vell' },
    descripcio: { ca: 'Tapes, braves i plats de cullera. El divendres, cuina fins a les 23.00 h.', es: 'Tapas, bravas y platos de cuchara. Los viernes, cocina hasta las 23:00 h.' },
    ofici: { ca: 'Diem l’hora real de cuina, no la d’obertura.', es: 'Decimos la hora real de cocina, no la de apertura.' },
    oferta: { ca: 'Dijous: tapa + canya, 4 €', es: 'Jueves: tapa + caña, 4 €' },
    horari: { 0: ['12:00-16:00'], 1: [], 2: ['12:00-16:00'], 3: ['12:00-16:00'], 4: ['12:00-16:00', '19:30-23:00'], 5: ['12:00-16:00', '19:30-23:30'], 6: ['12:00-16:00', '19:30-23:30'] },
    actualitzat: { ca: 'Cuina oberta confirmada avui a les 12.10 h', es: 'Cocina abierta confirmada hoy a las 12:10 h' },
    serveis: [{ ca: 'Cuina fins tard', es: 'Cocina hasta tarde' }, { ca: 'Reserva per telèfon', es: 'Reserva por teléfono' }],
  },
  {
    id: 'llibreria-paper', nom: 'Llibreria Paper', tipus: 'botiga', facana: 'cel',
    zona: { ca: 'Centre', es: 'Centro' },
    descripcio: { ca: 'Llibres, papereria i encàrrecs en 48 hores. Racó infantil.', es: 'Libros, papelería y encargos en 48 horas. Rincón infantil.' },
    ofici: { ca: 'Si no el tenim, te’l portem.', es: 'Si no lo tenemos, te lo traemos.' },
    horari: feiners(['09:30-13:30', '17:00-20:00'], ['10:00-13:30']),
    actualitzat: { ca: 'Horari comunicat pel negoci fa 4 dies', es: 'Horario comunicado por el negocio hace 4 días' },
    serveis: [{ ca: 'Encàrrecs', es: 'Encargos' }, { ca: 'Llibres de text', es: 'Libros de texto' }],
  },
  {
    id: 'bicis-clot', nom: 'Bicis Clot', tipus: 'serveis', facana: 'turo',
    zona: { ca: 'Prop de l’estació', es: 'Cerca de la estación' },
    descripcio: { ca: 'Reparació de bicicletes i patinets. Lloguer per fer la ruta del riu.', es: 'Reparación de bicicletas y patinetes. Alquiler para hacer la ruta del río.' },
    ofici: { ca: 'Diagnosi gratuïta en cinc minuts.', es: 'Diagnóstico gratuito en cinco minutos.' },
    horari: feiners(['10:00-14:00', '16:30-19:30'], ['10:00-14:00']),
    actualitzat: { ca: 'Horari comunicat pel negoci ahir', es: 'Horario comunicado por el negocio ayer' },
    serveis: [{ ca: 'Lloguer', es: 'Alquiler' }, { ca: 'Reparacions', es: 'Reparaciones' }],
  },
];

export interface Entitat { id: string; nom: B; facana: Facana; icona: IconName; membres: number; que: B }
export const entitats: Entitat[] = [
  { id: 'coral', nom: { ca: 'Coral', es: 'Coral' }, facana: 'ocre', icona: 'music', membres: 34, que: { ca: 'Assajos els dimarts', es: 'Ensayos los martes' } },
  { id: 'caminants', nom: { ca: 'Colla de caminants', es: 'Grupo de caminantes' }, facana: 'turo', icona: 'leaf', membres: 58, que: { ca: 'Sortides cada dissabte', es: 'Salidas cada sábado' } },
  { id: 'reparacio', nom: { ca: 'Grup de reparació', es: 'Grupo de reparación' }, facana: 'teula', icona: 'wrench', membres: 12, que: { ca: 'Un dissabte al mes', es: 'Un sábado al mes' } },
  { id: 'lectura', nom: { ca: 'Club de lectura', es: 'Club de lectura' }, facana: 'cel', icona: 'doc', membres: 21, que: { ca: 'Un llibre al mes', es: 'Un libro al mes' } },
  { id: 'voluntariat', nom: { ca: 'Voluntariat de proximitat', es: 'Voluntariado de proximidad' }, facana: 'rosa', icona: 'hand', membres: 27, que: { ca: 'Acompanyament a gent gran', es: 'Acompañamiento a personas mayores' } },
];

/** Recollida de residus del dia (exemple: el calendari real és a suria.cat/recicla). */
export const recollida: Record<number, B> = {
  0: { ca: 'Avui no hi ha recollida', es: 'Hoy no hay recogida' },
  1: { ca: 'Orgànica i resta', es: 'Orgánica y resto' },
  2: { ca: 'Envasos', es: 'Envases' },
  3: { ca: 'Orgànica i paper', es: 'Orgánica y papel' },
  4: { ca: 'Resta', es: 'Resto' },
  5: { ca: 'Orgànica i envasos', es: 'Orgánica y envases' },
  6: { ca: 'Orgànica', es: 'Orgánica' },
};
