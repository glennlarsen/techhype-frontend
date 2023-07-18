import React, { useContext } from "react";
import Layout from "components/Layout";
import { LangContext } from "utils/LangContext";
import { content } from "constants/content";

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
          <p>Page under Construction...</p>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
