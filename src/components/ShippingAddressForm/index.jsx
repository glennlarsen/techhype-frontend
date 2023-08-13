import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  Input,
  InputAdornment,
  FormHelperText,
  InputLabel,
  Box,
} from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { content } from "constants/content";
import CountryInput from "components/forms/CountryInput";

const ShippingAddressForm = ({ control, errors, lang, shippingAddress }) => {
  const [defaultCountry] = useState("Norway");

  return (
    <>
      <CountryInput
        control={control}
        errors={errors}
        defaultValue={shippingAddress.country || defaultCountry}
        countryLabel={content[lang]["checkoutCountry"]}
      />
      <FormControl variant="standard">
        <InputLabel htmlFor="name" error={Boolean(errors.name)}>
          {content[lang]["checkoutName"]}
        </InputLabel>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <>
              <Input
                id="name"
                type="text"
                {...field}
                endAdornment={
                  errors.name ? (
                    <InputAdornment position="end">
                      <ErrorRoundedIcon color="error" />
                    </InputAdornment>
                  ) : null
                }
              />
              <FormHelperText error>
                {errors.name ? errors.name.message : ""}
              </FormHelperText>
            </>
          )}
        />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="company" error={Boolean(errors.company)}>
          {content[lang]["checkoutCompany"]}
        </InputLabel>
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <>
              <Input
                id="company"
                type="company"
                {...field}
                endAdornment={
                  errors.company ? (
                    <InputAdornment position="end">
                      <ErrorRoundedIcon color="error" />
                    </InputAdornment>
                  ) : null
                }
              />
              <FormHelperText error>
                {errors.company ? errors.company.message : ""}
              </FormHelperText>
            </>
          )}
        />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="street" error={Boolean(errors.street)}>
          {content[lang]["checkoutStreet"]}
        </InputLabel>
        <Controller
          name="street"
          control={control}
          render={({ field }) => (
            <>
              <Input
                id="street"
                type="street"
                {...field}
                endAdornment={
                  errors.street ? (
                    <InputAdornment position="end">
                      <ErrorRoundedIcon color="error" />
                    </InputAdornment>
                  ) : null
                }
              />
              <FormHelperText error>
                {errors.street ? errors.street.message : ""}
              </FormHelperText>
            </>
          )}
        />
      </FormControl>
      <Box gap={2} display="flex">
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="postalCode" error={Boolean(errors.postalCode)}>
            {content[lang]["checkoutPostal"]}
          </InputLabel>
          <Controller
            name="postalCode"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  id="postalCode"
                  type="postalCode"
                  {...field}
                  endAdornment={
                    errors.postalCode ? (
                      <InputAdornment position="end">
                        <ErrorRoundedIcon color="error" />
                      </InputAdornment>
                    ) : null
                  }
                />
                <FormHelperText error>
                  {errors.postalCode ? errors.postalCode.message : ""}
                </FormHelperText>
              </>
            )}
          />
        </FormControl>
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="city" error={Boolean(errors.city)}>
            {content[lang]["checkoutCity"]}
          </InputLabel>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  id="city"
                  type="city"
                  {...field}
                  endAdornment={
                    errors.city ? (
                      <InputAdornment position="end">
                        <ErrorRoundedIcon color="error" />
                      </InputAdornment>
                    ) : null
                  }
                />
                <FormHelperText error>
                  {errors.city ? errors.city.message : ""}
                </FormHelperText>
              </>
            )}
          />
        </FormControl>
      </Box>
    </>
  );
};

export default ShippingAddressForm;
