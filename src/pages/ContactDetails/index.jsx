import React from "react";
import { Button } from "techhype-components";
import VCard from "vcard-creator";
import Glenn from "images/glenn.jpg";

import { Stack } from "@mui/system";
import { color_dark, color_darker } from "constants/colors";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import { useMediaQuery } from "react-responsive";

import Avatar from "./components/Avatar";
import ContactHeading from "./components/ContactHeading";
import DividerComponent from "./components/DividerComponent";
import TextFieldComponent from "./components/TextFieldComponent";

import contactInfo from "./data/contactInfo.json";

const ContactDetails = () => {
  const isBigScreen = useMediaQuery({ minWidth: 710 });

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
    <Box sx={{ background: color_dark, height: "100vh", display: "flex", flexFlow: "column" }}>
      <Stack
        style={{
          padding: "1em",
          alignItems: "center",
          margin: "1em auto",
          textAlign: "center",
          background: color_darker,
          width: "100%",
          maxWidth: "700px",
          borderRadius: isBigScreen ? "10px" : 0,
        }}
      >
        <Avatar src={Glenn} />
        <ContactHeading title={contactInfo.title} value={contactInfo.name} />
        <List sx={{width: "100%"}}>
        <DividerComponent />
        <TextFieldComponent label="Phone" value={contactInfo.phone} />
        <DividerComponent />
        <TextFieldComponent label="Email" value={contactInfo.email} />
        <DividerComponent />
        <TextFieldComponent label="Address" value={`${contactInfo.address}, ${contactInfo.postcode} ${contactInfo.city}, ${contactInfo.country}`} />
        <DividerComponent />
        <TextFieldComponent label="Website" value={contactInfo.website}/>
        <DividerComponent />
        {/* Add other contact details as needed */}
        <Button style={{ marginTop: "2em" }} onClick={handleDownloadContact}>
          Save Contact
        </Button>
        </List>
      </Stack>
    </Box>
  );
};

export default ContactDetails;
