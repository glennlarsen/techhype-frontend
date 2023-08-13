import * as yup from "yup";
import { EMAIL_REGEX } from "constants/regex";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter your email")
    .matches(EMAIL_REGEX, "Enter a valid email"),
  password: yup.string().required("Please enter your password"),
});

export default loginSchema;
