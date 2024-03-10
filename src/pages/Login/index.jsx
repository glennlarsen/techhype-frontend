import React, { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Dna } from "react-loader-spinner";
import AuthContext from "utils/AuthContext";

import { Paper } from "@mui/material";

import Layout from "components/Layout";
import { LangContext } from "context/LangContext";
import loginSchema from "formValidationSchemas/loginSchema";
import registrationSchema from "formValidationSchemas/registrationSchema";
import forgotPasswordSchema from "formValidationSchemas/forgotPasswordSchema";
import LoginForm from "components/LoginForm";
import RegistrationForm from "components/RegistrationForm";
import ForgotPasswordForm from "components/ForgotPasswordForm";
import AlertMessage from "components/forms/AlertMessage";

import useApi from "utils/useApi";


const Login = ({ toggleDrawer}) => {
  const [lang] = useContext(LangContext);
  const [formMode, setFormMode] = useState("login");
  const [pageTitle, setPageTitle] = useState("Login");
  const [metaDescription, setMetaDescription] = useState(
    "Login to your Techhype account"
  );
  const [loading, setLoading] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [registrationMessage, setRegistrationMessage] = useState(null); // Add this state variable
  const navigate = useNavigate();
  const { post } = useApi(); // Destructure the post function for making POST requests
  const [, setAuth] = useContext(AuthContext);

  function getSchemaForFormMode(formMode) {
    switch (formMode) {
      case "login":
        return loginSchema;
      case "register":
        return registrationSchema;
      case "forgotPassword":
        return forgotPasswordSchema;
      default:
        return loginSchema;
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(getSchemaForFormMode(formMode)),
  });

  const onLoginSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await post("/auth/login", data); // Assuming this is your login endpoint
      console.log("response login: ", response);
      if (response.data.token) {
        // Successful login, handle the token and navigate
        // Store the token in local storage
        setAuth(response.data.token);

        // You can also store user-related information in local storage if needed
        /*         UseLocalStorage("user", JSON.stringify(response.data)); */
        navigate("/dashboard");
        setLoading(false);
      } else {
        // Handle login errors
        console.log("Login failed:", response);
        setRegistrationStatus("fail");
        setRegistrationMessage("Login failed, Incorrect email or password");
        setLoading(false);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Login error:", error);
      setLoading(false);
    }
  };

  const onRegistrationSubmit = async (data) => {
    try {
      setLoading(true);
      // Split the full name into firstName and lastName
      const nameParts = data.name.split(" ");
      const formData = {
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(" "), // Join remaining parts as the last name
        email: data.email,
        password: data.password,
      };
      const response = await post("/auth/signup", formData); // signup endpoint
      console.log("response register: ", response);
      if (response.status === "success") {
        // Registration was successful, set the message
        setRegistrationStatus("success");
        setRegistrationMessage(
          "Registration successful. Please check your email for verification instructions."
        );
        reset(); //reset form fields
        setLoading(false);
        // Handle the redirect after successful email verification
        if (response.data.redirect) {
          navigate(response.data.redirect);
        }
      } else if (
        response.status === "fail" &&
        response.data.email === "Provided email is already in use."
      ) {
        // Handle the case where the email is already registered
        setRegistrationStatus("fail");
        setRegistrationMessage(
          "Email is already registered. Please login instead."
        );
        setLoading(false);
      } else {
        // Handle registration errors
        console.log("Registration failed:", response.data);
        setRegistrationStatus("fail");
        setRegistrationMessage("registration failed, check log for error.");
        setLoading(false);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Registration error:", error);
      setRegistrationStatus("fail");
      setRegistrationMessage(error.errors.join(" "));
      setLoading(false);
    }
  };

  const onForgotPasswordSubmit = (data) => {
    console.log(data); // Handle forgot password logic here
  };

  // Function to toggle the form mode
  const toggleFormMode = (mode) => {
    setFormMode(mode);
    reset();
    setRegistrationMessage(null); // Reset the registrationMessage

    // Update the page title based on the form mode
    if (mode === "login") {
      setPageTitle("Login");
      setMetaDescription("Login to your Techhype account");
    } else if (mode === "register") {
      setPageTitle("Registration");
      setMetaDescription("Register for a Techhype account");
    } else if (mode === "forgotPassword") {
      setPageTitle("Forgot Password");
      setMetaDescription("Reset your password");
    }
  };

  // Define the forms for each mode
  const forms = {
    login: (
      <LoginForm
        control={control}
        errors={errors}
        lang={lang}
        onSubmit={handleSubmit(onLoginSubmit)}
        onForgotPassword={() => toggleFormMode("forgotPassword")}
        onSignUp={() => toggleFormMode("register")}
        schema={getSchemaForFormMode("login")}
      />
    ),
    register: (
      <RegistrationForm
        control={control}
        errors={errors}
        lang={lang}
        onSubmit={handleSubmit(onRegistrationSubmit)}
        onLogin={() => toggleFormMode("login")}
        schema={getSchemaForFormMode("register")}
      />
    ),
    forgotPassword: (
      <ForgotPasswordForm
        control={control}
        errors={errors}
        lang={lang}
        onSubmit={handleSubmit(onForgotPasswordSubmit)}
        onLogin={() => toggleFormMode("login")}
        schema={getSchemaForFormMode("forgotPassword")}
      />
    ),
  };

  return (
    <Layout page={pageTitle} description={metaDescription} toggleDrawer={toggleDrawer}>
      <section className="login top-overlay">
        <div className="container-inner login-container">
          <Paper
            elevation={3}
            sx={{ maxWidth: "500px", margin: "2em auto", borderRadius: "10px" }}
          >
            {loading ? ( // Show loader when loading is true
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Dna visible={true} height={80} width={80} />
              </div>
            ) : (
              forms[formMode]
            )}
            {registrationMessage && (
              <AlertMessage
                variant={
                  registrationStatus === "success" ? "success" : "warning"
                }
                title={
                  registrationStatus === "success"
                    ? "success!"
                    : "Something went wrong"
                }
                message={registrationMessage}
              />
            )}
          </Paper>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
