import React, { Component } from "react";
import Home from "../components/Home";
import {
  filterByRadius,
  filterListingsByEvent,
  isListingInNext24hours
} from "../helpers/helperFunctions";
import { Message, Header } from "semantic-ui-react";

export class HomeListingContainer extends Component {
  render() {
    const {
      listings,
      location,
      radius,
      filter,
      user,
      venues,
      updateLikeOnListing
    } = this.props;

    const currentListings = listings.filter(l => isListingInNext24hours(l));
    const radiusFilteredListings = filterByRadius(
      currentListings,
      venues,
      location,
      radius
    );
    const eventFilteredListings = filterListingsByEvent(
      radiusFilteredListings,
      filter
    );

    return eventFilteredListings.length > 0 ? (
      <div>
      <Header as="h2">Today's Listings</Header>

        <Home
          listings={eventFilteredListings}
          location={location}
          user={user}
          venues={venues}
          updateLikeOnListing={updateLikeOnListing}
        />
      </div>
    ) : (
      <Message>
        <Message.Header>No Listings Today</Message.Header>
      </Message>
    );
  }
}

export default HomeListingContainer;
