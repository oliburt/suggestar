import React, { Component } from "react";
import ShowMap from "../components/ShowMap";
import FilterForm from "../components/FilterForm";
import { filterByRadius, filterListingsByEvent } from "../helpers/helperFunctions";


export class MapContainer extends Component {

  
  
  render() {
    const { listings, location, selectedListingId, setSelectedListingId, radius, filter, venues, windowWidth } = this.props;
    const radiusFilteredListings = filterByRadius(listings, venues, location, radius)
    const eventFilteredListings = filterListingsByEvent(radiusFilteredListings, filter);

    return (
      <>
      <div style={{width: windowWidth < 600 ? '90vw' : '45vw', height: '80vh', maxWidth: '1127px'}}>
        { location[0] && location[1] ? 
        <ShowMap
          googleMapUrl={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          location={location}
          listings={eventFilteredListings}
          setSelectedListingId={setSelectedListingId}
          selectedListingId={selectedListingId}
          venues={venues}
        /> : 
        
        <div>Loading</div>
        }
        
      </div>
      </>
    );
  }
}

export default MapContainer;
