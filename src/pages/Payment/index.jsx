import React, { useContext, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "components/Layout";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import Typography from "@mui/material/Typography";
import { Button } from "techhype-components";
import {
  FormControlLabel,
  FormControl,
  Stack,
  Paper,
  Box,
  Divider,
  Collapse,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import CountryInput from "components/forms/CountryInput";
import { useShoppingCart } from "context/ShoppingCartContext";
import { Link as RouterLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import OrderSummary from "components/OrderSummary";
import AppTheme from "components/forms/AppTheme";
import OrderSummaryToggle from "components/OrderSummaryToggle";
import Radio from "@mui/material/Radio";
import { formatCurrency } from "utils/formatCurrency";
import { SHIPPING_COST } from "constants/validationRules";
import { products } from "data/products";
import vippsLogo from "images/vipps_logo.png";
import FormTextField from "components/forms/FormTextField";
import { useFormContext } from "context/FormContext";
import Visa from "images/Visa.png";
import MasterCard from "images/MasterCard.png";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { color_error } from "constants/colors";
import billingAddressSchema from "formValidationSchemas/billingAddressSchema";
import paymentSchema from "formValidationSchemas/paymentSchema";
import CreditCardInput from "components/forms/CreditCardInput";
import ExpirationDateInput from "components/forms/ExpirationDateInput";
import SecurityCodeInput from "components/forms/securityCodeInput";
import emptySchema from "formValidationSchemas/emptySchema";

const Payment = () => {
  const [lang] = useContext(LangContext);
  const { formData, updateFormData } = useFormContext();
  const { cartItems, markAsPurchased } = useShoppingCart();
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [billingAddressSelected, setBillingAddressSelected] = useState(
    formData.differentBillingAddress || false
  );
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

  const calculateShopShipping = () => {
    return cartItems.reduce((total, cartItem) => {
      const item = products.find((i) => i.id === parseInt(cartItem.id));
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0) > 500
      ? 0
      : SHIPPING_COST;
  };

  const handleBillingAddressChange = (event) => {
    setDifferentBillingAddress(event.target.value === "true");
    setBillingAddressSelected(event.target.value === "true");
  };

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

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    exp: "",
    security: "",
  });

  const handleToggleOrderSummary = () => {
    setShowOrderSummary((prevValue) => !prevValue);
  };

  // Event handler for handling changes in the payment info fields
  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const {
    register,
    unregister,
    handleSubmit,
    trigger,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      differentBillingAddress
        ? billingAddressSchema
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
      ...paymentInfo,
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
        {/* Your OrderSummaryToggle component */}
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
                  <Paper
                    elevation={3}
                    sx={{
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "1em",
                      borderRadius: "10px",
                      marginBottom: "1em",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                        gap: ".5em",
                      }}
                    >
                      <Box sx={{ textAlign: "left" }}>
                        <Typography
                          sx={{ opacity: 0.8 }}
                          variant="caption"
                          gutterBottom
                        >
                          {content[lang]["paymentContact"]}
                        </Typography>
                        <Typography variant="body2">
                          {formData.contactInfo.email} |{" "}
                          {formData.contactInfo.tel}
                        </Typography>
                      </Box>
                      <RouterLink to="/checkout" className="payment-change">
                        {content[lang]["changeInfo"]}
                      </RouterLink>
                    </Box>
                    <Divider sx={{ margin: ".8em 0" }} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                        gap: ".5em",
                      }}
                    >
                      <Box sx={{ textAlign: "left" }}>
                        <Typography
                          sx={{ opacity: 0.8 }}
                          variant="caption"
                          gutterBottom
                        >
                          {content[lang]["paymentShipTo"]}
                        </Typography>
                        <Typography variant="body2">
                          {`${formData.shippingAddress.street}, ${formData.shippingAddress.postalCode} ${formData.shippingAddress.city}, ${formData.shippingAddress.country}`}
                        </Typography>
                      </Box>
                      <RouterLink to="/checkout" className="payment-change">
                        {content[lang]["changeInfo"]}
                      </RouterLink>
                    </Box>
                  </Paper>

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
                  <Paper
                    elevation={3}
                    sx={{
                      justifyContent: "space-between",
                      width: "100%",
                      borderRadius: "10px",
                      marginBottom: "1em !important",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          checked={!differentBillingAddress}
                          onChange={handleBillingAddressChange}
                          value={false}
                          name="radio-buttons"
                          size="small"
                          sx={{ paddingLeft: 0 }}
                          inputProps={{
                            "aria-label": "Same as shipping address",
                          }}
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "500", fontSize: ".8rem" }}
                        >
                          {content[lang]["billingOption1"]}
                        </Typography>
                      }
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                        alignItems: "center",
                        textAlign: "left",
                        gap: ".5em",
                        padding: ".5em 1em",
                        margin: 0,
                      }}
                    />
                    <Divider />
                    <FormControlLabel
                      control={
                        <Radio
                          checked={differentBillingAddress}
                          onChange={handleBillingAddressChange}
                          value={true}
                          name="radio-buttons"
                          size="small"
                          sx={{ paddingLeft: 0 }}
                          inputProps={{
                            "aria-label": "Same as shipping address",
                          }}
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "500", fontSize: ".8rem" }}
                        >
                          {content[lang]["billingOption2"]}
                        </Typography>
                      }
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                        alignItems: "center",
                        textAlign: "left",
                        gap: ".5em",
                        padding: ".5em 1em",
                        margin: 0,
                      }}
                    />
                    <Collapse in={billingAddressSelected}>
                      <Divider />
                      <Stack
                        spacing={3}
                        padding={2}
                        sx={{
                          backgroundColor: "#fcfbfb",
                          paddingBottom: "2em",
                        }}
                      >
                        {/* Billing Address form */}
                        <CountryInput
                          control={control}
                          errors={errors}
                          defaultValue={formData.shippingAddress.country}
                          countryLabel={content[lang]["checkoutCountry"]}
                          variant="outlined"
                          fontSize={14}
                          inputBackgroundColor="white"
                        />
                        <FormControl
                          variant="outlined"
                          error={Boolean(errors.name)}
                        >
                          <FormTextField
                            sx={{ backgroundColor: "white" }}
                            label={content[lang]["checkoutName"]}
                            id="name"
                            name="name"
                            error={Boolean(errors.name)}
                            {...register("name")} // Use register to link the input to validation schema
                            InputLabelProps={{
                              style: { fontSize: 14 }, // Adjust the fontSize for the label
                            }}
                            inputProps={{
                              style: { fontSize: 14 }, // Adjust the fontSize for the input text
                            }}
                            InputProps={{
                              endAdornment: errors.name ? (
                                <InputAdornment position="end">
                                  <ErrorRoundedIcon color="error" />
                                </InputAdornment>
                              ) : null,
                              style: {
                                borderColor: errors.name
                                  ? color_error
                                  : "inherit", // Set underline color to red on error
                              },
                            }}
                            variant="outlined"
                          />
                          {/* Display the name error message if there is one */}
                          {errors.name && (
                            <FormHelperText>
                              {errors.name.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                        <FormControl
                          variant="outlined"
                          error={Boolean(errors.company)}
                        >
                          <FormTextField
                            sx={{ backgroundColor: "white" }}
                            label={content[lang]["checkoutCompany"]}
                            id="company"
                            name="company"
                            error={Boolean(errors.company)}
                            {...register("company")} // Use register to link the input to validation schema
                            InputLabelProps={{
                              style: { fontSize: 14 }, // Adjust the fontSize for the label
                            }}
                            inputProps={{
                              style: { fontSize: 14 }, // Adjust the fontSize for the input text
                            }}
                            InputProps={{
                              endAdornment: errors.company ? (
                                <InputAdornment position="end">
                                  <ErrorRoundedIcon color="error" />
                                </InputAdornment>
                              ) : null,
                              style: {
                                borderColor: errors.company
                                  ? color_error
                                  : "inherit", // Set underline color to red on error
                              },
                            }}
                            variant="outlined"
                          />
                          {/* Display the name error message if there is one */}
                          {errors.company && (
                            <FormHelperText>
                              {errors.company.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                        <FormControl
                          variant="outlined"
                          error={Boolean(errors.street)}
                        >
                          <FormTextField
                            sx={{ backgroundColor: "white" }}
                            label={content[lang]["checkoutStreet"]}
                            id="street"
                            name="street"
                            error={Boolean(errors.street)}
                            {...register("street")} // Use register to link the input to validation schema
                            InputLabelProps={{
                              style: { fontSize: 14 }, // Adjust the fontSize for the label
                            }}
                            inputProps={{
                              style: { fontSize: 14 }, // Adjust the fontSize for the input text
                            }}
                            InputProps={{
                              endAdornment: errors.street ? (
                                <InputAdornment position="end">
                                  <ErrorRoundedIcon color="error" />
                                </InputAdornment>
                              ) : null,
                              style: {
                                borderColor: errors.street
                                  ? color_error
                                  : "inherit", // Set underline color to red on error
                              },
                            }}
                            variant="outlined"
                          />
                          {/* Display the name error message if there is one */}
                          {errors.street && (
                            <FormHelperText>
                              {errors.street.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                        <Box gap={2} display="flex">
                          <FormControl
                            variant="outlined"
                            error={Boolean(errors.postalCode)}
                            fullWidth
                          >
                            <FormTextField
                              sx={{ backgroundColor: "white" }}
                              label={content[lang]["checkoutPostal"]}
                              id="postalCode"
                              name="postalCode"
                              error={Boolean(errors.postalCode)}
                              {...register("postalCode")} // Use register to link the input to validation schema
                              InputLabelProps={{
                                style: { fontSize: 14 }, // Adjust the fontSize for the label
                              }}
                              inputProps={{
                                style: { fontSize: 14 }, // Adjust the fontSize for the input text
                              }}
                              InputProps={{
                                endAdornment: errors.postalCode ? (
                                  <InputAdornment position="end">
                                    <ErrorRoundedIcon color="error" />
                                  </InputAdornment>
                                ) : null,
                                style: {
                                  borderColor: errors.postalCode
                                    ? color_error
                                    : "inherit", // Set underline color to red on error
                                },
                              }}
                              variant="outlined"
                            />
                            {/* Display the name error message if there is one */}
                            {errors.postalCode && (
                              <FormHelperText>
                                {errors.postalCode.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                          <FormControl
                            variant="outlined"
                            error={Boolean(errors.city)}
                            fullWidth
                          >
                            <FormTextField
                              sx={{ backgroundColor: "white" }}
                              label={content[lang]["checkoutCity"]}
                              id="city"
                              name="city"
                              error={Boolean(errors.city)}
                              {...register("city")} // Use register to link the input to validation schema
                              InputLabelProps={{
                                style: { fontSize: 14 }, // Adjust the fontSize for the label
                              }}
                              inputProps={{
                                style: { fontSize: 14 }, // Adjust the fontSize for the input text
                              }}
                              InputProps={{
                                endAdornment: errors.city ? (
                                  <InputAdornment position="end">
                                    <ErrorRoundedIcon color="error" />
                                  </InputAdornment>
                                ) : null,
                                style: {
                                  borderColor: errors.city
                                    ? color_error
                                    : "inherit", // Set underline color to red on error
                                },
                              }}
                              variant="outlined"
                            />
                            {/* Display the name error message if there is one */}
                            {errors.city && (
                              <FormHelperText>
                                {errors.city.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Box>
                      </Stack>
                    </Collapse>
                  </Paper>

                  {/* Shipping Method */}
                  <Typography
                    variant="h2"
                    sx={{ fontWeight: "500", fontSize: "1rem" }}
                  >
                    {content[lang]["shippingMethodHeader"]}
                  </Typography>
                  <Paper
                    elevation={3}
                    sx={{
                      justifyContent: "space-between",
                      width: "100%",
                      borderRadius: "10px",
                      marginBottom: "1em !important",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <>
                          <Radio
                            checked={shippingMethod === "standard"}
                            onChange={(event) =>
                              setShippingMethod(event.target.value)
                            }
                            value="standard"
                            name="radio-buttons"
                            size="small"
                            sx={{ paddingLeft: 0 }}
                            inputProps={{
                              "aria-label": "Til Butikk (1-5 virkedager)",
                            }}
                          />
                          <Typography variant="body2" fontSize={14}>
                            {content[lang]["shippingOption1"]}
                          </Typography>
                        </>
                      }
                      label={
                        <Typography
                          sx={{
                            fontSize: ".8rem",
                            fontWeight: "500",
                            marginLeft: "auto",
                          }}
                        >
                          {formatCurrency(calculateShopShipping())}
                        </Typography>
                      }
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                        alignItems: "center",
                        textAlign: "left",
                        gap: ".5em",
                        padding: ".5em 1em",
                        margin: 0,
                      }}
                    />

                    <Divider />

                    <FormControlLabel
                      control={
                        <>
                          <Radio
                            checked={shippingMethod === "home"}
                            onChange={(event) =>
                              setShippingMethod(event.target.value)
                            }
                            value="home"
                            name="radio-buttons"
                            size="small"
                            sx={{ paddingLeft: 0 }}
                            inputProps={{
                              "aria-label": "Hjemlevering (1-3 virkedager)",
                            }}
                          />
                          <Typography variant="body2" fontSize={14}>
                            {content[lang]["shippingOption2"]}
                          </Typography>
                        </>
                      }
                      label={
                        <Typography
                          sx={{
                            fontSize: ".8rem",
                            fontWeight: "500",
                            marginLeft: "auto",
                          }}
                        >
                          {formatCurrency(99)}
                        </Typography>
                      }
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                        alignItems: "center",
                        textAlign: "left",
                        gap: ".5em",
                        padding: ".5em 1em",
                        margin: 0,
                      }}
                    />
                  </Paper>

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
                  <Paper
                    elevation={3}
                    sx={{
                      justifyContent: "space-between",
                      width: "100%",
                      borderRadius: "10px",
                      marginBottom: "1em !important",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <>
                          <Radio
                            checked={creditCard}
                            onChange={handlePaymentChange}
                            value="creditCard"
                            name="radio-buttons"
                            size="small"
                            sx={{ paddingLeft: 0 }}
                            inputProps={{
                              "aria-label": "Same as shipping address",
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "500",
                              fontSize: ".8rem",
                              marginRight: "auto",
                            }}
                          >
                            {content[lang]["paymentOption1"]}
                          </Typography>
                        </>
                      }
                      label={
                        <Box
                          sx={{
                            marginLeft: "auto",
                            display: "flex",
                            gap: ".3em",
                          }}
                        >
                          <img
                            src={Visa}
                            style={{ width: "40px", height: "25px" }}
                            alt="Visa logo"
                          />
                          <img
                            src={MasterCard}
                            style={{ width: "40px", height: "25px" }}
                            alt="Mastercard logo"
                          />
                        </Box>
                      }
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                        alignItems: "center",
                        textAlign: "left",
                        gap: ".5em",
                        padding: ".5em 1em",
                        margin: 0,
                      }}
                    />
                    <Collapse in={creditCard}>
                      <Divider />
                      <Stack
                        spacing={3}
                        padding={2}
                        sx={{
                          backgroundColor: "#fcfbfb",
                          paddingBottom: "2em",
                        }}
                      >
                        {/* Payment form */}
                        <Controller
                          name="cardNumber"
                          control={control}
                          render={({ field }) => (
                            <CreditCardInput
                              label={content[lang]["paymentCardNumberLabel"]}
                              value={field.value}
                              onChange={field.onChange}
                              error={Boolean(errors.cardNumber)}
                            />
                          )}
                        />
                        <FormControl
                          variant="outlined"
                          error={Boolean(errors.cardName)}
                        >
                          <FormTextField
                            sx={{ background: "white" }}
                            label={content[lang]["paymentNameOnCardLabel"]}
                            id="cardName"
                            name="cardName"
                            error={Boolean(errors.cardName)}
                            {...register("cardName")} // Use register to link the input to validation schema
                            InputLabelProps={{
                              style: { fontSize: 14 }, // Adjust the fontSize for the label
                            }}
                            inputProps={{
                              style: { fontSize: 14 }, // Adjust the fontSize for the input text
                            }}
                            InputProps={{
                              endAdornment: errors.cardName ? (
                                <InputAdornment position="end">
                                  <ErrorRoundedIcon color="error" />
                                </InputAdornment>
                              ) : null,
                              style: {
                                borderColor: errors.cardName
                                  ? color_error
                                  : "inherit", // Set underline color to red on error
                              },
                            }}
                            variant="outlined"
                          />
                          {/* Display the name error message if there is one */}
                          {errors.cardName && (
                            <FormHelperText>
                              {errors.cardName.message}
                            </FormHelperText>
                          )}
                        </FormControl>

                        <Box gap={2} display="flex">
                          <Controller
                            fullWidth
                            name="exp"
                            control={control}
                            error={Boolean(errors.exp)}
                            render={({ field }) => (
                              <ExpirationDateInput
                                value={field.value}
                                onChange={field.onChange}
                                label={
                                  isMobile
                                    ? content[lang][
                                        "paymentExpiryDateLabelShort"
                                      ]
                                    : content[lang][
                                        "paymentExpiryDateLabelLong"
                                      ]
                                }
                                error={Boolean(errors.exp)}
                              />
                            )}
                          />
                          <Controller
                            fullWidth
                            name="security"
                            control={control}
                            error={Boolean(errors.security)}
                            render={({ field }) => (
                              <SecurityCodeInput
                                value={field.value}
                                onChange={field.onChange}
                                label={content[lang]["paymentCVCCodeLabel"]}
                                error={Boolean(errors.security)}
                              />
                            )}
                          />
                        </Box>
                      </Stack>
                    </Collapse>
                    <Divider />
                    <FormControlLabel
                      control={
                        <Radio
                          checked={vipps}
                          onChange={handlePaymentChange}
                          value="vipps"
                          size="small"
                          name="radio-buttons"
                          sx={{ paddingLeft: 0 }}
                          inputProps={{
                            "aria-label": "Same as shipping address",
                          }}
                        />
                      }
                      label={
                        <img
                          style={{ width: "60px" }}
                          src={vippsLogo}
                          alt="Vipps Logo"
                        />
                      }
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                        alignItems: "baseline",
                        gap: ".5em",
                        padding: ".5em 1em",
                        margin: 0,
                      }}
                    />
                  </Paper>
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
