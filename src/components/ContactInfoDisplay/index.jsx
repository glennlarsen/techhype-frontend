import React from "react";
import { Paper, Typography, Box, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { content } from "constants/content";

const ContactInfoDisplay = ({ formData, lang }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        justifyContent: "space-between",
        width: "100%",
        padding: "1em",
        borderRadius: "10px",
        marginBottom: "1em",
      }}
    >
      {/* Contact Info */}
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
          <Typography sx={{ opacity: 0.8 }} variant="caption" gutterBottom>
            {content[lang]["paymentContact"]}
          </Typography>
          <Typography variant="body2">
            {formData.contactInfo.email} | {formData.contactInfo.tel}
          </Typography>
        </Box>
        <RouterLink to="/checkout" className="payment-change">
          {content[lang]["changeInfo"]}
        </RouterLink>
      </Box>
      <Divider sx={{ margin: ".8em 0" }} />
      {/* Shipping Address */}
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
          <Typography sx={{ opacity: 0.8 }} variant="caption" gutterBottom>
            {content[lang]["paymentShipTo"]}
          </Typography>
          <Typography variant="body2">
            {`${formData.shippingAddress.street}, ${formData.shippingAddress.postalCode} ${formData.shippingAddress.city}, ${formData.shippingAddress.country}`}
          </Typography>
        </Box>
        <RouterLink to="/checkout" className="payment-change">
          {content[lang]["changeInfo"]}
        </RouterLink>
      </Box>
    </Paper>
  );
};

export default ContactInfoDisplay;
