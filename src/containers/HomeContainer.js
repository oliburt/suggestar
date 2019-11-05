import React, { Component } from 'react';
import API from '../adapters/API';
import Home from '../components/Home';

export class HomeContainer extends Component {
    state = {
        listings: [],
        location: []
    }

    componentDidMount() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({location: [position.coords.latitude, position.coords.longitude]})
                API.getNearbyListings(position.coords.latitude, position.coords.longitude, 2000).then(listings => {
                    if (listings && listings[0].errors) {
                        console.log('errors:', listings[0].errors)
                    } else {
                        this.setState({listings})
                    }
                })
            })
        } else {
            console.log('geolocation not available')
        }
    }
    
    filterListings = listings => {
        return listings
    }
    
    render() {
        const filteredListings = this.filterListings(this.state.listings)
        return (
            <div>
                <Home listings={filteredListings} location={this.state.location}/>
            </div>
        );
    }
}

export default HomeContainer;


