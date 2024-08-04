import React, { useState } from "react";
import "./sass/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Contact from "pages/Contact";
import Shop from "pages/Shop";
import Login from "pages/Login";
import Cart from "pages/Cart";
import ProductDetails from "pages/ProductDetails";
import Checkout from "pages/Checkout";
import ContactDetails from "pages/ContactDetails";
import Payment from "pages/Payment";
import Terms from "pages/Terms";
import Privacy from "pages/Privacy";
import Faq from "pages/Faq";
import OrderConfirmation from "pages/OrderConfirmation";
import Admin from "pages/Admin";
import AccountPage from "pages/Admin/AccountPage"; // Page for "Konto"
import CardsPage from "pages/Admin/CardsPage"; // Page for "Kort"
import { UserProvider } from "utils/UserContext";

import { LangProvider } from "context/LangContext";
import ScrollToTop from "components/ScrollToTop";
import { ShoppingCartProvider } from "context/ShoppingCartContext";
import { FormProvider } from "context/FormContext";
import CartDrawer from "components/CartDrawer";
import ResetPasswordForm from "components/ResetPasswordForm";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
      <UserProvider>
        <LangProvider>
          <ShoppingCartProvider>
            <FormProvider>
              <Router>
                <ScrollToTop />
                <CartDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
                <Routes>
                  <Route
                    path="/"
                    element={<Home toggleDrawer={toggleDrawer} />}
                  />
                  <Route
                    path="/contact"
                    element={<Contact toggleDrawer={toggleDrawer} />}
                  />
                  <Route
                    path="/shop"
                    element={<Shop toggleDrawer={toggleDrawer} />}
                  />
                  <Route
                    path="/shop/:id"
                    element={<ProductDetails toggleDrawer={toggleDrawer} />}
                  />
                  <Route
                    path="/login"
                    element={<Login toggleDrawer={toggleDrawer} />}
                  />
                  <Route
                    path="/cart"
                    element={<Cart toggleDrawer={toggleDrawer} />}
                  />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route
                    path="/orderConfirmation"
                    element={<OrderConfirmation />}
                  />
                  <Route
                    path="/contactDetails/:id"
                    element={<ContactDetails />}
                  />
                  <Route
                    path="/terms"
                    element={<Terms toggleDrawer={toggleDrawer} />}
                  />
                  <Route
                    path="/privacy"
                    element={<Privacy toggleDrawer={toggleDrawer} />}
                  />
                  <Route
                    path="/faq"
                    element={<Faq toggleDrawer={toggleDrawer} />}
                  />
                   <Route path="/auth/resetpassword/:token" element={<ResetPasswordForm />} />
                  <Route path="/dashboard" element={<Admin />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/cards" element={<CardsPage />} />
                  <Route
                    path="*"
                    element={
                      <main style={{ padding: "1rem", color: "white" }}>
                        <p>There's nothing here!</p>
                      </main>
                    }
                  />
                </Routes>
              </Router>
            </FormProvider>
          </ShoppingCartProvider>
        </LangProvider>
      </UserProvider>
  );
}

export default App;
