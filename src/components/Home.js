import React from "react";
import { Card } from "semantic-ui-react";
import { renderCards } from "../helpers/helperFunctions";

const Home = ({ listings, location, user, venues }) => {
  
  return (
    <Card.Group centered>{renderCards(listings, location, user, venues)}</Card.Group>
  )
};

export default Home;
