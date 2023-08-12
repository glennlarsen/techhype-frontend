import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "components/Layout";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { Stack, Box } from "@mui/material";
import { useShoppingCart } from "context/ShoppingCartContext";
import { useMediaQuery } from "react-responsive";
import OrderSummary from "components/OrderSummary";
import AppTheme from "components/forms/AppTheme";
import OrderSummaryToggle from "components/OrderSummaryToggle";
import CheckoutForm from "components/CheckoutForm";

const Checkout = () => {
  const [lang] = useContext(LangContext);
  const { cartItems } = useShoppingCart();
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const navigate = useNavigate();

  // Redirect to the Home page if cartItems is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);

  const handleToggleOrderSummary = () => {
    setShowOrderSummary((prevValue) => !prevValue);
  };

  return (
    <Layout
      page={content[lang]["checkoutHeading"]}
      description="Checkout, pay and wait for your cards to be shipped as fast as possible"
    >
      <AppTheme>
        <OrderSummaryToggle
          handleToggleOrderSummary={handleToggleOrderSummary}
          showOrderSummary={showOrderSummary}
          cartItems={cartItems}
          shippingMethod="standard"
        />
        <section className="checkout top-overlay">
          <div className="container-inner checkout-container">
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
              <h1 style={{ marginTop: isMobile ? 0 : "" }}>
                {content[lang]["checkoutHeading"]}
              </h1>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
                padding={isMobile ? 0 : "0 2em"}
                sx={{ width: "100%" }}
              >
                <CheckoutForm />
              </Stack>
            </Box>

            {/* Order Summary */}
            {!isMobile && (
              <OrderSummary
                cartItems={cartItems}
                showOrderSummary={showOrderSummary}
                shippingMethod="standard"
              />
            )}
          </div>
        </section>
      </AppTheme>
    </Layout>
  );
};

export default Checkout;
