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
  InputLabel,
  Input,
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
import PhoneInput from "components/forms/PhoneInput";
import { useShoppingCart } from "context/ShoppingCartContext";
import { Link as RouterLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import OrderSummary from "components/OrderSummary";
import AppTheme from "components/forms/AppTheme";
import OrderSummaryToggle from "components/OrderSummaryToggle";
import Radio from "@mui/material/Radio";
import { formatCurrency } from "utils/formatCurrency";
import { color_light } from "constants/colors";
import { SHIPPING_COST } from "constants/validationRules";
import { products } from "data/products";
import vippsLogo from "images/vipps_logo.png";
import FormTextField from "components/forms/FormTextField";
import LockIcon from "@mui/icons-material/Lock";
import HelpIcon from "@mui/icons-material/Help";

const Payment = () => {
  const [lang] = useContext(LangContext);
  const [defaultCallingCode, setDefaultCallingCode] = useState("NO");
  const [defaultCountry, setDefaultCountry] = useState("Norway");
  const { cartItems } = useShoppingCart();
  const isMobile = useMediaQuery({ maxWidth: 990 });
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [billingAddress, setBillingAddress] = useState(false);
  const [selectBilling, setSelectBilling] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentType, setPaymentType] = useState(true);
  const [selectPayment, setSelectPayment] = useState(true);
  const navigate = useNavigate();

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
      page={content[lang]["paymentHeading"]}
      description="Checkout, pay and wait for your cards to be shipped as fast as possible"
    >
      <AppTheme>
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
                        Contact
                      </Typography>
                      <Typography variant="body2">
                        glenn_lar@hotmail.com | +47 91771028
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
                        Ship to
                      </Typography>
                      <Typography variant="body2">
                        Vestre Holbergsallmenningen 10, 5011 Bergen, Norway
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
                  Billing Address
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: ".8rem",
                    marginTop: "5px !important",
                    textAlign: "left",
                  }}
                >
                  Select the address that matches your card or payment method.
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
                        Same as shipping address
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
                        Use a different address
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
                      </Stack>
                    </form>
                  </Collapse>
                </Paper>

                {/* Shipping Method */}
                <Typography
                  variant="h2"
                  sx={{ fontWeight: "500", fontSize: "1rem" }}
                >
                  Shipping Method
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
                        <Typography variant="body2">
                          Standard (1-5 Days)
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
                        <Typography variant="body2">
                          Home Delivery (1-3 Days)
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
                  Payment
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: ".8rem",
                    marginTop: "5px !important",
                    textAlign: "left",
                  }}
                >
                  All transactions are secure and encrypted.
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
                        Credit Card
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
                        {/* Billing Address form */}
                        <FormControl variant="outlined">
                          <FormTextField
                            sx={{ backgroundColor: "white" }}
                            label="Card number"
                            id="name"
                            name="name"
                            value={shippingAddress.name}
                            onChange={handleShippingAddressChange}
                            InputProps={{
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
                            label="Name on card"
                            id="name"
                            name="name"
                            value={shippingAddress.name}
                            onChange={handleShippingAddressChange}
                            InputLabelProps={{
                              style: { fontSize: 14, marginTop: 4 }, // Adjust the fontSize for the label
                            }}
                          />
                        </FormControl>
                        <Box gap={2} display="flex">
                          <FormControl variant="outlined" fullWidth>
                            <FormTextField
                              sx={{ backgroundColor: "white" }}
                              label="Exp (MM / YY)"
                              id="name"
                              name="name"
                              value={shippingAddress.name}
                              onChange={handleShippingAddressChange}
                              InputLabelProps={{
                                style: { fontSize: 14, marginTop: 4 }, // Adjust the fontSize for the label
                              }}
                            />
                          </FormControl>
                          <FormControl variant="outlined" fullWidth>
                            <FormTextField
                              sx={{ backgroundColor: "white" }}
                              label="Security code"
                              id="name"
                              name="name"
                              value={shippingAddress.name}
                              onChange={handleShippingAddressChange}
                              InputProps={{
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
