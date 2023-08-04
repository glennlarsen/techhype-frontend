import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "components/Layout";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Button } from "techhype-components";
import { FormControl, InputLabel, Input, Stack, Paper } from "@mui/material";
import {
  color_hover,
  color_primary,
  color_dark,
  color_light,
} from "constants/colors";
import CountryInput from "components/forms/CountryInput";
import schema from "constants/schema";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PhoneInput from "components/forms/PhoneInput";
import { UilShoppingBag } from "@iconscout/react-unicons";
import { useShoppingCart } from "context/ShoppingCartContext";
import CartItemSummary from "components/CartItemSummary";
import { products } from "data/products";
import FormTextField from "components/forms/FormTextField";
import { SHIPPING_COST } from "constants/validationRules";
import { formatCurrency } from "utils/formatCurrency";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { Link as RouterLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Collapse } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const theme = createTheme({
  palette: {
    primary: {
      main: color_primary,
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: color_primary,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: `2px solid ${color_primary}`,
          },
          "&:after": {
            borderBottom: `2px solid ${color_primary}`,
          },
        },
      },
    },
  },
});

const Checkout = () => {
  const [lang] = useContext(LangContext);
  const [defaultCallingCode, setDefaultCallingCode] = useState("NO");
  const [defaultCountry, setDefaultCountry] = useState("Norway");
  const { cartItems } = useShoppingCart();
  const isMobile = useMediaQuery({ maxWidth: 990 });
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  console.log(cartItems);
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
      {isMobile ? (
        <Box
          sx={{
            background: "white",
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          <Box
            onClick={handleToggleOrderSummary}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "1.3em",
              marginTop: "1em",
              zIndex: 100,
              width: "100%",
              background: color_light,
              color: color_dark,
              cursor: "pointer",
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            }}
          >
            <UilShoppingBag />
            <Typography
              ml={1}
              variant="subtitle1"
              sx={{ fontSize: ".8rem", display: "flex", alignItems: "center" }}
            >
              {showOrderSummary ? (
                <>
                  {content[lang]["hideOrderSummary"]}
                  <KeyboardArrowUpIcon />
                </>
              ) : (
                <>
                  {content[lang]["showOrderSummary"]}
                  <KeyboardArrowDownIcon />
                </>
              )}
            </Typography>
            <Typography sx={{ fontWeight: "500", marginLeft: "auto" }}>
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = products.find(
                    (i) => i.id === parseInt(cartItem.id)
                  );
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0) +
                  (cartItems.reduce((total, cartItem) => {
                    const item = products.find(
                      (i) => i.id === parseInt(cartItem.id)
                    );
                    return total + (item?.price || 0) * cartItem.quantity;
                  }, 0) > 500
                    ? 0
                    : SHIPPING_COST)
              )}
            </Typography>
          </Box>
          <Collapse in={showOrderSummary} sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: color_light,
                alignItems: "center",
                flex: 1,
                padding: "1.5em",
                color: color_dark,
              }}
            >
              <Stack spacing={3} sx={{ width: "100%" }}>
                {/* Map through the cartItems array and find the corresponding product */}
                {cartItems.map((item) => {
                  const product = products.find(
                    (product) => product.id === parseInt(item.id)
                  );
                  const { quantity } = item;

                  // Pass item and product information to the CartItemSummary component
                  return (
                    <CartItemSummary
                      key={product.id}
                      quantity={quantity}
                      {...product}
                    />
                  );
                })}
                <Box
                  sx={{
                    display: "flex",
                    gap: "1em",
                    alignItems: "center",
                    padding: ".5em 0",
                  }}
                >
                  <FormTextField
                    placeholder={content[lang]["discountCode"]}
                    fullWidth
                    size="small"
                    sx={{ backgroundColor: "white" }}
                  />
                  <Button
                    style={{
                      background: "transparent",
                      border: `2px solid ${color_primary}`,
                      color: color_dark,
                    }}
                    size="small"
                  >
                    {content[lang]["DiscountButton"]}
                  </Button>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>{content[lang]["checkoutShipping"]}</Typography>
                  {formatCurrency(
                    cartItems.reduce((total, cartItem) => {
                      const item = products.find(
                        (i) => i.id === parseInt(cartItem.id)
                      );
                      return total + (item?.price || 0) * cartItem.quantity;
                    }, 0) > 500
                      ? 0
                      : SHIPPING_COST
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: "500" }}>
                    {content[lang]["checkoutTotal"]}
                  </Typography>
                  <Typography sx={{ fontWeight: "500" }}>
                    {formatCurrency(
                      cartItems.reduce((total, cartItem) => {
                        const item = products.find(
                          (i) => i.id === parseInt(cartItem.id)
                        );
                        return total + (item?.price || 0) * cartItem.quantity;
                      }, 0) +
                        (cartItems.reduce((total, cartItem) => {
                          const item = products.find(
                            (i) => i.id === parseInt(cartItem.id)
                          );
                          return total + (item?.price || 0) * cartItem.quantity;
                        }, 0) > 500
                          ? 0
                          : SHIPPING_COST)
                    )}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Collapse>
        </Box>
      ) : (
        ""
      )}
      <ThemeProvider theme={theme}>
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: color_light,
                  borderRadius: "10px",
                  flex: 1,
                  padding: isMobile ? 0 : "2em",
                }}
              >
                <Stack spacing={3} sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "2em",
                      justifyContent: "center",
                    }}
                  >
                    <UilShoppingBag />
                    <Typography
                      onClick={handleToggleOrderSummary}
                      ml={1}
                      variant="subtitle1"
                      sx={{ fontWeight: "500" }}
                    >
                      {content[lang]["checkoutOrderSummary"]}
                    </Typography>
                  </Box>
                  {/* Map through the cartItems array and find the corresponding product */}
                  {cartItems.map((item) => {
                    const product = products.find(
                      (product) => product.id === parseInt(item.id)
                    );
                    const { quantity } = item;

                    // Pass item and product information to the CartItemSummary component
                    return (
                      <CartItemSummary
                        key={product.id}
                        quantity={quantity}
                        {...product}
                      />
                    );
                  })}
                  <Box
                    sx={{
                      display: "flex",
                      gap: "1em",
                      alignItems: "center",
                      padding: ".5em 0",
                    }}
                  >
                    <FormTextField
                      placeholder={content[lang]["discountCode"]}
                      fullWidth
                      size="small"
                      sx={{ backgroundColor: "white" }}
                    />
                    <Button
                      style={{
                        background: "transparent",
                        border: `2px solid ${color_primary}`,
                        color: color_dark,
                      }}
                      size="small"
                    >
                      {content[lang]["DiscountButton"]}
                    </Button>
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography>{content[lang]["checkoutShipping"]}</Typography>
                    {formatCurrency(
                      cartItems.reduce((total, cartItem) => {
                        const item = products.find(
                          (i) => i.id === parseInt(cartItem.id)
                        );
                        return total + (item?.price || 0) * cartItem.quantity;
                      }, 0) > 500
                        ? 0
                        : SHIPPING_COST
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontWeight: "500" }}>
                      {content[lang]["checkoutTotal"]}
                    </Typography>
                    <Typography sx={{ fontWeight: "500" }}>
                      {formatCurrency(
                        cartItems.reduce((total, cartItem) => {
                          const item = products.find(
                            (i) => i.id === parseInt(cartItem.id)
                          );
                          return total + (item?.price || 0) * cartItem.quantity;
                        }, 0) +
                          (cartItems.reduce((total, cartItem) => {
                            const item = products.find(
                              (i) => i.id === parseInt(cartItem.id)
                            );
                            return (
                              total + (item?.price || 0) * cartItem.quantity
                            );
                          }, 0) > 500
                            ? 0
                            : SHIPPING_COST)
                      )}
                    </Typography>
                  </Box>
                  <Paper
                    elevation={3}
                    sx={{
                      background: "transparent",
                      marginTop: "2em",
                      gap: "1em",
                      padding: "1.5em",
                      borderRadius: "10px",
                      alignItems: "center",
                      fontStyle: "italic",
                      fontSize: ".9rem",
                      display: isMobile ? "none" : "flex",
                    }}
                  >
                    <DesignServicesIcon sx={{ color: color_primary }} />
                    {content[lang]["cartTip"]}
                  </Paper>
                </Stack>
              </Box>
            )}
          </div>
        </section>
      </ThemeProvider>
    </Layout>
  );
};

export default Checkout;
