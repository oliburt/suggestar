import React from "react";
import UserShow from "../components/UserShow";

class UserShowContainer extends React.Component {
  componentDidMount() {
    if (this.props.activeHomeMenuItem !== 'Listings') {
      this.props.setActiveHomeMenuItem('Listings')
    }
    if (this.props.activeListingMenuItem !== 'Details') {
      this.props.setActiveListingMenuItem('Details')
    }
    if (this.props.activeVenueMenuItem !== 'About') {
      this.props.setActiveVenueMenuItem('About')
    }
    if (this.props.selectedListingId) {
      this.props.setSelectedListingId(null)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isAuthenticated === false)
      return this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <UserShow
          user={this.props.user}
          history={this.props.history}
          venues={this.props.venues}
          activeUserMenuItem={this.props.activeUserMenuItem}
          setActiveUserMenuItem={this.props.setActiveUserMenuItem}
          windowWidth={this.props.windowWidth}
          location={this.props.location}
          removeUser={this.props.removeUser}
          updateUser={this.props.updateUser}
        />
      </div>
    );
  }
}

export default UserShowContainer;
