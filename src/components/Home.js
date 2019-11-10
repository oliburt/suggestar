import React from "react";
import { Card } from "semantic-ui-react";
import { renderCards } from "../helpers/helperFunctions";

const Home = ({ listings, location, user, venues, updateLikeOnListing }) => {
  
  return (
    <Card.Group centered>{renderCards(listings, location, user, updateLikeOnListing, venues)}</Card.Group>
  )
};

export default Home;
