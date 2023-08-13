import { Link as RouterLink } from "react-router-dom";
import Layout from "components/Layout";
import { Container, Typography, Stack } from "@mui/material";

const Faq = () => {
  return (
    <Layout page="FAQ" description="Frequently asked questions about Techhype">
      <section className="faq top-overlay">
        <Container maxWidth="md" className="terms-container" sx={{padding: "0 1.5em"}}>
          <h1 style={{ textAlign: "center" }}>Frequently asked questions</h1>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography variant="h2" fontSize={28}>
              How do I place an order?
            </Typography>
            <Typography>
              Placing an order is simple! Just navigate to our products page,
              select the items you want, add them to your cart, and proceed to
              checkout. Follow the prompts to provide your shipping and payment
              information, and your order will be on its way.{" "}
              <RouterLink to="/shop" style={{ color: "white" }}>
                Link to Shop
              </RouterLink>{" "}
            </Typography>

            <Typography variant="h2" fontSize={28}>
              What payment methods do you accept?
            </Typography>
            <Typography>
              We accept major credit cards, including Visa and MasterCard. You
              can also choose to pay using Vipps for added convenience.
            </Typography>

            <Typography variant="h2" fontSize={28}>
              How can I track my order?
            </Typography>
            <Typography>
              Once your order is shipped, you will receive a confirmation email
              with a tracking number and a link to track your package's journey.
            </Typography>

            <Typography variant="h2" fontSize={28}>
              What is your return policy?
            </Typography>
            <Typography>
              We offer a 30-day return policy. If you are not satisfied with
              your purchase, you can return it within 30 days for a full refund
              or exchange.
            </Typography>

            <Typography variant="h2" fontSize={28}>
              How can I contact customer support?
            </Typography>
            <Typography>
              If you have any questions or need assistance, our customer support
              team is here to help. You can reach us via email at{" "}
              <a href="mailto:support@techhype.no">support@techhype.no</a> or
              use the contact form on our{" "}
              <RouterLink to="/contact" style={{ color: "white" }}>
                Contact Us
              </RouterLink>{" "}
              page.
            </Typography>
          </Stack>
        </Container>
      </section>
    </Layout>
  );
};

export default Faq;
