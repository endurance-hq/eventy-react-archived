import Login from "src/components/Authentication/Login";

import Signup from "components/Authentication/Signup";
import Dashboard from "components/Dashboard";

const DASHBOARD_PATH = "/";
const AUTHENTICATION_PATH = {
  INDEX: "authentication",
  LOGIN: "login",
  SIGNUP: "signup",
};

export const PRIVATE_ROUTES = [
  {
    path: DASHBOARD_PATH,
    component: Dashboard,
  },
];

export const AUTH_ROUTES = [
  {
    path: AUTHENTICATION_PATH.LOGIN,
    component: Login,
  },
  {
    path: AUTHENTICATION_PATH.SIGNUP,
    component: Signup,
  },
];

export { DASHBOARD_PATH, AUTHENTICATION_PATH };
