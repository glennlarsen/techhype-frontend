import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { Button } from "techhype-components";
import {
  FormControl,
  InputLabel,
  Input,
  Stack,
  Box,
  Typography,
  FormHelperText,
} from "@mui/material";
import CountryInput from "components/forms/CountryInput";
import checkoutSchema from "formValidationSchemas/checkoutSchema";
import PhoneInput from "components/forms/PhoneInput";
import { useMediaQuery } from "react-responsive";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useFormContext } from "context/FormContext";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

const CheckoutForm = () => {
  const [lang] = useContext(LangContext);
  const [defaultCountry, setDefaultCountry] = useState("Norway");
  const { updateFormData, formData } = useFormContext();
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const navigate = useNavigate();

  // Form state for storing input values
  const [contactInfo, setContactInfo] = useState(() => {
    const initialContactInfo = formData.contactInfo || {};

    return {
      email: initialContactInfo.email || "",
      tel: initialContactInfo.tel || "",
    };
  });

  const [shippingAddress, setShippingAddress] = useState(() => {
    const initialShippingAddress = formData.shippingAddress || {};

    return {
      country: initialShippingAddress.country || "",
      name: initialShippingAddress.name || "",
      company: initialShippingAddress.company || "",
      street: initialShippingAddress.street || "",
      postalCode: initialShippingAddress.postalCode || "",
      city: initialShippingAddress.city || "",
    };
  });

  const {
    register,
    unregister,
    handleSubmit,
    trigger,
    reset,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      email: contactInfo.email,
      tel: contactInfo.tel,
      country: shippingAddress.country,
      name: shippingAddress.name,
      company: shippingAddress.company,
      street: shippingAddress.street,
      postalCode: shippingAddress.postalCode,
      city: shippingAddress.city,
    },
  });

  const onSubmit = async () => {
    // Retrieve values from PhoneInput and CountryInput components
    const emailInputValue = watch("email");
    const phoneInputValue = watch("tel");
    const countryInputValue = watch("country");
    const nameInputValue = watch("name");
    const companyInputValue = watch("company");
    const streetInputValue = watch("street");
    const postalCodeInputValue = watch("postalCode");
    const cityInputValue = watch("city");

    const updatedShippingAddress = {
      ...shippingAddress,
      country: countryInputValue, 
      name: nameInputValue,
      company: companyInputValue,
      street: streetInputValue,
      postalCode: postalCodeInputValue,
      city: cityInputValue,
    };

    const updatedContactInfo = {
      ...contactInfo,
      email: emailInputValue,
      tel: phoneInputValue,
    };

    const formData = {
      contactInfo: updatedContactInfo,
      shippingAddress: updatedShippingAddress,
    };

    // Update the form data in the context
    updateFormData(formData);
    // Navigate to the payment page
    navigate("/payment"); // Assuming navigate is defined somewhere
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }} noValidate>
      <Stack spacing={3}>
        {/* Contact Info */}
        <FormControl variant="standard">
          <InputLabel htmlFor="email" error={Boolean(errors.email)}>
            {content[lang]["checkoutEmail"]}
          </InputLabel>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  id="email"
                  type="email"
                  placeholder={content[lang]["checkoutEmailPlaceholder"]}
                  {...field}
                  endAdornment={
                    errors.email ? (
                      <InputAdornment position="end">
                        <ErrorRoundedIcon color="error" />
                      </InputAdornment>
                    ) : null
                  }
                />
                <FormHelperText error>
                  {errors.email ? errors.email.message : ""}
                </FormHelperText>
              </>
            )}
          />
        </FormControl>

        <PhoneInput
          control={control}
          errors={errors}
          defaultCountryCode="NO"
          defaultValue={contactInfo.tel}
          phoneLabel={content[lang]["checkoutPhone"]}
          placeholder={content[lang]["checkoutPhonePlaceholder"]}
        />

        {/* Shipping Address */}
        <Typography
          sx={{
            marginTop: "2em !important",
            fontWeight: "500",
            fontSize: "1rem",
          }}
          alignSelf="start"
          variant="h2"
        >
          {content[lang]["shippingAddress"]}
        </Typography>
        <CountryInput
          control={control}
          errors={errors}
          defaultValue={shippingAddress.country || defaultCountry}
          countryLabel={content[lang]["checkoutCountry"]}
        />
        <FormControl variant="standard">
          <InputLabel htmlFor="name" error={Boolean(errors.name)}>
            {content[lang]["checkoutName"]}
          </InputLabel>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  id="name"
                  type="name"
                  {...field}
                  endAdornment={
                    errors.name ? (
                      <InputAdornment position="end">
                        <ErrorRoundedIcon color="error" />
                      </InputAdornment>
                    ) : null
                  }
                />
                <FormHelperText error>
                  {errors.name ? errors.name.message : ""}
                </FormHelperText>
              </>
            )}
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="company" error={Boolean(errors.company)}>
            {content[lang]["checkoutCompany"]}
          </InputLabel>
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  id="company"
                  type="company"
                  {...field}
                  endAdornment={
                    errors.company ? (
                      <InputAdornment position="end">
                        <ErrorRoundedIcon color="error" />
                      </InputAdornment>
                    ) : null
                  }
                />
                <FormHelperText error>
                  {errors.company ? errors.company.message : ""}
                </FormHelperText>
              </>
            )}
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="street" error={Boolean(errors.street)}>
            {content[lang]["checkoutStreet"]}
          </InputLabel>
          <Controller
            name="street"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  id="street"
                  type="street"
                  {...field}
                  endAdornment={
                    errors.street ? (
                      <InputAdornment position="end">
                        <ErrorRoundedIcon color="error" />
                      </InputAdornment>
                    ) : null
                  }
                />
                <FormHelperText error>
                  {errors.street ? errors.street.message : ""}
                </FormHelperText>
              </>
            )}
          />
        </FormControl>
        <Box gap={2} display="flex">
          <FormControl variant="standard">
            <InputLabel htmlFor="postalCode" error={Boolean(errors.postalCode)}>
              {content[lang]["checkoutPostal"]}
            </InputLabel>
            <Controller
              name="postalCode"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    id="postalCode"
                    type="postalCode"
                    {...field}
                    endAdornment={
                      errors.postalCode ? (
                        <InputAdornment position="end">
                          <ErrorRoundedIcon color="error" />
                        </InputAdornment>
                      ) : null
                    }
                  />
                  <FormHelperText error>
                    {errors.postalCode ? errors.postalCode.message : ""}
                  </FormHelperText>
                </>
              )}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="city" error={Boolean(errors.city)}>
              {content[lang]["checkoutCity"]}
            </InputLabel>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    id="city"
                    type="city"
                    {...field}
                    endAdornment={
                      errors.city ? (
                        <InputAdornment position="end">
                          <ErrorRoundedIcon color="error" />
                        </InputAdornment>
                      ) : null
                    }
                  />
                  <FormHelperText error>
                    {errors.city ? errors.city.message : ""}
                  </FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2em",
            marginTop: "2.5em !important",
            flexDirection: isMobile ? "column-reverse" : "row",
          }}
        >
          <RouterLink to="/cart" className="back-link">
            <ArrowBackIosNewIcon sx={{ fontSize: "12px" }} />{" "}
            {content[lang]["checkoutReturnToCart"]}
          </RouterLink>
          <Button
            size={isMobile ? "" : "small"}
            type="submit"
            variant="contained"
            color="primary"
          >
            {isMobile
              ? content[lang]["paymentButtonLong"]
              : content[lang]["paymentButtonShort"]}
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default CheckoutForm;
