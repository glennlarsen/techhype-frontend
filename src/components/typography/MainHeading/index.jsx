import React from "react";
import { Button } from "techhype-components";

export const MainHeading = ({ heading1, heading2, heading3, text, button }) => {
  return (
    <div className="heading">
      <h1>
        {heading1}
        <span className="gradient-title"> {heading2} </span>
        {heading3}
      </h1>
      <p>{text}</p>
      <Button>{button}</Button>
    </div>
  );
};

export default MainHeading;
