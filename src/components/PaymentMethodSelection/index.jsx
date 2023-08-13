import React from "react";
import { Controller } from "react-hook-form";
import {
  Paper,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Collapse,
  Divider,
  FormControl,
  InputAdornment,
  FormHelperText,
  Stack,
} from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import ExpirationDateInput from "components/forms/ExpirationDateInput";
import SecurityCodeInput from "components/forms/securityCodeInput";
import FormTextField from "components/forms/FormTextField";
import CreditCardInput from "components/forms/CreditCardInput";
import { color_error } from "constants/colors";
import Visa from "images/Visa.png";
import MasterCard from "images/MasterCard.png";
import vippsLogo from "images/vipps_logo.png";

const PaymentMethodSelection = ({
  creditCard,
  handlePaymentChange,
  vipps,
  content,
  lang,
  isMobile,
  errors,
  control,
  register,
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
      {/* Credit Card */}
      <FormControlLabel
        control={
          <>
            <Radio
              checked={creditCard}
              onChange={handlePaymentChange}
              value="creditCard"
              name="radio-buttons"
              size="small"
              sx={{ paddingLeft: 0 }}
              inputProps={{ "aria-label": "Same as shipping address" }}
            />
            <Typography
              variant="body2"
              sx={{ fontWeight: "500", fontSize: ".8rem", marginRight: "auto" }}
            >
              {content[lang]["paymentOption1"]}
            </Typography>
          </>
        }
        label={
          <Box sx={{ marginLeft: "auto", display: "flex", gap: ".3em" }}>
            <img
              src={Visa}
              style={{ width: "40px", height: "25px" }}
              alt="Visa logo"
            />
            <img
              src={MasterCard}
              style={{ width: "40px", height: "25px" }}
              alt="Mastercard logo"
            />
          </Box>
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
      <Collapse in={creditCard}>
        <Divider />
        <Stack
          spacing={3}
          padding={2}
          sx={{ backgroundColor: "#fcfbfb", paddingBottom: "2em" }}
        >
          {/* Payment form */}
          <Controller
            name="cardNumber"
            control={control}
            render={({ field }) => (
              <CreditCardInput
                label={content[lang]["paymentCardNumberLabel"]}
                value={field.value}
                onChange={field.onChange}
                error={Boolean(errors.cardNumber)}
              />
            )}
          />
          <FormControl variant="outlined" error={Boolean(errors.cardName)}>
            <FormTextField
              sx={{ background: "white" }}
              label={content[lang]["paymentNameOnCardLabel"]}
              id="cardName"
              name="cardName"
              error={Boolean(errors.cardName)}
              {...register("cardName")} // Use register to link the input to validation schema
              InputLabelProps={{
                style: { fontSize: 14 }, // Adjust the fontSize for the label
              }}
              inputProps={{
                style: { fontSize: 14 }, // Adjust the fontSize for the input text
              }}
              InputProps={{
                endAdornment: errors.cardName ? (
                  <InputAdornment position="end">
                    <ErrorRoundedIcon color="error" />
                  </InputAdornment>
                ) : null,
                style: {
                  borderColor: errors.cardName ? color_error : "inherit", // Set underline color to red on error
                },
              }}
              variant="outlined"
            />
            {/* Display the name error message if there is one */}
            {errors.cardName && (
              <FormHelperText>{errors.cardName.message}</FormHelperText>
            )}
          </FormControl>

          <Box gap={2} display="flex">
            <Controller
              fullWidth
              name="exp"
              control={control}
              error={Boolean(errors.exp)}
              render={({ field }) => (
                <ExpirationDateInput
                  value={field.value}
                  onChange={field.onChange}
                  label={
                    isMobile
                      ? content[lang]["paymentExpiryDateLabelShort"]
                      : content[lang]["paymentExpiryDateLabelLong"]
                  }
                  error={Boolean(errors.exp)}
                />
              )}
            />
            <Controller
              fullWidth
              name="security"
              control={control}
              error={Boolean(errors.security)}
              render={({ field }) => (
                <SecurityCodeInput
                  value={field.value}
                  onChange={field.onChange}
                  label={content[lang]["paymentCVCCodeLabel"]}
                  error={Boolean(errors.security)}
                />
              )}
            />
          </Box>
        </Stack>
      </Collapse>

      {/* Vipps */}
      <Divider />
      <FormControlLabel
        control={
          <Radio
            checked={vipps}
            onChange={handlePaymentChange}
            value="vipps"
            size="small"
            name="radio-buttons"
            sx={{ paddingLeft: 0 }}
            inputProps={{ "aria-label": "Same as shipping address" }}
          />
        }
        label={
          <img style={{ width: "60px" }} src={vippsLogo} alt="Vipps Logo" />
        }
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          alignItems: "baseline",
          gap: ".5em",
          padding: ".5em 1em",
          margin: 0,
        }}
      />
    </Paper>
  );
};

export default PaymentMethodSelection;
