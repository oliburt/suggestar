import React, { Component } from "react";
import { allRoutes } from "../config/routes";
import { Route, Switch } from "react-router-dom";
import { Message, Container } from "semantic-ui-react";
import Navbar from "../components/Navbar";
import SideBarMenu from "../components/SideBarMenu";
import API from "../adapters/API";

class MainContainer extends Component {
  state = {
    sideBarVisible: false,
    location: [],
    listings: [],
    selectedListingId: null
    };

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          location: [position.coords.latitude, position.coords.longitude]
        });
        API.getNearbyListings(
          position.coords.latitude,
          position.coords.longitude,
          2000
        ).then(listings => {
          if (listings && listings[0].errors) {
            console.log("errors:", listings[0].errors);
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
  

  setSelectedListingId = id => (id ? this.setState({selectedListingId: id}) : this.state.selectedListingId = id)

  setSideBarVisible = val => this.setState({ sideBarVisible: val });

  handleMenuClick = () => this.setSideBarVisible(!this.state.sideBarVisible);

  notFoundMessage = () => <Message negative>Not Found</Message>;

  render() {
    const {
      user,
      login,
      logout,
      isAuthenticated,
      updateUser,
      addVenueToCurrentUser,
      setIsAuthenticated
    } = this.props;
    return (
      <div>
        <Navbar user={user} handleMenuClick={this.handleMenuClick} />
        <Container>
          <SideBarMenu
            onHide={this.setSideBarVisible}
            visible={this.state.sideBarVisible}
            user={user}
          />
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
