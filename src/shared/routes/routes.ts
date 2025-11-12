import { lazy, type JSX } from "react";

type JSXComponent = () => JSX.Element;

export interface ILink {
    to:string;
    name:string;
}

export interface IRoute {
    path:string;
    Component:React.LazyExoticComponent<JSXComponent> | JSXComponent;
}

export interface IPrivateRoute extends IRoute { roles?: string[]; }

const DirectorioNavigation = lazy(() => import(/* webpackChunkName: DirectorioNavigation */ '@/directorio/routes/DirectorioNavigation' ));
const ProcesosNavigation = lazy(() => import(/* webpackChunkName: ProcesosNavigation */ '@/procesos/routes/ProcesosNavigation' ));
const InventarioNavigation = lazy(() => import(/* webpackChunkName: InventarioNavigation */ '@/Inventario/routes/InventarioNavigation' ));

export const routes:IRoute[] = [
    {
        path: '/',
        Component: DirectorioNavigation,
    },
        {
        path: '/procesos/*',
        Component: ProcesosNavigation,
    },
            {
        path: '/Inventario/*',
        Component: InventarioNavigation,
    },

    

];