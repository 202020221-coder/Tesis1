import { Route, Routes } from 'react-router';
import { PrivateRoute } from '@/shared/routes/PrivateRoute';

// import { ValidRoles } from '@/shared/interfaces';
import type { IPrivateRoute } from '@/shared/routes/routes';

import { NotFoundPage } from '@/shared/pages';
import { GestionarPersonal} from '../pages';
import { Menu } from '../pages/GestionarProyectos/Menu';

const routes: IPrivateRoute[] = [
  {
    path: '/',
    Component: Menu,
    roles: [ ]
  },
]

export const ProcesosNavigation = () => {
  return (
    <Routes>
      {
        routes.map(({ path, Component, roles }) => (
          <Route
            key={path}
            path={path}
            element={
              <PrivateRoute roles={roles}>
                <Component />
              </PrivateRoute>
            }
          />
        ))
      }
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default ProcesosNavigation
