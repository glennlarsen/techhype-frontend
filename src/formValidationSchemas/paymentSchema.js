import * as yup from "yup";
import validator from "validator";
import { FULL_NAME } from "constants/validationRules";

const isValidCreditCardNumber = (value) => {
  // Remove all non-numeric characters
  const numericValue = value.replace(/\D/g, "");
  // Use validator to check if the card number is valid
  return validator.isCreditCard(numericValue);
};

const paymentSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .test("creditCard", "Invalid credit card number", (value) =>
      isValidCreditCardNumber(value)
    )
    .required("Please enter your card number"),
  cardName: yup
    .string()
    .required("Cardholder's name is required")
    .test(
      "fullName",
      "Name must contain first and last name",
      (value) => value.trim().split(" ").length >= FULL_NAME
    ),
  exp: yup
    .string()
    .required("Expiration date is required")
    .matches(/^\d{2}\/\d{2}$/, "Invalid expiration date"),
  security: yup
    .string()
    .required("Security code is required")
    .length(3, "Invalid security code"),
});

export default paymentSchema;
