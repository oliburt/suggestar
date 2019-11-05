import React, { Component } from 'react';
import Home from '../components/Home';

export class HomeContainer extends Component {
    
    filterListings = listings => {
        return listings
    }
    
    render() {
        const {listings, location} = this.props
        const filteredListings = this.filterListings(listings)
        return (
            <div>
                <Home listings={filteredListings} location={location}/>
            </div>
        );
    }
}

export default HomeContainer;


