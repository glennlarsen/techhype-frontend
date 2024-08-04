import React, { useContext, useState } from "react";
import ResetPasswordForm from "components/ResetPasswordForm";
import { LangContext } from "context/LangContext";
import Head from "components/Head";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "logo/logo.png";

function ResetPassword() {
  const [lang] = useContext(LangContext);
  return (
    <>
      <Head page="Reset password" description="Reset password" />
      <div className="reset-password_container">
        <Link to="/">
          <img src={Logo} className={`logo logo-hover`} alt="Techhype Logo" />
        </Link>
        <Paper
          elevation={3}
          sx={{ maxWidth: "550px", margin: "1em", borderRadius: "10px" }}
        >
          <ResetPasswordForm lang={lang} />
        </Paper>
      </div>
    </>
  );
}

export default ResetPassword;
