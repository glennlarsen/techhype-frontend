import React from "react";
import { Button } from "techhype-components";
import { useNavigate } from "react-router-dom";

export const MainHeading = ({ heading1, heading2, heading3, text, button }) => {
  const navigate = useNavigate();

  return (
    <div className="heading">
      <h1>
        {heading1}
        <span className="gradient-title"> {heading2} </span>
        {heading3}
      </h1>
      <p>{text}</p>
      <Button onClick={() => navigate("/shop")}>{button}</Button>
    </div>
  );
};

export default MainHeading;
