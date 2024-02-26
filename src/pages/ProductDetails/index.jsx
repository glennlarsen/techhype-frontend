import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Layout from "components/Layout";
import ImageCarouselGallery from "./ImageCarouselGallery";
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

import useProducts from "utils/useProducts";

const ProductDetails = () => {
  const [lang] = useContext(LangContext);
  const { id } = useParams(); // Get the cardId from the URL
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const { products, loading, error } = useProducts(); // Use the hook
  console.log("numericId: ", id);
  products.forEach((product) => {
    const productId = product.id.split("/").pop();
    console.log("Product id:", productId);
  });

  const { addToCart } = useShoppingCart();

  // Assuming `products` is an array of products with IDs in full GUID format
  const product = products.find(
    (product) => product.id.split("/").pop() === id
  );

  console.log("product: ", product);

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

  // Optional: Handle loading and error states *fix better loading later*
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  const breadcrumbsLinks = [
    { to: "/", label: content[lang]["home"] },
    { to: "/shop", label: content[lang]["shop"] },
    { to: "", label: product.title }, // You can modify this according to your needs
  ];

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
              <ImageCarouselGallery items={product.images} />
            </div>
            <div className="details-info">
              <h1>{product.title}</h1>
              <span className="details-price">
                {formatCurrency(product.variants[0].price.amount)}
              </span>
              {product.variants[0].compareAtPrice ? (
                <span className="price-compare">
                  {formatCurrency(product.variants[0].compareAtPrice.amount)}
                </span>
              ) : null}
              <div className="details-add">
                <SelectQuantityPicker
                  lang={lang}
                  content={content}
                  quantity={quantity}
                  handleChange={handleChange}
                />
                <Button
                  disabled={!product.availableForSale}
                  size="small"
                  onClick={() => handleAddToCart(id)}
                >
                  {product.availableForSale
                    ? content[lang]["addToCart"]
                    : content[lang]["outOfStock"]}
                </Button>
              </div>
              <ProductAccordions
                lang={lang}
                content={content}
                description={product.descriptionHtml}
              />
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
