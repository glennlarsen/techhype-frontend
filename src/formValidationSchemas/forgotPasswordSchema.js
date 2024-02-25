import * as Yup from "yup";
import { EMAIL_REGEX } from "constants/regex";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup
    .string()
    .required("Please enter your email")
    .matches(EMAIL_REGEX, "Enter a valid email"),
});

export default forgotPasswordSchema;
