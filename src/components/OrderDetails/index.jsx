import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Grid,
  Divider,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import calculateTotalPrice from "utils/calculateTotalPrice";

const OrderDetails = ({
  formData,
  lang,
  content,
  purchasedItems,
  shippingMethod,
}) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [billingAddressOpen, setBillingAddressOpen] = useState(
    isSmallScreen ? false : true
  );

  const handleBillingAddressToggle = () => {
    setBillingAddressOpen(!billingAddressOpen);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        justifyContent: "space-between",
        width: "100%",
        padding: "1em",
        borderRadius: "10px",
        margin: "1em 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          gap: ".5em",
        }}
      >
        <Box sx={{ textAlign: "left" }}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ marginBottom: ".8em" }}
          >
            Order Details
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Grid container rowSpacing={2} columnSpacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Contact Information
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  align="left"
                  fontSize={14}
                  sx={{ overflowWrap: "break-word" }}
                >
                  {formData.contactInfo.email}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  align="left"
                  fontSize={14}
                >
                  {formData.contactInfo.tel}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Payment Method
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  align="left"
                  fontSize={14}
                >
                  {formData.paymentMethod === "creditCard"
                    ? `Card ending with ***${formData.paymentInfo.cardNumber}`
                    : "Vipps"}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  align="left"
                  fontSize={14}
                >
                  {calculateTotalPrice(shippingMethod, purchasedItems)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  variant="subtitle2"
                  gutterBottom
                >
                  Shipping address
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  align="left"
                  fontSize={14}
                >
                  {formData.shippingAddress.name}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  align="left"
                  fontSize={14}
                >
                  {formData.shippingAddress.company}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  align="left"
                  fontSize={14}
                >
                  {formData.shippingAddress.street}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  align="left"
                  fontSize={14}
                >
                  {formData.shippingAddress.postalCode},{" "}
                  {formData.shippingAddress.city}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  align="left"
                  fontSize={14}
                >
                  {formData.shippingAddress.country}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: isSmallScreen ? "pointer" : "",
                  }}
                  variant="subtitle2"
                  gutterBottom
                  onClick={isSmallScreen ? handleBillingAddressToggle : null}
                >
                  Billing address{" "}
                  {isSmallScreen ? (
                    billingAddressOpen ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )
                  ) : (
                    ""
                  )}
                </Typography>
                <Collapse in={billingAddressOpen}>
                  <Typography
                    variant="body2"
                    gutterBottom
                    align="left"
                    fontSize={14}
                  >
                    {formData.billingAddress.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    align="left"
                    fontSize={14}
                  >
                    {formData.billingAddress.company}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    align="left"
                    fontSize={14}
                  >
                    {formData.billingAddress.street}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    align="left"
                    fontSize={14}
                  >
                    {formData.billingAddress.postalCode},{" "}
                    {formData.billingAddress.city}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    align="left"
                    fontSize={14}
                  >
                    {formData.billingAddress.country}
                  </Typography>
                </Collapse>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Shipping method
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  align="left"
                  fontSize={14}
                >
                  {formData.shippingMethod === "standard"
                    ? "Standard (1-5 business days)"
                    : "Home Delivery (1-3 Business days)"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ margin: ".8em 0" }} />
      <Typography variant="body2" gutterBottom align="left" fontSize={14}>
        You will receive a confirmation email with your order shortly.
      </Typography>
    </Paper>
  );
};

export default OrderDetails;
