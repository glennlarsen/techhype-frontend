import React from "react";
import {
  Paper,
  FormControlLabel,
  Radio,
  Typography,
  Divider,
} from "@mui/material";
import { formatCurrency } from "utils/formatCurrency";

const ShippingMethodSelection = ({
  shippingMethod,
  setShippingMethod,
  content,
  lang,
  calculateShopShipping,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        justifyContent: "space-between",
        width: "100%",
        borderRadius: "10px",
        marginBottom: "1em !important",
      }}
    >
      {/* Standard Shipping */}
      <FormControlLabel
        control={
          <>
            <Radio
              checked={shippingMethod === "standard"}
              onChange={(event) => setShippingMethod(event.target.value)}
              value="standard"
              name="radio-buttons"
              size="small"
              sx={{ paddingLeft: 0 }}
              inputProps={{ "aria-label": "Til Butikk (1-5 virkedager)" }}
            />
            <Typography variant="body2" fontSize={14}>
              {content[lang]["shippingOption1"]}
            </Typography>
          </>
        }
        label={
          <Typography
            sx={{ fontSize: ".8rem", fontWeight: "500", marginLeft: "auto" }}
          >
            {formatCurrency(calculateShopShipping())}
          </Typography>
        }
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          alignItems: "center",
          textAlign: "left",
          gap: ".5em",
          padding: ".5em 1em",
          margin: 0,
        }}
      />

      <Divider />

      {/* Home Delivery */}
      <FormControlLabel
        control={
          <>
            <Radio
              checked={shippingMethod === "home"}
              onChange={(event) => setShippingMethod(event.target.value)}
              value="home"
              name="radio-buttons"
              size="small"
              sx={{ paddingLeft: 0 }}
              inputProps={{ "aria-label": "Hjemlevering (1-3 virkedager)" }}
            />
            <Typography variant="body2" fontSize={14}>
              {content[lang]["shippingOption2"]}
            </Typography>
          </>
        }
        label={
          <Typography
            sx={{ fontSize: ".8rem", fontWeight: "500", marginLeft: "auto" }}
          >
            {formatCurrency(99)}
          </Typography>
        }
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          alignItems: "center",
          textAlign: "left",
          gap: ".5em",
          padding: ".5em 1em",
          margin: 0,
        }}
      />
    </Paper>
  );
};

export default ShippingMethodSelection;
