import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMediaQuery } from "react-responsive";

import { Stack, Box, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { useFormContext } from "context/FormContext";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import checkoutSchema from "formValidationSchemas/checkoutSchema";

import { Button } from "techhype-components";
import ContactInfoForm from "components/ContactInfoForm";
import ShippingAddressForm from "components/ShippingAddressForm";

const CheckoutForm = () => {
  const [lang] = useContext(LangContext);
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
    handleSubmit,
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%" }}
      noValidate
    >
      <Stack spacing={3}>
        {/* Contact Info */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            flexWrap: "wrap",
            gap: ".5em",
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: "500", fontSize: "1rem" }}>
            {isMobile
              ? content[lang]["contactInfoShort"]
              : content[lang]["contactInfoLong"]}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontSize: ".8rem" }}>
            {content[lang]["checkoutHaveAccount"]}{" "}
            <RouterLink to="/login" className="checkout-login">
              {content[lang]["checkoutLogin"]}
            </RouterLink>
          </Typography>
        </Box>
        <ContactInfoForm
          control={control}
          errors={errors}
          lang={lang}
          contactInfo={contactInfo}
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
        <ShippingAddressForm
          control={control}
          errors={errors}
          lang={lang}
          shippingAddress={shippingAddress}
        />
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
