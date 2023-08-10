import React, { useContext, useState } from "react";
import {
  Stack,
  Paper,
  Box,
  Divider,
  Collapse,
  Typography,
} from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { products } from "data/products";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { Button } from "techhype-components";
import { color_primary, color_dark, color_light } from "constants/colors";
import FormTextField from "components/forms/FormTextField";
import { SHIPPING_COST } from "constants/validationRules";
import { formatCurrency } from "utils/formatCurrency";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { UilShoppingBag } from "@iconscout/react-unicons";
import OrderSummaryItems from "components/OrderSummaryItems";

const OrderSummary = ({
  showOrderSummary,
  cartItems,
  shippingMethod,
  confirmationPage,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const [lang] = useContext(LangContext);
  const [discountValue, setDiscountValue] = useState("");

  console.log(confirmationPage);

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
              {!confirmationPage && (
                <>
                  {" "}
                  <Box
                    sx={{
                      display: "flex",
                      gap: "1em",
                      alignItems: "center",
                      padding: ".5em 0",
                    }}
                  >
                    <FormTextField
                      placeholder={content[lang]["discountCode"]}
                      fullWidth
                      size="small"
                      value={discountValue}
                      onChange={(event) => setDiscountValue(event.target.value)}
                      sx={{ backgroundColor: "white" }}
                    />
                    <Button
                      style={{
                        background: "transparent",
                        border: `2px solid ${
                          discountValue != "" ? color_primary : "grey"
                        }`,
                        color: color_dark,
                        opacity: discountValue != "" ? 1 : 0.7,
                      }}
                      size="small"
                      disabled={discountValue != "" ? false : true}
                    >
                      {content[lang]["DiscountButton"]}
                    </Button>
                  </Box>
                  <Divider />{" "}
                </>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>{content[lang]["checkoutShipping"]}</Typography>
                {formatCurrency(calculateShippingCost())}
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
            {!confirmationPage && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    gap: "1em",
                    alignItems: "center",
                    padding: ".5em 0",
                  }}
                >
                  <FormTextField
                    placeholder={content[lang]["discountCode"]}
                    fullWidth
                    size="small"
                    value={discountValue}
                    onChange={(event) => setDiscountValue(event.target.value)}
                    sx={{ backgroundColor: "white" }}
                  />
                  <Button
                    style={{
                      background: "transparent",
                      border: `2px solid ${
                        discountValue != "" ? color_primary : "grey"
                      }`,
                      color: color_dark,
                      opacity: discountValue != "" ? 1 : 0.7,
                    }}
                    size="small"
                    disabled={discountValue != "" ? false : true}
                  >
                    {content[lang]["DiscountButton"]}
                  </Button>
                </Box>
                <Divider />
              </>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>{content[lang]["checkoutShipping"]}</Typography>
              {formatCurrency(calculateShippingCost())}
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
              {!confirmationPage ? content[lang]["cartTip"] : "Create your profile now and start designing your business card!"}
            </Paper>
          </Stack>
        </Box>
      )}{" "}
    </>
  );
};

export default OrderSummary;
