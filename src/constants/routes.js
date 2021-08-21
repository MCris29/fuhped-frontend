const publicRoutes = {
  LOGIN: "/iniciar-sesion",
  BLOG: "/blog",
  SERVICES: "/servicios",
};

const privateRoutes = {
  HOME: "/",
  MENU: "/menu",
  PROFILE: "/menu/perfil",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
