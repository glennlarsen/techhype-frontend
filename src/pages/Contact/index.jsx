import React, { useContext, useState } from "react";
import Layout from "components/Layout";
import ContactForm from "components/ContactForm";
import { LangContext } from "utils/LangContext";
import { content } from "constants/content";

function Contact() {
  const [lang, setLang] = useContext(LangContext);

  return (
    <Layout
      page="Contact"
      description="Techhype is the next Generation digital Business Card. Tap and Share your contact details in one second."
    >
      <section className="contact">
        <div className="container-inner contact-container">
          <div className="contact-heading">
            <h1>{content[lang]["contactHeading"]}</h1>
            <p>
              {content[lang]["contactSubHeading"]}
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}

export default Contact;
