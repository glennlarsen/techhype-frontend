import React from "react";
import LogoLong from "logo/logo-long.png";

function Footer() {
  return (
    <footer>
      <div className="footer-container container-inner">
        <div className="footer-links">
          <strong>Links</strong>
          <a href="#">Get Started</a>
          <a href="#">How It Works</a>
          <a href="#">Reviews</a>
          <a href="#">Contact Us</a>
          <a href="#">Login</a>
        </div>
        <div className="footer-info">
          <img src={LogoLong} alt="Techhype Logo" />
          Contactless Business card using NFC technology to simplify networking
          and sharing contact details.
        </div>
      </div>
      <div className="footer-line">
        <p>Copyright ©Techhype 2023. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
