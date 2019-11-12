import React, { Component } from "react";
import { allRoutes } from "../config/routes";
import { Route, Switch } from "react-router-dom";
import { Message } from "semantic-ui-react";

class MainContainer extends Component {
  state = {
    selectedListingId: null,
    filter: "All",
    currentRadius: localStorage.getItem("search-radius")
      ? parseInt(localStorage.getItem("search-radius"))
      : 2000
  };

  changeFilter = filter => this.setState({ filter });

  setRadius = radius => {
    localStorage.setItem("search-radius", radius);
    this.setState({ currentRadius: radius });
  };

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
      removeListing,
      addReview,
      updateReview,
      removeReview,
      activeVenueMenuItem,
      setActiveVenueMenuItem,
      windowWidth,
      setActiveHomeMenuItem,
      activeHomeMenuItem,
      setActiveListingMenuItem,
      activeListingMenuItem,
      setActiveUserMenuItem,
      activeUserMenuItem,
      removeUser
    } = this.props;
    return (
      <>
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
                    addReview={addReview}
                    updateReview={updateReview}
                    removeReview={removeReview}
                    activeVenueMenuItem={activeVenueMenuItem}
                    setActiveVenueMenuItem={setActiveVenueMenuItem}
                    windowWidth={windowWidth}
                    setActiveHomeMenuItem={setActiveHomeMenuItem}
                    activeHomeMenuItem={activeHomeMenuItem}
                    setActiveListingMenuItem={setActiveListingMenuItem}
                    activeListingMenuItem={activeListingMenuItem}
                    activeUserMenuItem={activeUserMenuItem}
                    setActiveUserMenuItem={setActiveUserMenuItem}
                    removeUser={removeUser}
                  />
                ) : (
                  this.notFoundMessage()
                )
              }
            />
          ))}
        </Switch>
      </>
    );
  }
}

export default MainContainer;
