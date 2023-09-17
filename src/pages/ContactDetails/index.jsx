import React from "react";
import { Button } from "techhype-components";
import VCard from "vcard-creator";
import Glenn from "images/glenn.jpg";

import { Stack } from "@mui/system";
import Divider from "@mui/material/Divider";
import { color_primary, color_dark, color_darker } from "constants/colors";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useMediaQuery } from "react-responsive";

const ContactDetails = () => {
  const isTablet = useMediaQuery({ minWidth: 710 });

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

  const inputProps = {
    readOnly: true,
    style: {
      color: "white", // Text input color
      border: "none", // No borders
      paddingBottom: 0,
    },
  };

  const labelProps = {
    style: {
      color: color_primary, // Label color (you might need to replace 'color_primary' with the actual color value)
    },
  };



  // Set focused border color to transparent
  const focusedBorderStyle = {
    "& fieldset": {
      borderColor: "transparent !important",
    },
  };

  return (
  <Box sx={{background: color_dark, height: "100vh", display: "flex", flexFlow: "column"}}>
    <Stack
      style={{
        padding: "1em",
        alignItems: "center",
        margin: "1em auto",
        textAlign: "center",
        background: color_darker,
        width: "100%",
        maxWidth: "700px",
        borderRadius: isTablet ? "10px" : 0,
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
        <h1 style={{ marginBottom: 0, marginTop: ".3em", fontSize: "2rem" }}>
          {contactInfo.name}
        </h1>
        <span>{contactInfo.title}</span>
      </Box>
      <List sx={{width: "100%"}}>
        <Divider
          sx={{
            width: "calc(100% + 2em)",
            borderColor: "rgba(255, 255, 255, 0.12)",
            margin: ".5em 0",
            marginLeft: "-1em",
            marginRight: "-1em",
          }}
        />
        <ListItem sx={{ padding: "1em 0 .5em 0" }}>
        <TextField
            label="Phone"
            multiline
            value={contactInfo.phone}
            InputProps={inputProps}
            InputLabelProps={labelProps}
            sx={{ ...focusedBorderStyle, flex: 1, whiteSpace: 'pre-line' }} // Apply styles to remove hover and focus styles
          />
        </ListItem>
        <Divider
          sx={{
            width: "calc(100% + 2em)",
            borderColor: "rgba(255, 255, 255, 0.12)",
            margin: ".5em 0",
            marginLeft: "-1em",
            marginRight: "-1em",
          }}
        />
        <ListItem sx={{ padding: "1em 0 .5em 0" }}>
        <TextField
            label="Email"
            multiline
            value={contactInfo.email}
            InputProps={inputProps}
            InputLabelProps={labelProps}
            sx={{ ...focusedBorderStyle, flex: 1, whiteSpace: 'pre-line' }} // Apply styles to remove hover and focus styles
          />
        </ListItem>
        <Divider
          sx={{
            width: "calc(100% + 2em)",
            borderColor: "rgba(255, 255, 255, 0.12)",
            margin: ".5em 0",
            marginLeft: "-1em",
            marginRight: "-1em",
          }}
        />
        <ListItem sx={{ padding: "1em 0 .5em 0" }}>
        <TextField
          label="Address"
          multiline
          value={`${contactInfo.address}, ${contactInfo.postcode} ${contactInfo.city}, ${contactInfo.country}`}
          InputProps={inputProps}
          InputLabelProps={labelProps}
          sx={{ ...focusedBorderStyle, flex: 1, whiteSpace: 'pre-line' }}
        />
        </ListItem>
        <Divider
          sx={{
            width: "calc(100% + 2em)",
            borderColor: "rgba(255, 255, 255, 0.12)",
            margin: ".5em 0",
            marginLeft: "-1em",
            marginRight: "-1em",
          }}
        />
        <ListItem sx={{ padding: "1em 0 .5em 0" }}>
        <TextField
            label="Website"
            multiline
            value={contactInfo.website}
            InputProps={inputProps}
            InputLabelProps={labelProps}
            sx={{ ...focusedBorderStyle, flex: 1, whiteSpace: 'pre-line' }} // Apply styles to remove hover and focus styles
          />
        </ListItem>
        <Divider
          sx={{
            width: "calc(100% + 2em)",
            borderColor: "rgba(255, 255, 255, 0.12)",
            margin: ".5em 0",
            marginLeft: "-1em",
            marginRight: "-1em",
          }}
        />
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
