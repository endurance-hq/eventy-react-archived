import React, { useState, useEffect } from "react";

import { Box, Skeleton } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "commons/logger";
import RequireAuth from "components/common/RequireAuth";
import {
  PRIVATE_ROUTES,
  DASHBOARD_PATH,
  AUTHENTICATION_PATH,
  AUTH_ROUTES,
} from "components/routeConstants";
import { useAuthDispatch } from "contexts/auth";
import { useUserDispatch } from "contexts/user";

import Authentication from "./Authentication";
import WithoutAuth from "./common/WithoutAuth";

const Main = props => {
  const [loading, setLoading] = useState(true);
  const userDispatch = useUserDispatch();
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    initializeLogger();
    registerIntercepts(authDispatch);
    setAuthHeaders(setLoading);
  }, [authDispatch, props?.user, userDispatch]);

  if (loading) {
    return (
      <Box w="100%">
        <Skeleton height="100vh" />
      </Box>
    );
  }

  return (
    <Box w="100%" h="100vh">
      <BrowserRouter>
        <Routes>
          <Route path={AUTHENTICATION_PATH.INDEX} element={<Authentication />}>
            <Route
              index
              element={<Navigate to={AUTHENTICATION_PATH.LOGIN} replace />}
            />
            {AUTH_ROUTES.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <WithoutAuth redirectTo={DASHBOARD_PATH}>
                    <Component />
                  </WithoutAuth>
                }
              />
            ))}
            <Route
              path="*"
              element={<Navigate to={AUTHENTICATION_PATH.LOGIN} replace />}
            />
          </Route>
          {PRIVATE_ROUTES.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <RequireAuth redirectTo={AUTHENTICATION_PATH.INDEX}>
                  <Component />
                </RequireAuth>
              }
            />
          ))}
          <Route path="*" element={<Navigate to={DASHBOARD_PATH} replace />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default Main;
