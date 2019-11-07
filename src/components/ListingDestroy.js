import React from "react";
import API from "../adapters/API";
import { Icon } from "semantic-ui-react";

const ListingDestroy = ({
  match,
  removeListing,
  user,
  history,
  listings,
  venues
}) => {
  const listing = listings.find(l => l.id === parseInt(match.params.id));
  if (listing) {
    const venue = venues.find(v => v.id === listing.venue_id);
    if (user && user.id === venue.user_id) {
      API.destroyListing(match.params.id).then(listing => {
        console.log(listing);
        if (listing && listing.error) {
          console.log("error:", listing.error);
        } else if (listing && listing.errors) {
          console.log("errors:", listing.errors);
        } else if (listing && listing.id) {
          removeListing(listing);
          history.push("/");
        } else {
          console.log("Return Value:", listing);
        }
      });
    } else {
      history.push("/");
    }
  } else {
    history.push("/");
  }

  return <Icon loading size='big' name='spinner' />;
};

export default ListingDestroy;
