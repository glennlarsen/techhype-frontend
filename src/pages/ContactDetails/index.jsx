import React from "react";
import { Button } from "techhype-components";
import VCard from "vcard-creator";
import Glenn from "images/glenn.jpg";

import { Stack } from "@mui/system";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { color_primary, color_dark, color_hover } from "constants/colors";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

const ContactDetails = () => {
  // Replace these with your actual contact information
  const contactInfo = {
    name: "Glenn Larsen",
    phone: "+47 91771028",
    email: "glenn@techhype.no",
    address: "Vestre Holbergsallmennigen 10",
    city: "Bergen",
    postcode: "5011",
    country: "Norway",
    website: "https://www.techhype.no",
    title: "Co-Founder & CTO",
    // Add other contact details as needed
  };

  const handleDownloadContact = async () => {
    try {
      // Fetch the image as a Blob
      const imageResponse = await fetch(Glenn);
      const imageBlob = await imageResponse.blob();

      // Read the image Blob as Base64
      const reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      reader.onloadend = () => {
        const imageBase64 = reader.result.replace(
          /^data:image\/(jpeg|png);base64,/,
          ""
        );

        // Create a new vCard
        const vCard = new VCard();

        // Set properties
        vCard.addName(contactInfo.name);
        vCard.addPhoneNumber(contactInfo.phone, "CELL"); // Set phone number as mobile
        vCard.addEmail(contactInfo.email, "INTERNET"); // Set email as email
        vCard.addJobtitle(contactInfo.title);

        // Add the address to the vCard
        vCard.addAddress(
          "",
          "",
          contactInfo.address,
          contactInfo.city,
          "",
          contactInfo.postcode,
          contactInfo.country,
          "HOME"
        );

        vCard.addURL(contactInfo.website);

        // Add the image to the vCard
        vCard.addPhoto(imageBase64, "JPEG");

        // Convert the vCard to a text string
        const vCardText = vCard.toString();

        // Create a Blob with the vCard data
        const vCardBlob = new Blob([vCardText], { type: "text/vcard" });

        // Trigger the download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(vCardBlob);
        link.download = `${contactInfo.name}.vcf`;
        link.click();
        URL.revokeObjectURL(link.href);
      };
    } catch (error) {
      console.error("Error creating vCard:", error);
    }
  };

  return (
    <Stack
      style={{
        padding: "1em",
        alignItems: "center",
        maxWidth: "700px",
        margin: "0 auto",
        width: "100%",
        textAlign: "center",
      }}
    >
      <img
        src={Glenn}
        alt="Contact"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          objectFit: "cover",
          objectPosition: "top",
        }}
      />
      <Box mb={4}>
        <h1 style={{ marginBottom: 0, marginTop: ".3em" }}>
          {contactInfo.name}
        </h1>
        <span>{contactInfo.title}</span>
      </Box>
      <List>
        <Divider
          sx={{
            width: "100%",
            borderColor: "rgba(255, 255, 255, 0.12)",
          }}
        />
        <ListItem sx={{ padding: "1em 0" }}>
          <Chip
            label="Phone"
            style={{
              color: "white",
              background: color_dark,
              marginRight: "1em",
              width: "80px",
            }}
          />
          <ListItemText primary={contactInfo.phone} />
        </ListItem>
        <Divider
          sx={{
            width: "100%",
            borderColor: "rgba(255, 255, 255, 0.12)",
          }}
        />
        <ListItem sx={{ padding: "1em 0" }}>
          <Chip
            label="Email"
            style={{
              color: "white",
              background: color_dark,
              marginRight: "1em",
              width: "80px",
            }}
          />
          <ListItemText primary={contactInfo.email} />
        </ListItem>
        <Divider
          sx={{
            width: "100%",
            borderColor: "rgba(255, 255, 255, 0.12)",
          }}
        />
        <ListItem sx={{ padding: "1em 0" }}>
          <Chip
            label="Address"
            style={{
              color: "white",
              background: color_dark,
              marginRight: "1em",
              width: "80px",
            }}
          />
          <ListItemText
            primary={`${contactInfo.address}, ${contactInfo.postcode} ${contactInfo.city}, ${contactInfo.country}`}
          />
        </ListItem>
        <Divider
          sx={{
            width: "100%",
            borderColor: "rgba(255, 255, 255, 0.12)",
          }}
        />
        <ListItem sx={{ padding: "1em 0" }}>
          <Chip
            label="Website"
            style={{
              color: "white",
              background: color_dark,
              marginRight: "1em",
              width: "80px",
            }}
          />
          <ListItemText primary={contactInfo.website} />
        </ListItem>
        <Divider
          sx={{
            width: "100%",
            borderColor: "rgba(255, 255, 255, 0.12)",
          }}
        />
        {/* Add other contact details as needed */}
        <Button style={{ marginTop: "2em" }} onClick={handleDownloadContact}>
          Save Contact
        </Button>
      </List>
    </Stack>
  );
};

export default ContactDetails;
