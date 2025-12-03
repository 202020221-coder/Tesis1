import { Route, Routes } from 'react-router';
import { PrivateRoute } from '@/shared/routes/PrivateRoute';

// import { ValidRoles } from '@/shared/interfaces';
import type { IPrivateRoute } from '@/shared/routes/routes';

import { NotFoundPage } from '@/shared/pages';
import Welcome from '../pages/Welcome';


const routes: IPrivateRoute[] = [
    {
        path: '/',
        Component: Welcome,
        roles: [ ]
    },
]

export const HomeNavigation = () => {
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

export default HomeNavigation
