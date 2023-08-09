import React, { useContext, useState } from "react";
import { Fade } from "react-awesome-reveal";
import ReactSimplyCarousel from "react-simply-carousel";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Sixt from "images/sixt.png";
import Demokratene from "images/demokratene.png";
import Frydenbo from "images/frydenbo.jpg";
import Hamre from "images/hamre.png";
import Techhype from "images/techhype.png";

const Clients = () => {
  const [lang] = useContext(LangContext);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <section className="clients" id="clients">
      <Fade direction="up" triggerOnce>
        <p className="pre-heading">{content[lang]["clientsPreHeading"]}</p>
        <h3>{content[lang]["clientsHeading"]}</h3>
      </Fade>
      <div className="clients-container container-inner">
        <Fade direction="left" triggerOnce>
          <ReactSimplyCarousel
            activeSlideIndex={activeSlideIndex}
            onRequestChange={setActiveSlideIndex}
            itemsToShow={1}
            itemsToScroll={1}
            preventScrollOnSwipe
            forwardBtnProps={{
              //here you can also pass className, or any other button element attributes
              style: {
                alignSelf: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                height: 30,
                width: 30,
                padding: 5,
              },
              children: (
                <ArrowForwardIosIcon fontSize="large" color="#1f2427" />
              ),
            }}
            backwardBtnProps={{
              //here you can also pass className, or any other button element attributes
              style: {
                alignSelf: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                height: 30,
                width: 30,
              },
              children: <ArrowBackIosIcon fontSize="large" color="#1f2427" />,
            }}
            responsiveProps={[
              {
                itemsToShow: 2,
                itemsToScroll: 1,
                minWidth: 750,
              },
              {
                itemsToShow: 3,
                itemsToScroll: 1,
                minWidth: 1100,
              },
              {
                itemsToShow: 4,
                itemsToScroll: 1,
                minWidth: 1300,
              },
            ]}
            speed={400}
          >
            <div className="client-box-container">
              <div className="client-box-inner">
                <img src={Sixt} alt="Sixt" />
              </div>
            </div>
            <div className="client-box-container">
              <div className="client-box-inner">
                <img src={Demokratene} alt="Demokratene" />
              </div>
            </div>
            <div className="client-box-container">
              <div className="client-box-inner">
                <img src={Hamre} alt="Hamre Frilanstjenester" />
              </div>
            </div>
            <div className="client-box-container">
              <div className="client-box-inner">
                <img src={Frydenbo} alt="Frydenbø" />
              </div>
            </div>
            <div className="client-box-container">
              <div className="client-box-inner">
                <img src={Techhype} alt="Techhype" />
              </div>
            </div>
          </ReactSimplyCarousel>
        </Fade>
      </div>
    </section>
  );
};

export default Clients;
