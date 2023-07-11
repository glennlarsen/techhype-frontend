import React, { useContext, useState, useEffect } from "react";
import Layout from "components/Layout";

function Contact() {
  return (
    <Layout
      page="Contact"
      description="Techhype is the next Generation digital Business Card. Tap and Share your contact details in one second."
    >
      <section className="contact">
        <div className="container-inner contact-container">
          <h1>Contact Us</h1>
        </div>
      </section>
    </Layout>
  );
}

export default Contact;
