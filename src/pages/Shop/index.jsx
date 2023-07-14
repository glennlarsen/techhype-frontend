import React, { useContext, useState } from "react";
import Layout from "components/Layout";
import ContactForm from "components/ContactForm";
import { LangContext } from "utils/LangContext";
import { content } from "constants/content";

const Shop = () => {
  const [lang, setLang] = useContext(LangContext);

  return (
    <Layout
      page="Shop"
      description="Get started by purchasing your first digital business card from Techhype."
    >
      <section className="shop">
        <div className="container-inner shop-container">
          <h1>Shop</h1>
          <p>Page under Construction...</p>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
