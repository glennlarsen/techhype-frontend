import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "context/ShoppingCartContext";
import { formatCurrency } from "utils/formatCurrency";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { useMediaQuery } from "react-responsive";
import { Stack, Paper, Box, Tooltip, Button, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import useProducts from "utils/useProducts";

// Define your custom breakpoints
const customBreakpoints = {
  xs: 0, // Extra small devices (phones)
  sm: 700, // Small devices (tablets)
  md: 960, // Medium devices (desktops)
  lg: 1280, // Large devices (large desktops)
  xl: 1920, // Extra large devices (larger desktops)
};

// Create a custom theme using the custom breakpoints
const theme = createTheme({
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: customBreakpoints,
  },
});

const CartItem = ({ id, quantity }) => {
  const [lang] = useContext(LangContext);
  const { products, loading, error } = useProducts(); // Use the hook
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();
  const item = products.find((i) => i.id.split("/").pop() === id);
  if (item == null) return null;

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={3}
        alignItems="center"
        marginLeft={"-24px !important"}
      >
        <Grid item xs={4}>
          <Link to={`/shop/${id}`}>
            <img
              src={item.images[0].src}
              alt={item.title}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </Link>
        </Grid>
        <Grid
          item
          xs={8}
          container
          direction="column"
          justifyContent="space-between"
        >
          <Box>
            <Link
              to={`/shop/${id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box
                component="span"
                sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
              >
                {item.title}
              </Box>
            </Link>
            <Box sx={{ fontSize: ".80rem" }}>
              {formatCurrency(item.variants[0].price.amount)}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: ".6em",
              border: "1px solid white",
              borderRadius: "8px",
              margin: "10px 0",
              width: "fit-content",
            }}
          >
            <IconButton
              size="small"
              sx={{ color: "white" }}
              aria-label="Decrement"
              onClick={() => decreaseCartQuantity(id)}
            >
              <RemoveIcon />
            </IconButton>
            <span style={{ fontSize: "14px" }}>{quantity}</span>
            <IconButton
              size="small"
              sx={{ color: "white" }}
              aria-label="Increment"
              onClick={() => increaseCartQuantity(id)}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span className="remove-item-button" color="error" onClick={() => removeFromCart(id)}>
              {content[lang]["cartRemove"]}
            </span>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default CartItem;
