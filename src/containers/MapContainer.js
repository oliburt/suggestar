import React, { Component } from "react";
import ShowMap from "../components/ShowMap";
import FilterForm from "../components/FilterForm";
import { filterByRadius, filterListingsByEvent } from "../helpers/helperFunctions";


export class MapContainer extends Component {
  
  render() {
    const { listings, location, selectedListingId, setSelectedListingId, radius, filter } = this.props;
    const radiusFilteredListings = filterByRadius(listings, location, radius)
    const eventFilteredListings = filterListingsByEvent(radiusFilteredListings, filter);

    return (
      <>
      <FilterForm listings={listings} changeFilter={this.props.changeFilter} filter={this.props.filter} radius={this.props.radius} setRadius={this.props.setRadius}/>
      <div style={{width: '90vw', height: '80vh', maxWidth: '1127px'}}>
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
        /> : 
        
        <div>Loading</div>
        }
        
      </div>
      </>
    );
  }
}

export default MapContainer;
