const publicRoutes = {
  LOGIN: "/iniciar-sesion",
  BLOG: "/blog",
  SERVICES: "/servicios",
};

const privateRoutes = {
  HOME: "/",
  MENU: "/menu",
  PROFILE: "/menu/perfil",

  ADMINBLOG: "/menu/blog",
  PARTNERS: "/menu/socios",
  AFFILIATES: "/menu/afiliados",
  APPOINTMENTS: "/menu/citas",

  PARTNER_SERVICES: "/menu/servicios",
  PARTNER_APPOINTMENTS: "/menu/lista-citas",

  AFFILIATES_APPOINTMENTS: "/menu/mis-citas",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
