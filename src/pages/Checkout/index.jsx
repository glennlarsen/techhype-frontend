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

const Checkout = () => {
  const [lang] = useContext(LangContext);
  const [defaultCallingCode, setDefaultCallingCode] = useState("NO");
  const [defaultCountry, setDefaultCountry] = useState("Norway");
  const { cartItems } = useShoppingCart();
  const isMobile = useMediaQuery({ maxWidth: 990 });
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const navigate = useNavigate();

  // Form state for storing input values
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    country: "",
    name: "",
    company: "",
    street: "",
    postalCode: "",
    city: "",
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
                      defaultValue="NO"
                      phoneLabel={content[lang]["checkoutPhone"]}
                      onPhoneSelect={setDefaultCountry}
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
                      defaultValue={defaultCountry}
                      onCountrySelect={setDefaultCallingCode}
                      value={shippingAddress.country}
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
                        onClick={() => navigate("/payment")}
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
