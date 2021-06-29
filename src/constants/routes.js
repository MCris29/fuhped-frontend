const publicRoutes = {
  LOGIN: "/login",
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
