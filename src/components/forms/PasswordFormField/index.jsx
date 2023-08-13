import React, { useState } from "react";
import { Controller } from "react-hook-form";
import FormTextField from "components/forms/FormTextField";
import { FormControl, FormHelperText, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { content } from "constants/content";

const PasswordFormField = ({ control, errors, lang }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFieldEmpty, setIsPasswordFieldEmpty] = useState(true);

  return (
    <FormControl variant="standard">
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div style={{ position: "relative" }}>
            <FormTextField
              {...field}
              type={showPassword ? "text" : "password"}
              label={content[lang]["password"]}
              variant="standard"
              fullWidth
              error={!!errors.password}
              onBlur={(e) => setIsPasswordFieldEmpty(e.target.value === "")}
              InputProps={{
                endAdornment: (
                  <IconButton
                    edge="end"
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    size="small"
                    style={{
                      visibility: isPasswordFieldEmpty ? "hidden" : "visible",
                    }}
                  >
                    {showPassword ? (
                      <VisibilityOff style={{ fontSize: "1.3rem" }} />
                    ) : (
                      <Visibility style={{ fontSize: "1.3rem" }} />
                    )}
                  </IconButton>
                ),
              }}
            />
            <FormHelperText error>
              {errors.password ? errors.password.message : ""}
            </FormHelperText>
          </div>
        )}
      />
    </FormControl>
  );
};

export default PasswordFormField;
