import { useState, useContext } from "react";
import Layout from "components/Layout";
import PhoneAnimation from "components/PhoneAnimation";
import { Button } from "techhype-components";
import { LangContext } from "utils/LangContext";
import { content } from "constants/content";

function Home() {
  const [lang, setLang] = useContext(LangContext);

  return (
    <Layout>
      <div className="header">
        <section className="heading">
          <h1>
            {content[lang]["heading1"]}{" "}
            <span className="gradient-title">{content[lang]["heading2"]}</span>{" "}
            {content[lang]["heading3"]}
          </h1>
          <p>{content[lang]["subHeading"]}</p>
          <Button>{content[lang]["noticeButton"]}</Button>
        </section>
        <PhoneAnimation />
      </div>
      <section className="comming-soon">
        <h2>{content[lang]["commingSoon"]}</h2>
      </section>
    </Layout>
  );
}

export default Home;
