import React from "react";
import { Controller } from "react-hook-form";
import FormTextField from "components/forms/FormTextField";
import { FormControl, FormHelperText } from "@mui/material";
import { content } from "constants/content";

const EmailFormField = ({ control, errors, lang }) => {
  return (
    <FormControl variant="standard">
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div>
            <FormTextField
              {...field}
              label={content[lang]["userEmail"]}
              variant="standard"
              fullWidth
              error={!!errors.email}
            />
            <FormHelperText error>
              {errors.email ? errors.email.message : ""}
            </FormHelperText>
          </div>
        )}
      />
    </FormControl>
  );
};

export default EmailFormField;
