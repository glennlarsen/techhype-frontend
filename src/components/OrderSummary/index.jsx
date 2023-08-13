import React, { useContext } from "react";
import {
  Stack,
  Paper,
  Box,
  Collapse,
  Typography,
} from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { products } from "data/products";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { color_primary, color_dark, color_light } from "constants/colors";
import { formatCurrency } from "utils/formatCurrency";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { UilShoppingBag } from "@iconscout/react-unicons";
import OrderSummaryItems from "components/OrderSummaryItems";
import calculateFinalShippingCost from "utils/calculateFinalShipping";
import calculateTotalPrice from "utils/calculateTotalPrice";
import DiscountCode from "components/DiscountCode";

const OrderSummary = ({
  showOrderSummary,
  cartItems,
  shippingMethod,
  confirmationPage,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const [lang] = useContext(LangContext);

  return (
    <>
      {/* Mobile screen size */}
      {isMobile ? (
        <Collapse in={showOrderSummary} sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: color_light,
              alignItems: "center",
              flex: 1,
              padding: "1.5em",
              color: color_dark,
            }}
          >
            <Stack spacing={3} sx={{ width: "100%" }}>
              {/* Map through the cartItems array and find the corresponding product */}
              {cartItems.map((item) => {
                const product = products.find(
                  (product) => product.id === parseInt(item.id)
                );
                const { quantity } = item;

                // Pass item and product information to the CartItemSummary component
                return (
                  <OrderSummaryItems
                    key={product.id}
                    quantity={quantity}
                    {...product}
                  />
                );
              })}
              <DiscountCode confirmationPage={confirmationPage} lang={lang} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>{content[lang]["checkoutShipping"]}</Typography>
                {formatCurrency(
                  calculateFinalShippingCost(shippingMethod, cartItems)
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: "500" }}>
                  {content[lang]["checkoutTotal"]}
                </Typography>
                <Typography sx={{ fontWeight: "500" }}>
                  {calculateTotalPrice(shippingMethod, cartItems)}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Collapse>
      ) : (
        /* Desktop screen size */
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: color_light,
            borderRadius: "10px",
            flex: 1,
            padding: isMobile ? 0 : "2em",
          }}
        >
          <Stack spacing={3} sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "2em",
                justifyContent: "center",
              }}
            >
              <UilShoppingBag />
              <Typography ml={1} variant="subtitle1" sx={{ fontWeight: "500" }}>
                {content[lang]["checkoutOrderSummary"]}
              </Typography>
            </Box>
            {/* Map through the cartItems array and find the corresponding product */}
            {cartItems.map((item) => {
              const product = products.find(
                (product) => product.id === parseInt(item.id)
              );
              const { quantity } = item;

              // Pass item and product information to the CartItemSummary component
              return (
                <OrderSummaryItems
                  key={product.id}
                  quantity={quantity}
                  {...product}
                />
              );
            })}
            <DiscountCode confirmationPage={confirmationPage} lang={lang} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>{content[lang]["checkoutShipping"]}</Typography>
              {formatCurrency(
                calculateFinalShippingCost(shippingMethod, cartItems)
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: "500" }}>
                {content[lang]["checkoutTotal"]}
              </Typography>
              <Typography sx={{ fontWeight: "500" }}>
                {calculateTotalPrice(shippingMethod, cartItems)}
              </Typography>
            </Box>
            <Paper
              elevation={3}
              sx={{
                background: "transparent",
                marginTop: "2em",
                gap: "1em",
                padding: "1.5em",
                borderRadius: "10px",
                alignItems: "center",
                fontStyle: "italic",
                fontSize: ".9rem",
                display: isMobile ? "none" : "flex",
              }}
            >
              <DesignServicesIcon sx={{ color: color_primary }} />
              {!confirmationPage
                ? content[lang]["cartTip"]
                : "Create your profile now and start designing your business card!"}
            </Paper>
          </Stack>
        </Box>
      )}{" "}
    </>
  );
};

export default OrderSummary;
