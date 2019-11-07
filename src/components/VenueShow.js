import React from "react";
import { Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ListingCard from "./ListingCard";
import { getDistance, renderCards } from "../helpers/helperFunctions";

const VenueShow = ({
  name,
  description,
  address,
  listings,
  id,
  user_id,
  user,
  location
}) => {
  return (
    <div>
      <Header as="h1">{name}</Header>
      {user && user.id === user_id ? (
        <div>
          <Link to={`/venues/${id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <Link to={`/venues/${id}/destroy`}>
            <Button>Delete</Button>
          </Link>
        </div>
      ) : null}
      <p>Description: {description}</p>
      <p>Address: {address}</p>
      {user && user.id === user_id ? (
        <Link to="/listings/new">
          <Button>Add New Listing</Button>
        </Link>
      ) : null}
      {listings.length > 0 ? (
        <div>
          <Header as="h4">Upcoming Listings:</Header>
          {renderCards(listings, location, user)}
        </div>
      ) : (
        <Header as="h4">No Upcoming Listings</Header>
      )}
    </div>
  );
};

export default VenueShow;
