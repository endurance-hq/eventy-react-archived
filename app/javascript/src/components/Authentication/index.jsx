import React from "react";

import { Image, Box, ButtonGroup } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router-dom";

import { AUTHENTICATION_PATH } from "components/routeConstants";

import TabButton from "./TabButton";

const Login = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <div className="flex h-screen items-center justify-center bg-blue-100">
      <div className="min-h-120 w-96 rounded-md bg-white bg-login-wave bg-cover bg-center bg-no-repeat p-4 pb-6 shadow-sm">
        <Image
          className="ml-auto mr-6 mt-6 w-[100px] bg-cover bg-center bg-no-repeat"
          objectFit="cover"
          src="/assets/logo.svg"
          alt="Logo"
        />
        <Box mt="16" className="mx-4 flex flex-col gap-3">
          <ButtonGroup variant="ghost" spacing="2">
            <Link to={AUTHENTICATION_PATH.LOGIN}>
              <TabButton
                text={t("authentication.login")}
                active={pathname.match(AUTHENTICATION_PATH.LOGIN)}
              />
            </Link>
            <Link to={AUTHENTICATION_PATH.SIGNUP}>
              <TabButton
                text={t("authentication.signup")}
                active={pathname.match(AUTHENTICATION_PATH.SIGNUP)}
              />
            </Link>
          </ButtonGroup>
          <Outlet />
        </Box>
      </div>
    </div>
  );
};

export default Login;
