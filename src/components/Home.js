import React from "react";
import { Card } from "semantic-ui-react";
import { renderCards } from "../helpers/helperFunctions";

const Home = ({ listings, location, user,  }) => {
  
  return (
    <Card.Group centered>{renderCards(listings, location, user)}</Card.Group>
  )
};

export default Home;
