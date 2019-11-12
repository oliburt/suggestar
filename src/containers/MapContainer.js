import React, { Component } from "react";
import ShowMap from "../components/ShowMap";
import {
  filterByRadius,
  filterListingsByEvent,
  isListingInNext24hours
} from "../helpers/helperFunctions";
import { Header } from "semantic-ui-react";

export class MapContainer extends Component {
  render() {
    const {
      listings,
      location,
      selectedListingId,
      setSelectedListingId,
      radius,
      filter,
      venues,
      windowWidth
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

    return (
      <>
        <div
          style={{
            width: windowWidth < 600 ? "100vw" : "45vw",
            height: "80vh",
            maxWidth: "1127px"
          }}
        >
          <Header as="h2">Today's Listings</Header>
          {location[0] && location[1] ? (
            <ShowMap
              googleMapUrl={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "100%"}} />}
              mapElement={<div style={windowWidth > 600 ? { height: "100%", borderRadius: '15px' } : { height: '100%'}} />}
              location={location}
              listings={eventFilteredListings}
              setSelectedListingId={setSelectedListingId}
              selectedListingId={selectedListingId}
              venues={venues}
            />
          ) : (
            <div>Loading</div>
          )}
        </div>
      </>
    );
  }
}

export default MapContainer;
