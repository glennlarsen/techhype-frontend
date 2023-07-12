import Layout from "components/Layout";
import ContactForm from "components/ContactForm";

function Contact() {
  return (
    <Layout
      page="Contact"
      description="Techhype is the next Generation digital Business Card. Tap and Share your contact details in one second."
    >
      <section className="contact">
        <div className="container-inner contact-container">
          <div className="contact-heading">
            <h1>Contact Us</h1>
            <p>
              Do you have a question or need help with an order? Just fill out
              the form fields below.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}

export default Contact;
