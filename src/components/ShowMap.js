import React, { useState } from "react";
import {
  GoogleMap,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { Header } from "semantic-ui-react";
import mapStyles from "../styles/mapStyles";

const ShowMap = withGoogleMap(({ listings, location, selectedListingId }) => {
  const [selectedListing, setSelectedListing] = useState(
    listings.find(l => l.id === selectedListingId)
  );

  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: location[0], lng: location[1] }}
      defaultOptions={{ styles: mapStyles }}
    >
      <Marker position={{ lat: location[0], lng: location[1] }} icon={{ url: "/user-location-marker.png", scaledSize: new window.google.maps.Size(30,30)}} />
      {listings.map(listing => (
        <Marker
          key={listing.id}
          position={{
            lat: listing.venue.latitude,
            lng: listing.venue.longitude
          }}
          onClick={() => setSelectedListing(listing)}
        />
      ))}
      {selectedListing && (
        <InfoWindow
          position={{
            lat: selectedListing.venue.latitude,
            lng: selectedListing.venue.longitude
          }}
          onCloseClick={() => setSelectedListing(null)}
        >
          <div>
            <Header as="h2">{selectedListing.title}</Header>
            <p>{selectedListing.description}</p>
            <p>{selectedListing.venue.name}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
});

export default ShowMap;
