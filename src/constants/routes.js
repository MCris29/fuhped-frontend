const publicRoutes = {
  LOGIN: "/iniciar-sesion",
  BLOG: "/blog",
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
