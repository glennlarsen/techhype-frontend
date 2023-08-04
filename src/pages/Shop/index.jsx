import React, { useContext } from "react";
import Layout from "components/Layout";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import Product from "components/Product";
import { products } from "data/products";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from '@mui/material/Link';
import {
  Link as RouterLink,
} from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Shop = () => {
  const [lang] = useContext(LangContext);

  function LinkRouter(props) {
    return <Link {...props} component={RouterLink} />;
  }

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
              separator={<NavigateNextIcon fontSize="small" />}
              sx={{ ol: { justifyContent: "center" } }}
            >
              <LinkRouter
                underline="hover"
                color="rgba(255, 255, 255, 0.65)"
                to="/"
              >
                {content[lang]["home"]}
              </LinkRouter>
              <Typography color="white">{content[lang]["shop"]}</Typography>
            </Breadcrumbs>
          </div>
          <h1>{content[lang]["shopHeading"]}</h1>
          <div className="product-grid">
            {products.map((item) => (
              <Product
                {...item}
                image={item.image[0]}
                key={item.id}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
