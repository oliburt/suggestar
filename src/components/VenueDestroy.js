import React from "react";
import API from "../adapters/API";
import { Icon } from "semantic-ui-react";

const VenueDestroy = ({ match, removeVenue, user, history, venues }) => {
  const venue = venues.find(v => v.id === parseInt(match.params.id));

  if (user && user.id === venue.user_id) {
      API.destroyVenue(match.params.id).then(venue => {
          if (venue && venue.error) {
            console.log("error:", venue.error);
          } else if (venue && venue.errors) {
            console.log("errors:", venue.errors);
          } else if (venue && venue.id) {
            removeVenue(user, venue);
            history.push("/");
          } else {
            console.log("Return Value:", venue);
          }
        })
  } else {
      history.push("/");
  }

  return <Icon loading size='big' name='spinner' />;
};

export default VenueDestroy;
