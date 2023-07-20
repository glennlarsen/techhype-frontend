import React, { useContext } from "react";
import Layout from "components/Layout";
import { LangContext } from "utils/LangContext";
import { content } from "constants/content";
import Product from "components/Product";
import { products } from "constants/products";

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
            {products.map((product, index) => (
              <Product
                name={product.name}
                price={product.price}
                image={product.image}
                id={index}
                key={index} // Add a unique key for each product
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
