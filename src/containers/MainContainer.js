import React, { Component } from "react";
import { allRoutes } from "../config/routes";
import { Route, Switch } from "react-router-dom";
import { Message, Container } from "semantic-ui-react";
import API from "../adapters/API";
import { getDistance } from "../helpers/helperFunctions";


class MainContainer extends Component {
  state = {
    location: [],
    listings: [],
    selectedListingId: null,
    currentRadius: 2000,
    filter: "All"
    };

    updateListings = returnObj => {
      if (returnObj.deleted) {
        this.setState({
          listings: this.state.listings.map(listing => {
            if (listing.id === returnObj.like.listing_id) {
              return {
                ...listing,
                likes: listing.likes.filter(like => like.id !== returnObj.like.id)
              }
            }
            return listing
          })
        })
      } else {
        this.setState({
          listings: this.state.listings.map(listing => {
            if (listing.id === returnObj.listing_id) {
              return {
                ...listing,
                likes: [...listing.likes, returnObj]
              }
            }
            return listing
          })
        })
      }
    }

  changeFilter = filter => this.setState({filter})

  setRadius = radius => this.setState({currentRadius: radius})

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          location: [position.coords.latitude, position.coords.longitude]
        });
        API.getNearbyListings(
          position.coords.latitude,
          position.coords.longitude,
          10000
        ).then(listings => {
          if (listings && listings.errors) {
            console.log("errors:", listings.errors);
          } else {
            this.setState({ listings });
          }
        });
      });
    } else {
      console.log("geolocation not available");
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState.selectedListingId === -1) return false
  //   return true
  // }

  addListing = listing => {
    if (getDistance(listing, this.state.location) < this.state.currentRadius) {
      this.setState({listings: [...this.state.listings, listing]})
    }
  }
  

  setSelectedListingId = id => (id ? this.setState({selectedListingId: id}) : this.state.selectedListingId = id)



  notFoundMessage = () => <Message negative>Not Found</Message>;

  render() {
    const {
      user,
      login,
      logout,
      isAuthenticated,
      updateUser,
      addVenueToCurrentUser,
      setIsAuthenticated,
      removeVenueFromUser
    } = this.props;
    return (
      <div>
        <Container>
          <Switch>
            {allRoutes.map(route => (
              <Route
                key={route.path}
                exact={route.exact}
                path={route.path}
                component={routerProps =>
                  route.component ? (
                    <route.component
                      {...routerProps}
                      login={login}
                      logout={logout}
                      user={user}
                      isAuthenticated={isAuthenticated}
                      setIsAuthenticated={setIsAuthenticated}
                      updateUser={updateUser}
                      addVenueToCurrentUser={addVenueToCurrentUser}
                      listings={this.state.listings}
                      location={this.state.location}
                      selectedListingId={this.state.selectedListingId}
                      setSelectedListingId={this.setSelectedListingId}
                      removeVenueFromUser={removeVenueFromUser}
                      addListing={this.addListing}
                      radius={this.state.currentRadius}
                      setRadius={this.setRadius}
                      filter={this.state.filter}
                      changeFilter={this.changeFilter}
                      updateListings={this.updateListings}
                    />
                  ) : (
                    this.notFoundMessage()
                  )
                }
              />
            ))}
          </Switch>
        </Container>
      </div>
    );
  }
}

export default MainContainer;
