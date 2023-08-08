import React from "react";
import Layout from "components/Layout";

const Faq = () => {
  return (
    <Layout page="FAQ" description="Frequently asked questions about Techhype">
      <section className="faq top-overlay">
        <div className="container-inner faq-container">
          <h1 style={{ textAlign: "center" }}>Frequently asked questions</h1>
        </div>
      </section>
    </Layout>
  );
};

export default Faq;
