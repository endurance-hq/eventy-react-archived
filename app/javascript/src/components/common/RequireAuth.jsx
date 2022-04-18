import React from "react";

import { Navigate } from "react-router-dom";

import { isPresent } from "commons/utils";
import { useAuthState } from "contexts/auth";
import { useUserState } from "contexts/user";

const RequireAuth = ({ children, redirectTo }) => {
  const { authToken } = useAuthState();
  const { user: userContextState } = useUserState();
  const isAuthenticated = isPresent(authToken) && isPresent(userContextState);

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;
