import React, { useContext } from "react";
import Layout from "components/Layout";
import { LangContext } from "utils/LangContext";
import { content } from "constants/content";
import Logo from "logo/logo-no-text.png";

const Cart = () => {
  const [lang, ] = useContext(LangContext);

  return (
    <Layout
      page="Cart"
      description="Your shopping Cart"
    >
      <section className="cart top-overlay">
        <div className="container-inner cart-container">
          <h1>{content[lang]["cartHeading"]}</h1>
          <p>Page under Construction, Please come back later...</p>
          <img className="pulsate" src={Logo} alt="techhype logo" />
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
