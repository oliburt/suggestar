import React, { Component } from "react";
import Home from "../components/Home";
import { filterByRadius, filterListingsByEvent, isListingInNext24hours } from "../helpers/helperFunctions";

export class HomeListingContainer extends Component {
  

  render() {
    const { listings, location, radius, filter, user, venues, updateLikeOnListing } = this.props;
    
    const currentListings = listings.filter(l => isListingInNext24hours(l))
    const radiusFilteredListings = filterByRadius(currentListings, venues, location, radius)
    const eventFilteredListings = filterListingsByEvent(radiusFilteredListings, filter);
    
    return listings.length > 0 ? (
      <div>
        <Home listings={eventFilteredListings} location={location} user={user} venues={venues} updateLikeOnListing={updateLikeOnListing}/>
      </div>
    ) : (
      <div>No Upcoming Listings</div>
    );
  }
}

export default HomeListingContainer;
