import React from "react";
import { Header, Button, Card, Feed } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { renderCards } from "../helpers/helperFunctions";
import ReviewShow from "./ReviewShow";
import ReviewForm from "./ReviewForm";

const VenueShow = ({
  name,
  description,
  address,
  listings,
  id,
  user_id,
  user,
  location,
  reviews
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
      <ReviewForm venue_id={id} user_id={user.id}/>

      {reviews.length > 0 ? (
        <Card fluid>
          <Card.Content>
            <Card.Header>Venue Reviews:</Card.Header>
          </Card.Content>
          <Feed>
            {reviews.map(rev => (
              <ReviewShow {...rev} />
            ))}

          </Feed>
        </Card>
      ) : (
        <Header as="h4">No Reviews</Header>
      )}
    </div>
  );
};

export default VenueShow;
