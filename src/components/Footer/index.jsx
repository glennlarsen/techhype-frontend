import { useContext } from "react";
import LogoLong from "logo/logo-long.png";
import { LangContext } from "utils/LangContext";
import { content } from "constants/content";
import SocialMedia from "components/SocialMedia";

function Footer({ scrollToSection }) {
  const [lang, setLang] = useContext(LangContext);

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
          <a href="#">{content[lang]["footerLink1"]}</a>
          <a href="#" onClick={() => scrollToSection("howItWorks")}>
            {content[lang]["footerLink2"]}
          </a>
          <a href="#" onClick={() => scrollToSection("reviews")}>
            {content[lang]["footerLink3"]}
          </a>
          <a href="#">{content[lang]["footerLink4"]}</a>
          <a href="#">{content[lang]["footerLink5"]}</a>
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
