import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import API from "./adapters/API";
import MainContainer from "./containers/MainContainer";
import Navigation from "./containers/Navigation";
import { getDistance } from "./helpers/helperFunctions";

class App extends React.Component {
  state = {
    user: null,
    isAuthenticated: null,
    listings: [],
    location: [],
    venues: [],
    errors: []
  };

  addListing = listing => {
    this.setState({ listings: [...this.state.listings, listing] });
  };

  setUser = user => this.setState({ user });

  setIsAuthenticated = val => this.setState({ isAuthenticated: val });

  // const [user, setUser] = useState(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(null);

  login = user => {
    this.setState({ user, isAuthenticated: true });
    this.props.history.push("/");
  };

  updateUser = user => {
    this.setUser(user);
    this.props.history.push(`/user`);
  };

  addVenueToCurrentUser = (user, venue) => {
    if (user.venues.find(v_id => v_id === venue.id)) {
      this.setState({
        venues: this.state.venues.map(v => {
          if (v.id === venue.id) return venue;
          return v;
        })
      });
    } else if (!user.venues.find(v_id => v_id === venue.id)) {
      this.setState({
        venues: [...this.state.venues, venue],
        user: {
          ...this.state.user,
          venues: [...this.state.user.venues, venue.id]
        }
      });
    }
  };

  removeVenue = (user, venue) => {
    this.setState({
      user: {
        ...user,
        venues: user.venues.filter(v_id => v_id !== venue.id)
      },
      venues: this.state.venues.filter(v => v.id !== venue.id),
      listings: this.state.listings.filter(l => l.venue_id !== venue.id)
    });
  };

  removeListing = (listing) => {
    console.log('hit')
    this.setState({
      listings: this.state.listings.filter(l => l.id !== listing.id)
    });
  };

  logout = () => {
    API.logout();
    this.setUser(null);
    this.props.history.push("/");
  };

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        API.initialCall(
          position.coords.latitude,
          position.coords.longitude,
          10000
        ).then(returnObj => {
          if (returnObj && returnObj.user && returnObj.user.errors) {
            this.setState({
              errors: returnObj.user.errors,
              location: [position.coords.latitude, position.coords.longitude],
              venues: returnObj.venues,
              listings: returnObj.listings,
              isAuthenticated: false
            });
          } else if (returnObj && returnObj.user && returnObj.user.id) {
            this.setState({
              location: [position.coords.latitude, position.coords.longitude],
              user: returnObj.user,
              isAuthenticated: true,
              venues: returnObj.venues,
              listings: returnObj.listings
            });
          } else if (returnObj && returnObj.errors && returnObj.venues) {
            API.logout();
            this.setState({
              location: [position.coords.latitude, position.coords.longitude],
              errors: returnObj.errors,
              venues: returnObj.venues,
              listings: returnObj.listings,
              isAuthenticated: false
            });
          } else {
            this.setState({
              location: [position.coords.latitude, position.coords.longitude],
              errors: returnObj.errors
            });
          }
        });
      });
    } else {
      console.log("geolocation not available");
    }
  }

  updateListing = listing =>
    this.setState({
      listings: this.state.listings.map(l => {
        if (l.id === listing.id) return listing;
        return l;
      })
    });

  updateLikeOnListing = theLike => {
    const theListing = this.state.listings.find(l => l.id === theLike.listing_id);
    if (theListing.likes.find(l => l.user_id === theLike.user_id)) {

      this.setState({
        listings: this.state.listings.map(listing => {
          if (listing.id === theLike.listing_id) {
            return {
              ...listing,
              likes: listing.likes.filter(
                like => like.user_id !== this.state.user.id
              )
            };
          }
          return listing;
        })
      });
    } else {
      this.setState({
        listings: this.state.listings.map(listing => {
          if (listing.id === theLike.listing_id) {
            return {
              ...listing,
              likes: [...listing.likes, theLike]
            };
          }
          return listing;
        })
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Navigation user={this.state.user} />

        <MainContainer
          user={this.state.user}
          location={this.state.location}
          listings={this.state.listings}
          venues={this.state.venues}
          login={this.login}
          logout={this.logout}
          updateUser={this.updateUser}
          updateLikeOnListing={this.updateLikeOnListing}
          isAuthenticated={this.isAuthenticated}
          addVenueToCurrentUser={this.addVenueToCurrentUser}
          setIsAuthenticated={this.setIsAuthenticated}
          removeVenue={this.removeVenue}
          updateListing={this.updateListing}
          addListing={this.addListing}
          removeListing={this.removeListing}
        />
      </div>
    );
  }
}

export default App;
