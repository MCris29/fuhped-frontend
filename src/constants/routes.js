const publicRoutes = {
  LOGIN: "/iniciar-sesion",
  BLOG: "/blog",
  MENU: "/menu",
};

const privateRoutes = {
  HOME: "/",
  PROFILE: "/profile",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
