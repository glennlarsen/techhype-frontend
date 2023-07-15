import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoLong from "logo/logo-long.png";
import { LangContext } from "utils/LangContext";
import { content } from "constants/content";
import SocialMedia from "components/SocialMedia";

function Footer() {
  const [lang, ] = useContext(LangContext);

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer>
      <div className="footer-container container-inner">
        <div className="footer-links">
          <strong>{content[lang]["footerHeading"]}</strong>
          <Link to="/shop">{content[lang]["footerLink1"]}</Link>
          <Link to="/#howItWorks">
            {content[lang]["footerLink2"]}
          </Link>
          <Link to="/#reviews">
            {content[lang]["footerLink3"]}
          </Link>
          <Link to="/contact">{content[lang]["footerLink4"]}</Link>
          <Link to="/login">{content[lang]["footerLink5"]}</Link>
        </div>

        <div className="footer-info">
          <img src={LogoLong} alt="Techhype Logo" onClick={handleLogoClick} />
          {content[lang]["footerInfo"]}
        </div>
      </div>
      <div>
      <SocialMedia />
      </div>
      <div className="footer-line">
        <p>{content[lang]["copyRights"]}</p>
      </div>
    </footer>
  );
}

export default Footer;
