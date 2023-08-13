import validator from "validator";

export const isValidCreditCardNumber = (value) => {
  // Remove all non-numeric characters
  const numericValue = value.replace(/\D/g, "");
  // Use validator to check if the card number is valid
  return validator.isCreditCard(numericValue);
};
