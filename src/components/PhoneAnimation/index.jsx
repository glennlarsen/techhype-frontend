import React from "react";
import ReactPlayer from "react-player";

const PhoneAnimation = () => {
  return (
    <div className="phone-grapich">
      <ReactPlayer
        url="videos/animation-video.webm"
        width="100%"
        height="100%"
        loop
        muted
        playing
      />
    </div>
  );
};

export default PhoneAnimation;
