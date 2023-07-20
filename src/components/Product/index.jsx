import React, { useContext } from "react";
import { LangContext } from "utils/LangContext";
import { content } from "constants/content";
import { Button } from "techhype-components";
import { Fade } from "react-awesome-reveal";

const Product = ({ name, image, price }) => {
  const [lang] = useContext(LangContext);

  return (
    <Fade direction="up" triggerOnce>
    <div className="product-item">
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <div className="product-info">
        <div className="product-text">
          <h2>{name}</h2>
          <span>{price} NOK</span>
        </div>
        <Button size="small" style={{ flex: 1 }}>
          {content[lang]["productButton"]}
        </Button>
      </div>
    </div>
    </Fade>
  );
};

export default Product;
