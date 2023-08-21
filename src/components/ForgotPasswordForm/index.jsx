import React from "react";
import { Link } from "react-router-dom";
import { Button } from "techhype-components";
import { Box } from "@mui/material";
import EmailFormField from "components/forms/EmailFormField";
import { content } from "constants/content";

const ForgotPasswordForm = ({ control, errors, lang, onSubmit, onLogin }) => {
  return (
    <Box p={4}>
      <h1 style={{ margin: ".1em" }}>
        {content[lang]["forgotPasswordHeader"]}
      </h1>
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
        <EmailFormField control={control} errors={errors} lang={lang} />
        <Button type="submit">{content[lang]["resetPasswordButton"]}</Button>
        <Box>
          <Link
            to=""
            className="forgot-password-link"
            style={{
              textDecoration: "none",
              color: "black",
            }}
            onClick={onLogin}
          >
            {content[lang]["backToLoginLink"]}
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default ForgotPasswordForm;
