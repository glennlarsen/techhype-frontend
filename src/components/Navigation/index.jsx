import React, { useContext, useState, useEffect } from "react";
import { content } from "constants/content";
import {
  UilUserCircle,
  UilShoppingBag,
  UilBars,
} from "@iconscout/react-unicons";
import Logo from "logo/logo.png";
import LanguageSelector from "components/LanguageSelector";
import { LangContext } from "utils/LangContext";

function Navigation() {
  const [lang, setLang] = useContext(LangContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="nav-container">
      <div className="navigation container-inner">
        <img src={Logo} className="logo" />
        {windowWidth <= 900 ? (
              ""
            ) : (
              <LanguageSelector />
            )}
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <LanguageSelector />
          <div className="close-button" onClick={toggleMobileMenu}>
            <span>&times;</span>
          </div>
          <nav>
            <a href="#">{content[lang]["menuItem1"]}</a>
            <a href="#">{content[lang]["menuItem2"]}</a>
            <a href="#">{content[lang]["menuItem3"]}</a>
            <a href="#">{content[lang]["menuItem4"]}</a>
          </nav>
        </div>
        <nav className="desktop-menu">
          <a href="#">{content[lang]["menuItem1"]}</a>
          <a href="#">{content[lang]["menuItem2"]}</a>
          <a href="#">{content[lang]["menuItem3"]}</a>
          <a href="#">{content[lang]["menuItem4"]}</a>
        </nav>
        <div className="nav-icons">
          <a href="#">
            {windowWidth <= 900 ? (
              <UilUserCircle size={28} color="white" />
            ) : (
              <UilUserCircle size={40} color="white" />
            )}
          </a>
          <a href="#">
            {windowWidth <= 900 ? (
              <UilShoppingBag size={28} color="white" />
            ) : (
              <UilShoppingBag size={40} color="white" />
            )}
          </a>
        </div>
        <div className="burger-menu" onClick={toggleMobileMenu}>
          <UilBars size={32} />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
