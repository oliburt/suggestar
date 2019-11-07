import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { Header } from "semantic-ui-react";
import mapStyles from "../styles/mapStyles";

const ShowMap = withGoogleMap(
  ({ listings, location, selectedListingId, setSelectedListingId, venues }) => {
    const [selectedListing, setSelectedListing] = useState(
      listings.find(l => l.id === selectedListingId)
    );

    const getVenue = (listing, venues) => venues.find(v => v.id === listing.venue_id)
    
    return (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: location[0], lng: location[1] }}
        defaultOptions={{ styles: mapStyles }}
      >
        <Marker
          position={{ lat: location[0], lng: location[1] }}
          icon={{
            url: "/user-location-marker.png",
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />
        {listings.map(listing => (
          <Marker
            key={listing.id}
            position={{
              lat: getVenue(listing, venues).latitude,
              lng: getVenue(listing, venues).longitude
            }}
            onClick={() => setSelectedListing(listing)}
          />
        ))}
        {selectedListing && (
          <InfoWindow
            position={{
              lat: getVenue(selectedListing, venues).latitude,
              lng: getVenue(selectedListing, venues).longitude
            }}
            onCloseClick={() => {
              setSelectedListing(null);
              setSelectedListingId(null)
            }}
          >
            <div>
              <Header as="h2">{selectedListing.title}</Header>
              <Link to={`/listings/${selectedListing.id}`}>>>View Details</Link>

              <p>{selectedListing.description}</p>
              <Link to={`/venues/${getVenue(selectedListing, venues).id}`}>
                {getVenue(selectedListing, venues).name}
              </Link>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
);

export default ShowMap;
