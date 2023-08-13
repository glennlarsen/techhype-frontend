import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { UilShoppingBag } from "@iconscout/react-unicons";
import { color_dark, color_light } from "constants/colors";
import OrderSummary from "components/OrderSummary";
import { Box, Typography } from "@mui/material";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import calculateTotalPrice from "utils/calculateTotalPrice";

const OrderSummaryToggle = ({
  handleToggleOrderSummary,
  showOrderSummary,
  cartItems,
  shippingMethod,
  confirmationPage,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const [lang] = useContext(LangContext);

  return (
    <>
      {isMobile && (
        <Box
          sx={{
            background: "white",
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            position: "fixed",
            top: "49.188px",
            right: 0,
            left: 0,
            zIndex: 200,
            boxShadow: "0 -4px 5px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box
            onClick={handleToggleOrderSummary}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "1em",
              zIndex: 199,
              width: "100%",
              background: color_light,
              color: color_dark,
              cursor: "pointer",
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
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
              {calculateTotalPrice(shippingMethod, cartItems)}
            </Typography>
          </Box>
          <OrderSummary
            cartItems={cartItems}
            showOrderSummary={showOrderSummary}
            shippingMethod={shippingMethod}
            confirmationPage={confirmationPage}
          />
        </Box>
      )}
    </>
  );
};

export default OrderSummaryToggle;
