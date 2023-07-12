import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "./contactForm.module.scss";
import schemaContact from "./schemaContact";
import PostMessage from "utils/PostMessage";
import InputsTheme from "components/forms/InputsTheme";
import AlertMessage from "components/forms/AlertMessage";
import { Button } from "techhype-components";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaContact),
  });

  // Function that will run when form is submitted
  async function onSubmit(data) {
    setLoading(true);
    const message = await PostMessage(data);
    if (message.success) {
      setLoading(false);
      setSubmitted(true);
      reset();
    } else {
      setLoading(false);
      setSubmitted(false);
      setError(true);
    }
  }

  if (loading) {
    return <div centered="100vh"> Add a loader here...</div>;
  }

  if (error) {
    return (
      <AlertMessage
        variant="error"
        title="Error"
        message="An error occured, Please try again later"
      />
    );
  }

  return (
    <Box
      className={styles.contactForm}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <InputsTheme>
        <FormControl variant="standard">
          <InputLabel id="subject-label">I need help with..</InputLabel>
          <Controller
            render={({ field }) => (
              <Select
                label="Subject"
                sx={{
                  ":after": { borderBottomColor: "#54d4c6" },
                }}
                {...field}
              >
                <MenuItem value={1}>General Inquiry</MenuItem>
                <MenuItem value={2}>My Current Order</MenuItem>
              </Select>
            )}
            name="subject"
            control={control}
            defaultValue={1}
          />
        </FormControl>
        <TextField
          label={"Name"}
          id="name"
          variant={"standard"}
          type="text"
          {...register("name")}
          error={Boolean(errors.name)}
          helperText={errors.name ? errors.name.message : ""}
          InputProps={
            errors.name
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <ErrorRoundedIcon color="error" />
                    </InputAdornment>
                  ),
                }
              : null
          }
        />
        <TextField
          label={"Email"}
          id="email"
          variant={"standard"}
          type="email"
          {...register("email")}
          error={Boolean(errors.email)}
          helperText={errors.email ? errors.email.message : ""}
          InputProps={
            errors.email
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <ErrorRoundedIcon color="error" />
                    </InputAdornment>
                  ),
                }
              : null
          }
        />

        <TextField
          label={"Phone"}
          id="phone"
          variant={"standard"}
          type="number"
          placeholder="Optional"
          {...register("phone")}
          error={Boolean(errors.phone)}
          helperText={errors.phone ? errors.phone.message : ""}
          InputProps={
            errors.phone
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <ErrorRoundedIcon color="error" />
                    </InputAdornment>
                  ),
                }
              : null
          }
        />

        <TextField
          id="message"
          label="Message"
          multiline
          variant={"standard"}
          rows={5}
          type="text"
          placeholder="Write your message here..."
          {...register("message")}
          error={Boolean(errors.message)}
          helperText={errors.message ? errors.message.message : ""}
          InputProps={
            errors.message
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <ErrorRoundedIcon color="error" />
                    </InputAdornment>
                  ),
                }
              : null
          }
        />
      </InputsTheme>
      {submitted && (
        <AlertMessage
          variant="success"
          title="Sent!"
          message="Thank you for your message. We will get back to you shortly."
        />
      )}
      <Button type="submit">Send</Button>
    </Box>
  );
};

export default ContactForm;
