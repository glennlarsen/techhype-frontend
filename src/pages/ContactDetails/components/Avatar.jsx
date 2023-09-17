// AvatarComponent.js
import React from "react";

function Avatar({ src }) {
  return (
    <img
      src={src}
      alt="Contact"
      style={{
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        objectFit: "cover",
        objectPosition: "top",
      }}
    />
  );
}

export default Avatar;
