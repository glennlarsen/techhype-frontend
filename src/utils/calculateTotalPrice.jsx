import calculateFinalShippingCost from "./calculateFinalShipping";
import { products } from "data/products";
import { formatCurrency } from "utils/formatCurrency";

// Calculate the final shipping cost based on the selected shipping method
const calculateTotalPrice = (shippingMethod, cartItems) => {
  return formatCurrency(
    cartItems.reduce((total, cartItem) => {
      const item = products.find((i) => i.id === parseInt(cartItem.id));
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0) + calculateFinalShippingCost(shippingMethod, cartItems)
  );
};

export default calculateTotalPrice;
