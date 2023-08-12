import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  Collapse,
  Divider,
  Stack,
  Box,
  Paper,
  FormControlLabel,
  Typography,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

import { color_error } from "constants/colors";
import FormTextField from "components/forms/FormTextField";
import CountryInput from "components/forms/CountryInput";
import { content } from "constants/content";

const BillingAddressForm = ({
  control,
  errors,
  lang,
  register,
  formData,
  differentBillingAddress,
  setDifferentBillingAddress,
}) => {
  const [billingAddressSelected, setBillingAddressSelected] = useState(
    formData.differentBillingAddress || false
  );

  const handleBillingAddressChange = (event) => {
    setDifferentBillingAddress(event.target.value === "true");
    setBillingAddressSelected(event.target.value === "true");
  };
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
      <FormControlLabel
        control={
          <Radio
            checked={!differentBillingAddress}
            onChange={handleBillingAddressChange}
            value={false}
            name="radio-buttons"
            size="small"
            sx={{ paddingLeft: 0 }}
            inputProps={{
              "aria-label": "Same as shipping address",
            }}
          />
        }
        label={
          <Typography
            variant="body2"
            sx={{ fontWeight: "500", fontSize: ".8rem" }}
          >
            {content[lang]["billingOption1"]}
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
      <FormControlLabel
        control={
          <Radio
            checked={differentBillingAddress}
            onChange={handleBillingAddressChange}
            value={true}
            name="radio-buttons"
            size="small"
            sx={{ paddingLeft: 0 }}
            inputProps={{
              "aria-label": "Same as shipping address",
            }}
          />
        }
        label={
          <Typography
            variant="body2"
            sx={{ fontWeight: "500", fontSize: ".8rem" }}
          >
            {content[lang]["billingOption2"]}
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
      <Collapse in={billingAddressSelected}>
        <Divider />
        <Stack
          spacing={3}
          padding={2}
          sx={{
            backgroundColor: "#fcfbfb",
            paddingBottom: "2em",
          }}
        >
          {/* Billing Address form */}
          <CountryInput
            control={control}
            errors={errors}
            defaultValue={formData.shippingAddress.country}
            countryLabel={content[lang]["checkoutCountry"]}
            variant="outlined"
            fontSize={14}
            inputBackgroundColor="white"
          />
          <FormControl variant="outlined" error={Boolean(errors.name)}>
            <FormTextField
              sx={{ backgroundColor: "white" }}
              label={content[lang]["checkoutName"]}
              id="name"
              name="name"
              error={Boolean(errors.name)}
              {...register("name")} // Use register to link the input to validation schema
              InputLabelProps={{
                style: { fontSize: 14 }, // Adjust the fontSize for the label
              }}
              inputProps={{
                style: { fontSize: 14 }, // Adjust the fontSize for the input text
              }}
              InputProps={{
                endAdornment: errors.name ? (
                  <InputAdornment position="end">
                    <ErrorRoundedIcon color="error" />
                  </InputAdornment>
                ) : null,
                style: {
                  borderColor: errors.name ? color_error : "inherit", // Set underline color to red on error
                },
              }}
              variant="outlined"
            />
            {/* Display the name error message if there is one */}
            {errors.name && (
              <FormHelperText>{errors.name.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl variant="outlined" error={Boolean(errors.company)}>
            <FormTextField
              sx={{ backgroundColor: "white" }}
              label={content[lang]["checkoutCompany"]}
              id="company"
              name="company"
              error={Boolean(errors.company)}
              {...register("company")} // Use register to link the input to validation schema
              InputLabelProps={{
                style: { fontSize: 14 }, // Adjust the fontSize for the label
              }}
              inputProps={{
                style: { fontSize: 14 }, // Adjust the fontSize for the input text
              }}
              InputProps={{
                endAdornment: errors.company ? (
                  <InputAdornment position="end">
                    <ErrorRoundedIcon color="error" />
                  </InputAdornment>
                ) : null,
                style: {
                  borderColor: errors.company ? color_error : "inherit", // Set underline color to red on error
                },
              }}
              variant="outlined"
            />
            {/* Display the name error message if there is one */}
            {errors.company && (
              <FormHelperText>{errors.company.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl variant="outlined" error={Boolean(errors.street)}>
            <FormTextField
              sx={{ backgroundColor: "white" }}
              label={content[lang]["checkoutStreet"]}
              id="street"
              name="street"
              error={Boolean(errors.street)}
              {...register("street")} // Use register to link the input to validation schema
              InputLabelProps={{
                style: { fontSize: 14 }, // Adjust the fontSize for the label
              }}
              inputProps={{
                style: { fontSize: 14 }, // Adjust the fontSize for the input text
              }}
              InputProps={{
                endAdornment: errors.street ? (
                  <InputAdornment position="end">
                    <ErrorRoundedIcon color="error" />
                  </InputAdornment>
                ) : null,
                style: {
                  borderColor: errors.street ? color_error : "inherit", // Set underline color to red on error
                },
              }}
              variant="outlined"
            />
            {/* Display the name error message if there is one */}
            {errors.street && (
              <FormHelperText>{errors.street.message}</FormHelperText>
            )}
          </FormControl>
          <Box gap={2} display="flex">
            <FormControl
              variant="outlined"
              error={Boolean(errors.postalCode)}
              fullWidth
            >
              <FormTextField
                sx={{ backgroundColor: "white" }}
                label={content[lang]["checkoutPostal"]}
                id="postalCode"
                name="postalCode"
                error={Boolean(errors.postalCode)}
                {...register("postalCode")} // Use register to link the input to validation schema
                InputLabelProps={{
                  style: { fontSize: 14 }, // Adjust the fontSize for the label
                }}
                inputProps={{
                  style: { fontSize: 14 }, // Adjust the fontSize for the input text
                }}
                InputProps={{
                  endAdornment: errors.postalCode ? (
                    <InputAdornment position="end">
                      <ErrorRoundedIcon color="error" />
                    </InputAdornment>
                  ) : null,
                  style: {
                    borderColor: errors.postalCode ? color_error : "inherit", // Set underline color to red on error
                  },
                }}
                variant="outlined"
              />
              {/* Display the name error message if there is one */}
              {errors.postalCode && (
                <FormHelperText>{errors.postalCode.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              variant="outlined"
              error={Boolean(errors.city)}
              fullWidth
            >
              <FormTextField
                sx={{ backgroundColor: "white" }}
                label={content[lang]["checkoutCity"]}
                id="city"
                name="city"
                error={Boolean(errors.city)}
                {...register("city")} // Use register to link the input to validation schema
                InputLabelProps={{
                  style: { fontSize: 14 }, // Adjust the fontSize for the label
                }}
                inputProps={{
                  style: { fontSize: 14 }, // Adjust the fontSize for the input text
                }}
                InputProps={{
                  endAdornment: errors.city ? (
                    <InputAdornment position="end">
                      <ErrorRoundedIcon color="error" />
                    </InputAdornment>
                  ) : null,
                  style: {
                    borderColor: errors.city ? color_error : "inherit", // Set underline color to red on error
                  },
                }}
                variant="outlined"
              />
              {/* Display the name error message if there is one */}
              {errors.city && (
                <FormHelperText>{errors.city.message}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </Stack>
      </Collapse>
    </Paper>
  );
};

export default BillingAddressForm;
