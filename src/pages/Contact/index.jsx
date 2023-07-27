import React, { useContext } from "react";
import Layout from "components/Layout";
import ContactForm from "components/ContactForm";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";

function Contact() {
  const [lang, ] = useContext(LangContext);

  return (
    <Layout
      page="Contact"
      description="Feel free to contact our team for any inqueries about your order or to get more information about Techhype cards."
    >
      <section className="contact">
        <div className="container-inner contact-container">
          <div className="contact-heading">
            <h1>{content[lang]["contactHeading"]}</h1>
            <p>{content[lang]["contactSubHeading"]}</p>
          </div>
            <ContactForm />
        </div>
      </section>
    </Layout>
  );
}

export default Contact;
