import React, { useContext, useState } from "react";
import { Fade } from "react-awesome-reveal";

import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";

import { Button, Card } from "techhype-components";
import { reviews } from "data/reviews";
import { LangContext } from "context/LangContext";
import { content } from "constants/content";

const Reviews = () => {
  const [lang] = useContext(LangContext);
  const [reviewsCount, setReviewsCount] = useState(3);
  const [showViewMoreButton, setShowViewMoreButton] = useState(true);

  const handleViewMoreReviews = () => {
    setReviewsCount(reviewsCount + 3);
    setShowViewMoreButton(false);
  };

  return (
    <section className="reviews" data-section id="reviews" >
      <Fade direction="up" triggerOnce>
        <h2>{content[lang]["reviewsHeading"]}</h2>
      </Fade>
      <Fade direction="up" triggerOnce>
        <p className="reviews-subheading">
          {content[lang]["reviewsSubHeading"]}
        </p>
      </Fade>
      <div className="reviews-container container-inner">
        {reviews.slice(0, reviewsCount).map((review, index) => (
          <Fade direction="up" triggerOnce key={index}>
            <Card width="100%" height="100%">
              <Rating
                name="review"
                value={review.rating}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.6 }} fontSize="inherit" />
                }
              />
              <p>{review.reviewText}</p>
              <img src={review.image} alt={review.name} />
              <strong>{review.name}</strong>
              <span>{content[lang]["verifiedCustomer"]}</span>
            </Card>
          </Fade>
        ))}
      </div>
      {showViewMoreButton && (
        <Button size="small" onClick={handleViewMoreReviews}>
          {content[lang]["moreReviewsButton"]}
        </Button>
      )}
    </section>
  );
};

export default Reviews;
