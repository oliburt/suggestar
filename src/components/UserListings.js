import React from "react";
import { renderCards } from "../helpers/helperFunctions";

const UserListings = ({
  listings,
  location,
  user,
  venues
}) => {
  return (
    <div>
      {renderCards(listings, location, user, venues)}
    </div>
  );
};

export default UserListings;
