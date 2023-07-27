import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "./contactForm.module.scss";
import schemaContact from "./schemaContact";
import PostMessage from "utils/PostMessage";
import InputsTheme from "components/forms/InputsTheme";
import AlertMessage from "components/forms/AlertMessage";
import { Button } from "techhype-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { Fade } from "react-awesome-reveal";

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
  const [lang, ] = useContext(LangContext);

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
        title={content[lang]["error"]}
        message={content[lang]["submitError"]}
      />
    );
  }

  return (
    <Fade direction="down" triggerOnce duration="800">
    <Box
      className={styles.contactForm}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <InputsTheme>
        <FormControl variant="standard">
          <InputLabel id="subject-label">
            {content[lang]["selectLabel"]}
          </InputLabel>
          <Controller
            render={({ field }) => (
              <Select
                label="Subject"
                sx={{
                  ":after": { borderBottomColor: "#54d4c6" },
                }}
                {...field}
              >
                <MenuItem value={1}>{content[lang]["selectOption1"]}</MenuItem>
                <MenuItem value={2}>{content[lang]["selectOption2"]}</MenuItem>
                <MenuItem value={3}>{content[lang]["selectOption3"]}</MenuItem>
              </Select>
            )}
            name="subject"
            control={control}
            defaultValue={1}
          />
        </FormControl>
        <TextField
          label={content[lang]["nameLabel"]}
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
          label={content[lang]["emailLabel"]}
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
          label={content[lang]["phoneLabel"]}
          id="phone"
          variant={"standard"}
          type="number"
          placeholder={content[lang]["phonePlaceholder"]}
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
          label={content[lang]["messageLabel"]}
          multiline
          variant={"standard"}
          rows={5}
          type="text"
          placeholder={content[lang]["messagePlaceholder"]}
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
      <Button type="submit">{content[lang]["contactButton"]}</Button>
    </Box>
    </Fade>
  );
};

export default ContactForm;
