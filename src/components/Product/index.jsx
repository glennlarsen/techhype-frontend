import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { Button } from "techhype-components";
import { Fade } from "react-awesome-reveal";
import { formatCurrency } from "utils/formatCurrency";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Product = ({ name, image, price, id }) => {
  const [lang] = useContext(LangContext);
  const navigate = useNavigate();

  return (
    <Fade direction="up" triggerOnce>
      <div className="product-item">
        <div className="product-image">
          <LazyLoadImage
            alt={name}
            src={image}
            effect="blur" // Adds a blur effect for the placeholder image
            height="100%" // Set the desired height to avoid layout shifts
            width="100%" // Set the desired width to avoid layout shifts
          />
        </div>
        <div className="product-info">
          <div className="product-text">
            <h2>{name}</h2>
            <span>{formatCurrency(price)}</span>
          </div>
          <Button
            size="small"
            onClick={() => navigate(`/shop/${id}`)}
            style={{ flex: 1 }}
          >
            {content[lang]["productButton"]}
          </Button>
        </div>
      </div>
    </Fade>
  );
};

export default Product;
