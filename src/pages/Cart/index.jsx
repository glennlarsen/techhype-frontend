import React, { useContext } from "react";
import Layout from "components/Layout";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import Logo from "logo/logo-no-text.png";
import CartItem from "components/CartItem";
import { products } from "data/products";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { grey } from "@mui/material/colors";
import { useShoppingCart } from "context/ShoppingCartContext";
import { fontSize } from "@mui/system";
import { formatCurrency } from "utils/formatCurrency";

const Cart = () => {
  const [lang] = useContext(LangContext);
  const { cartItems } = useShoppingCart();

  const SHIPPING_COST = 59;

  return (
    <Layout page="Cart" description="Your shopping Cart">
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
                  }}
                >
                  Shipping{" "}
                  {formatCurrency(
                    cartItems.reduce((total, cartItem) => {
                      const item = products.find(
                        (i) => i.id === parseInt(cartItem.id)
                      );
                      return total + (item?.price || 0) * cartItem.quantity;
                    }, 0) > 500
                      ? 0
                      : SHIPPING_COST
                  )}
                </Box>
                <Box
                  sx={{
                    marginLeft: "auto !important",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  {content[lang]["cartTotal"]}{" "}
                  {formatCurrency(
                    cartItems.reduce((total, cartItem) => {
                      const item = products.find(
                        (i) => i.id === parseInt(cartItem.id)
                      );
                      return total + (item?.price || 0) * cartItem.quantity;
                    }, 0) +
                      (cartItems.reduce((total, cartItem) => {
                        const item = products.find(
                          (i) => i.id === parseInt(cartItem.id)
                        );
                        return total + (item?.price || 0) * cartItem.quantity;
                      }, 0) > 500
                        ? 0
                        : SHIPPING_COST)
                  )}
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
              </Box>
            )}
          </Stack>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
