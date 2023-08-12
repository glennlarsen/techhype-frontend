import * as yup from "yup";
import { MAX_POSTAL_CODE, MIN_CITY_CHARACTERS, MIN_STREET, FULL_NAME } from "constants/validationRules";

const billingAddressSchema = yup.object().shape({
  country: yup.string().required("Country is required"),
  name: yup
    .string()
    .required("Name is required")
    .test(
      "fullName",
      "Name must contain first and last name",
      (value) => value.trim().split(" ").length >= FULL_NAME
    ),
  company: yup.string(),
  street: yup
    .string()
    .required("Street is required")
    .min(MIN_STREET, `Street must be at least ${MIN_STREET} characters`)
    .matches(/^.*\d{1,4}.*$/, "Street must contain 'street' and 'house nr'"),
  postalCode: yup
    .string()
    .required("Postal code is required")
    .max(MAX_POSTAL_CODE, `Postal code can't be more than ${MAX_POSTAL_CODE} characters`),
  city: yup
    .string()
    .required("City is required")
    .min(MIN_CITY_CHARACTERS, `City must be at least ${MIN_CITY_CHARACTERS} characters`),
});

export default billingAddressSchema;
