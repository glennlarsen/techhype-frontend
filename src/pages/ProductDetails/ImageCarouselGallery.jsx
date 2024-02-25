import React from "react";
import ImageGallery from "react-image-gallery";

function ImageCarouselGallery({ items }) {
  const itemsArray = items;

  const images = itemsArray.map((image) => {
    return {
      original: `${image.src}`,
      thumbnail: `${image.src}`,
    };
  });

  return <ImageGallery items={images} lazyLoad showBullets />;
}

export default ImageCarouselGallery;
