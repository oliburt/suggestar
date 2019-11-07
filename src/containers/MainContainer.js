import React, { Component } from "react";
import { allRoutes } from "../config/routes";
import { Route, Switch } from "react-router-dom";
import { Message, Container } from "semantic-ui-react";
import API from "../adapters/API";
import { getDistance } from "../helpers/helperFunctions";

class MainContainer extends Component {
  state = {
    selectedListingId: null,
    filter: "All",
    currentRadius: 2000
  };

  

  changeFilter = filter => this.setState({ filter });

  setRadius = radius => this.setState({ currentRadius: radius });

  // componentDidMount() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //       API.getNearbyListings(
  //         position.coords.latitude,
  //         position.coords.longitude,
  //         10000
  //       ).then(listings => {
  //         if (listings && listings.errors) {
  //           console.log("errors:", listings.errors);
  //         } else {
  //           this.setState({
  //             listings,
  //             location: [position.coords.latitude, position.coords.longitude]
  //           });
  //         }
  //       });
  //     });
  //   } else {
  //     console.log("geolocation not available");
  //   }
  // }


 

  setSelectedListingId = id =>
    id
      ? this.setState({ selectedListingId: id })
      : (this.state.selectedListingId = id);

  notFoundMessage = () => <Message negative>Not Found</Message>;

  render() {
    const {
      user,
      listings,
      venues,
      location,
      login,
      logout,
      isAuthenticated,
      updateUser,
      addVenueToCurrentUser,
      setIsAuthenticated,
      removeVenue,
      updateLikeOnListing,
      updateListing,
      addListing,
      removeListing
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
                      listings={listings}
                      location={location}
                      venues={venues}
                      selectedListingId={this.state.selectedListingId}
                      setSelectedListingId={this.setSelectedListingId}
                      removeVenue={removeVenue}
                      addListing={addListing}
                      radius={this.state.currentRadius}
                      setRadius={this.setRadius}
                      filter={this.state.filter}
                      changeFilter={this.changeFilter}
                      updateLikeOnListing={updateLikeOnListing}
                      updateListing={updateListing}
                      removeListing={removeListing}
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
