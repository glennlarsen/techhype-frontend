import React from "react";
import { Link } from "react-router-dom";
import { Button } from "techhype-components";
import { Box } from "@mui/material";
import AppTheme from "components/forms/AppTheme";
import EmailFormField from "components/forms/EmailFormField";
import PasswordFormField from "components/forms/PasswordFormField";
import SocialMediaLogin from "components/SocialMediaLogin";
import { content } from "constants/content";

const LoginForm = ({
  control,
  errors,
  lang,
  onSubmit,
  onForgotPassword,
  onSignUp,
}) => {
  return (
    <Box p={4}>
      <h1 style={{ margin: ".1em" }}>{content[lang]["loginHeading"]}</h1>
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
          <EmailFormField control={control} errors={errors} lang={lang} />
          <PasswordFormField control={control} errors={errors} lang={lang} />
        </AppTheme>
        <Button type="submit">{content[lang]["loginButton"]}</Button>
        <Box>
          <Link
            to=""
            className="forgot-password-link"
            style={{
              textDecoration: "none",
              color: "black",
            }}
            onClick={onForgotPassword}
          >
            {content[lang]["forgotPassword"]}
          </Link>
        </Box>
        <Box>
          <Box mb={3} sx={{ fontWeight: "bold" }}>
            {content[lang]["loginOr"]}
          </Box>
          <SocialMediaLogin lang={lang} />
          <Box mt={2}>
            {content[lang]["dontHaveAnAccount"]}{" "}
            <Link
              to=""
              className="forgot-password-link"
              style={{
                textDecoration: "none",
                color: "black",
              }}
              onClick={onSignUp}
            >
              {content[lang]["signUp"]}
            </Link>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
