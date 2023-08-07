import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { products } from "data/products";
import { SHIPPING_COST } from "constants/validationRules";
import { formatCurrency } from "utils/formatCurrency";
import { UilShoppingBag } from "@iconscout/react-unicons";
import { color_dark, color_light } from "constants/colors";
import OrderSummary from "components/OrderSummary";
import { Box, Typography } from "@mui/material";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";

const OrderSummaryToggle = ({
  handleToggleOrderSummary,
  showOrderSummary,
  cartItems,
  shippingMethod,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 990 });
  const [lang] = useContext(LangContext);

  // Calculate the final shipping cost based on the selected shipping method
  const calculateShippingCost = () => {
    if (shippingMethod === "home") {
      return 99; // Home delivery cost
    }

    // Calculate the base shipping cost
    return cartItems.reduce((total, cartItem) => {
      const item = products.find((i) => i.id === parseInt(cartItem.id));
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0) > 500
      ? 0
      : SHIPPING_COST;
  };

  return (
    <>
      {isMobile && (
        <Box
          sx={{
            background: "white",
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          <Box
            onClick={handleToggleOrderSummary}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "1.3em",
              marginTop: "1em",
              zIndex: 100,
              width: "100%",
              background: color_light,
              color: color_dark,
              cursor: "pointer",
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            }}
          >
            <UilShoppingBag />
            <Typography
              ml={1}
              variant="subtitle1"
              sx={{
                fontSize: ".8rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              {showOrderSummary ? (
                <>
                  {content[lang]["hideOrderSummary"]}
                  <KeyboardArrowUpIcon />
                </>
              ) : (
                <>
                  {content[lang]["showOrderSummary"]}
                  <KeyboardArrowDownIcon />
                </>
              )}
            </Typography>
            <Typography sx={{ fontWeight: "500", marginLeft: "auto" }}>
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = products.find(
                    (i) => i.id === parseInt(cartItem.id)
                  );
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0) + calculateShippingCost()
              )}
            </Typography>
          </Box>
          <OrderSummary
            cartItems={cartItems}
            showOrderSummary={showOrderSummary}
            shippingMethod={shippingMethod}
          />
        </Box>
      )}
    </>
  );
};

export default OrderSummaryToggle;
