import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "components/Layout";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import Typography from "@mui/material/Typography";
import { Button } from "techhype-components";
import { Stack, Box, ThemeProvider, createTheme } from "@mui/material";
import { useShoppingCart } from "context/ShoppingCartContext";
import { Link as RouterLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import OrderSummary from "components/OrderSummary";
import OrderSummaryToggle from "components/OrderSummaryToggle";
import { useFormContext } from "context/FormContext";
import OrderDetails from "components/OrderDetails";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // Change this value to adjust the breakpoint for xs screens
      sm: 410, // Change this value to adjust the breakpoint for sm screens
    },
  },
});

const OrderConfirmation = () => {
  const [lang] = useContext(LangContext);
  const { purchasedItems } = useShoppingCart();
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const navigate = useNavigate();
  const { formData } = useFormContext();

  // Function to generate a random 5-digit number as order number temporarily until database store data is working.
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 90000) + 10000;
  };
  const orderNumber = generateRandomNumber();

  const handleToggleOrderSummary = () => {
    setShowOrderSummary((prevValue) => !prevValue);
  };

  return (
    <Layout
      page={content[lang]["paymentHeading"]}
      description="Checkout, pay and wait for your cards to be shipped as fast as possible"
    >
      <ThemeProvider theme={theme}>
        {/* Your OrderSummaryToggle component */}
        <OrderSummaryToggle
          handleToggleOrderSummary={handleToggleOrderSummary}
          showOrderSummary={showOrderSummary}
          cartItems={purchasedItems}
          shippingMethod={formData.shippingMethod}
          confirmationPage
        />
        <section className="payment top-overlay">
          <div className="container-inner payment-container">
            <Box
              sx={{
                display: "flex",
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingBottom: "2em",
              }}
            >
              <h1
                style={{
                  marginTop: isMobile ? 0 : ".1em",
                  fontSize: "1.8rem",
                  marginBottom: 0,
                }}
              >
              {content[lang]["confirmationPageTitle"]}
              </h1>
              <Typography variant="subtitle1"> {content[lang]["orderNumber"]}{orderNumber}</Typography>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
                padding={isMobile ? 0 : "0 2em"}
                sx={{ width: "100%" }}
              >
                <OrderDetails
                  formData={formData}
                  lang={lang}
                  content={content}
                  purchasedItems={purchasedItems}
                  shippingMethod={formData.shippingMethod}
                />
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "2em",
                    marginTop: "2.5em !important",
                    flexDirection: isMobile ? "column-reverse" : "row",
                  }}
                >
                  <Box className="back-link">
                  {content[lang]["needHelp"]}
                    <RouterLink
                      to="/contact"
                      className="back-link"
                      style={{ fontWeight: "bold" }}
                    >
                     {content[lang]["confirmationPageContactUs"]}
                    </RouterLink>
                  </Box>
                  <Button
                    size={isMobile ? "" : "small"}
                    type="submit"
                    color="primary"
                    onClick={() => navigate("/login")}
                  >
                    {content[lang]["confirmationCreateProfileButton"]}
                  </Button>
                </Box>
              </Stack>
            </Box>

            {/* Order Summary */}
            {!isMobile && (
              <OrderSummary
                cartItems={purchasedItems}
                showOrderSummary={showOrderSummary}
                shippingMethod={formData.shippingMethod}
                confirmationPage
              />
            )}
          </div>
        </section>
      </ThemeProvider>
    </Layout>
  );
};

export default OrderConfirmation;
