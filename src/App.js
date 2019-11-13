import React from "react";
import "./App.css";
import API from "./adapters/API";
import MainContainer from "./containers/MainContainer";
import Navigation from "./containers/Navigation";
import { Container, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

class App extends React.Component {
  state = {
    loading: true,
    user: null,
    isAuthenticated: null,
    location: [],
    venues: [],
    errors: [],
    activeVenueMenuItem: "About",
    activeHomeMenuItem: "Listings",
    activeListingMenuItem: "Details",
    activeUserMenuItem: "My Venues",
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
  };
  setActiveUserMenuItem = activeUserMenuItem =>
    this.setState({ activeUserMenuItem });
  setActiveListingMenuItem = activeListingMenuItem =>
    this.setState({ activeListingMenuItem });

  setActiveVenueMenuItem = activeVenueMenuItem =>
    this.setState({ activeVenueMenuItem });

  setActiveHomeMenuItem = activeHomeMenuItem =>
    this.setState({ activeHomeMenuItem });

  addReview = review =>
    this.setState({
      venues: this.state.venues.map(venue => {
        if (venue.id === review.venue_id)
          return {
            ...venue,
            reviews: [...venue.reviews, review]
          };
        return venue;
      })
    });

  updateReview = review =>
    this.setState({
      venues: this.state.venues.map(venue => {
        if (venue.id === review.venue_id)
          return {
            ...venue,
            reviews: venue.reviews.map(rev => {
              if (rev.id === review.id) return review;
              return rev;
            })
          };
        return venue;
      })
    });

  removeReview = review =>
    this.setState({
      venues: this.state.venues.map(venue => {
        if (venue.id === review.venue_id)
          return {
            ...venue,
            reviews: venue.reviews.filter(rev => rev.id !== review.id)
          };
        return venue;
      })
    });

  // addListing = listing => {
  //   this.setState({ listings: [...this.state.listings, listing] });
  // };

  setUser = user => this.setState({ user });

  setIsAuthenticated = val => this.setState({ isAuthenticated: val });

  login = user => {
    this.setState({ user, isAuthenticated: true });
    this.props.history.push("/");
  };

  updateUser = user => {
    this.setUser(user);
    this.props.history.push(`/user`);
  };

  removeUser = (user) => {
    this.setState({
      venues: this.state.venues.filter(ven => ven.user_id !== user.id),
      listings: this.props.removeListingsForUser(user)
    }, () => this.logout())

  }

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
    this.setState(
      {
        user: {
          ...user,
          venues: user.venues.filter(v_id => v_id !== venue.id)
        },
        venues: this.state.venues.filter(v => v.id !== venue.id),
        listings: this.props.removeListingsForVenue(venue)
      },
      this.props.history.push("/")
    );
  };

  // removeListing = listing => {
  //   this.setState(
  //     {
  //       listings: this.state.listings.filter(l => l.id !== listing.id)
  //     },
  //     this.props.history.push("/")
  //   );
  // };

  logout = () => {
    API.logout();
    this.setUser(null);
    this.props.history.push("/");
  };

  handleOfflineNavigator = () => {
    const { lat, lng } = JSON.parse(
      localStorage.getItem("last-known-position")
    );
    this.initialCall(lat, lng);
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    if (navigator.onLine) {
      navigator.geolocation.getCurrentPosition(position => {
        localStorage.setItem(
          "last-known-position",
          JSON.stringify({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        );
        this.initialCall(position.coords.latitude, position.coords.longitude);
      });
    } else {
      this.handleOfflineNavigator();
    }
  }

  initialCall = (lat, lng) => {
    API.initialCall(lat, lng, 10000).then(returnObj => {
      if (returnObj && returnObj.user && returnObj.user.errors) {
        this.props.addListings(returnObj.listings)
        this.setState({
          errors: returnObj.user.errors,
          location: [lat, lng],
          venues: returnObj.venues,
          isAuthenticated: false,
          loading: false
        });
      } else if (returnObj && returnObj.user && returnObj.user.id) {
        this.props.addListings(returnObj.listings)
        this.setState({
          location: [lat, lng],
          user: returnObj.user,
          isAuthenticated: true,
          venues: returnObj.venues,
          loading: false
        });
      } else if (returnObj && returnObj.errors && returnObj.venues) {
        API.logout();
        this.props.addListings(returnObj.listings)

        this.setState({
          location: [lat, lng],
          errors: returnObj.errors,
          venues: returnObj.venues,
          isAuthenticated: false,
          loading: false
        });
      } else {
        this.setState({
          location: [lat, lng],
          errors: [
            "Cannot Connect to the server at this time. Please try again later!"
          ],
          loading: false
        });
      }
    });
  };

  // updateListing = listing =>
  //   this.setState({
  //     listings: this.state.listings.map(l => {
  //       if (l.id === listing.id) return listing;
  //       return l;
  //     })
  //   });

  // updateLikeOnListing = theLike => {
  //   const theListing = this.state.listings.find(
  //     l => l.id === theLike.listing_id
  //   );
  //   if (theListing.likes.find(l => l.user_id === theLike.user_id)) {
  //     this.setState({
  //       listings: this.state.listings.map(listing => {
  //         if (listing.id === theLike.listing_id) {
  //           return {
  //             ...listing,
  //             likes: listing.likes.filter(
  //               like => like.user_id !== this.state.user.id
  //             )
  //           };
  //         }
  //         return listing;
  //       })
  //     });
  //   } else {
  //     this.setState({
  //       listings: this.state.listings.map(listing => {
  //         if (listing.id === theLike.listing_id) {
  //           return {
  //             ...listing,
  //             likes: [...listing.likes, theLike]
  //           };
  //         }
  //         return listing;
  //       })
  //     });
  //   }
  // };

  updateDimensions = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div className="App">
        <Navigation
          user={this.state.user}
          windowWidth={this.state.windowWidth}
        />

        <Container className={this.state.windowWidth > 600 ? 'main-container' : 'main-container small-screen'}>
          {this.state.loading ? (
            <Icon loading size="huge" name="spinner" />
          ) : (
            <MainContainer
              user={this.state.user}
              location={this.state.location}
              venues={this.state.venues}
              login={this.login}
              logout={this.logout}
              updateUser={this.updateUser}
              updateLikeOnListing={this.updateLikeOnListing}
              isAuthenticated={this.isAuthenticated}
              addVenueToCurrentUser={this.addVenueToCurrentUser}
              setIsAuthenticated={this.setIsAuthenticated}
              removeVenue={this.removeVenue}
              addReview={this.addReview}
              updateReview={this.updateReview}
              removeReview={this.removeReview}
              activeVenueMenuItem={this.state.activeVenueMenuItem}
              setActiveVenueMenuItem={this.setActiveVenueMenuItem}
              windowWidth={this.state.windowWidth}
              setActiveHomeMenuItem={this.setActiveHomeMenuItem}
              activeHomeMenuItem={this.state.activeHomeMenuItem}
              setActiveListingMenuItem={this.setActiveListingMenuItem}
              activeListingMenuItem={this.state.activeListingMenuItem}
              activeUserMenuItem={this.state.activeUserMenuItem}
              setActiveUserMenuItem={this.setActiveUserMenuItem}
              removeUser={this.removeUser}
            />
          )}
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addListings: listings => dispatch({ type: 'ADD_LISTINGS', payload: listings }),
  removeListingsForVenue: venue => dispatch({ type: 'REMOVE_LISTINGS_FOR_VENUE', payload: venue}),
  removeListingsForUser: venue => dispatch({ type: 'REMOVE_LISTINGS_FOR_USER', payload: venue}),
})

export default connect(null, mapDispatchToProps)(App);
