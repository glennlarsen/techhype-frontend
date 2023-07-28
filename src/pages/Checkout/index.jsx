import React, { useContext } from "react";
import Layout from "components/Layout";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import Logo from "logo/logo-no-text.png";

const Checkout = () => {
    const [lang, ] = useContext(LangContext);

    return (
      <Layout
        page="Checkout"
        description="Checkout, pay and wait for your cards to be shipped as fast as possible"
      >
        <section className="checkout top-overlay">
          <div className="container-inner checkout-container">
            <h1>{content[lang]["checkoutHeading"]}</h1>
            <p>Page under Construction, Please come back later...</p>
            <img className="pulsate" src={Logo} alt="techhype logo" />
          </div>
        </section>
      </Layout>
    );
  };

export default Checkout