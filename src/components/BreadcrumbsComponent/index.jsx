import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const BreadcrumbsComponent = ({ links }) => {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{ ol: { justifyContent: "center" } }}
    >
      {links.map((link, index) => {
        if (index === links.length - 1) {
          // For the last link, render Typography instead of Link
          return (
            <Typography key={index} color="white">
              {link.label}
            </Typography>
          );
        }
        return (
          <Link
            key={index}
            component={RouterLink}
            to={link.to}
            underline="hover"
            color="rgba(255, 255, 255, 0.65)"
          >
            {link.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
