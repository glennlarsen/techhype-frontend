// utils/shippingUtils.js

import { SHIPPING_COST } from "constants/validationRules";

const calculateStandardShipping = (cartItems, products) => {
  // Early return if products is not available
  if (!products) {
    console.error("Products data is not available.");
    return SHIPPING_COST; // Default to only shipping cost if products data is not available
  }

  return cartItems.reduce((total, cartItem) => {
    const item = products.find((i) => i.id.split("/").pop() === cartItem.id);
    console.log("item shipping: ", item);
    return total + (item?.variants[0].price.amount || 0) * cartItem.quantity;
  }, 0) > 500
    ? 0
    : SHIPPING_COST;
};

export default calculateStandardShipping;
