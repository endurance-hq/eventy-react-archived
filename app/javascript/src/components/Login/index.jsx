import React from "react";

import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useUserDispatch } from "src/contexts/user";

import { login } from "apis/authentication";
import { DASHBOARD_PATH } from "components/routeConstants";
import { useAuthDispatch } from "contexts/auth";

import { LOGIN_INTIAL_VALUES } from "./constants";
import { VALIDATION_SCHEMA } from "./validationSchema";

const Login = () => {
  const navigate = useNavigate();
  const authDispatch = useAuthDispatch();
  const userDispath = useUserDispatch();
  const handleSubmit = async values => {
    const {
      data: { user },
    } = await login(values);
    authDispatch({ type: "LOGIN", payload: user });
    userDispath({ type: "SET_USER", payload: { user } });
    navigate(DASHBOARD_PATH);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Box className="h-[50%] w-1/3 rounded-md border-2">
        <Formik
          initialValues={LOGIN_INTIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Stack spacing={3}>
                <Field name="user_name">
                  {({ field }) => (
                    <Input placeholder="User name" size="sm" {...field} />
                  )}
                </Field>
                <ErrorMessage name="user_name" component="span" />
                <Field name="password">
                  {({ field }) => (
                    <Input placeholder="password" size="sm" {...field} />
                  )}
                </Field>
                <ErrorMessage name="password" component="span" />
                <Button colorScheme="teal" size="sm" type="submit">
                  Login
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default Login;
