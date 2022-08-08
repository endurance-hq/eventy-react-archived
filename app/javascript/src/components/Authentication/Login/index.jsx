import React from "react";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { login } from "apis/authentication";
import { DASHBOARD_PATH } from "components/routeConstants";
import { useAuthDispatch } from "contexts/auth";
import { useUserDispatch } from "contexts/user";

import { LOGIN_INTIAL_VALUES } from "./constants";
import { VALIDATION_SCHEMA } from "./validationSchema";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authDispatch = useAuthDispatch();
  const userDispath = useUserDispatch();

  const loginSuccessHandler = ({ data: { user } }) => {
    authDispatch({ type: "LOGIN", payload: user });
    userDispath({ type: "SET_USER", payload: { user } });
    navigate(DASHBOARD_PATH);
  };

  const loginMutation = useMutation(login, {
    onSuccess: loginSuccessHandler,
  });

  return (
    <Formik
      initialValues={LOGIN_INTIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={loginMutation.mutate}
    >
      {() => (
        <Form>
          <Stack spacing={4}>
            <Field name="email">
              {({ field, meta: { error, touched } }) => (
                <FormControl isRequired isInvalid={touched && error}>
                  <FormLabel
                    htmlFor="email"
                    className="text-slate-400"
                    fontSize="md"
                  >
                    {t("authentication.form.labels.email")}
                  </FormLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("authentication.form.placeholder.email")}
                    size="md"
                    {...field}
                  />
                  {touched && error && (
                    <FormErrorMessage>{error}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, meta: { touched, error } }) => (
                <FormControl isRequired isInvalid={touched && error}>
                  <FormLabel
                    htmlFor="password"
                    className="text-slate-400"
                    fontSize="md"
                  >
                    {t("authentication.form.labels.password")}
                  </FormLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t("authentication.form.placeholder.password")}
                    size="md"
                    {...field}
                  />
                  {touched && error && (
                    <FormErrorMessage>{error}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            </Field>
            <Text
              fontSize="xs"
              className="cursor-pointer text-right text-base text-slate-400 hover:text-indigo-400"
            >
              {t("authentication.form.forgotPassword")}
            </Text>
            <Button colorScheme="indigo" size="md" type="submit">
              {t("authentication.login")}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
