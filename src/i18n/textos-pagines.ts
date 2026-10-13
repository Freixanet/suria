// Textos llargs de «Què estem provant». Les dues llengües han de dir el mateix (ho comprova una prova).
import type { Llengua } from './ui.ts';

type Prova = { tasca: 'setmana' | 'menjar' | 'passos'; pregunta: string; com: string };
type Provant = {
  intro: string;
  proves: Prova[];
  durada: string;
  decisio: string;
  dadesTitol: string;
  dades: string;
  opinarTitol: string;
  opinar: string;
  provesTitol: string;
};

export const provant: Record<Llengua, Provant> = {
  ca: {
    intro:
      'Aquest prototip és una prova petita i independent per aprendre què serveix de debò a qui viu a Súria. No és el producte final ni una web turística.',
    provesTitol: 'Les tres proves',
    proves: [
      {
        tasca: 'setmana',
        pregunta: 'A la gent gran li costa assabentar-se de les activitats i els serveis de la setmana?',
        com: 'Ho provem amb tres persones durant dues setmanes, amb una agenda molt senzilla.',
      },
      {
        tasca: 'menjar',
        pregunta: 'Un negoci pot dir-nos el seu horari del dia si li costa menys d’un minut?',
        com: 'Ho provem amb tres negocis durant deu dies. El promotor ho comprova trucant o passant-hi, a hores diferents.',
      },
      {
        tasca: 'passos',
        pregunta: 'A qui acaba d’arribar li falten respostes pràctiques dels primers mesos?',
        com: 'Ho provem amb tres persones que ens diuen si les respostes els serveixen i què hi falta.',
      },
    ],
    durada: 'Unes tres setmanes, com a màxim orientatiu.',
    decisio: 'Al final triarem una prova per continuar. El que no serveixi, ho deixarem.',
    dadesTitol: 'Les teves dades',
    dades:
      'Aquesta web no té comptes, ni analítica, ni galetes. Si en parles amb nosaltres, les notes són anònimes i no fem enregistraments.',
    opinarTitol: 'Opinar i demanar ajuda',
    opinar:
      'Aviat podràs opinar per WhatsApp o per correu. Encara no està obert: quan ho estigui, explicarem aquí qui rep els missatges, per a què s’usen i quant de temps es guarden.',
  },
  es: {
    intro:
      'Este prototipo es una prueba pequeña e independiente para aprender qué sirve de verdad a quien vive en Súria. No es el producto final ni una web turística.',
    provesTitol: 'Las tres pruebas',
    proves: [
      {
        tasca: 'setmana',
        pregunta: '¿A las personas mayores les cuesta enterarse de las actividades y los servicios de la semana?',
        com: 'Lo probamos con tres personas durante dos semanas, con una agenda muy sencilla.',
      },
      {
        tasca: 'menjar',
        pregunta: '¿Un negocio puede decirnos su horario del día si le cuesta menos de un minuto?',
        com: 'Lo probamos con tres negocios durante diez días. El promotor lo comprueba llamando o pasando por allí, a horas distintas.',
      },
      {
        tasca: 'passos',
        pregunta: '¿A quien acaba de llegar le faltan respuestas prácticas de los primeros meses?',
        com: 'Lo probamos con tres personas que nos dicen si las respuestas les sirven y qué falta.',
      },
    ],
    durada: 'Unas tres semanas, como máximo orientativo.',
    decisio: 'Al final elegiremos una prueba para continuar. Lo que no sirva, lo dejaremos.',
    dadesTitol: 'Tus datos',
    dades:
      'Esta web no tiene cuentas, ni analítica, ni cookies. Si hablas con nosotros, las notas son anónimas y no hacemos grabaciones.',
    opinarTitol: 'Opinar y pedir ayuda',
    opinar:
      'Pronto podrás opinar por WhatsApp o por correo. Todavía no está abierto: cuando lo esté, explicaremos aquí quién recibe los mensajes, para qué se usan y cuánto tiempo se guardan.',
  },
};
