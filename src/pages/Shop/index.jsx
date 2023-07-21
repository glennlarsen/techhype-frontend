import React, { useContext } from "react";
import Layout from "components/Layout";
import { LangContext } from "utils/LangContext";
import { content } from "constants/content";
import Product from "components/Product";
import { products } from "constants/products";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const Shop = () => {
  const [lang] = useContext(LangContext);

  return (
    <Layout
      page="Shop"
      description="Get started by purchasing your first digital business card from Techhype."
    >
      <section className="shop top-overlay">
        <div className="container-inner shop-container">
          <div role="presentation">
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{ ol: { justifyContent: "center" } }}
            >
              <Link
                underline="hover"
                color="rgba(255, 255, 255, 0.65)"
                href="/"
              >
                Home
              </Link>
              <Typography color="white">Get Started</Typography>
            </Breadcrumbs>
          </div>
          <h1>{content[lang]["shopHeading"]}</h1>
          <div className="product-grid">
            {products.map((product, index) => (
              <Product
                name={product.name}
                price={product.price}
                image={product.image[0]}
                id={product.id}
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
