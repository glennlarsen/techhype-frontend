import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "components/Layout";
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
} from "@mui/material";
import CountryInput from "components/forms/CountryInput";
import schema from "constants/schema";
import PhoneInput from "components/forms/PhoneInput";
import { useShoppingCart } from "context/ShoppingCartContext";
import { Link as RouterLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import OrderSummary from "components/OrderSummary";
import AppTheme from "components/forms/AppTheme";
import OrderSummaryToggle from "components/OrderSummaryToggle";
import { useFormContext } from "context/FormContext";

const Checkout = () => {
  const [lang] = useContext(LangContext);
  const [defaultCountry, setDefaultCountry] = useState("Norway");
  const { cartItems } = useShoppingCart();
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const navigate = useNavigate();
  const { updateFormData, formData } = useFormContext();

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

  const handleToggleOrderSummary = () => {
    setShowOrderSummary((prevValue) => !prevValue);
  };

  // Event handler for handling changes in the contact info fields
  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  // Event handler for handling changes in the shipping address fields
  const handleShippingAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevState) => ({ ...prevState, [name]: value }));
  };

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
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    // Retrieve values from PhoneInput and CountryInput components
    const phoneInputValue = watch("tel");
    const countryInputValue = watch("country");

    const updatedShippingAddress = {
      ...shippingAddress,
      country: countryInputValue, // Set the country here
    };

    const updatedContactInfo = {
      ...contactInfo,
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
    <Layout
      page={content[lang]["checkoutHeading"]}
      description="Checkout, pay and wait for your cards to be shipped as fast as possible"
    >
      <AppTheme>
        <OrderSummaryToggle
          handleToggleOrderSummary={handleToggleOrderSummary}
          showOrderSummary={showOrderSummary}
          cartItems={cartItems}
          shippingMethod="standard"
        />
        <section className="checkout top-overlay">
          <div className="container-inner checkout-container">
            <Box
              sx={{
                display: "flex",
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingBottom: "2em",
              }}
            >
              <h1 style={{ marginTop: isMobile ? 0 : "" }}>
                {content[lang]["checkoutHeading"]}
              </h1>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
                padding={isMobile ? 0 : "0 2em"}
                sx={{ width: "100%" }}
              >
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
                  <Typography
                    variant="h2"
                    sx={{ fontWeight: "500", fontSize: "1rem" }}
                  >
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
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{ width: "100%" }}
                >
                  <Stack spacing={3}>
                    {/* Contact Info */}
                    <FormControl variant="standard">
                      <InputLabel htmlFor="email">
                        {content[lang]["checkoutEmail"]}
                      </InputLabel>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={content[lang]["checkoutEmailPlaceholder"]}
                        value={contactInfo.email}
                        onChange={handleContactInfoChange}
                      />
                    </FormControl>
                    <PhoneInput
                      control={control}
                      errors={errors}
                      defaultCountryCode="NO"
                      defaultValue={contactInfo.tel}
                      phoneLabel={content[lang]["checkoutPhone"]}
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
                      <InputLabel htmlFor="name">
                        {content[lang]["checkoutName"]}
                      </InputLabel>
                      <Input
                        id="name"
                        name="name"
                        value={shippingAddress.name}
                        onChange={handleShippingAddressChange}
                      />
                    </FormControl>
                    <FormControl variant="standard">
                      <InputLabel htmlFor="company">
                        {content[lang]["checkoutCompany"]}
                      </InputLabel>
                      <Input
                        id="company"
                        name="company"
                        value={shippingAddress.company}
                        onChange={handleShippingAddressChange}
                      />
                    </FormControl>
                    <FormControl variant="standard">
                      <InputLabel htmlFor="street">
                        {content[lang]["checkoutStreet"]}
                      </InputLabel>
                      <Input
                        id="street"
                        name="street"
                        value={shippingAddress.street}
                        onChange={handleShippingAddressChange}
                      />
                    </FormControl>
                    <Box gap={2} display="flex">
                      <FormControl variant="standard">
                        <InputLabel htmlFor="postalCode">
                          {content[lang]["checkoutPostal"]}
                        </InputLabel>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={shippingAddress.postalCode}
                          onChange={handleShippingAddressChange}
                        />
                      </FormControl>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="city">
                          {content[lang]["checkoutCity"]}
                        </InputLabel>
                        <Input
                          id="city"
                          name="city"
                          value={shippingAddress.city}
                          onChange={handleShippingAddressChange}
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
              </Stack>
            </Box>

            {/* Order Summary */}
            {!isMobile && (
              <OrderSummary
                cartItems={cartItems}
                showOrderSummary={showOrderSummary}
                shippingMethod="standard"
              />
            )}
          </div>
        </section>
      </AppTheme>
    </Layout>
  );
};

export default Checkout;
