import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { renderCards } from "../helpers/helperFunctions";


const VenueUpcomingListings = ({user, user_id, listings, location, updateLikeOnListing, venues}) => {
    return (
        <>
          {user && user.id === user_id ? (
            <Link to="/listings/new">
              <Button>Add New Listing</Button>
            </Link>
          ) : null}
          {listings.length > 0 ? (
            <div>
              <Header as="h4">Upcoming Listings:</Header>
              {renderCards(listings, location, user, updateLikeOnListing)}
            </div>
          ) : (
            <Header as="h4">No Upcoming Listings</Header>
          )}
        </>
    );
}

export default VenueUpcomingListings;
