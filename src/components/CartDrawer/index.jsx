import React, { useState, useContext } from "react";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useShoppingCart } from "context/ShoppingCartContext";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { formatCurrency } from "utils/formatCurrency";
import { Button } from "techhype-components";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";
import CartItem from "components/CartItem";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { grey } from "@mui/material/colors";
import HelpIcon from "@mui/icons-material/Help";
import { color_primary, color_dark } from "constants/colors";
import Tooltip from "@mui/material/Tooltip";
import calculateStandardShipping from "utils/calculateStandardShipping";
import calculateTotalPrice from "utils/calculateTotalPrice";
import useProducts from "utils/useProducts";
import createShopifyCheckout from "utils/shopifyCheckout";

const CartDrawer = ({ isOpen, toggleDrawer }) => {
  const { cartItems, cartQuantity } = useShoppingCart();
  const { products, loading, error } = useProducts(); // Use the hook
  const [lang] = useContext(LangContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleGoToShop = () => {
    toggleDrawer();
    navigate("/shop");
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
        console.error("Failed to create Shopify checkout.");
      }
    } catch (error) {
      console.error("Error during checkout creation:", error);
    }
  }

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      lockBackgroundScroll={true}
      direction="right"
      className="cart-drawer-container"
    >
      <div className="cart-drawer-header">
        <h3>
          {content[lang]["cartHeading"]} ({cartQuantity})
        </h3>
        <CloseIcon
          onClick={toggleDrawer}
          sx={{
            maxWidth: "32px",
            maxHeight: "32px",
            color: "white",
            cursor: "pointer",
          }}
        />
      </div>

      <Divider
        variant="middle"
        width="100%"
        color="white"
        sx={{ marginLeft: "0 !important", margin: "1em 0" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 70px)", // Adjust based on header height
        }}
      >
        <Stack
          spacing={2}
          sx={{
            maxWidth: 1000,
            margin: "0 auto",
            marginBottom: "auto",
            height: "100%",
          }}
        >
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </Stack>
        {cartItems.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
            }}
          >
            <Divider
              variant="middle"
              width="100%"
              color="white"
              sx={{ marginLeft: "0 !important" }}
            />
            <Box
              sx={{
                marginLeft: "auto !important",
                display: "flex",
                alignItems: "center",
                gap: ".2em",
              }}
            >
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
                    color: "white",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
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
              <Button onClick={() => handleCheckout()}>
                {content[lang]["checkout"]}
              </Button>
            </Box>
          </Box>
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
            <Button onClick={() => handleGoToShop()} size="small">
              {content[lang]["goToShopButton"]}
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
