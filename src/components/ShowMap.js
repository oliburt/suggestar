import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { Header, Image } from "semantic-ui-react";
import mapStyles from "../styles/mapStyles";
import { getVenue } from "../helpers/helperFunctions";

const ShowMap = withGoogleMap(
  ({ listings, location, selectedListingId, setSelectedListingId, venues }) => {
    const [selectedListing, setSelectedListing] = useState(
      listings.find(l => l.id === selectedListingId)
    );

    const selectedListingVenue = selectedListing ? getVenue(selectedListing, venues) : null
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
              lat: selectedListingVenue.latitude,
              lng: selectedListingVenue.longitude
            }}
            onCloseClick={() => {
              setSelectedListing(null);
            }}
          >
            <div>
              <Header as="h2">{selectedListing.title}</Header>
              {selectedListingVenue.image_url ? <Image style={{width: '60px', height:"60px"}} src={selectedListingVenue.image_url} centered/> : null}
              <Link to={`/listings/${selectedListing.id}`}>>>View Details</Link>
              <p>{selectedListing.description}</p>
              <Link to={`/venues/${selectedListingVenue.id}`}>
                {selectedListingVenue.name}
              </Link>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
);

export default ShowMap;
