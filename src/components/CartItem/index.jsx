import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
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

const CartItem = ({ id, quantity }) => {
  const [lang] = useContext(LangContext);
  const location = useLocation();
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();
  const item = products.find((i) => i.id === parseInt(id));
  console.log("item: ", item);
  console.log("id:", id);
  if (item == null) return null;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={{ xs: 1, sm: 2 }}
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
        <IconButton
          aria-label="Decrement"
          onClick={() => decreaseCartQuantity(id)}
        >
          <RemoveIcon />
        </IconButton>

        <span>{quantity}</span>

        {/* Increment button */}
        <IconButton
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
          gap: ".6em",
        }}
      >
        <div>{formatCurrency(item.price * quantity)}</div>
        <Tooltip title={content[lang]["cartRemove"]}>
          <Button
            sx={{ maxWidth: "50px", minWidth: 0, maxHeight: "25px" }}
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
  );
};

export default CartItem;
