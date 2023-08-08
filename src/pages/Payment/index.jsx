import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
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
  Tooltip,
} from "@mui/material";
import CountryInput from "components/forms/CountryInput";
import schema from "constants/schema";
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
import LockIcon from "@mui/icons-material/Lock";
import HelpIcon from "@mui/icons-material/Help";
import { useFormContext } from "context/FormContext";

const Payment = () => {
  const [lang] = useContext(LangContext);
  const [defaultCallingCode, setDefaultCallingCode] = useState("NO");
  const [defaultCountry, setDefaultCountry] = useState("Norway");
  const { cartItems } = useShoppingCart();
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [billingAddress, setBillingAddress] = useState(false);
  const [selectBilling, setSelectBilling] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentType, setPaymentType] = useState(true);
  const [selectPayment, setSelectPayment] = useState(true);
  const navigate = useNavigate();
  const { formData } = useFormContext();

  const calculateShopShipping = () => {
    return cartItems.reduce((total, cartItem) => {
      const item = products.find((i) => i.id === parseInt(cartItem.id));
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0) > 500
      ? 0
      : SHIPPING_COST;
  };

  const handleBillingAddressChange = (event) => {
    setSelectBilling(event.target.value === "true");
    setBillingAddress(event.target.value === "true");
  };

  const handlePaymentChange = (event) => {
    setSelectPayment(event.target.value === "true");
    setPaymentType(event.target.value === "true");
  };

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

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    nameOnCard: "",
    exp: "",
    security: "",
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
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
                        {`${formData.email} | ${formData.tel}`}
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
                        {`${formData.street}, ${formData.postalCode} ${formData.city}, ${formData.country}`}
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
                        checked={!selectBilling}
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
                      gap: ".5em",
                      padding: ".5em 1em",
                      margin: 0,
                    }}
                  />
                  <Divider />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectBilling}
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
                      gap: ".5em",
                      padding: ".5em 1em",
                      margin: 0,
                    }}
                  />
                  <Collapse in={billingAddress}>
                    <form onSubmit={handleSubmit}>
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
                          defaultValue={defaultCountry}
                          onCountrySelect={setDefaultCallingCode}
                          value={shippingAddress.country}
                          countryLabel={content[lang]["checkoutCountry"]}
                          variant="outlined"
                          fontSize={14}
                          inputBackgroundColor="white"
                        />
                        <FormControl variant="standard">
                          <FormTextField
                            sx={{ backgroundColor: "white" }}
                            label={content[lang]["checkoutName"]}
                            id="name"
                            name="name"
                            value={shippingAddress.name}
                            onChange={handleShippingAddressChange}
                            InputLabelProps={{
                              style: { fontSize: 14 }, // Adjust the fontSize for the label
                            }}
                            inputProps={{
                              style: { fontSize: 14 }, // Adjust the fontSize for the input text
                            }}
                          />
                        </FormControl>
                        <FormControl variant="standard">
                          <FormTextField
                            sx={{ backgroundColor: "white" }}
                            label={content[lang]["checkoutCompany"]}
                            id="company"
                            name="company"
                            value={shippingAddress.company}
                            onChange={handleShippingAddressChange}
                            InputLabelProps={{
                              style: { fontSize: 14 }, // Adjust the fontSize for the label
                            }}
                            inputProps={{
                              style: { fontSize: 14 }, // Adjust the fontSize for the input text
                            }}
                          />
                        </FormControl>
                        <FormControl variant="standard">
                          <FormTextField
                            sx={{ backgroundColor: "white" }}
                            label={content[lang]["checkoutStreet"]}
                            id="street"
                            name="street"
                            value={shippingAddress.street}
                            onChange={handleShippingAddressChange}
                            InputLabelProps={{
                              style: { fontSize: 14 }, // Adjust the fontSize for the label
                            }}
                            inputProps={{
                              style: { fontSize: 14 }, // Adjust the fontSize for the input text
                            }}
                          />
                        </FormControl>
                        <Box gap={2} display="flex">
                          <FormControl variant="standard">
                            <FormTextField
                              sx={{ backgroundColor: "white" }}
                              label={content[lang]["checkoutPostal"]}
                              id="postalCode"
                              name="postalCode"
                              value={shippingAddress.postalCode}
                              onChange={handleShippingAddressChange}
                              InputLabelProps={{
                                style: { fontSize: 14 }, // Adjust the fontSize for the label
                              }}
                              inputProps={{
                                style: { fontSize: 14 }, // Adjust the fontSize for the input text
                              }}
                            />
                          </FormControl>
                          <FormControl variant="standard" fullWidth>
                            <FormTextField
                              sx={{ backgroundColor: "white" }}
                              label={content[lang]["checkoutCity"]}
                              id="city"
                              name="city"
                              value={shippingAddress.city}
                              onChange={handleShippingAddressChange}
                              InputLabelProps={{
                                style: { fontSize: 14 }, // Adjust the fontSize for the label
                              }}
                              inputProps={{
                                style: { fontSize: 14 }, // Adjust the fontSize for the input text
                              }}
                            />
                          </FormControl>
                        </Box>
                      </Stack>
                    </form>
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
                      <Radio
                        checked={selectPayment}
                        onChange={handlePaymentChange}
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
                        {content[lang]["paymentOption1"]}
                      </Typography>
                    }
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "100%",
                      alignItems: "center",
                      gap: ".5em",
                      padding: ".5em 1em",
                      margin: 0,
                    }}
                  />
                  <Collapse in={paymentType}>
                    <form onSubmit={handleSubmit}>
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
                        <FormControl variant="outlined">
                          <FormTextField
                            sx={{ backgroundColor: "white" }}
                            label={content[lang]["paymentCardNumberLabel"]}
                            id="cardNumber"
                            name="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={handlePaymentInfoChange}
                            InputProps={{
                              inputProps: {
                                type: "number", // Set the input type to number
                                min: 0, // Optionally set a minimum value
                              },
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Tooltip
                                    arrow
                                    title="All transactions are secure and encrypted."
                                  >
                                    <LockIcon style={{ fontSize: 18 }} />
                                  </Tooltip>
                                </InputAdornment>
                              ),
                            }}
                            InputLabelProps={{
                              style: { fontSize: 14, marginTop: 4 }, // Adjust the fontSize for the label
                            }}
                          />
                        </FormControl>
                        <FormControl variant="outlined">
                          <FormTextField
                            sx={{ backgroundColor: "white" }}
                            label={content[lang]["paymentNameOnCardLabel"]}
                            id="nameOnCard"
                            name="nameOnCard"
                            value={paymentInfo.nameOnCard}
                            onChange={handlePaymentInfoChange}
                            InputLabelProps={{
                              style: { fontSize: 14, marginTop: 4 }, // Adjust the fontSize for the label
                            }}
                            inputProps={{
                              style: { fontSize: 14 }, // Adjust the fontSize for the input text
                            }}
                          />
                        </FormControl>
                        <Box gap={2} display="flex">
                          <FormControl variant="outlined" fullWidth>
                            <FormTextField
                              sx={{ backgroundColor: "white" }}
                              label={
                                isMobile
                                  ? content[lang]["paymentExpiryDateLabelShort"]
                                  : content[lang]["paymentExpiryDateLabelLong"]
                              }
                              id="exp"
                              name="exp"
                              value={paymentInfo.exp}
                              onChange={handlePaymentInfoChange}
                              InputLabelProps={{
                                style: { fontSize: 14, marginTop: 4 }, // Adjust the fontSize for the label
                              }}
                              InputProps={{
                                inputProps: {
                                  type: "number", // Set the input type to number
                                  min: 0, // Optionally set a minimum value
                                },
                              }}
                            />
                          </FormControl>
                          <FormControl variant="outlined" fullWidth>
                            <FormTextField
                              sx={{ backgroundColor: "white" }}
                              label={content[lang]["paymentCVCCodeLabel"]}
                              id="security"
                              name="security"
                              value={paymentInfo.security}
                              onChange={handlePaymentInfoChange}
                              InputProps={{
                                inputProps: {
                                  type: "number", // Set the input type to number
                                  min: 0, // Optionally set a minimum value
                                },
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip
                                      arrow
                                      title="3-digit security code usually found on the back of your card. "
                                    >
                                      <HelpIcon style={{ fontSize: 18 }} />
                                    </Tooltip>
                                  </InputAdornment>
                                ),
                              }}
                              InputLabelProps={{
                                style: { fontSize: 14, marginTop: 4 }, // Adjust the fontSize for the label
                              }}
                            />
                          </FormControl>
                        </Box>
                      </Stack>
                    </form>
                  </Collapse>
                  <Divider />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={!selectPayment}
                        onChange={handlePaymentChange}
                        value={false}
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
