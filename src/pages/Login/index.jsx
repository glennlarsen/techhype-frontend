import React, { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Box, Paper } from "@mui/material";

import Layout from "components/Layout";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { Button } from "techhype-components";
import AppTheme from "components/forms/AppTheme";
import loginSchema from "formValidationSchemas/loginSchema";
import EmailFormField from "components/forms/EmailFormField";
import PasswordFormField from "components/forms/PasswordFormField";
import SocialMediaLogin from "components/SocialMediaLogin";

const Login = () => {
  const [lang] = useContext(LangContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data); // Handle login logic here
  };

  return (
    <Layout page="Login" description="Login to your Techhype account">
      <section className="login top-overlay">
        <div className="container-inner login-container">
          <Paper
            elevation={3}
            sx={{ maxWidth: "500px", margin: "2em auto", borderRadius: "10px" }}
          >
            <Box p={4}>
              <h1 style={{ margin: ".1em" }}>
                {content[lang]["loginHeading"]}
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                style={{
                  display: "flex",
                  gap: "1.5em",
                  flexDirection: "column",
                  borderRadius: "10px",
                }}
              >
                <AppTheme>
                  <EmailFormField
                    control={control}
                    errors={errors}
                    lang={lang}
                  />
                  <PasswordFormField
                    control={control}
                    errors={errors}
                    lang={lang}
                  />
                </AppTheme>
                <Button type="submit">{content[lang]["loginButton"]}</Button>
              </form>
              <Box mt={2}>
                <Link
                  to=""
                  className="forgot-password-link"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  {content[lang]["forgotPassword"]}
                </Link>
              </Box>
              <Box my={2}>
                <Box mb={2} sx={{ fontWeight: "bold" }}>
                  {content[lang]["loginOr"]}
                </Box>
                <SocialMediaLogin lang={lang} />
                <Box mt={2}>
                  Don't have an account?{" "}
                  <Link
                    to=""
                    className="forgot-password-link"
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    Sign up
                  </Link>
                </Box>
              </Box>
            </Box>
          </Paper>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
