import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

import { LangContext } from "context/LangContext";
import { content } from "constants/content";

import Layout from "components/Layout";
import PhoneAnimation from "components/PhoneAnimation";
import MainHeading from "components/typography/MainHeading";
import HowItWorks from "components/HowItWorks";
import Benefits from "components/Benefits";
import Reviews from "components/Reviews";
import Clients from "components/Clients";

function Home({ toggleDrawer}) {
  const [lang] = useContext(LangContext);
  let location = useLocation();

  useEffect(() => {
    const calculateOffset = () => {
      // Calculate your offset here if needed
      return -72; // height of the sticky navigation
    };

    if (location.hash) {
      const sectionId = location.hash.slice(1);
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        const offset = calculateOffset();
        const options = {
          behavior: "smooth",
          block: "start",
          inline: "nearest",
          top:
            sectionElement.getBoundingClientRect().top +
            window.scrollY +
            offset,
        };
        window.scrollTo(options);
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <Layout
      page="Home"
      description="Techhype is the next Generation digital Business Card. Tap and Share your contact details in one second."
      toggleDrawer={toggleDrawer}
    >
      <section className="header" id="header">
        <div className="header-container container-inner">
          <Fade direction="left" triggerOnce>
            <MainHeading
              heading1={content[lang]["heading1"]}
              heading2={content[lang]["heading2"]}
              heading3={content[lang]["heading3"]}
              text={content[lang]["subHeading"]}
              button={content[lang]["getStartedButton"]}
            />
          </Fade>
          <Fade triggerOnce>
            <PhoneAnimation />
          </Fade>
        </div>
      </section>
      <HowItWorks />
      <Benefits />
      <Reviews />
      <Clients />
    </Layout>
  );
}

export default Home;
