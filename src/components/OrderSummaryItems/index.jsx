import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { formatCurrency } from "utils/formatCurrency";

const OrderSummaryItems = ({ title, variants, images, quantity }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1em 0",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
        <img
          src={images[0]}
          alt={title}
          style={{ width: "60px", height: "50px", objectFit: "cover", borderRadius: "10px" }}
        />
        <Box sx={{ textAlign: "left"}}>
          <Box sx={{ fontSize: ".9rem" }}>
            {title}{" "}
            {quantity > 1 && (
              <span style={{ fontSize: ".70rem" }}>x{quantity}</span>
            )}
          </Box>
          <Box sx={{ fontSize: ".75rem" }}>{formatCurrency(variants[0].price.amount)}</Box>
        </Box>
      </Box>
      <Box sx={{ textAlign: "right", minWidth: "80px" }}>
        <span style={{ fontSize: "1rem" }}>
          {formatCurrency(variants[0].price.amount * quantity)}
        </span>
      </Box>
    </Box>
  );
};

export default OrderSummaryItems;
