import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { Button, Card } from "techhype-components";

import UilUser from "@iconscout/react-unicons/icons/uil-user";
import { UilMobileVibrate } from "@iconscout/react-unicons";

const HowItWorks = () => {
  const [lang] = useContext(LangContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

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
    <section className="howItWorks" data-section id="howItWorks">
      <Fade direction="up" triggerOnce>
        <p className="pre-heading">{content[lang]["howPreHeading"]}</p>
        <h2>{content[lang]["howHeading"]}</h2>
      </Fade>
      <div className="how-container container-inner">
        <Fade direction="up" style={{ width: "100%" }} triggerOnce>
          <Card
            minheight={windowWidth <= 900 ? "none" : "397px"}
            width="100%"
            height="100%"
            minwidth={windowWidth <= 1300 ? "none" : "397px"}
          >
            <div className="techhype-card-icon">Techhype</div>
            <h3>
              <span className="number-circle">1</span>
              {content[lang]["purchaseHeading"]}
            </h3>
            <p>{content[lang]["purchaseText"]}</p>
            <Button onClick={() => navigate("/shop")} size="small">
              {content[lang]["purchaseButton"]}
            </Button>
          </Card>

          <Card
            minheight={windowWidth <= 900 ? "none" : "397px"}
            width="100%"
            height="100%"
            minwidth={windowWidth <= 1300 ? "none" : "397px"}
          >
            <UilUser size={50} color="#54d4c6" />
            <h3>
              <span className="number-circle">2</span>
              {content[lang]["createProfileHeading"]}
            </h3>
            <p>{content[lang]["createProfileText"]}</p>
            <Button onClick={() => navigate("/login")} size="small">
              {content[lang]["createProfileButton"]}
            </Button>
          </Card>

          <Card
            minheight={windowWidth <= 900 ? "none" : "397px"}
            width="100%"
            height="100%"
            className="shake-card"
            minwidth={windowWidth <= 1300 ? "none" : "397px"}
          >
            <UilMobileVibrate size={50} color="#54d4c6" />
            <h3>
              <span className="number-circle">3</span>
              {content[lang]["goHeading"]}
            </h3>
            <p>{content[lang]["goText"]}</p>
            <div className="placeholder-button"></div>
          </Card>
        </Fade>
      </div>
    </section>
  );
};

export default HowItWorks;
