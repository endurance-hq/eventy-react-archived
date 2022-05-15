import React from "react";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

import { SIGNUP_INTIAL_VALUES } from "./constants";
import { VALIDATION_SCHEMA } from "./validationSchema";

const Signup = () => {
  const { t } = useTranslation();

  // Add signup logic here
  const handleSubmit = () => {};

  return (
    <Formik
      initialValues={SIGNUP_INTIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
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
            <Field name="password_confirmation">
              {({ field, meta: { touched, error } }) => (
                <FormControl isRequired isInvalid={touched && error}>
                  <FormLabel
                    htmlFor="password_confirmation"
                    className="text-slate-400"
                    fontSize="md"
                  >
                    {t("authentication.form.labels.passwordConfirmation")}
                  </FormLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t(
                      "authentication.form.placeholder.passwordConfirmation"
                    )}
                    size="md"
                    {...field}
                  />
                  {touched && error && (
                    <FormErrorMessage>{error}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            </Field>
            <Button colorScheme="indigo" size="md" type="submit">
              {t("authentication.signup")}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
