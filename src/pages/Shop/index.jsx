import React, { useContext } from "react";
import Layout from "components/Layout";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import Product from "components/Product";
import BreadcrumbsComponent from "components/BreadcrumbsComponent";
import useProducts from "utils/useProducts";

const Shop = ({ toggleDrawer}) => {
  const [lang] = useContext(LangContext);
  const { products, loading, error } = useProducts(); // Use the hook

  const breadcrumbsLinks = [
    { to: "/", label: content[lang]["home"] },
    { to: "/shop", label: content[lang]["shop"] },
  ];

    // Optional: Handle loading and error states *fix better loading later*
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <Layout
      page="Shop"
      description="Get started by purchasing your first digital business card from Techhype."
      toggleDrawer={toggleDrawer}
    >
      <section className="shop top-overlay">
        <div className="container-inner shop-container">
          <BreadcrumbsComponent links={breadcrumbsLinks} />
          <h1>{content[lang]["shopHeading"]}</h1>
          <div className="product-grid">
            {products.map((item) => (
              <Product {...item} image={item.images[0].src} key={item.id} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
