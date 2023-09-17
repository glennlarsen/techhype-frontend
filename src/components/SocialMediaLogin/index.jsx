import React from "react";
import { Grid } from "@mui/material";
import { Button as MuiButton } from "@mui/material";
import { Facebook, Google } from "@mui/icons-material";
import { content } from "constants/content";

// Custom style for the Login with Google button
const buttonStyle = {
  width: "200px", // Set the desired width for the buttons
  height: "48px", // Set the desired height for the buttons
};

const SocialMediaLogin = ({ lang }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item sm={6}>
        <MuiButton variant="contained" startIcon={<Facebook />} sx={buttonStyle}>
          {content[lang]["loginFacebook"]}
        </MuiButton>
      </Grid>
      <Grid item sm={6}>
        <MuiButton
          variant="contained"
          startIcon={<Google />}
          sx={{
            ...buttonStyle,
            backgroundColor: "#db4437",
            "&:hover": {
              backgroundColor: "#c6372d", // Slightly darker color on hover
            },
          }}
        >
          {content[lang]["loginGoogle"]}
        </MuiButton>
      </Grid>
    </Grid>
  );
};

export default SocialMediaLogin;
