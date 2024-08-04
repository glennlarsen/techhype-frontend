import React, { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Dna } from "react-loader-spinner";

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
import { useUser } from "utils/UserContext";


const Login = ({ toggleDrawer }) => {
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
  const { updateUser, fetchUserData  } = useUser();


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
        console.log("response status: ", response);
        // Ensure response is received and parse JSON to access internal status
        if (response.status === "success") {
            // Successful login, handle the token and navigate
            localStorage.setItem('token', response.data.token);
            await fetchUserData();
            navigate("/dashboard");
        } else {
            // Handle login errors based on API response
            const errorMessage = response.data?.message || "Login failed, Incorrect email or password";
            console.log("Login failed:", errorMessage);
            setRegistrationStatus("fail");
            setRegistrationMessage(errorMessage);
        }
        setLoading(false);
    } catch (error) {
        // Handle network errors or other exceptions
        console.error("Login error:", error);
        setLoading(false);
        setRegistrationStatus("fail");
        setRegistrationMessage("Network error or server is unreachable.");
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
      const response = await post("/auth/signup", formData); // sign-up endpoint
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

  const onForgotPasswordSubmit = async (data) => {
    setLoading(true); // Show loading indicator
    try {
      // Send the forgot password request
      const response = await post("/auth/forgotpassword", data);
      console.log("Forgot Password Response: ", response);
  
      if (response.status === "success") {
        // If successful, show a success message
        setRegistrationStatus("success");
        setRegistrationMessage(
          "A password reset link has been sent to your email. Please check your inbox."
        );
      } else {
        // Handle any errors returned by the server
        const errorMessage = response.data?.message || "An error occurred. Please try again.";
        console.log("Forgot Password failed:", errorMessage);
        setRegistrationStatus("fail");
        setRegistrationMessage(errorMessage);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Forgot Password error:", error);
      setRegistrationStatus("fail");
      setRegistrationMessage("Network error or server is unreachable.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
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
    <Layout
      page={pageTitle}
      description={metaDescription}
      toggleDrawer={toggleDrawer}
    >
      <section className="login top-overlay">
        <div className="container-inner login-container">
          <Paper
            elevation={3}
            sx={{ maxWidth: "550px", margin: "2em auto", borderRadius: "10px" }}
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
