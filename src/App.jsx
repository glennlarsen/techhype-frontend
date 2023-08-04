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

import { LangProvider } from "context/LangContext";
import ScrollToTop from "components/ScrollToTop";
import { ShoppingCartProvider } from "context/ShoppingCartContext";

function App() {
  return (
    <LangProvider>
      <ShoppingCartProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/contactDetails" element={<ContactDetails />} />
          </Routes>
        </Router>
      </ShoppingCartProvider>
    </LangProvider>
  );
}

export default App;
