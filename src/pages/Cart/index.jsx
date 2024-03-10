import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "components/Layout";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import CartItem from "components/CartItem";
import { Paper } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { grey } from "@mui/material/colors";
import { useShoppingCart } from "context/ShoppingCartContext";
import { formatCurrency } from "utils/formatCurrency";
import { Button } from "techhype-components";
import HelpIcon from "@mui/icons-material/Help";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { color_primary, color_dark } from "constants/colors";
import { useMediaQuery } from "react-responsive";
import calculateStandardShipping from "utils/calculateStandardShipping";
import calculateTotalPrice from "utils/calculateTotalPrice";
import useProducts from "utils/useProducts";
import createShopifyCheckout from "utils/shopifyCheckout";

const Cart = ({ toggleDrawer}) => {
  const [lang] = useContext(LangContext);
  const { products, loading, error } = useProducts(); // Use the hook
  const { cartItems } = useShoppingCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 500 });

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  // In your Cart component or where you handle the checkout process
async function handleCheckout() {
  try {
    const checkout = await createShopifyCheckout(cartItems);
    if (checkout && checkout.webUrl) {
      // Redirect user to Shopify Checkout
      window.location.href = checkout.webUrl;
    } else {
      // Handle errors (e.g., display a message to the user)
      console.error('Failed to create Shopify checkout.');
    }
  } catch (error) {
    console.error('Error during checkout creation:', error);
  }
}


   // Wait for the products to be loaded before rendering the cost calculations
   if (loading) return <div>Loading...</div>;
   if (error) return <div>Error: {error.message}</div>;
   if (!products) return <div>Products not loaded</div>;

  return (
    <Layout page="Cart" description="Your shopping Cart" toggleDrawer={toggleDrawer}>
      <section className="cart top-overlay">
        <div className="container-inner cart-container">
          <h1>{content[lang]["cartHeading"]}</h1>
          <Stack spacing={2} sx={{ maxWidth: 1000, margin: "0 auto" }}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            {cartItems.length > 0 ? (
              <>
                <Divider variant="middle" />
                <Box
                  sx={{
                    marginLeft: "auto !important",
                    display: "flex",
                    alignItems: "center",
                    gap: ".2em",
                  }}
                >
                  <ClickAwayListener onClickAway={handleTooltipClose}>
                    <Tooltip
                      onClose={handleTooltipClose}
                      disableTouchListener
                      open={open}
                      title={content[lang]["shippingInfo"]}
                    >
                      <HelpIcon
                        onClick={handleTooltipOpen}
                        sx={{
                          maxWidth: "16px",
                          maxHeight: "16px",
                          color: color_dark,
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  </ClickAwayListener>
                  {content[lang]["shipping"]}{" "}
                  {formatCurrency(calculateStandardShipping(cartItems, products))}
                </Box>
                <Box
                  sx={{
                    marginLeft: "auto !important",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  {content[lang]["cartTotal"]}{" "}
                  {calculateTotalPrice(cartItems, products)}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: { xs: "end", sm: "start" },
                    flexDirection: { xs: "column-reverse", sm: "row" },
                    gap: "2em",
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      gap: "1em",
                      padding: "1.5em",
                      borderRadius: "10px",
                      alignItems: "center",
                      fontStyle: "italic",
                      fontSize: ".9rem",
                      display: "flex",
                    }}
                  >
                    <DesignServicesIcon sx={{ color: color_primary }} />
                    {content[lang]["cartTip"]}
                  </Paper>
                  <Button
                    size={!isMobile ? "small" : ""}
                    onClick={() => handleCheckout()}
                  >
                    {content[lang]["checkout"]}
                  </Button>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1em",
                }}
              >
                {content[lang]["cartEmpty"]}
                <ShoppingBasketIcon sx={{ color: grey[300], fontSize: 50 }} />
                <Button onClick={() => navigate("/shop")} size="small">
                  {content[lang]["goToShopButton"]}
                </Button>
              </Box>
            )}
          </Stack>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
