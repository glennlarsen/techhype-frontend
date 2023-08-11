import * as yup from "yup";
import { EMAIL_REGEX } from "constants/regex";

const checkoutSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(EMAIL_REGEX, "Enter a valid email"),
  tel: yup.string().max(16, "Phone number can't be more than 16 characters"),
  country: yup.string().required("Country is required"),
  name: yup
    .string()
    .required("Name is required")
    .test(
      "fullName",
      "Name must contain first and last name",
      (value) => value.trim().split(" ").length >= 2
    ),
  company: yup.string(),
  street: yup
    .string()
    .required("Street is required")
    .min(5, "Street must be at least 5 characters")
    .matches(/^.*\d{1,4}.*$/, "Street must contain 'street' and 'house nr'"),
  postalCode: yup
    .string()
    .required("Postal code is required")
    .max(8, "Postal code can't be more than 8 characters"),
  city: yup
    .string()
    .required("City is required")
    .min(2, "City must be at least 2 characters"),
});

export default checkoutSchema;
