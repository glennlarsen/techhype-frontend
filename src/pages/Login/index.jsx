import React, { useContext, useState } from "react";
import Layout from "components/Layout";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import Logo from "logo/logo-no-text.png";

import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  TextField,
  Container,
  Box,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Paper,
  InputLabel,
  Button as MuiButton,
} from "@mui/material";
import { Facebook, Google } from "@mui/icons-material";
import { Button } from "techhype-components";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const Login = () => {
  const [lang] = useContext(LangContext);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle login logic here
  };

  // Custom style for the Login with Google button
  const loginWithGoogleStyle = {
    backgroundColor: "#db4437", // Replace this with the desired Google color code
    color: "white",
  };

  return (
    <Layout page="Login" description="Login to your Techhype account">
      <section className="login top-overlay">
        <div className="container-inner login-container">
          <Paper elevation={3} sx={{ maxWidth: "500px", margin: "2em auto" }}>
            <h1 style={{ margin: "0px" }}>{content[lang]["loginHeading"]}</h1>
            <Box p={4}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  display: "flex",
                  gap: "1.5em",
                  flexDirection: "column",
                }}
              >
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <div>
                      <TextField
                        {...field}
                        label={content[lang]["userEmail"]}
                        variant="standard"
                        fullWidth
                        error={!!errors.email}
                        sx={{
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#54d4c6", // Replace "your-focus-color" with your desired color
                          },
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "#54d4c6", // Replace "your-focus-color" with your desired color
                          },
                        }}
                      />
                      {errors.email && (
                        <InputLabel error>{errors.email.message}</InputLabel>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <div style={{ position: "relative" }}>
                      <TextField
                        {...field}
                        type={showPassword ? "text" : "password"}
                        label={content[lang]["password"]}
                        variant="standard"
                        fullWidth
                        error={!!errors.password}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              edge="end"
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              onMouseDown={(e) => e.preventDefault()}
                              size="small"
                            >
                              {showPassword ? (
                                <VisibilityOff style={{ fontSize: "1.3rem" }} />
                              ) : (
                                <Visibility style={{ fontSize: "1.3rem" }} />
                              )}
                            </IconButton>
                          ),
                        }}
                        sx={{
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#54d4c6", // Replace "your-focus-color" with your desired color
                          },
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "#54d4c6", // Replace "your-focus-color" with your desired color
                          },
                        }}
                      />
                      {errors.password && (
                        <InputLabel error>{errors.password.message}</InputLabel>
                      )}
                    </div>
                  )}
                />
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
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <MuiButton variant="contained" startIcon={<Facebook />}>
                      {content[lang]["loginFacebook"]}
                    </MuiButton>
                  </Grid>
                  <Grid item>
                    <MuiButton
                      variant="contained"
                      startIcon={<Google />}
                      style={loginWithGoogleStyle}
                    >
                      {content[lang]["loginGoogle"]}
                    </MuiButton>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
