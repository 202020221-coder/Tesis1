// import { ValidRoles } from '../interfaces'

export interface IMenu {
  title: string;
  url?: string;
  roles: string[];
  items?: ISubMenu[];
}

export interface ISubMenu {
  title: string;
  url: string;
  roles: string[];
}

export const sidebarLinks: IMenu[] = [
  {
    title: 'Gestion de Personal',
    roles: [],
    items: [
      {
        title: 'Directorio',
        roles: [],
        url: '/'
      },
    ]
  },
   {
    title: 'Procesos',
    roles: [],
    items: [
      {
        title: 'Gestion de Proyectos',
        roles: [],
        url: '/procesos'
      },
    ]
  },
]
