import React, { Component } from "react";
import ShowMap from "../components/ShowMap";

export class MapContainer extends Component {
  
  render() {
    const { listings, location, selectedListingId, setSelectedListingId } = this.props;
    return (
      <div style={{width: '90vw', height: '90vh', maxWidth: '1127px'}}>
        { location[0] && location[1] ? 
        <ShowMap
          googleMapUrl={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          location={location}
          listings={listings}
          setSelectedListingId={setSelectedListingId}
          selectedListingId={selectedListingId}
        /> : 
        
        <div>Loading</div>
        }
        
      </div>
    );
  }
}

export default MapContainer;
