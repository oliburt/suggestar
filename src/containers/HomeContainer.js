import React, { Component } from "react";
import Home from "../components/Home";
import { Link } from "react-router-dom";
import HomeFilterForm from "../components/HomeFilterForm";

export class HomeContainer extends Component {
  state = {
      options: {
          filter: 'All'
      }
  }

  changeFilter = newFilter => this.setState({options: {
      ...this.state.options,
      filter: newFilter
  }})
  
  filterListings = (listings, filter) => {
      if (filter === "All") return listings;
      return listings.filter(listing => {
          return listing.categories.find(cat => cat.name === filter)
      })
  };

  render() {
    const { listings, location } = this.props;
    const filteredListings = this.filterListings(listings, this.state.options.filter);
    return listings.length > 0 ? (
      <div>
        <HomeFilterForm listings={listings} changeFilter={this.changeFilter} filter={this.state.options.filter}/>
        <Link to={"/map"}>>>View Map</Link>
        <Home listings={filteredListings} location={location} />
      </div>
    ) : (
      <div>No Listings...</div>
    );
  }
}

export default HomeContainer;
