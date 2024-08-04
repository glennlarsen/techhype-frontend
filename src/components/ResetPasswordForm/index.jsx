import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Box, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "utils/useApi"; // Assuming you have a utility for API calls
import AlertMessage from "components/forms/AlertMessage"; // Assuming you have a component for displaying messages
import resetPasswordSchema from "formValidationSchemas/resetPasswordSchema";


const ResetPasswordForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });
  const [statusMessage, setStatusMessage] = useState(null);
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate();
  const { post } = useApi();

  const onSubmit = async (data) => {
    try {
      const response = await post(`/auth/resetpassword/${token}`, data);
      if (response.status === "success") {
        setStatusMessage({ type: "success", text: response.message });
        // Optionally, redirect to login page after a successful password reset
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setStatusMessage({ type: "error", text: response.message });
      }
    } catch (error) {
      setStatusMessage({ type: "error", text: "Failed to reset the password." });
    }
  };

  return (
    <Box p={4} maxWidth="500px" margin="0 auto">
      <Typography variant="h4" mb={3}>Reset Your Password</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            type="password"
            {...control.register("newPassword")}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Reset Password
        </Button>
      </form>
      {statusMessage && (
        <AlertMessage
          variant={statusMessage.type === "success" ? "success" : "warning"}
          title={statusMessage.type === "success" ? "Success" : "Error"}
          message={statusMessage.text}
        />
      )}
    </Box>
  );
};

export default ResetPasswordForm;
