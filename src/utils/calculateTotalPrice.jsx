import calculateStandardShipping from "./calculateFinalShipping";
import { formatCurrency } from "utils/formatCurrency";

// Calculate the final shipping cost based on the selected shipping method
const calculateTotalPrice = (cartItems, products) => {

  return formatCurrency(
    cartItems.reduce((total, cartItem) => {
      const item = products.find((i) => i.id.split("/").pop() === cartItem.id);
      console.log("item: ", item);
      return total + (item?.variants[0].price.amount || 0) * cartItem.quantity;
    }, 0) + calculateStandardShipping(cartItems, products)
  );
};

export default calculateTotalPrice;
