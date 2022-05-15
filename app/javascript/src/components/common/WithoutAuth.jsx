import React from "react";

import { isNil } from "ramda";
import { Navigate } from "react-router-dom";

import { isPresent } from "commons/utils";
import { useAuthState } from "contexts/auth";
import { useUserState } from "contexts/user";

const WithoutAuth = ({ children, redirectTo }) => {
  const { authToken } = useAuthState();
  const { user: userContextState } = useUserState();
  const isAuthenticated = !isNil(authToken) && isPresent(userContextState);

  return isAuthenticated ? <Navigate to={redirectTo} /> : children;
};

export default WithoutAuth;
