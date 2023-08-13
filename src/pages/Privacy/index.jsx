import { Link as RouterLink } from "react-router-dom";
import Layout from "components/Layout";
import { Container, Typography, Stack } from "@mui/material";

const Privacy = () => {
  const lastUpdate = "13.08.2023";

  return (
    <Layout page="Privacy" description="Privacy for Techhype">
      <section className="privacy top-overlay">
        <Container maxWidth="md" className="terms-container">
          <h1 style={{ textAlign: "center" }}>Privacy Policy</h1>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography paragraph>
              This Privacy Policy explains how Techhype (referred to as "we" or
              "us") collects, uses, and safeguards your Personal Information
              when you visit our website or make purchases from us.
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography variant="h2" fontSize={32}>
              Contact
            </Typography>
            <Typography paragraph>
              If you have any questions about this policy or wish to inquire
              further about our privacy practices, please contact us via email
              at support@techhype.no or by mail using the following details:
            </Typography>
            <Typography variant="body1">
              Techhype AS
              <br />
              Vestre Holbergsallmennigen
              <br />
              5011 Bergen
              <br />
              Norway
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography variant="h2" fontSize={32} mt={2}>
              Collecting Personal Information
            </Typography>
            <Typography paragraph>
              When you visit our website, we gather certain information about
              your device and interactions. This includes data needed for
              processing your orders and any information you provide when
              seeking customer support.
            </Typography>
            <Typography variant="body1" component="ul">
              <li>
                <strong>Device Information</strong>
                <Typography>
                  Purpose: Optimize site performance and gather usage insights.
                </Typography>
                <Typography>
                  Collected automatically using cookies and similar
                  technologies.
                </Typography>
                <Typography>
                  Personal Information: Browser version, IP address, time zone,
                  cookie data, viewed products, and site interaction details.
                </Typography>
              </li>
              <li>
                <strong>Order Information</strong>
                <Typography>
                  Purpose: Fulfill orders, process payments, and provide
                  support.
                </Typography>
                <Typography>
                  Collected from you during the ordering process.
                </Typography>
                <Typography>
                  Personal Information: Name, billing/shipping addresses,
                  payment info, email, and phone number.
                </Typography>
              </li>
              <li>
                <strong>Customer Support Information</strong>
                <Typography>
                  Purpose: Provide assistance and support services.
                </Typography>
                <Typography>Collected directly from you.</Typography>
                <Typography>
                  Personal Information: [Any other relevant data collected for
                  customer support]
                </Typography>
              </li>
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography variant="h2" fontSize={32}>
              Sharing Personal Information
            </Typography>
            <Typography paragraph>
              We share your Personal Information with service providers to
              fulfill orders and enhance our services. Examples include:
            </Typography>
            <li>
              Using Shopify for our online store. [Include more service
              providers if applicable]
            </li>
            <li>
              Complying with legal requests or regulations to protect our
              rights.
            </li>
          </Stack>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography variant="h2" fontSize={32}>
              Using Personal Information
            </Typography>
            <Typography paragraph>
              We use your Personal Information to provide services like order
              processing, payment, and updates about products and offers.
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography variant="h2" fontSize={32}>
              Your Rights
            </Typography>
            <Typography paragraph>
              If you are a resident of Norway, you have the right to access,
              correct, or request deletion of your Personal Information. Contact
              us at support@techhype.no to exercise these rights.
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography variant="h2" fontSize={32}>
              Cookies
            </Typography>
            <Typography paragraph>
              We use cookies to improve your browsing experience and gather
              usage information. You can manage cookies through your browser
              settings. However, note that this may affect certain features on
              our website.
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography variant="h2" fontSize={32}>
              Changes
            </Typography>
            <Typography paragraph>
              We may update this Privacy Policy to reflect changes in our
              practices. Check this page for the latest version.
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography paragraph>Last Update: {lastUpdate}</Typography>
          </Stack>
        </Container>
      </section>
    </Layout>
  );
};

export default Privacy;
