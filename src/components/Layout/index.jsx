import { useState, useContext } from "react";
import Logo from "logo/logo.png";
import LanguageSelector from "components/LanguageSelector";
import Footer from "components/Footer";

function Layout({ children }) {
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="container-inner">
            <div className="navigation">
              <LanguageSelector />
              <img src={Logo} className="logo" />
              <nav>
                <a href="#">Get Started</a>
                <a href="#">How It Works</a>
                <a href="#">Reviews</a>
                <a href="#">Contact Us</a>
              </nav>
            </div>
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
