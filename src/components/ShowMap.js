import React from "react";
import { GoogleMap, withGoogleMap } from "react-google-maps";

const ShowMap = withGoogleMap(({ listings, location }) => {
  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: location[0], lng: location[1] }}
    />
  );
});

export default ShowMap;
