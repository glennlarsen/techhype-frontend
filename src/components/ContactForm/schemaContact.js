import * as yup from "yup";
import { MIN_NAME_CHARACTERS, EMAIL_REGEX, MAX_PHONE_NUMBERS, MIN_MESSAGE_CHARACTERS } from "../../constants/validationRules";

const schemaContact = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(MIN_NAME_CHARACTERS, `First Name must be at least ${MIN_NAME_CHARACTERS} characters`),
  email: yup
    .string()
    .required("Please enter your email")
    .matches(EMAIL_REGEX, "Enter a valid email"),
  phone: yup.string().max(MAX_PHONE_NUMBERS, "Phone number is to long"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(MIN_MESSAGE_CHARACTERS, `Message must be at least ${MIN_MESSAGE_CHARACTERS} characters`),
});

export default schemaContact;