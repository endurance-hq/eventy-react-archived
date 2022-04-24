import * as yup from "yup";

export const VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(4).required(),
});
