import React from "react";
import { Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const VenueShow = ({
  name,
  description,
  address,
  current_listings,
  id,
  user_id,
  user
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
      <Header as="h4">Upcoming Listings:</Header>
      <ul>
        {current_listings.map(listing => (
          <Link to={`/listings/${listing.id}`} key={listing.id}>
            <li>{listing.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default VenueShow;
