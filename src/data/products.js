import WhiteCard from "images/white-card-water.png";
import ManyWhiteCards from "images/white-card.png";
import CardScan from "images/white-card-scan.png";
import WhiteCardDimensions from "images/white-card-dimensions.png";
import WhiteCardBend from "images/white-card-bend.png";

import BambooCard from "images/bamboo-card.png";
import BambooCardStock from "images/bamboo-cards-stock.jpg";
import WoodenCards from "images/wooden-cards.jpg";

export const products = [
  {
    id: 1,
    name: "Plastic Card White",
    image: [
      WhiteCard,
      ManyWhiteCards,
      CardScan,
      WhiteCardDimensions,
      WhiteCardBend,
    ],
    price: 299,
  },
  {
    id: 2,
    name: "Bamboo Wooden Card",
    image: [BambooCard, BambooCardStock, WoodenCards],
    price: 399,
  },
];
