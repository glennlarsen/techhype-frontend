import React from "react";
import { Button } from "techhype-components";
import VCard from "vcard-creator";
import Glenn from "images/glenn.jpg";

import { Stack } from "@mui/system";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { color_primary } from "constants/colors";

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

        // Check if the device is iPhone (iOS)
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        // Create a Blob with the vCard data
        const vCardBlob = new Blob([vCardText], { type: "text/vcard" });

        // Trigger the download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(vCardBlob);
        link.download = "contact.vcf";
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
      <h1>{contactInfo.name}</h1>
      <Divider
        sx={{
          width: "100%",
          borderColor: "rgba(255, 255, 255, 0.12)",
          "&::before": { borderColor: "rgba(255, 255, 255, 0.12)" },
          "&::after": { borderColor: "rgba(255, 255, 255, 0.12)" },
        }}
      >
        <Chip
          variant="outlined"
          label="PHONE"
          size="small"
          sx={{
            backgroundColor: color_primary,
            borderColor: color_primary,
          }}
        />
      </Divider>
      <p>{contactInfo.phone}</p>
      <Divider
        sx={{
          width: "100%",
          borderColor: "rgba(255, 255, 255, 0.12)",
          "&::before": { borderColor: "rgba(255, 255, 255, 0.12)" },
          "&::after": { borderColor: "rgba(255, 255, 255, 0.12)" },
        }}
      >
        <Chip
          variant="outlined"
          label="EMAIL"
          size="small"
          sx={{
            backgroundColor: color_primary,
            borderColor: color_primary,
          }}
        />
      </Divider>
      <p>{contactInfo.email}</p>
      <Divider
        sx={{
          width: "100%",
          borderColor: "rgba(255, 255, 255, 0.12)",
          "&::before": { borderColor: "rgba(255, 255, 255, 0.12)" },
          "&::after": { borderColor: "rgba(255, 255, 255, 0.12)" },
        }}
      >
        <Chip
          variant="outlined"
          label="ADDRESS"
          size="small"
          sx={{
            backgroundColor: color_primary,
            borderColor: color_primary,
          }}
        />
      </Divider>
      <p>
        {`${contactInfo.address}, ${contactInfo.postcode} ${contactInfo.city}, ${contactInfo.country}`}
      </p>
      <Divider
        sx={{
          width: "100%",
          borderColor: "rgba(255, 255, 255, 0.12)",
          "&::before": { borderColor: "rgba(255, 255, 255, 0.12)" },
          "&::after": { borderColor: "rgba(255, 255, 255, 0.12)" },
        }}
      >
        <Chip
          variant="outlined"
          label="WEBSITE"
          size="small"
          sx={{
            backgroundColor: color_primary,
            borderColor: color_primary,
          }}
        />
      </Divider>
      <p>{contactInfo.website}</p>
      <Divider
        sx={{
          width: "100%",
          borderColor: "rgba(255, 255, 255, 0.12)",
          "&::before": { borderColor: "rgba(255, 255, 255, 0.12)" },
          "&::after": { borderColor: "rgba(255, 255, 255, 0.12)" },
        }}
      ></Divider>
      {/* Add other contact details as needed */}
      <Button style={{ marginTop: "2em" }} onClick={handleDownloadContact}>
        Save Contact
      </Button>
    </Stack>
  );
};

export default ContactDetails;
