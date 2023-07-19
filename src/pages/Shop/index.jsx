import React, { useContext } from "react";
import Layout from "components/Layout";
import { LangContext } from "utils/LangContext";
import { content } from "constants/content";
import WhiteCard from "images/white-card-water.png";
import BambooCard from "images/bamboo-card.png";
import { Button } from "techhype-components";

const Shop = () => {
  const [lang] = useContext(LangContext);

  return (
    <Layout
      page="Shop"
      description="Get started by purchasing your first digital business card from Techhype."
    >
      <section className="shop top-overlay">
        <div className="container-inner shop-container">
          <h1>{content[lang]["shopHeading"]}</h1>
          <div className="product-grid">
            <div className="product-item">
              <div className="product-image">
                <img src={WhiteCard} alt="White Business Card" />
              </div>
              <div className="product-info">
                <div className="product-text">
                  <h2>Plastic Card White</h2>
                  <span>299,00 NOK</span>
                </div>
                <Button size="small" style={{ flex: 1 }}>Select</Button>
              </div>
            </div>
            <div className="product-item">
              <div className="product-image">
                <img src={BambooCard} alt="Bamboo Business Card" />
              </div>
              <div className="product-info">
                <div className="product-text">
                  <h2>Bamboo Wooden Card</h2>
                  <span>399,00 NOK</span>
                </div>
                <Button size="small" style={{ flex: 1 }}>Select</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
