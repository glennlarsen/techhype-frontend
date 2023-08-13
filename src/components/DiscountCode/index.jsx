import React, { useState } from "react";
import { Box, Divider } from "@mui/material";
import { content } from "constants/content";
import { color_primary, color_dark } from "constants/colors";
import { Button } from "techhype-components";
import FormTextField from "components/forms/FormTextField";

const DiscountCode = ({ confirmationPage, lang }) => {
  const [discountValue, setDiscountValue] = useState("");

  return (
    !confirmationPage && (
      <>
        <Box
          sx={{
            display: "flex",
            gap: "1em",
            alignItems: "center",
            padding: ".5em 0",
          }}
        >
          <FormTextField
            placeholder={content[lang]["discountCode"]}
            fullWidth
            size="small"
            value={discountValue}
            onChange={(event) => setDiscountValue(event.target.value)}
            sx={{ backgroundColor: "white" }}
          />
          <Button
            style={{
              background: "transparent",
              cursor: discountValue !== "" ? "default !important" : "pointer !important",
              border: `2px solid ${
                discountValue !== "" ? color_primary : "grey"
              }`,
              color: color_dark,
              opacity: discountValue !== "" ? 1 : 0.7,
            }}
            size="small"
            disabled={discountValue === ""}
          >
            {content[lang]["DiscountButton"]}
          </Button>
        </Box>
        <Divider />
      </>
    )
  );
};

export default DiscountCode;
