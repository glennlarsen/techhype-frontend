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
import ReactSimplyCarousel from "react-simply-carousel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Sixt from "images/sixt.png";
import Demokratene from "images/demokratene.png";
import Frydenbo from "images/frydenbo.jpg";
import Hamre from "images/hamre.png";
import Techhype from "images/techhype.png";
import { Fade } from "react-awesome-reveal";
import NfcCard from "images/nfc-card.png";
import { reviews } from "constants/reviews";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import RecyclingIcon from "@mui/icons-material/Recycling";
import MainHeading from "components/typography/MainHeading";

function Home() {
  const [lang, ] = useContext(LangContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  let location = useLocation();
  const navigate = useNavigate();
  const [reviewsCount, setReviewsCount] = useState(3);
  const [showViewMoreButton, setShowViewMoreButton] = useState(true);

  const handleViewMoreReviews = () => {
    setReviewsCount(reviewsCount + 3);
    setShowViewMoreButton(false);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

      <section className="howItWorks" id="howItWorks">
        <Fade direction="up" triggerOnce>
          <p className="pre-heading">{content[lang]["howPreHeading"]}</p>
          <h2>{content[lang]["howHeading"]}</h2>
        </Fade>
        <div className="how-container container-inner">
          <Fade direction="up" style={{width: "100%"}} triggerOnce>
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

      <section className="benefits" id="benefits">
        <div className="benefits-container container-inner">
          <Fade direction="up" triggerOnce>
            <div className="benefits-image">
              <img src={NfcCard} alt="NFC Card model" />
            </div>
          </Fade>
          <Fade direction="right" triggerOnce>
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
        <Fade direction="up" triggerOnce>
          <h2>{content[lang]["reviewsHeading"]}</h2>
        </Fade>
        <Fade direction="up" triggerOnce>
          <p className="reviews-subheading">
            {content[lang]["reviewsSubHeading"]}
          </p>
        </Fade>
        <div className="reviews-container container-inner">
          {reviews.slice(0, reviewsCount).map((review, index) => (
            <Fade direction="up" triggerOnce key={index}>
              <Card width="100%" height="100%">
                <Rating
                  name="review"
                  value={review.rating}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.6 }} fontSize="inherit" />
                  }
                />
                <p>{review.reviewText}</p>
                <img src={review.image} alt="Håkon Ekseth" />
                <strong>{review.name}</strong>
                <span>{content[lang]["verifiedCustomer"]}</span>
              </Card>
            </Fade>
          ))}
        </div>
        {showViewMoreButton && (
          <Button size="small" onClick={handleViewMoreReviews}>
            {content[lang]["moreReviewsButton"]}
          </Button>
        )}
      </section>

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
