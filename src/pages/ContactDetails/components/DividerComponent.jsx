// DividerComponent.js
import React from "react";
import Divider from "@mui/material/Divider";

function DividerComponent() {
  return (
    <Divider
      sx={{
        width: "calc(100% + 2em)",
        borderColor: "rgba(255, 255, 255, 0.12)",
        margin: ".5em 0",
        marginLeft: "-1em",
        marginRight: "-1em",
      }}
    />
  );
}

export default DividerComponent;
