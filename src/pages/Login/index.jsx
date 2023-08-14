import React, { useContext, useState } from "react";
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
import LoginForm from "components/LoginForm";
import RegistrationForm from "components/RegistrationForm";
import ForgotPasswordForm from "components/ForgotPasswordForm";

const Login = () => {
  const [lang] = useContext(LangContext);
  const [formMode, setFormMode] = useState("login");

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

  const onRegistrationSubmit = (data) => {
    console.log(data); // Handle registration logic here
  };

  const onForgotPasswordSubmit = (data) => {
    console.log(data); // Handle forgot password logic here
  };

  // Function to toggle the form mode
  const toggleFormMode = (mode) => {
    setFormMode(mode);
  };

  // Define the forms for each mode
  const forms = {
    login: (
      <LoginForm
        control={control}
        errors={errors}
        lang={lang}
        onSubmit={handleSubmit(onSubmit)}
        onForgotPassword={() => toggleFormMode("forgotPassword")}
        onSignUp={() => toggleFormMode("register")}
      />
    ),
    register: (
      <RegistrationForm
        control={control}
        errors={errors}
        lang={lang}
        onSubmit={onRegistrationSubmit}
        onLogin={() => toggleFormMode("login")}
      />
    ),
    forgotPassword: (
      <ForgotPasswordForm
        control={control}
        errors={errors}
        lang={lang}
        onSubmit={onForgotPasswordSubmit}
        onLogin={() => toggleFormMode("login")}
      />
    ),
  };

  return (
    <Layout page="Login" description="Login to your Techhype account">
      <section className="login top-overlay">
        <div className="container-inner login-container">
          <Paper
            elevation={3}
            sx={{ maxWidth: "500px", margin: "2em auto", borderRadius: "10px" }}
          >
              {forms[formMode]} {/* Render the appropriate form */}
          </Paper>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
