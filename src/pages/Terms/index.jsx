import { Link as RouterLink } from "react-router-dom";
import Layout from "components/Layout";
import { Container, Typography, Stack } from "@mui/material";

const Terms = ({ toggleDrawer}) => {
  const lastUpdate = "13.08.2023";

  return (
    <Layout page="Terms" description="Terms and Conditions for Techhype" toggleDrawer={toggleDrawer}>
      <section className="terms top-overlay">
        <Container maxWidth="md" className="terms-container" sx={{padding: "0 1.5em"}}>
          <h1 style={{ textAlign: "center" }}>Terms and Conditions</h1>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography>Last Updated: {lastUpdate}</Typography>
            <Typography paragraph>
              Please read these Terms and Conditions ("Terms") carefully before
              using our website and purchasing our products. These Terms outline
              your rights and responsibilities when using our online store and
              the services provided. By accessing and using our website, you
              agree to be bound by these Terms. If you do not agree to these
              Terms, please refrain from using our website.
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography variant="h2" fontSize={32}>
              1. Introduction
            </Typography>
            <Typography paragraph>
              1.1 By purchasing goods on our website, you are entering into a
              legally binding contract with us.
            </Typography>
            <Typography paragraph>
              1.2 These Terms are written in English, and only the English
              version will be considered valid.
            </Typography>
            <Typography paragraph>
              1.3 By purchasing goods from us, you also agree to be bound by our
              website's terms and conditions and any additional terms that may
              apply.
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography variant="h2" fontSize={32} mt={2}>
              2. Information and Privacy
            </Typography>
            <Typography paragraph>
              2.1 Before entering into a contract with us, you are entitled to
              review key information according to the Consumer Contracts
              (Information, Cancellation and Additional Charges) Regulations
              2013. This information is available in the acknowledgement email
              you receive upon placing an order.
            </Typography>
            <Typography paragraph>
              2.2 Your privacy and personal information are important to us. Our{" "}
              <RouterLink to="/privacy" style={{ color: "white" }}>
                Privacy Policy
              </RouterLink>{" "}
              outlines how we collect, store, and use your personal information.
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography variant="h2" fontSize={32}>
              3. Ordering Goods
            </Typography>
            <Typography paragraph>
              3.1 When placing an order on our website, please carefully review
              your order before submitting it. You can correct any errors before
              submission.
            </Typography>
            <Typography paragraph>
              3.2 Acknowledgement of your order does not imply acceptance. We
              may contact you to explain non-acceptance reasons, such as
              unavailability, payment issues, or pricing errors.
            </Typography>
            <Typography paragraph>
              3.3 A legally binding contract is formed when we send you a
              Confirmation Email and dispatch the goods.
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography variant="h2" fontSize={32}>
              4. Right to Cancel
            </Typography>
            <Typography paragraph>
              4.1 You have the right to cancel your contract within 14 days
              without providing a reason.
            </Typography>
            <Typography paragraph>
              4.2 To exercise this right, you must notify us using the contact
              details provided within this contract.
            </Typography>
            <Typography paragraph>
              4.3 You must return the goods to us without undue delay and not
              later than 14 days from notifying us of your cancellation.
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography variant="h2" fontSize={32}>
              5. Delivery
            </Typography>
            <Typography paragraph>
              5.1 Goods will be delivered using Royal Mail or other suitable
              services. Estimated delivery dates will be provided in the
              Confirmation Email.
            </Typography>
            <Typography paragraph>
              5.2 Delivery is considered complete upon handing the goods to the
              address you provided.
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography variant="h2" fontSize={32}>
              6. Payment
            </Typography>
            <Typography paragraph>
              6.1 We accept major credit cards for payment. Your card will only
              be charged upon dispatch of goods.
            </Typography>
            <Typography paragraph>
              6.2 Payments are subject to verification and authorization by the
              relevant card issuer.
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography variant="h2" fontSize={32}>
              7. Nature of Goods
            </Typography>
            <Typography paragraph>
              7.1 Goods must be of satisfactory quality, fit for purpose, and as
              described.
            </Typography>
            <Typography paragraph>
              7.2 The colors of goods displayed on the website may vary due to
              monitor settings.
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography variant="h2" fontSize={32}>
              8. Faulty Goods
            </Typography>
            <Typography paragraph>
              8.1 You have legal rights under the Consumer Rights Act 2015,
              which include goods of satisfactory quality, fitness for purpose,
              and matching the description.
            </Typography>
            <Typography paragraph>
              8.2 Techhype products are covered by a 1-year guarantee from the
              date of purchase for manufacturing defects and faults. This
              guarantee does not cover loss or intentional damage to the
              product.
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography variant="h2" fontSize={32}>
              9. Disputes and Jurisdiction
            </Typography>
            <Typography paragraph>
              9.1 Any disputes will be resolved in accordance with the laws of
              England and Wales.
            </Typography>
            <Typography paragraph>
              9.2 If you have a dispute or need support, contact us at{" "}
              <RouterLink to="/contact" style={{ color: "white" }}>
                Contact
              </RouterLink>
            </Typography>
          </Stack>
        </Container>
      </section>
    </Layout>
  );
};

export default Terms;
