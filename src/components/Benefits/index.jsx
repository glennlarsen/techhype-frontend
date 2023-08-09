import React, { useContext } from "react";
import { Fade } from "react-awesome-reveal";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import RecyclingIcon from "@mui/icons-material/Recycling";

import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import NfcCard from "images/nfc-card.png";

const Benefits = () => {
  const [lang] = useContext(LangContext);

  return (
    <section className="benefits" id="benefits">
      <div className="benefits-container container-inner">
        <Fade direction="up" triggerOnce>
          <div className="benefits-image">
            <img src={NfcCard} alt="NFC Card model" />
          </div>
        </Fade>
        <Fade direction="right" triggerOnce>
          <div className="benefits-text">
            <p className="pre-heading">{content[lang]["benefitsPreHeading"]}</p>
            <h2>{content[lang]["benefitsHeading"]}</h2>
            <p>{content[lang]["benefitsParagraph"]}</p>
            <div className="benefits-icons">
              <div>
                <WorkOutlineIcon sx={{ color: "#54d4c6" }} />
                <span>{content[lang]["benefitsIcon1"]}</span>
              </div>
              <div>
                <CreditCardIcon sx={{ color: "#54d4c6" }} />
                <span>{content[lang]["benefitsIcon2"]}</span>
              </div>
              <div>
                <RecyclingIcon sx={{ color: "#54d4c6" }} />
                <span>{content[lang]["benefitsIcon3"]}</span>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default Benefits;
