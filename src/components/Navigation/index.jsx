import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { content } from "constants/content";
import { UilUserCircle, UilShoppingBag } from "@iconscout/react-unicons";
import Logo from "logo/logo.png";
import LogoNoText from "logo/logo-no-text.png";
import LanguageSelector from "components/LanguageSelector";
import { LangContext } from "context/LangContext";
import { TabletAndDesktop } from "components/ScreenViewSize";
import "@animated-burgers/burger-rotate/dist/styles.css";
import Tooltip from "@mui/material/Tooltip";
import { useShoppingCart } from "context/ShoppingCartContext";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { color_primary, color_dark } from "constants/colors";

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    background: color_primary,
    color: color_dark,
    right: 1,
    top: 4,
    height: "18px",
  },
}));

function Navigation() {
  const [lang] = useContext(LangContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const location = useLocation();
  const { cartQuantity } = useShoppingCart();

  // Define an array of paths that should trigger the sticky navigation
  const stickyPaths = ["/checkout", "/cart", "/login", "/payment"]; // Add other paths as needed

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
      console.log("scroll Position: ", scrollPosition);
      const scrollThreshold = 10; // Adjust this value as needed

      if (scrollPosition < 1) {
        window.location.hash = "";
      }

      // Check if the current path is in the stickyPaths array or if isScrolled is true
      setIsScrolled(
        stickyPaths.includes(location.pathname) ||
          scrollPosition >= scrollThreshold
      );
    }, 100); // Adjust the debounce delay as needed

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Effect to set isScrolled based on the initial path
  useEffect(() => {
    setIsScrolled(stickyPaths.includes(location.pathname));
    setIsShow(stickyPaths.includes(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        id="navbar"
        className={`nav-container sticky ${isScrolled ? "  " : "onHide "} ${
          isShow ? " stickyForce " : " "
        }`}
      >
        <div className="navigation container-inner">
          <Link to="/">
            <img
              src={LogoNoText}
              className={`logo logo-hover`}
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
            <Tooltip title={content[lang]["loginTooltip"]}>
              <Link to="/login">
                <UilUserCircle size={25} color="white" />
              </Link>
            </Tooltip>
            <Tooltip title={content[lang]["cartToolTip"]}>
              <Link
                to="/cart"
                className="cart-icon"
                style={{ position: "relative", textDecoration: "none" }}
              >
                <StyledBadge badgeContent={cartQuantity} max={99}>
                  <UilShoppingBag size={25} color="white" />
                </StyledBadge>
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
      {!isShow && (
        <div
          id="navbar"
          className={`nav-container ${isShow ? " hidden " : " "}`}
        >
          <div className="navigation container-inner">
            <Link to="/">
              <img src={Logo} className={`logo`} alt="Techhype Logo" />
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
              <Tooltip title={content[lang]["loginTooltip"]}>
                <Link to="/login">
                  <UilUserCircle size={25} color="white" />
                </Link>
              </Tooltip>
              <Tooltip title={content[lang]["cartToolTip"]}>
                <Link
                  to="/cart"
                  className="cart-icon"
                  style={{ position: "relative", textDecoration: "none" }}
                >
                  <StyledBadge badgeContent={cartQuantity} max={99}>
                    <UilShoppingBag size={25} color="white" />
                  </StyledBadge>
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
      )}
    </>
  );
}

export default Navigation;
