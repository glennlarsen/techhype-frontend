import React, { useContext } from "react";
import Layout from "components/Layout";
import { LangContext } from "utils/LangContext";
import { content } from "constants/content";

const Shop = () => {
  const [lang, ] = useContext(LangContext);

  return (
    <Layout
      page="Shop"
      description="Get started by purchasing your first digital business card from Techhype."
    >
      <section className="shop top-overlay">
        <div className="container-inner shop-container">
          <h1>{content[lang]["shopHeading"]}</h1>
          <p>Page under Construction...</p>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
