import React from "react";
import { Grid } from "@mui/material";
import { Button as MuiButton } from "@mui/material";
import { Facebook, Google } from "@mui/icons-material";
import { content } from "constants/content";

// Custom style for the Login with Google button
const loginWithGoogleStyle = {
  backgroundColor: "#db4437", // Replace this with the desired Google color code
  color: "white",
  "&:hover": {
    backgroundColor: "#c6372d", // Slightly darker color on hover
  },
};

const SocialMediaLogin = ({ lang }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item>
        <MuiButton variant="contained" startIcon={<Facebook />}>
          {content[lang]["loginFacebook"]}
        </MuiButton>
      </Grid>
      <Grid item>
        <MuiButton
          variant="contained"
          startIcon={<Google />}
          sx={loginWithGoogleStyle}
        >
          {content[lang]["loginGoogle"]}
        </MuiButton>
      </Grid>
    </Grid>
  );
};

export default SocialMediaLogin;
