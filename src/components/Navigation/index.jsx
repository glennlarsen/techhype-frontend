import React, { useContext, useState, useEffect } from "react";
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

  const handleLinkClick = (section) => {
    closeMenu();
    scrollToSection(section);
  }

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100; // Adjust this value as needed

      setIsScrolled(scrollPosition > scrollThreshold);
    }, 40); // Adjust the debounce delay as needed

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
    <div className={`nav-container${isScrolled ? " scrolled" : ""}`}>
      <div className="navigation container-inner">
        <a href="#">
        <img src={isScrolled ? LogoNoText : Logo} className="logo" />
        </a>
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
            <a href="#">{content[lang]["menuItem1"]}</a>
            <a href="#" onClick={() => handleLinkClick("howItWorks")}>{content[lang]["menuItem2"]}</a>
            <a href="#" onClick={() => handleLinkClick("reviews")}>{content[lang]["menuItem3"]}</a>
            <a href="#">{content[lang]["menuItem4"]}</a>
          </nav>
        </div>
        <nav className="desktop-menu">
          <a href="#">{content[lang]["menuItem1"]}</a>
          <a href="#" onClick={() => scrollToSection("howItWorks")}>{content[lang]["menuItem2"]}</a>
          <a href="#" onClick={() => scrollToSection("reviews")}>{content[lang]["menuItem3"]}</a>
          <a href="#">{content[lang]["menuItem4"]}</a>
        </nav>
        <div className="nav-icons">
          <a href="#">
            {windowWidth <= 900 ? (
              <UilUserCircle size={28} color="white" />
            ) : (
              <UilUserCircle size={38} color="white" />
            )}
          </a>
          <a href="#">
            {windowWidth <= 900 ? (
              <UilShoppingBag size={28} color="white" />
            ) : (
              <UilShoppingBag size={38} color="white" />
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
