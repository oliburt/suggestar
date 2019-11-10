import React from "react";
import "./App.css";
import API from "./adapters/API";
import MainContainer from "./containers/MainContainer";
import Navigation from "./containers/Navigation";

class App extends React.Component {
  state = {
    user: null,
    isAuthenticated: null,
    listings: [],
    location: [],
    venues: [],
    errors: [],
    activeVenueMenuItem: "About"
  };

  setActiveVenueMenuItem = activeVenueMenuItem => this.setState({activeVenueMenuItem})

  addReview = review => this.setState({venues: this.state.venues.map(venue => {
    if (venue.id === review.venue_id) return {
      ...venue,
      reviews: [...venue.reviews, review]
    }
    return venue
  })})

  updateReview = review => this.setState({ venues: this.state.venues.map(venue => {
    if (venue.id === review.venue_id) return {
      ...venue,
      reviews: venue.reviews.map(rev => {
        if (rev.id === review.id) return review
        return rev
      })
    }
    return venue
  })})

  removeReview = review => this.setState({ venues: this.state.venues.map(venue => {
    if (venue.id === review.venue_id) return {
      ...venue,
      reviews: venue.reviews.filter(rev => rev.id !== review.id)
    }
    return venue
  })})

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
    this.setState({
      listings: this.state.listings.filter(l => l.id !== listing.id)
    });
  };

  logout = () => {
    API.logout();
    this.setUser(null);
    this.props.history.push("/");
  };

  handleOfflineNavigator = () => {
    const { lat, lng } = JSON.parse(localStorage.getItem('last-known-position'))
        this.initialCall(lat, lng)
  }

  componentDidMount() {
    if (navigator.onLine) {
      navigator.geolocation.getCurrentPosition(position => {
        localStorage.setItem("last-known-position", JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }))
        this.initialCall(position.coords.latitude,
          position.coords.longitude,)
      });
    } else {
        this.handleOfflineNavigator()
    }
  }

  initialCall = (lat, lng) => {
    API.initialCall(
      lat,
      lng,
      10000
    ).then(returnObj => {
      if (returnObj && returnObj.user && returnObj.user.errors) {
        this.setState({
          errors: returnObj.user.errors,
          location: [lat, lng],
          venues: returnObj.venues,
          listings: returnObj.listings,
          isAuthenticated: false
        });
      } else if (returnObj && returnObj.user && returnObj.user.id) {
        this.setState({
          location: [lat, lng],
          user: returnObj.user,
          isAuthenticated: true,
          venues: returnObj.venues,
          listings: returnObj.listings
        });
      } else if (returnObj && returnObj.errors && returnObj.venues) {
        API.logout();
        this.setState({
          location: [lat, lng],
          errors: returnObj.errors,
          venues: returnObj.venues,
          listings: returnObj.listings,
          isAuthenticated: false
        });
      } else {
        this.setState({
          location: [lat, lng],
          errors: ['Cannot Connect to the server at this time. Please try again later!']
        });
      }
    });
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
          addReview={this.addReview}
          updateReview={this.updateReview}
          removeReview={this.removeReview}
          activeVenueMenuItem={this.state.activeVenueMenuItem}
          setActiveVenueMenuItem={this.setActiveVenueMenuItem}
        />
      </div>
    );
  }
}

export default App;
