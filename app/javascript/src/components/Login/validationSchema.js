import * as yup from "yup";

export const VALIDATION_SCHEMA = yup.object().shape({
  user_name: yup.string().required("User name is required"),
  password: yup.string().min(4).required(),
});
