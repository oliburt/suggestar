import React, { Component } from "react";
import { allRoutes } from "../config/routes";
import { Route, Switch } from "react-router-dom";
import { Message } from "semantic-ui-react";

class MainContainer extends Component {
  state = {
    selectedListingId: null,
    activeVenueMenuItem: "About",
    activeHomeMenuItem: "Listings",
    activeListingMenuItem: "Details",
    activeUserMenuItem: "My Venues",
    filter: "All",
    currentRadius: localStorage.getItem("search-radius")
      ? parseInt(localStorage.getItem("search-radius"))
      : 2000
  };

  setActiveUserMenuItem = activeUserMenuItem =>
    this.setState({ activeUserMenuItem });
  setActiveListingMenuItem = activeListingMenuItem =>
    this.setState({ activeListingMenuItem });

  setActiveVenueMenuItem = activeVenueMenuItem =>
    this.setState({ activeVenueMenuItem });

  setActiveHomeMenuItem = activeHomeMenuItem =>
    this.setState({ activeHomeMenuItem });

  changeFilter = filter => this.setState({ filter });

  setRadius = radius => {
    localStorage.setItem("search-radius", radius);
    this.setState({ currentRadius: radius });
  };

  setSelectedListingId = id => this.setState({ selectedListingId: id })


  notFoundMessage = () => <Message negative>Not Found</Message>;

  render() {
    const {
      user,
      venues,
      location,
      login,
      logout,
      isAuthenticated,
      updateUser,
      addVenueToCurrentUser,
      setIsAuthenticated,
      removeVenue,
      addReview,
      updateReview,
      removeReview,
      windowWidth,
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
                    location={location}
                    venues={venues}
                    selectedListingId={this.state.selectedListingId}
                    setSelectedListingId={this.setSelectedListingId}
                    removeVenue={removeVenue}
                    radius={this.state.currentRadius}
                    setRadius={this.setRadius}
                    filter={this.state.filter}
                    changeFilter={this.changeFilter}
                    addReview={addReview}
                    updateReview={updateReview}
                    removeReview={removeReview}
                    activeVenueMenuItem={this.state.activeVenueMenuItem}
                    setActiveVenueMenuItem={this.setActiveVenueMenuItem}
                    windowWidth={windowWidth}
                    setActiveHomeMenuItem={this.setActiveHomeMenuItem}
                    activeHomeMenuItem={this.state.activeHomeMenuItem}
                    setActiveListingMenuItem={this.setActiveListingMenuItem}
                    activeListingMenuItem={this.state.activeListingMenuItem}
                    activeUserMenuItem={this.state.activeUserMenuItem}
                    setActiveUserMenuItem={this.setActiveUserMenuItem}
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
