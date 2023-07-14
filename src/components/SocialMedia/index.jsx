import React from "react";
import styles from "./socialmedia.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const SocialMedia = ({ borderColor, color, size }) => {
  const style = {
    borderColor: borderColor,
    color: color,
    height: size + "px",
    width: size + "px",
  };

  return (
    <div className={styles.socialMediaContent}>
      <a
        href="https://facebook.com"
        style={style}
        className={styles.socialMediaCircle}
      >
        <FontAwesomeIcon icon={faFacebookF} />
      </a>
      <a
        href="https://instagram.com"
        style={style}
        className={styles.socialMediaCircle}
      >
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a
        href="https://twitter.com"
        style={style}
        className={styles.socialMediaCircle}
      >
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a
        href="https://linkedin.com"
        style={style}
        className={styles.socialMediaCircle}
      >
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
    </div>
  );
};

export default SocialMedia;
