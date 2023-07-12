import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";

const AlertMessage = ({ title, message, variant, width }) => {
  const [open, setOpen] = useState(true);
  return (
    <Collapse sx={!width ? "100%" : width} in={open}>
      <Alert
        onClose={() => {
          setOpen(false);
        }}
        sx={{ borderRadius: "12px", width: "100%" }}
        severity={variant}
      >
        <AlertTitle sx={{ fontWeight: "600" }}>{title}</AlertTitle>
        {message}
      </Alert>
    </Collapse>
  );
};

export default AlertMessage;
