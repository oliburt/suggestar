import React from "react";
import UserPlaceHolder from "../components/UserPlaceHolder";
import UserShow from "../components/UserShow";

class UserShowContainer extends React.Component {
  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isAuthenticated === false) return this.props.history.push("/");
  }
  
  componentWillUnmount() {
    console.log('unmount')
  }
  

  render() {
    return (
      <div>
        {this.props.user ? <UserShow user={this.props.user} history={this.props.history} venues={this.props.venues} />: <UserPlaceHolder />}
      </div>
    );
  }
}

export default UserShowContainer;
