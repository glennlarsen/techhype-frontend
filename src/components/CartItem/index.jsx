import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useShoppingCart } from "context/ShoppingCartContext";
import { products } from "data/products";
import { formatCurrency } from "utils/formatCurrency";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";

import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();
  const item = products.find((i) => i.id === parseInt(id));
  console.log("item: ", item);
  console.log("id:", id);
  if (item == null) return null;

  return (
    <ThemeProvider theme={theme}>
    <Stack
      direction={{ xs: "column", sm: "row"}}
      alignItems={{ xs: "flex-start", sm: "center"}}
      justifyContent="space-between"
      spacing={2}
    >
      <Link to={`/shop/${id}`}>
        <img
          src={item.image[0]}
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
          <Box sx={{ fontSize: ".80rem" }}>{formatCurrency(item.price)}</Box>
        </Box>
      </Link>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: ".6em",
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
            sx={{ maxWidth: "50px", minWidth: 0, maxHeight: "25px", display: {xs: "flex", sm: "none"}, marginLeft: { xs: "1.5em"} }}
            variant="outlined"
            color="error"
            size="small"
            onClick={() => removeFromCart(id)}
          >
            &times;
          </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          alignSelf: {xs: "flex-end", sm: "center"},
          gap: ".6em",
        }}
      >
        <div style={{ minWidth: "100px", textAlign: "right" }}>{formatCurrency(item.price * quantity)}</div>
        <Tooltip title={content[lang]["cartRemove"]}>
          <Button
            sx={{ maxWidth: "50px", minWidth: 0, maxHeight: "25px", display: {xs: "none", sm: "flex"} }}
            variant="outlined"
            color="error"
            size="small"
            onClick={() => removeFromCart(id)}
          >
            &times;
          </Button>
        </Tooltip>
      </Box>
    </Stack>
    </ThemeProvider>
  );
};

export default CartItem;
