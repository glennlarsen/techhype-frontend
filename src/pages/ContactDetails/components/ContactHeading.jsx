// ContactInfoComponent.js
import React from "react";

function ContactHeading({ title, value }) {
  return (
    <div>
      <h1 style={{ marginBottom: 0, marginTop: ".3em", fontSize: "2rem" }}>
        {value}
      </h1>
      <span>{title}</span>
    </div>
  );
}

export default ContactHeading;
