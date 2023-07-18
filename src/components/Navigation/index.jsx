import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { content } from "constants/content";
import { UilUserCircle, UilShoppingBag } from "@iconscout/react-unicons";
import Logo from "logo/logo.png";
import LogoNoText from "logo/logo-no-text.png";
import LanguageSelector from "components/LanguageSelector";
import { LangContext } from "utils/LangContext";
import { TabletAndDesktop } from "components/ScreenViewSize";
import "@animated-burgers/burger-rotate/dist/styles.css";
import Tooltip from "@mui/material/Tooltip";

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function Navigation() {
  const [lang] = useContext(LangContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
      const scrollThreshold = 12; // Adjust this value as needed

      if (scrollPosition < 1) {
        window.location.hash = "";
      }

      setIsScrolled(scrollPosition > scrollThreshold);
    }, 20); // Adjust the debounce delay as needed

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
    <div className={`nav-container${isScrolled ? " sticky " : " "}`}>
      <div className="navigation container-inner">
        <Link to="/">
          <img
            src={isScrolled ? LogoNoText : Logo}
            className={`logo ${isScrolled ? "logo-hover" : ""}`}
            alt="Techhype Logo"
          />
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
            <Link
              to="/shop"
              className={location.pathname === "/shop" ? "active" : ""}
            >
              {content[lang]["menuItem1"]}
            </Link>
            <Link
              to="/#howItWorks"
              className={
                location.pathname === "/" && location.hash === "#howItWorks"
                  ? "active"
                  : ""
              }
              onClick={() => {
                closeMenu();
              }}
            >
              {content[lang]["menuItem2"]}
            </Link>
            <Link
              to="/#reviews"
              className={
                location.pathname === "/" && location.hash === "#reviews"
                  ? "active"
                  : ""
              }
              onClick={() => {
                closeMenu();
              }}
            >
              {content[lang]["menuItem3"]}
            </Link>
            <Link
              to="/contact"
              className={location.pathname === "/contact" ? "active" : ""}
            >
              {content[lang]["menuItem4"]}
            </Link>
          </nav>
        </div>
        <nav className="desktop-menu">
          <Link
            to="/shop"
            className={location.pathname === "/shop" ? "active" : ""}
          >
            {content[lang]["menuItem1"]}
          </Link>
          <Link
            to="/#howItWorks"
            className={
              location.pathname === "/" && location.hash === "#howItWorks"
                ? "active"
                : ""
            }
          >
            {content[lang]["menuItem2"]}
          </Link>
          <Link
            to="/#reviews"
            className={
              location.pathname === "/" && location.hash === "#reviews"
                ? "active"
                : ""
            }
          >
            {content[lang]["menuItem3"]}
          </Link>
          <Link
            to="/contact"
            className={location.pathname === "/contact" ? "active" : ""}
          >
            {content[lang]["menuItem4"]}
          </Link>
        </nav>
        <div className="nav-icons">
          <Tooltip title="Login">
            <Link to="/login">
              {windowWidth <= 900 ? (
                <UilUserCircle size={28} color="white" />
              ) : (
                <UilUserCircle size={38} color="white" />
              )}
            </Link>
          </Tooltip>
          <Tooltip title="Cart">
            <Link to="/cart">
              {windowWidth <= 900 ? (
                <UilShoppingBag size={28} color="white" />
              ) : (
                <UilShoppingBag size={38} color="white" />
              )}
            </Link>
          </Tooltip>
        </div>
        <div className="burger-menu" onClick={toggleMobileMenu}>
          <div className="burger burger-rotate">
            <div className="burger-lines"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
