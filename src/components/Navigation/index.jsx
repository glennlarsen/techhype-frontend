import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { content } from "constants/content";
import {
  UilUserCircle,
  UilShoppingBag,
  UilBars,
} from "@iconscout/react-unicons";
import Logo from "logo/logo.png";
import LogoNoText from "logo/logo-no-text.png";
import LanguageSelector from "components/LanguageSelector";
import { LangContext } from "utils/LangContext";
import { Mobile, TabletAndDesktop } from "components/ScreenViewSize";

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function Navigation({ scrollToSection }) {
  const [lang, setLang] = useContext(LangContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 600); // Adjust the delay to match the slide-up animation duration
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 10; // Adjust this value as needed

      setIsScrolled(scrollPosition > scrollThreshold);
    }, 50); // Adjust the debounce delay as needed

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  return (
    <div className={`nav-container${isScrolled ? " scrolled fade-in" : ""}`}>
      <div className="navigation container-inner">
        <Link to="/">
          <img src={isScrolled ? LogoNoText : Logo} className="logo" />
        </Link>
        <TabletAndDesktop>
          <LanguageSelector />
        </TabletAndDesktop>
        <div
          className={`mobile-menu ${isMobileMenuOpen ? "open" : ""} ${
            isClosing ? "close" : ""
          }`}
        >
          <LanguageSelector />
          <div className="close-button" onClick={closeMenu}>
            <span>&times;</span>
          </div>
          <nav>
            <Link to="#">{content[lang]["menuItem1"]}</Link>
            <Link to="/#howItWorks" onClick={() => {closeMenu()}}>
              {content[lang]["menuItem2"]}
            </Link>
            <Link to="/#reviews" onClick={() => {closeMenu()}}>
              {content[lang]["menuItem3"]}
            </Link>
            <Link to="/contact">{content[lang]["menuItem4"]}</Link>
          </nav>
        </div>
        <nav className="desktop-menu">
          <Link to="#">{content[lang]["menuItem1"]}</Link>
          <Link to="/#howItWorks">
            {content[lang]["menuItem2"]}
          </Link>
          <Link to="/#reviews">
            {content[lang]["menuItem3"]}
          </Link>
          <Link to="/contact">{content[lang]["menuItem4"]}</Link>
        </nav>
        <div className="nav-icons">
          <Link to="#">
            {windowWidth <= 900 ? (
              <UilUserCircle size={28} color="white" />
            ) : (
              <UilUserCircle size={38} color="white" />
            )}
          </Link>
          <Link to="#">
            {windowWidth <= 900 ? (
              <UilShoppingBag size={28} color="white" />
            ) : (
              <UilShoppingBag size={38} color="white" />
            )}
          </Link>
        </div>
        <div className="burger-menu" onClick={toggleMobileMenu}>
          <UilBars size={32} />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
