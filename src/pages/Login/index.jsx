import React, { useContext } from "react";
import Layout from "components/Layout";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";
import Logo from "logo/logo-no-text.png";

const Login = () => {
  const [lang, ] = useContext(LangContext);

  return (
    <Layout
      page="Login"
      description="Login to your Techhype account"
    >
      <section className="login top-overlay">
        <div className="container-inner login-container">
          <h1>{content[lang]["loginHeading"]}</h1>
          <p>Page under Construction, Please come back later...</p>
          <img className="pulsate" src={Logo} alt="techhype logo" />
        </div>
      </section>
    </Layout>
  );
};

export default Login;
