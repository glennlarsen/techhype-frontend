import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Layout from "components/Layout";
import Logo from "logo/logo-no-text.png";

const ProductDetails = () => {
  const { id } = useParams(); // Get the cardId from the URL

  return (
    <Layout
      page="Details"
      description="Get started by purchasing your first digital business card from Techhype."
    >
      <section className="details top-overlay">
        <div className="container-inner details-container">
          <h1>Card Details for Card ID: {id}</h1>
          <p>Page under Construction, Please come back later...</p>
          <img className="pulsate" src={Logo} alt="techhype logo" />
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetails;
