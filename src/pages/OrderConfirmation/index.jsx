import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "components/Layout";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import Typography from "@mui/material/Typography";
import { Button } from "techhype-components";
import {
  Stack,
  Paper,
  Box,
  Divider,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useShoppingCart } from "context/ShoppingCartContext";
import { Link as RouterLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import OrderSummary from "components/OrderSummary";
import AppTheme from "components/forms/AppTheme";
import OrderSummaryToggle from "components/OrderSummaryToggle";
import { formatCurrency } from "utils/formatCurrency";
import { SHIPPING_COST } from "constants/validationRules";
import { products } from "data/products";
import { useFormContext } from "context/FormContext";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // Change this value to adjust the breakpoint for xs screens
      sm: 500, // Change this value to adjust the breakpoint for sm screens
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const OrderConfirmation = () => {
  const [lang] = useContext(LangContext);
  const { purchasedItems  } = useShoppingCart();
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const navigate = useNavigate();
  const { formData } = useFormContext();

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
          shippingMethod={shippingMethod}
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
                Your order is confirmed!
              </h1>
              <Typography variant="subtitle1">Order #34786</Typography>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
                padding={isMobile ? 0 : "0 2em"}
                sx={{ width: "100%" }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "1em",
                    borderRadius: "10px",
                    margin: "1em 0",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                      gap: ".5em",
                    }}
                  >
                    <Box sx={{ textAlign: "left" }}>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ marginBottom: ".8em" }}
                      >
                        Order Details
                      </Typography>
                      <Box sx={{ width: "100%" }}>
                        <Grid container rowSpacing={2} columnSpacing={3}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" gutterBottom>
                              Contact Information
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              align="left"
                              fontSize={14}
                            >
                              {formData.email}
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              align="left"
                              fontSize={14}
                            >
                              {formData.tel}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" gutterBottom>
                              Payment Method
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              align="left"
                              fontSize={14}
                            >
                              Visa ending with ***4429
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" gutterBottom>
                              Shipping address
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              align="left"
                              fontSize={14}
                            >
                              {formData.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              align="left"
                              fontSize={14}
                            >
                              {formData.street}
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              align="left"
                              fontSize={14}
                            >
                              {formData.postalCode}, {formData.city}
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              align="left"
                              fontSize={14}
                            >
                              {formData.country}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" gutterBottom>
                              Billing address
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              align="left"
                              fontSize={14}
                            >
                              {formData.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              align="left"
                              fontSize={14}
                            >
                              {formData.street}
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              align="left"
                              fontSize={14}
                            >
                              {formData.postalCode}, {formData.city}
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              align="left"
                              fontSize={14}
                            >
                              {formData.country}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" gutterBottom>
                              Shipping method
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              align="left"
                              fontSize={14}
                            >
                              Standard (1-5 business days)
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                  <Divider sx={{ margin: ".8em 0" }} />
                  <Typography
                    variant="body2"
                    gutterBottom
                    align="left"
                    fontSize={14}
                  >
                    You will receive a confirmation email with your order
                    shortly.
                  </Typography>
                </Paper>

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
                    Need help?
                    <RouterLink
                      to="/contact"
                      className="back-link"
                      style={{ fontWeight: "bold" }}
                    >
                      Contact Us
                    </RouterLink>
                  </Box>
                  <Button
                    size={isMobile ? "" : "small"}
                    type="submit"
                    color="primary"
                    onClick={() => navigate("/login")}
                  >
                    Create your profile
                  </Button>
                </Box>
              </Stack>
            </Box>

            {/* Order Summary */}
            {!isMobile && (
              <OrderSummary
                cartItems={purchasedItems}
                showOrderSummary={showOrderSummary}
                shippingMethod={shippingMethod}
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
