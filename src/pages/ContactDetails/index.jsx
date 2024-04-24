import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "techhype-components";
import VCard from "vcard-creator";
import Glenn from "images/glenn.jpg";
import Cato from "images/cato-printingas.jpg";
import Akam from "images/akam.jpg";
import Gunnar from "images/Gunnar.jpg";
import PlaceholderAvatar from "images/placeholder-avatar.jpg";
import Njaal from "images/njaal.jpg";
import Andreas from "images/andreas.jpg";
import Logo from "logo/logo-long.png";

import { Stack } from "@mui/system";
import { color_dark, color_darker } from "constants/colors";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import { useMediaQuery } from "react-responsive";

import Avatar from "./components/Avatar";
import ContactHeading from "./components/ContactHeading";
import DividerComponent from "./components/DividerComponent";
import TextFieldComponent from "./components/TextFieldComponent";

import contactInfoData from "./data/contactInfo.json";

const ContactDetails = () => {
  const isBigScreen = useMediaQuery({ minWidth: 710 });
  const { id } = useParams();
  const [contactInfo, setContactInfo] = useState(null);
  const [contactImage, setContactImage] = useState(null);

  console.log("id param:", id);
  console.log("Contact info:", contactInfo);

  // Effect to load the contact information based on the ID
  useEffect(() => {
    const foundContact = contactInfoData.find(
      (contact) => contact.id.toString() === id
    );
    if (foundContact) {
      setContactInfo(foundContact);
    } else {
      // Handle the case where no contact is found
      console.error("No contact found for ID:", id);
    }
  }, [id]);

  useEffect(() => {
    if (id === "892346788234" || id === "572456134381") {
      setContactImage(Glenn);
    } else if (id === "592356784215") {
      setContactImage(Cato);
    } else if (id === "592656784315") {
      setContactImage(Akam);
    } else if (id === "992656754335") {
      setContactImage(Gunnar);
    } else if (id === "592456734385") {
      setContactImage(Njaal);
    } else if (id === "662456134381") {
      setContactImage(Andreas);
    } else {
      setContactImage(PlaceholderAvatar);
    }
  }, [id]); // Depend on id to only run when id changes

  // If contactInfo is not yet set, you can render a loading indicator or return null
  if (!contactInfo) {
    return <div>No contact info found</div>; // or some loading spinner
  }

  const handleDownloadContact = async () => {
    try {
      // Fetch the image as a Blob
      const imageResponse = await fetch(contactImage);
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
        vCard.addName(contactInfo.lastName, contactInfo.firstName);
        vCard.addCompany(contactInfo.company && contactInfo.company);
        vCard.addPhoneNumber(contactInfo.phone, "CELL"); // Set phone number as mobile
        vCard.addEmail(contactInfo.email, "INTERNET"); // Set email as email
        vCard.addJobtitle(contactInfo.title && contactInfo.title);

        // Add the address to the vCard
        vCard.addAddress(
          "",
          "",
          contactInfo.address && contactInfo.address,
          contactInfo.city && contactInfo.city,
          "",
          contactInfo.postcode && contactInfo.postcode,
          contactInfo.country && contactInfo.country,
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
        link.download = `${contactInfo.firstName}.vcf`;
        link.click();
        URL.revokeObjectURL(link.href);
      };
    } catch (error) {
      console.error("Error creating vCard:", error);
    }
  };

  const addressComponents = [
    contactInfo.address,
    contactInfo.postcode,
    contactInfo.city,
    contactInfo.country,
  ].filter(Boolean); // Filter out empty/undefined values

  const addressString = addressComponents.join(", ");

  return (
    <Box
      sx={{
        background: color_dark,
        height: "100vh",
        display: "flex",
        flexFlow: "column",
      }}
    >
      <Stack
        style={{
          padding: "1em",
          alignItems: "center",
          margin: "1em auto",
          textAlign: "center",
          width: "100%",
          maxWidth: "700px",
          borderRadius: isBigScreen ? "10px" : 0,
        }}
      >
        <Avatar src={contactImage} />
        <ContactHeading
          title={contactInfo.title || ""}
          value={
            (contactInfo.firstName ? contactInfo.firstName : "") +
            (contactInfo.lastName ? " " + contactInfo.lastName : "")
          }
        />
        <List sx={{ width: "100%" }}>
          <DividerComponent />
          {contactInfo.phone ? (
            <>
              <TextFieldComponent label="Phone" value={contactInfo.phone} />
              <DividerComponent />
            </>
          ) : (
            ""
          )}
          {contactInfo.email ? (
            <>
              <TextFieldComponent label="Email" value={contactInfo.email} />
              <DividerComponent />
            </>
          ) : (
            ""
          )}
          {addressString ? (
            <>
              <TextFieldComponent label="Address" value={addressString} />
              <DividerComponent />
            </>
          ) : (
            ""
          )}
          {contactInfo.website ? (
            <>
              <TextFieldComponent label="Website" value={contactInfo.website} />
              <DividerComponent />
            </>
          ) : (
            ""
          )}
          {contactInfo.company ? (
            <>
              <TextFieldComponent label="Company" value={contactInfo.company} />
              <DividerComponent />
            </>
          ) : (
            ""
          )}
          {/* Add other contact details as needed */}
          <Button style={{ marginTop: "2em" }} onClick={handleDownloadContact}>
            Save Contact
          </Button>
        </List>
        <Box class="poweredby-container">
          Powered by{" "}
          <a
            class="poweredBy"
            href="http://techhype.no"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Logo} alt="Techhype Logo" />
          </a>
        </Box>
      </Stack>
    </Box>
  );
};

export default ContactDetails;
