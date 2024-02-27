import calculateStandardShipping from "utils/calculateStandardShipping";

// Calculate the final shipping cost based on the selected shipping method
const calculateFinalShippingCost = (cartItems, products) => {
    return calculateStandardShipping(cartItems, products);
};

export default calculateFinalShippingCost;
