import React from "react";
import UserPlaceHolder from "../components/UserPlaceHolder";
import UserShow from "../components/UserShow";

class UserShowContainer extends React.Component {
  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isAuthenticated === false) return this.props.history.push("/");
  }
  

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? <UserShow user={this.props.user} history={this.props.history} />: <UserPlaceHolder />}
      </div>
    );
  }
}

export default UserShowContainer;
