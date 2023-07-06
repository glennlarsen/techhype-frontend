import { useState, useContext } from "react";
import Layout from "components/Layout";
import PhoneAnimation from "components/PhoneAnimation";
import { Button, Card } from "techhype-components";
import { LangContext } from "utils/LangContext";
import { content } from "constants/content";
import UilUser from "@iconscout/react-unicons/icons/uil-user";
import { UilMobileVibrate } from "@iconscout/react-unicons";

function Home() {
  const [lang, setLang] = useContext(LangContext);

  return (
    <Layout>
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
          <Card minHeight="397px" width="100%">
            <div className="techhype-card-icon">Techhype</div>
            <h3>
              <span className="number-circle">1</span>
              {content[lang]["purchaseHeading"]}
            </h3>
            <p>{content[lang]["purchaseText"]}</p>
            <Button size="small">{content[lang]["purchaseButton"]}</Button>
          </Card>
          <Card minHeight="397px" width="100%">
            <UilUser size={50} color="#54d4c6" />
            <h3>
              <span className="number-circle">2</span>
              {content[lang]["createProfileHeading"]}
            </h3>
            <p>{content[lang]["createProfileText"]}</p>
            <Button size="small">{content[lang]["createProfileButton"]}</Button>
          </Card>
          <Card minHeight="397px" width="100%" className="shake-card">
            <UilMobileVibrate size={50} color="#54d4c6" />
            <h3>
              <span className="number-circle">3</span>
              {content[lang]["goHeading"]}
            </h3>
            <p>{content[lang]["goText"]}</p>
            <div style={{ height: "51px" }}></div>
          </Card>
        </div>
      </section>
    </Layout>
  );
}

export default Home;
