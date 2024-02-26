import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { Button } from "techhype-components";
import { Fade } from "react-awesome-reveal";
import { formatCurrency } from "utils/formatCurrency";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Product = ({ title, image, variants, id, availableForSale }) => {
  const [lang] = useContext(LangContext);
  const navigate = useNavigate();
  const numericId = id.split("/").pop(); // Extracts the numeric ID part

  return (
    <Fade direction="up" triggerOnce>
      <div className="product-item">
        <div className="product-image">
          {!availableForSale && (
            <div className="product-label">{content[lang]["outOfStock"]}</div> // Label for unavailability
          )}
          <LazyLoadImage
            alt={title}
            src={image}
            effect="blur" // Adds a blur effect for the placeholder image
            height="100%" // Set the desired height to avoid layout shifts
            width="100%" // Set the desired width to avoid layout shifts
          />
        </div>
        <div className="product-info">
          <div className="product-text">
            <h2>{title}</h2>
            <div>
              <span>{formatCurrency(variants[0].price.amount)}</span>
              {variants[0].compareAtPrice ? (
                <span className="price-compare">
                  {formatCurrency(variants[0].compareAtPrice.amount)}
                </span>
              ) : null}
            </div>
          </div>
          <Button
            size="small"
            onClick={() => navigate(`/shop/${numericId}`)}
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
