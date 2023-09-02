import React, { useContext, useState } from "react";
import { Fade } from "react-awesome-reveal";
import ReactSimplyCarousel from "react-simply-carousel";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { color_primary } from "constants/colors";

import { clientsData } from "./data/clientsData";

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
            autoplay
            autoplayDelay={5000}
            speed={400}
            forwardBtnProps={{
              //here you can also pass className, or any other button element attributes
              style: {
                display: "none",
              },
            }}
            backwardBtnProps={{
              //here you can also pass className, or any other button element attributes
              style: {
                display: "none",
              },
            }}
            dotsNav={{
              show: true,
              itemBtnProps: {
                style: {
                  height: 14,
                  width: 14,
                  border: 0,
                  borderRadius: "2px",
                  margin: "30px 2px",
                  cursor: "pointer",
                },
              },
              activeItemBtnProps: {
                style: {
                  height: 14,
                  width: 14,
                  border: 0,
                  borderRadius: "2px",
                  margin: "30px 2px",
                  background: color_primary,
                  cursor: "pointer",
                },
              },
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
          >
            {clientsData.map((client, index) => (
              <div className="client-box-container" key={index}>
                <div className="client-box-inner">
                  <img src={client.image} alt={client.label} />
                </div>
              </div>
            ))}
          </ReactSimplyCarousel>
        </Fade>
      </div>
    </section>
  );
};

export default Clients;
