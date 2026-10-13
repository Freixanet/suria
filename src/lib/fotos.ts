// Registre de fotografies publicades. Cada foto: real, de Súria, amb permís comprovat (vegeu docs/referencias-visuales.md).
import vistaGolik from '../assets/fotos/suria-vista-golik-2022.jpg';

export const fotos = {
  vista: {
    imatge: vistaGolik,
    alt: {
      ca: 'Vista de Súria: cases esglaonades sobre un turó, amb un campanar al capdamunt, blocs d’habitatges al peu i serres al fons.',
      es: 'Vista de Súria: casas escalonadas sobre una colina, con un campanario en lo alto, bloques de viviendas abajo y sierras al fondo.',
    },
    autor: 'Krzysztof Golik',
    data: '2022-04-06',
    llicencia: 'CC BY-SA 4.0',
    llicenciaUrl: 'https://creativecommons.org/licenses/by-sa/4.0/deed.ca',
    original: 'https://commons.wikimedia.org/wiki/File:View_of_Suria_(1).jpg',
    retallada: true,
  },
};

export type Foto = (typeof fotos)[keyof typeof fotos];
