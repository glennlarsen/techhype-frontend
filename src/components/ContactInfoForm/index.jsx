import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  Input,
  InputAdornment,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import PhoneInput from "components/forms/PhoneInput";
import { content } from "constants/content";

const ContactInfoForm = ({ control, errors, lang, contactInfo }) => {
  return (
    <>
      <FormControl variant="standard">
        <InputLabel htmlFor="email" error={Boolean(errors.email)}>
          {content[lang]["checkoutEmail"]}
        </InputLabel>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <>
              <Input
                id="email"
                type="email"
                placeholder={content[lang]["checkoutEmailPlaceholder"]}
                {...field}
                endAdornment={
                  errors.email ? (
                    <InputAdornment position="end">
                      <ErrorRoundedIcon color="error" />
                    </InputAdornment>
                  ) : null
                }
              />
              <FormHelperText error>
                {errors.email ? errors.email.message : ""}
              </FormHelperText>
            </>
          )}
        />
      </FormControl>

      <PhoneInput
        control={control}
        errors={errors}
        defaultCountryCode="NO"
        defaultValue={contactInfo.tel}
        phoneLabel={content[lang]["checkoutPhone"]}
        placeholder={content[lang]["checkoutPhonePlaceholder"]}
      />
    </>
  );
};

export default ContactInfoForm;
