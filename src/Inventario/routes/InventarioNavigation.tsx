import { Route, Routes } from "react-router";
import { PrivateRoute } from "@/shared/routes/PrivateRoute";
import { NotFoundPage } from "@/shared/pages";
import { GestionarInventario, InventarioCamiones, GestionarCamiones } from "../pages";
import type { IPrivateRoute } from "@/shared/routes/routes";

// 🔹 Se definen todas las rutas privadas del módulo de Inventario
const routes: IPrivateRoute[] = [
  {
    path: "/",
    Component: GestionarInventario,
    roles: [],
  },
  {
    path: "camiones",
    Component: InventarioCamiones,
    roles: [],
  },
  {
    path: "gestionar-camiones",
    Component: GestionarCamiones,
    roles: [],
  },
];

export const InventarioNavigation = () => {
  return (
    <Routes>
      {routes.map(({ path, Component, roles }) => (
        <Route
          key={path}
          path={path}
          element={
            <PrivateRoute roles={roles}>
              <Component />
            </PrivateRoute>
          }
        />
      ))}

      {/* Ruta de error 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default InventarioNavigation;
