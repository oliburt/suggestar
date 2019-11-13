import React, { useState } from "react";
import API from "../adapters/API";
import { Icon, Button, Header, Message } from "semantic-ui-react";

const VenueDestroy = ({ match, removeVenue, user, setActiveVenueMenuItem }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleDeleteClick = () => {
    setLoading(true);
    // const venue = venues.find(v => v.id === parseInt(match.params.id));
    API.destroyVenue(match.params.id).then(venue => {
      if (venue && venue.error) {
        setErrors([venue.error]);
        setLoading(false);
      } else if (venue && venue.errors) {
        setErrors([...venue.errors]);
        setLoading(false);
      } else if (venue && venue.id) {
        removeVenue(user, venue);
      } else {
        console.log("Return Value:", venue);
      }
    });
  };

  return !loading ? (
    <div>
      {errors.length > 0 ? (
        <Message warning>
          <Message.Header>Something went Wrong!</Message.Header>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </Message>
      ) : null}
      <Header as="h4">Are you sure?</Header>
      <Button negative onClick={handleDeleteClick}>Delete</Button>
      <Button secondary onClick={() => setActiveVenueMenuItem('About')}>Cancel</Button>
    </div>
  ) : (
    <Icon loading size="big" name="spinner" />
  );
};

export default VenueDestroy;
