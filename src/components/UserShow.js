import React from "react";

class UserShow extends React.Component {
  componentDidMount() {
    if (!this.props.user) return this.props.history.push("/");
  }

  render() {
    return (
      <div>
        {this.props.user ? this.props.user.full_name : <div>hello</div>}
      </div>
    );
  }
}

export default UserShow;
