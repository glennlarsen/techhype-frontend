import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Layout from "components/Layout";
import ImageCarouselGallery from "./ImageCarouselGallery";
import { products } from "constants/products";
import { Button } from "techhype-components";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "constants/schema";
import { LangContext } from "utils/LangContext";
import { content } from "constants/content";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const ProductDetails = () => {
  const [lang] = useContext(LangContext);
  const { id } = useParams(); // Get the cardId from the URL

  // Find the product with the matching id
  const product = products.find((product) => product.id === parseInt(id, 10));

  const selectTheme = createTheme({
    components: {
      MuiSelect: {
        styleOverrides: {
          outlined: {
            borderRadius: "10px",
            background: "#1f2427",
            color: "white",
            width: "60px",
            borderColor: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiInputLabel-outlined": {
              color: "white",
            },
            "&:focus": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#54d4c6",
              },
              "& .MuiInputLabel-outlined": {
                color: "#54d4c6",
              },
            },
          },
        },
      },
    },
    palette: {
      primary: {
        main: "#54d4c6",
      },
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
                {content[lang]["home"]}
              </Link>
              <Link
                underline="hover"
                color="rgba(255, 255, 255, 0.65)"
                href="/shop"
              >
                {content[lang]["shop"]}
              </Link>
              <Typography color="white">{product.name}</Typography>
            </Breadcrumbs>
          </div>
          <div className="details-item">
            <div className="details-images">
              <ImageCarouselGallery items={product.image} />
            </div>

            <div className="details-info">
              <h1>{product.name}</h1>
              <span className="details-price">{product.price} NOK</span>

              <div className="details-add">
                <ThemeProvider theme={selectTheme}>
                  <FormControl variant="outlined">
                    <InputLabel id="quantity-label" sx={{ color: "white" }}>
                    {content[lang]["quantity"]}
                    </InputLabel>
                    <Controller
                      render={({ field }) => (
                        <Select
                          label="Quantity"
                          sx={{
                            "& svg": {
                              color: "white",
                            },
                          }}
                          {...field}
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                        </Select>
                      )}
                      name="quantity"
                      control={control}
                      defaultValue={1}
                    />
                  </FormControl>
                </ThemeProvider>
                <Button size="small">{content[lang]["addToCart"]}</Button>
              </div>

              <div className="details-text">
                <span>{content[lang]["detailsAccordionHeader"]}</span>
                <p>
                {content[lang]["details1"]}
                </p>
                <p>
                {content[lang]["details2"]}
                </p>
                <p>
                {content[lang]["details3"]}
                </p>
                <span>{content[lang]["warrantyAccordionHeader"]}</span>
                <span>{content[lang]["FaqAccordionHeader"]}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetails;
