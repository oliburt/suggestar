import React, { Component } from "react";
import Home from "../components/Home";
import { Link } from "react-router-dom";
import FilterForm from "../components/FilterForm";
import { filterByRadius, filterListingsByEvent, isListingInNext24hours } from "../helpers/helperFunctions";

export class HomeContainer extends Component {
  

  render() {
    const { listings, location, radius, filter, user, venues } = this.props;
    const currentListings = listings.filter(l => isListingInNext24hours(l))
    const radiusFilteredListings = filterByRadius(currentListings, venues, location, radius)
    const eventFilteredListings = filterListingsByEvent(radiusFilteredListings, filter);
    
    return listings.length > 0 ? (
      <div>
        <FilterForm listings={listings} changeFilter={this.props.changeFilter} filter={this.props.filter} radius={this.props.radius} setRadius={this.props.setRadius}/>
        <Link to={"/map"}>>>View Map</Link>
        <Home listings={eventFilteredListings} location={location} user={user} venues={venues}/>
      </div>
    ) : (
      <div>No Listings...</div>
    );
  }
}

export default HomeContainer;
