import React, { useContext } from "react";
import Layout from "components/Layout";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import Product from "components/Product";
import { products } from "data/products";
import BreadcrumbsComponent from "components/BreadcrumbsComponent";

const Shop = () => {
  const [lang] = useContext(LangContext);

  const breadcrumbsLinks = [
    { to: "/", label: content[lang]["home"] },
    { to: "/shop", label: content[lang]["shop"] },
  ];

  return (
    <Layout
      page="Shop"
      description="Get started by purchasing your first digital business card from Techhype."
    >
      <section className="shop top-overlay">
        <div className="container-inner shop-container">
          <BreadcrumbsComponent links={breadcrumbsLinks} />
          <h1>{content[lang]["shopHeading"]}</h1>
          <div className="product-grid">
            {products.map((item) => (
              <Product {...item} image={item.image[0]} key={item.id} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
