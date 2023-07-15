import React, { useContext } from "react";
import Layout from "components/Layout";
import { LangContext } from "utils/LangContext";
import { content } from "constants/content";

const Cart = () => {
  const [lang, ] = useContext(LangContext);

  return (
    <Layout
      page="Cart"
      description="Your shopping Cart"
    >
      <section className="cart">
        <div className="container-inner cart-container">
          <h1>{content[lang]["cartHeading"]}</h1>
          <p>Page under Construction...</p>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
