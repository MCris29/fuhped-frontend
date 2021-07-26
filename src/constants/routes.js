const publicRoutes = {
  LOGIN: "/iniciar-sesion",
  BLOG: "/blog",
  SERVICES: "/servicios",
};

const privateRoutes = {
  HOME: "/",
  MENU: "/menu",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
