import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "components/Layout";
import PhoneAnimation from "components/PhoneAnimation";
import { Button, Card } from "techhype-components";
import { LangContext } from "utils/LangContext";
import { content } from "constants/content";
import UilUser from "@iconscout/react-unicons/icons/uil-user";
import { UilMobileVibrate } from "@iconscout/react-unicons";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Håkon from "images/håkon.jpg";
import Glenn from "images/glenn.jpg";
import Kim from "images/kim.jpg";
import ReactSimplyCarousel from "react-simply-carousel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Sixt from "images/sixt.png";
import Demokratene from "images/demokratene.png";
import Frydenbo from "images/frydenbo.jpg";
import Hamre from "images/hamre.png";
import Techhype from "images/techhype.png";
import Fade from "react-reveal/Fade";
import NfcCard from "images/nfc-card.jpeg";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import RecyclingIcon from "@mui/icons-material/Recycling";

function Home() {
  const [lang, setLang] = useContext(LangContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  let location = useLocation();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(()=> {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1))
      if(elem) {
        elem.scrollIntoView({behavior: "smooth"})
               }          
        } else {
  window.scrollTo({top:0,left:0, behavior: "smooth"})
                }
    }, [location,])

  return (
    <Layout
      page="Home"
      description="Techhype is the next Generation digital Business Card. Tap and Share your contact details in one second."
    >
      <section className="header">
        <div className="header-container container-inner">
          <Fade left>
            <div className="heading">
              <h1>
                {content[lang]["heading1"]}{" "}
                <span className="gradient-title">
                  {content[lang]["heading2"]}
                </span>{" "}
                {content[lang]["heading3"]}
              </h1>
              <p>{content[lang]["subHeading"]}</p>
              <Button>{content[lang]["getStartedButton"]}</Button>
            </div>
          </Fade>
          <Fade>
            <PhoneAnimation />
          </Fade>
        </div>
      </section>

      <section className="howItWorks" id="howItWorks">
        <Fade bottom>
          <p className="pre-heading">{content[lang]["howPreHeading"]}</p>
          <h2>{content[lang]["howHeading"]}</h2>
        </Fade>
        <div className="how-container container-inner">
          <Fade bottom width="100%">
            <Card
              minheight={windowWidth <= 900 ? "none" : "397px"}
              width="100%"
              minwidth={windowWidth <= 1300 ? "none" : "397px"}
            >
              <div className="techhype-card-icon">Techhype</div>
              <h3>
                <span className="number-circle">1</span>
                {content[lang]["purchaseHeading"]}
              </h3>
              <p>{content[lang]["purchaseText"]}</p>
              <Button size="small">{content[lang]["purchaseButton"]}</Button>
            </Card>

            <Card
              minheight={windowWidth <= 900 ? "none" : "397px"}
              width="100%"
              minwidth={windowWidth <= 1300 ? "none" : "397px"}
            >
              <UilUser size={50} color="#54d4c6" />
              <h3>
                <span className="number-circle">2</span>
                {content[lang]["createProfileHeading"]}
              </h3>
              <p>{content[lang]["createProfileText"]}</p>
              <Button size="small">
                {content[lang]["createProfileButton"]}
              </Button>
            </Card>

            <Card
              minheight={windowWidth <= 900 ? "none" : "397px"}
              width="100%"
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

      <section className="benefits">
        <div className="benefits-container container-inner">
          <Fade bottom>
            <div className="benefits-image">
              <img src={NfcCard} alt="NFC Card model" />
            </div>
          </Fade>
          <Fade right>
            <div className="benefits-text">
              <p className="pre-heading">
                {content[lang]["benefitsPreHeading"]}
              </p>
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

      <section className="reviews" id="reviews">
        <Fade bottom>
          <h2>{content[lang]["reviewsHeading"]}</h2>
        </Fade>
        <Fade bottom>
          <p className="reviews-subheading">
            {content[lang]["reviewsSubHeading"]}
          </p>
        </Fade>
        <div className="reviews-container container-inner">
          <Fade bottom>
            <Card width="100%">
              <Rating
                name="review"
                value={5}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.6 }} fontSize="inherit" />
                }
              />
              <p>
                "Great product which made my life so much easier. Now I dont
                need to spend time buying and editing my business cards ever
                again! Simple to use and fantastic customer service from the
                Techhype team."{" "}
              </p>
              <img src={Håkon} alt="Håkon Ekseth" />
              <strong>Håkon E.</strong>
              <span>{content[lang]["verifiedCustomer"]}</span>
            </Card>
          </Fade>
          <Fade bottom>
            <Card width="100%">
              <Rating
                name="review"
                value={4.7}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.6 }} fontSize="inherit" />
                }
              />
              <p>
                "I am impressed with Techhype's digital business card solution!
                It has made networking so much easier and more efficient. The
                sleek design and interactive features have definitely helped me
                leave a lasting impression on potential clients."{" "}
              </p>
              <img src={Glenn} alt="Glenn Larsen" />
              <strong>Glenn L.</strong>
              <span>{content[lang]["verifiedCustomer"]}</span>
            </Card>
          </Fade>
          <Fade bottom>
            <Card width="100%">
              <Rating
                name="review"
                value={5}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.6 }} fontSize="inherit" />
                }
              />
              <p>
                "Techhype's digital business card has revolutionized the way I
                connect with others. It's incredibly user-friendly,
                customizable, and has all the essential features I need. Thanks
                to Techhype, I've streamlined my networking efforts and made a
                great impression on prospects."{" "}
              </p>
              <img src={Kim} alt="Kim Hamre" />
              <strong>Kim H.</strong>
              <span>{content[lang]["verifiedCustomer"]}</span>
            </Card>
          </Fade>
        </div>
        <Button size="small">{content[lang]["moreReviewsButton"]}</Button>
      </section>

      <section className="clients">
        <Fade bottom>
          <p className="pre-heading">{content[lang]["clientsPreHeading"]}</p>
          <h3>{content[lang]["clientsHeading"]}</h3>
        </Fade>
        <div className="clients-container container-inner">
          <Fade left>
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
                  <img src={Sixt} alt="" />
                </div>
              </div>
              <div className="client-box-container">
                <div className="client-box-inner">
                  <img src={Demokratene} alt="" />
                </div>
              </div>
              <div className="client-box-container">
                <div className="client-box-inner">
                  <img src={Hamre} alt="" />
                </div>
              </div>
              <div className="client-box-container">
                <div className="client-box-inner">
                  <img src={Frydenbo} alt="" />
                </div>
              </div>
              <div className="client-box-container">
                <div className="client-box-inner">
                  <img src={Techhype} alt="" />
                </div>
              </div>
            </ReactSimplyCarousel>
          </Fade>
        </div>
      </section>
    </Layout>
  );
}

export default Home;
