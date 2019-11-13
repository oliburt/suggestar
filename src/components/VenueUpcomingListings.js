import React from 'react';
import { Header } from 'semantic-ui-react';
import { renderCards } from "../helpers/helperFunctions";


const VenueUpcomingListings = ({user, user_id, listings, location, updateLikeOnListing}) => {
    return (
        <>
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
