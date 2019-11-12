import React from "react";
import { renderCards } from "../helpers/helperFunctions";

const UserListings = ({
  listings,
  location,
  user,
  updateLikeOnListing,
  venues
}) => {
  return (
    <div>
      {renderCards(listings, location, user, updateLikeOnListing, venues)}
    </div>
  );
};

export default UserListings;
