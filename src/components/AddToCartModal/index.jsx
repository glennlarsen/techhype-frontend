import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button } from "techhype-components";
import { color_hover, color_dark } from "constants/colors";
import { formatCurrency } from "utils/formatCurrency";
import { content } from "constants/content";

const AddToCartModal = ({ open, handleClose, lang, product, quantity, navigate }) => {
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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
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
  );
};

export default AddToCartModal;
