import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { yupResolver } from "@hookform/resolvers/yup";

import Typography from "@mui/material/Typography";
import { Stack, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { useShoppingCart } from "context/ShoppingCartContext";
import { Button } from "techhype-components";
import calculateStandardShipping from "utils/calculateStandardShipping";
import { useFormContext } from "context/FormContext";
import billingAddressSchema from "formValidationSchemas/billingAddressSchema";
import paymentSchema from "formValidationSchemas/paymentSchema";
import emptySchema from "formValidationSchemas/emptySchema";
import Layout from "components/Layout";
import OrderSummary from "components/OrderSummary";
import AppTheme from "components/forms/AppTheme";
import OrderSummaryToggle from "components/OrderSummaryToggle";
import ContactInfoDisplay from "components/ContactInfoDisplay";
import BillingAddressForm from "components/BillingAddressForm";
import ShippingMethodSelection from "components/ShippingMethodSelection";
import PaymentMethodSelection from "components/PaymentMethodSelection";

const Payment = () => {
  const [lang] = useContext(LangContext);
  const { formData, updateFormData } = useFormContext();
  const { cartItems, markAsPurchased } = useShoppingCart();
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const [differentBillingAddress, setDifferentBillingAddress] = useState(
    formData.differentBillingAddress || false
  );
  const [shippingMethod, setShippingMethod] = useState(
    formData.shippingMethod || "standard"
  );
  const [creditCard, setCreditCard] = useState(true);
  const [vipps, setVipps] = useState(false);
  const navigate = useNavigate();

  // Redirect to the Home page if cartItems is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);

  //Vipps or Credit card payment
  const handlePaymentChange = (event) => {
    if (event.target.value === "creditCard") {
      setCreditCard(true);
      setVipps(false);
    } else if (event.target.value === "vipps") {
      setCreditCard(false);
      setVipps(true);
    }
  };

  // Form state for storing input values
  const [billingAddress, setBillingAddress] = useState(() => {
    const initialBillingAddress = formData.billingAddress || {};

    return {
      country: initialBillingAddress.country || "",
      name: initialBillingAddress.name || "",
      company: initialBillingAddress.company || "",
      street: initialBillingAddress.street || "",
      postalCode: initialBillingAddress.postalCode || "",
      city: initialBillingAddress.city || "",
    };
  });

  const handleToggleOrderSummary = () => {
    setShowOrderSummary((prevValue) => !prevValue);
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      differentBillingAddress
        ? billingAddressSchema.concat(vipps ? emptySchema : paymentSchema)
        : !vipps
        ? paymentSchema
        : emptySchema
    ),
    defaultValues: {
      country: billingAddress.country || formData.shippingAddress.country,
      name: billingAddress.name,
      company: billingAddress.company,
      street: billingAddress.street,
      postalCode: billingAddress.postalCode,
      city: billingAddress.city,
      cardNumber: "",
      cardName: "",
      exp: "",
      security: "",
    },
  });

  const onSubmit = async () => {
    //Set on submit handling here...

    // Mark each item in the cart as purchased
    cartItems.forEach((cartItem) => {
      markAsPurchased(cartItem.id);
    });

    // Retrieve values from react hook form
    const countryInputValue = watch("country");
    const nameInputValue = watch("name");
    const companyInputValue = watch("company");
    const streetInputValue = watch("street");
    const postalCodeInputValue = watch("postalCode");
    const cityInputValue = watch("city");

    const updatedBillingAddress = {
      ...billingAddress,
      country: countryInputValue,
      name: nameInputValue,
      company: companyInputValue,
      street: streetInputValue,
      postalCode: postalCodeInputValue,
      city: cityInputValue,
    };

    const cardNumberInputValue = watch("cardNumber");
    const cardNameInputValue = watch("cardName");
    const expInputValue = watch("exp");
    const securityInputValue = watch("security");

    const updatedPaymentInfo = {
      cardNumber: cardNumberInputValue && cardNumberInputValue.slice(-4),
      cardName: cardNameInputValue,
      exp: expInputValue,
      security: securityInputValue,
    };

    // Update the form context with billing address, shipping method, and payment details
    const updatedFormData = {
      ...formData,
      differentBillingAddress: differentBillingAddress,
      billingAddress: !differentBillingAddress
        ? formData.shippingAddress
        : updatedBillingAddress,
      shippingMethod: shippingMethod,
      paymentInfo: updatedPaymentInfo,
      paymentMethod: creditCard ? "creditCard" : "Vipps",
    };

    // Set the updated form data to the form context
    updateFormData(updatedFormData);

    // Navigate to the orderConfirmation page
    navigate("/orderConfirmation"); // Assuming navigate is defined somewhere
  };

  return (
    <Layout
      page={content[lang]["paymentHeading"]}
      description="Checkout, pay and wait for your cards to be shipped as fast as possible"
    >
      <AppTheme>
        {/* Your OrderSummaryToggle component on mobile */}
        <OrderSummaryToggle
          handleToggleOrderSummary={handleToggleOrderSummary}
          showOrderSummary={showOrderSummary}
          cartItems={cartItems}
          shippingMethod={shippingMethod}
        />
        <section className="payment top-overlay">
          <div className="container-inner payment-container">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  {content[lang]["paymentHeading"]}
                </h1>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={2}
                  padding={isMobile ? 0 : "0 2em"}
                  sx={{ width: "100%" }}
                >
                  {/* Contact Info */}
                  <ContactInfoDisplay formData={formData} lang={lang} />

                  {/* Billing Address */}
                  <Typography
                    variant="h2"
                    sx={{ fontWeight: "500", fontSize: "1rem" }}
                  >
                    {content[lang]["billingAddressHeader"]}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: ".8rem",
                      marginTop: "5px !important",
                      textAlign: "left",
                    }}
                  >
                    {content[lang]["billingAddressSubheader"]}
                  </Typography>
                  <BillingAddressForm
                    control={control}
                    errors={errors}
                    lang={lang}
                    register={register}
                    formData={formData}
                    differentBillingAddress={differentBillingAddress}
                    setDifferentBillingAddress={setDifferentBillingAddress}
                  />

                  {/* Shipping Method */}
                  <Typography
                    variant="h2"
                    sx={{ fontWeight: "500", fontSize: "1rem" }}
                  >
                    {content[lang]["shippingMethodHeader"]}
                  </Typography>
                  <ShippingMethodSelection
                    shippingMethod={shippingMethod}
                    setShippingMethod={setShippingMethod}
                    content={content}
                    lang={lang}
                    calculateStandardShipping={calculateStandardShipping}
                  />

                  {/* Payment */}
                  <Typography
                    variant="h2"
                    sx={{ fontWeight: "500", fontSize: "1rem" }}
                  >
                    {content[lang]["paymentHeader"]}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: ".8rem",
                      marginTop: "5px !important",
                      textAlign: "left",
                    }}
                  >
                    {content[lang]["paymentSubheader"]}
                  </Typography>
                  <PaymentMethodSelection
                    creditCard={creditCard}
                    handlePaymentChange={handlePaymentChange}
                    vipps={vipps}
                    content={content}
                    lang={lang}
                    isMobile={isMobile}
                    errors={errors}
                    control={control}
                    register={register}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "2em",
                      marginTop: "2.5em !important",
                      flexDirection: isMobile ? "column-reverse" : "row",
                    }}
                  >
                    <RouterLink to="/checkout" className="back-link">
                      <ArrowBackIosNewIcon sx={{ fontSize: "12px" }} />{" "}
                      {content[lang]["paymentReturnToCheckout"]}
                    </RouterLink>
                    <Button
                      size={isMobile ? "" : "small"}
                      type="submit"
                      color="primary"
                    >
                      {content[lang]["paymentButton"]}
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </form>

            {/* Order Summary */}
            {!isMobile && (
              <OrderSummary
                cartItems={cartItems}
                showOrderSummary={showOrderSummary}
                shippingMethod={shippingMethod}
              />
            )}
          </div>
        </section>
      </AppTheme>
    </Layout>
  );
};

export default Payment;
