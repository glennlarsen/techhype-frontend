import React, { useContext, useState, useEffect } from "react";
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

function Home() {
  const [lang, setLang] = useContext(LangContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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
    <Layout
      page="Home"
      description="Techhype is the next Generation digital Business Card. Tap and Share your contact details in one second."
    >
      <section className="header">
        <div className="header-container container-inner">
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
          <PhoneAnimation />
        </div>
      </section>

      <section className="howItWorks">
        <h2>{content[lang]["howHeading"]}</h2>
        <div className="how-container container-inner">
          <Card minHeight={windowWidth <= 900 ? "none" : "397px"} width="100%">
            <div className="techhype-card-icon">Techhype</div>
            <h3>
              <span className="number-circle">1</span>
              {content[lang]["purchaseHeading"]}
            </h3>
            <p>{content[lang]["purchaseText"]}</p>
            <Button size="small">{content[lang]["purchaseButton"]}</Button>
          </Card>
          <Card minHeight={windowWidth <= 900 ? "none" : "397px"} width="100%">
            <UilUser size={50} color="#54d4c6" />
            <h3>
              <span className="number-circle">2</span>
              {content[lang]["createProfileHeading"]}
            </h3>
            <p>{content[lang]["createProfileText"]}</p>
            <Button size="small">{content[lang]["createProfileButton"]}</Button>
          </Card>
          <Card
            minHeight={windowWidth <= 900 ? "none" : "397px"}
            width="100%"
            className="shake-card"
          >
            <UilMobileVibrate size={50} color="#54d4c6" />
            <h3>
              <span className="number-circle">3</span>
              {content[lang]["goHeading"]}
            </h3>
            <p>{content[lang]["goText"]}</p>
            <div className="placeholder-button"></div>
          </Card>
        </div>
      </section>

      <section className="reviews">
        <h2>{content[lang]["reviewsHeading"]}</h2>
        <p className="reviews-subheading">
        {content[lang]["reviewsSubHeading"]}
        </p>
        <div className="reviews-container container-inner">
          <Card width="100%" className="shake-card">
            <Rating
              name="review"
              value="5"
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.6 }} fontSize="inherit" />
              }
            />
            <p>
              "Great product which made my life so much easier. Now I dont need
              to spend time buying and editing my business cards ever again!
              Simple to use and fantastic customer service from the Techhype
              team."{" "}
            </p>
            <img src={Håkon} alt="Håkon Ekseth" />
            <strong>Håkon E.</strong>
            <span>{content[lang]["verifiedCustomer"]}</span>
          </Card>
          <Card width="100%" className="shake-card">
            <Rating
              name="review"
              value="4.7"
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.6 }} fontSize="inherit" />
              }
            />
            <p>
              "I am impressed with Techhype's digital business card solution! It
              has made networking so much easier and more efficient. The sleek
              design and interactive features have definitely helped me leave a
              lasting impression on potential clients."{" "}
            </p>
            <img src={Glenn} alt="Håkon Ekseth" />
            <strong>Glenn L.</strong>
            <span>{content[lang]["verifiedCustomer"]}</span>
          </Card>
          <Card width="100%" className="shake-card">
            <Rating
              name="review"
              value="5"
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.6 }} fontSize="inherit" />
              }
            />
            <p>
              "Techhype's digital business card has revolutionized the way I
              connect with others. It's incredibly user-friendly, customizable,
              and has all the essential features I need. Thanks to Techhype,
              I've streamlined my networking efforts and made a great impression
              on prospects."{" "}
            </p>
            <img src={Kim} alt="Håkon Ekseth" />
            <strong>Kim H.</strong>
            <span>{content[lang]["verifiedCustomer"]}</span>
          </Card>
        </div>
        <Button size="small">{content[lang]["moreReviewsButton"]}</Button>
      </section>

      <section className="clients">
        <h3>{content[lang]["clientsHeading"]}</h3>
        <div className="clients-container container-inner">
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
              children: <ArrowForwardIosIcon fontSize="large" color="#1f2427" />,
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
            {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
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
        </div>
      </section>
    </Layout>
  );
}

export default Home;
