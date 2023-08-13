import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Layout from "components/Layout";
import ImageCarouselGallery from "./ImageCarouselGallery";
import { products } from "data/products";
import { Button } from "techhype-components";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "utils/formatCurrency";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import CardHeader from "@mui/material/CardHeader";
import { useShoppingCart } from "context/ShoppingCartContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { color_dark, color_hover } from "constants/colors";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SelectTheme from "components/forms/SelectTheme";

const modalStyle = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "270px",
  maxWidth: "450px",
  bgcolor: color_dark,
  boxShadow: 24,
  color: "white",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  p: 4,
};

const ProductDetails = () => {
  const [lang] = useContext(LangContext);
  const { id } = useParams(); // Get the cardId from the URL
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  function LinkRouter(props) {
    return <Link {...props} component={RouterLink} />;
  }

  const { addToCart } = useShoppingCart();

  // Find the product with the matching id
  const product = products.find((product) => product.id === parseInt(id, 10));

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
              <LinkRouter
                underline="hover"
                color="rgba(255, 255, 255, 0.65)"
                to="/shop"
              >
                {content[lang]["shop"]}
              </LinkRouter>
              <Typography color="white">{product.name}</Typography>
            </Breadcrumbs>
          </div>
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
                <SelectTheme>
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
                          onChange={handleChange}
                          value={quantity}
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
                </SelectTheme>
                <Button size="small" onClick={() => handleAddToCart(id)}>
                  {content[lang]["addToCart"]}
                </Button>
              </div>

              <div className="details-text">
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {content[lang]["detailsAccordionHeader"]}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p style={{ marginTop: 0 }}>{content[lang]["details1"]}</p>
                    <p>{content[lang]["details2"]}</p>
                    <p>{content[lang]["details3"]}</p>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {content[lang]["warrantyAccordionHeader"]}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{content[lang]["warrantyText"]}</Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {content[lang]["FaqAccordionHeader"]}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="subtitle2">
                      {content[lang]["faqQuestion1"]}
                    </Typography>
                    <Typography>{content[lang]["faqAnswer1"]}</Typography>
                    <Typography variant="subtitle2" mt={2}>
                      {content[lang]["faqQuestion2"]}
                    </Typography>
                    <Typography>{content[lang]["faqAnswer2"]}</Typography>
                    <Typography variant="subtitle2" mt={2}>
                      {content[lang]["faqQuestion3"]}
                    </Typography>
                    <Typography>{content[lang]["faqAnswer3"]}</Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              mb={2}
              display="flex"
              gap={1}
            >
              <CheckCircleOutlineIcon />
              {content[lang]["addedToCart"]}
            </Typography>
            <CardHeader
              avatar={
                <img
                  style={{ width: "90px" }}
                  src={product.image[0]}
                  alt={product.name}
                />
              }
              title={`${quantity} x ${product.name}`}
              subheader={formatCurrency(product.price)}
            />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <strong>{content[lang]["cartTotal"]}</strong>{" "}
              {formatCurrency(product.price * quantity)}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: "1em",
              }}
            >
              <Button
                style={{
                  background: "transparent",
                  border: `2px solid ${color_hover}`,
                  margin: "1em 0",
                  color: "white",
                }}
                size="small"
                onClick={handleClose}
              >
                {content[lang]["closeModalButton"]}
              </Button>
              <Button size="small" onClick={() => navigate("/cart")}>
                {content[lang]["GoToCartModalButton"]}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Layout>
  );
};

export default ProductDetails;
