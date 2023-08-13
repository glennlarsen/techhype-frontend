import calculateStandardShipping from "utils/calculateStandardShipping";

// Calculate the final shipping cost based on the selected shipping method
const calculateFinalShippingCost = (shippingMethod, cartItems) => {
  if (shippingMethod === "home") {
    return 99; // Home delivery cost
  } else {
    // Calculate the standard shipping cost
    return calculateStandardShipping(cartItems);
  }
};

export default calculateFinalShippingCost;
