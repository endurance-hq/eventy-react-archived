import Dashboard from "components/Dashboard";
import Login from "components/Login";

const DASHBOARD_PATH = "/";
const LOGIN_PATH = "/login";

export const PRIVATE_ROUTES = [
  {
    path: DASHBOARD_PATH,
    component: Dashboard,
  },
];

export const AUTH_ROUTES = [
  {
    path: LOGIN_PATH,
    component: Login,
  },
];

export { DASHBOARD_PATH, LOGIN_PATH };
