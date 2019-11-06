import React from "react";
import { Card } from "semantic-ui-react";
import ListingCard from "./ListingCard";
import { getDistance } from "../helpers/helperFunctions";

const Home = ({ listings, location }) => {
  
  const renderCards = listings =>
    listings.map(listing => <ListingCard key={listing.id} {...listing} distance={getDistance(listing, location)} />);

  return (
    <Card.Group centered>{renderCards(listings)}</Card.Group>
  )
};

export default Home;
