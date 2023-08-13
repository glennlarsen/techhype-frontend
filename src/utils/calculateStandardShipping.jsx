// utils/shippingUtils.js
import { products } from "data/products";
import { SHIPPING_COST } from "constants/validationRules";

const calculateStandardShipping = (cartItems) => {
  return cartItems.reduce((total, cartItem) => {
    const item = products.find((i) => i.id === parseInt(cartItem.id));
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0) > 500
    ? 0
    : SHIPPING_COST;
};

export default calculateStandardShipping;
