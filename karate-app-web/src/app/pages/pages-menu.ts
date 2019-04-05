import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
   {
    title: 'Menu',
    group: true,
  },
  {
    title: 'Eventos',
    icon: 'ion-calendar',
    children: [
      {
        title: 'Crear Evento',
        link: '/pages/events/create-event',
      }
    ],
  },
];
