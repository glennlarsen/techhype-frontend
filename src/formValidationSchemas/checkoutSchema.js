import * as yup from "yup";
import { EMAIL_REGEX } from "constants/regex";
import {
  MAX_PHONE_NUMBERS,
  MAX_POSTAL_CODE,
  MIN_STREET,
  FULL_NAME,
  MIN_CITY_CHARACTERS,
} from "constants/validationRules";

const checkoutSchema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter your email")
    .matches(EMAIL_REGEX, "Enter a valid email"),
  tel: yup.string().max(MAX_PHONE_NUMBERS, "Phone number is to long"),
  country: yup.string().required("Please enter your country"),
  name: yup
    .string()
    .required("Please enter your name")
    .test(
      "fullName",
      "Name must contain first and last name",
      (value) => value.trim().split(" ").length >= FULL_NAME
    ),
  company: yup.string(),
  street: yup
    .string()
    .required("Please enter your street")
    .min(MIN_STREET, `Street must be at least ${MIN_STREET} characters`)
    .matches(/^.*\d{1,4}.*$/, "Please enter your street and house nr"),
  postalCode: yup
    .string()
    .required("Please enter your postal code")
    .max(
      MAX_POSTAL_CODE,
      `Postal code can't be more than ${MAX_POSTAL_CODE} characters`
    ),
  city: yup
    .string()
    .required("Please enter your city")
    .min(
      MIN_CITY_CHARACTERS,
      `City must be at least ${MIN_CITY_CHARACTERS} characters`
    ),
});

export default checkoutSchema;
