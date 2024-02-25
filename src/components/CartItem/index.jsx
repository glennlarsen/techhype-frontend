import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "context/ShoppingCartContext";
import { formatCurrency } from "utils/formatCurrency";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { useMediaQuery } from "react-responsive";
import { Stack, Paper, Box, Tooltip, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const { products, loading, error } = useProducts(); // Use the hook
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();
  const item = products.find((i) => i.id.split("/").pop() === id);
  console.log("item: ", item);
  console.log("id:", id);
  if (item == null) return null;

  return (
    <ThemeProvider theme={theme}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        spacing={2}
      >
        {isMobile ? (
          <Paper
            elevation={3}
            sx={{
              justifyContent: "space-between",
              width: "100%",
              borderRadius: "10px",
              marginBottom: ".5em !important",
              padding: "1em",
            }}
          >
            <Link to={`/shop/${id}`}>
              <img
                src={item.images[0].src}
                style={{
                  width: "135px",
                  height: "85px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                alt={item.name}
              />
              <Box sx={{ textAlign: "left" }}>
                <Box sx={{ fontSize: "1.1rem" }}>
                  {item.name}{" "}
                  {quantity > 1 && (
                    <span style={{ fontSize: ".75rem" }}>x{quantity}</span>
                  )}
                </Box>
                <Box sx={{ fontSize: ".80rem" }}>
                  {formatCurrency(item.variants[0].price.amount)}
                </Box>
              </Box>
            </Link>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: "100%", sm: "fit-content" },
                gap: ".6em",
                marginTop: ".7em",
              }}
            >
              {/* Decrement button */}
              <IconButton
                size="small"
                aria-label="Decrement"
                onClick={() => decreaseCartQuantity(id)}
              >
                <RemoveIcon />
              </IconButton>

              <span>{quantity}</span>

              {/* Increment button */}
              <IconButton
                size="small"
                aria-label="Increment"
                onClick={() => increaseCartQuantity(id)}
              >
                <AddIcon />
              </IconButton>
              <Button
                className="remove-item-mobile"
                sx={{
                  maxWidth: "50px",
                  minWidth: 0,
                  maxHeight: "25px",
                  display: { xs: "flex", sm: "none" },
                  marginLeft: { xs: "1.5em" },
                }}
                variant="outlined"
                color="error"
                size="small"
                onClick={() => removeFromCart(id)}
              >
                &times;
              </Button>
              <div
                style={{
                  minWidth: "100px",
                  marginLeft: "auto",
                  textAlign: "end",
                }}
                className="item-price-mobile"
              >
                {formatCurrency(item.variants[0].price.amount * quantity)}
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                alignSelf: { xs: "flex-end", sm: "center" },
                gap: ".6em",
              }}
            >
              <div
                style={{ minWidth: "100px", textAlign: "right" }}
                className="item-price-desktop"
              >
                {formatCurrency(item.variants[0].price.amount * quantity)}
              </div>
              <Tooltip title={content[lang]["cartRemove"]}>
                <Button
                  sx={{
                    maxWidth: "50px",
                    minWidth: 0,
                    maxHeight: "25px",
                    display: { xs: "none", sm: "flex" },
                  }}
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => removeFromCart(id)}
                >
                  &times;
                </Button>
              </Tooltip>
            </Box>
          </Paper>
        ) : (
          <>
            {" "}
            <Link to={`/shop/${id}`}>
              <img
                src={item.images[0].src}
                style={{
                  width: "135px",
                  height: "85px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                alt={item.title}
              />
              <Box sx={{ textAlign: "left" }}>
                <Box sx={{ fontSize: "1.1rem" }}>
                  {item.name}{" "}
                  {quantity > 1 && (
                    <span style={{ fontSize: ".75rem" }}>x{quantity}</span>
                  )}
                </Box>
                <Box sx={{ fontSize: ".80rem" }}>
                  {formatCurrency(item.variants[0].price.amount)}
                </Box>
              </Box>
            </Link>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: "100%", sm: "fit-content" },
                gap: ".6em",
                marginTop: ".7em",
              }}
            >
              {/* Decrement button */}
              <IconButton
                size="small"
                aria-label="Decrement"
                onClick={() => decreaseCartQuantity(id)}
              >
                <RemoveIcon />
              </IconButton>

              <span>{quantity}</span>

              {/* Increment button */}
              <IconButton
                size="small"
                aria-label="Increment"
                onClick={() => increaseCartQuantity(id)}
              >
                <AddIcon />
              </IconButton>
              <Button
                className="remove-item-mobile"
                sx={{
                  maxWidth: "50px",
                  minWidth: 0,
                  maxHeight: "25px",
                  display: { xs: "flex", sm: "none" },
                  marginLeft: { xs: "1.5em" },
                }}
                variant="outlined"
                color="error"
                size="small"
                onClick={() => removeFromCart(id)}
              >
                &times;
              </Button>
              <div
                style={{
                  minWidth: "100px",
                  marginLeft: "auto",
                  textAlign: "end",
                }}
                className="item-price-mobile"
              >
                {formatCurrency(item.variants[0].price.amount * quantity)}
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                alignSelf: { xs: "flex-end", sm: "center" },
                gap: ".6em",
              }}
            >
              <div
                style={{ minWidth: "100px", textAlign: "right" }}
                className="item-price-desktop"
              >
                {formatCurrency(item.variants[0].price.amount * quantity)}
              </div>
              <Tooltip title={content[lang]["cartRemove"]}>
                <Button
                  sx={{
                    maxWidth: "50px",
                    minWidth: 0,
                    maxHeight: "25px",
                    display: { xs: "none", sm: "flex" },
                  }}
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => removeFromCart(id)}
                >
                  &times;
                </Button>
              </Tooltip>
            </Box>{" "}
          </>
        )}
      </Stack>
    </ThemeProvider>
  );
};

export default CartItem;
