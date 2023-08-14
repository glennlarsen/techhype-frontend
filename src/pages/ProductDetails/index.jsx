import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Layout from "components/Layout";
import ImageCarouselGallery from "./ImageCarouselGallery";
import { products } from "data/products";
import { Button } from "techhype-components";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "utils/formatCurrency";

import { useShoppingCart } from "context/ShoppingCartContext";
import AddToCartModal from "components/AddToCartModal";
import ProductAccordions from "components/ProductAccordions";
import SelectQuantityPicker from "components/SelectQuantityPicker";
import BreadcrumbsComponent from "components/BreadcrumbsComponent";

const ProductDetails = () => {
  const [lang] = useContext(LangContext);
  const { id } = useParams(); // Get the cardId from the URL
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const { addToCart } = useShoppingCart();

  // Find the product with the matching id
  const product = products.find((product) => product.id === parseInt(id, 10));

  const breadcrumbsLinks = [
    { to: "/", label: content[lang]["home"] },
    { to: "/shop", label: content[lang]["shop"] },
    { to: "", label: product.name }, // You can modify this according to your needs
  ];

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({});

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = (id) => {
    addToCart(id, quantity);
    handleOpen(quantity);
  };

  if (!product) {
    // Handle if product not found with the given id
    return <div>Product not found</div>;
  }

  return (
    <Layout
      page="Details"
      description="Get started by purchasing your first digital business card from Techhype."
    >
      <section className="details top-overlay">
        <div className="container-inner details-container">
          <BreadcrumbsComponent links={breadcrumbsLinks} />
          <div className="details-item">
            <div className="details-images">
              <ImageCarouselGallery items={product.image} />
            </div>
            <div className="details-info">
              <h1>{product.name}</h1>
              <span className="details-price">
                {formatCurrency(product.price)}
              </span>
              <div className="details-add">
                <SelectQuantityPicker
                  lang={lang}
                  content={content}
                  quantity={quantity}
                  handleChange={handleChange}
                />
                <Button size="small" onClick={() => handleAddToCart(id)}>
                  {content[lang]["addToCart"]}
                </Button>
              </div>
              <ProductAccordions lang={lang} content={content} />
            </div>
          </div>
        </div>
      </section>

      <AddToCartModal
        open={open}
        handleClose={handleClose}
        lang={lang}
        product={product}
        quantity={quantity}
        navigate={navigate}
      />
    </Layout>
  );
};

export default ProductDetails;
