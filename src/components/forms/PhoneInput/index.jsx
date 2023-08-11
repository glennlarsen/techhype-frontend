import React, { useContext } from "react";
import { MuiTelInput } from "mui-tel-input";
import { styled } from "@mui/material/styles";
import { Controller } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { color_primary } from "constants/colors";

const MuiTelInputStyled = styled(MuiTelInput)({
  "& label.Mui-focused": {
    color: color_primary,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: color_primary,
  },
});

const PhoneInput = ({
  control,
  errors,
  defaultValue,
  onClick,
  defaultCountryCode,
  placeholder,
}) => {
  const [lang] = useContext(LangContext);

  return (
    <Controller
      name="tel"
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => (
        <div className="custom-phone-input">
          <MuiTelInputStyled
            {...field}
            defaultCountry={defaultCountryCode}
            forceCallingCode
            id="tel"
            onClick={onClick}
            placeholder={placeholder}
            fullWidth
            focusOnSelectCountry
            preferredCountries={[
              "NO",
              "SE",
              "DK",
              "DE",
              "US",
              "GB",
              "ES",
              "FR",
              "NL",
              "AU",
              "FI",
              "PL",
            ]}
            variant="standard"
            label={content[lang]["phoneInputLabel"]}
            error={Boolean(errors.tel)}
            helperText={errors.tel ? content[lang]["phoneInputError"] : ""}
            InputProps={
              errors.tel
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <ErrorRoundedIcon color="error" />
                      </InputAdornment>
                    ),
                  }
                : null
            }
          />
        </div>
      )}
    />
  );
};

export default PhoneInput;
