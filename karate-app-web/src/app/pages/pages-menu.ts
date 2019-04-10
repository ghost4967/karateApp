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
        title: 'Crear evento',
        link: '/pages/events/create-event',
      },
      {
        title: 'Lista de eventos',
        link: '/pages/events/event-list',
      }
    ],
  },
];
