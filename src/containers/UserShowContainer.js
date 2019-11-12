import React from "react";
import UserPlaceHolder from "../components/UserPlaceHolder";
import UserShow from "../components/UserShow";

class UserShowContainer extends React.Component {
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isAuthenticated === false)
      return this.props.history.push("/");
  }

 

  render() {
    return (
      <div>
        {this.props.user ? (
          <UserShow
            user={this.props.user}
            history={this.props.history}
            venues={this.props.venues}
            activeUserMenuItem={this.props.activeUserMenuItem}
            setActiveUserMenuItem={this.props.setActiveUserMenuItem}
            windowWidth={this.props.windowWidth}
            updateLikeOnListing={this.props.updateLikeOnListing}
            location={this.props.location}
            listings={this.props.listings}
            removeUser={this.props.removeUser}
            updateUser={this.props.updateUser}
          />
        ) : (
          <UserPlaceHolder />
        )}
      </div>
    );
  }
}

export default UserShowContainer;
