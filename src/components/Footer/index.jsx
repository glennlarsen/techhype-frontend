import { useContext } from "react";
import LogoLong from "logo/logo-long.png";
import { LangContext } from "utils/LangContext";
import { content } from "constants/content";

function Footer() {
  const [lang, setLang] = useContext(LangContext);

  return (
    <footer>
      <div className="footer-container container-inner">
        <div className="footer-links">
          <strong>{content[lang]["footerHeading"]}</strong>
          <a href="#">{content[lang]["footerLink1"]}</a>
          <a href="#">{content[lang]["footerLink2"]}</a>
          <a href="#">{content[lang]["footerLink3"]}</a>
          <a href="#">{content[lang]["footerLink4"]}</a>
          <a href="#">{content[lang]["footerLink5"]}</a>
        </div>
        <div className="footer-info">
          <img src={LogoLong} alt="Techhype Logo" />
          {content[lang]["footerInfo"]}
        </div>
      </div>
      <div className="footer-line">
        <p>{content[lang]["copyRights"]}</p>
      </div>
    </footer>
  );
}

export default Footer;
