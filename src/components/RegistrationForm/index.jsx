import React from "react";
import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import { Button } from "techhype-components";
import {
  FormControl,
  Input,
  InputAdornment,
  FormHelperText,
  InputLabel,
  Box,
} from "@mui/material";
import AppTheme from "components/forms/AppTheme";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import EmailFormField from "components/forms/EmailFormField";
import PasswordFormField from "components/forms/PasswordFormField";
import { content } from "constants/content";
import FormTextField from "components/forms/FormTextField";

const RegistrationForm = ({ control, errors, lang, onSubmit, onLogin }) => {
  return (
    <Box p={4}>
      <h1 style={{ margin: ".1em" }}>Register</h1>
      <form
        onSubmit={onSubmit}
        noValidate
        style={{
          display: "flex",
          gap: "1.5em",
          flexDirection: "column",
          borderRadius: "10px",
        }}
      >
        <AppTheme>
          <FormControl variant="standard">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <>
                  <FormTextField
                    label="Name"
                    variant="standard"
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
          <EmailFormField control={control} errors={errors} lang={lang} />
          <PasswordFormField control={control} errors={errors} lang={lang} />
        </AppTheme>
        <Button type="submit">Register</Button>
        <Box>
          Already have an account?{" "}
          <Link
            to=""
            className="forgot-password-link"
            style={{
              textDecoration: "none",
              color: "black",
            }}
            onClick={onLogin}
          >
            log in
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default RegistrationForm;
