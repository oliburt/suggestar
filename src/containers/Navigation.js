import React, { Component } from "react";
import Navbar from "../components/Navbar";
import SideBarMenu from "../components/SideBarMenu";

export class Navigation extends Component {
  state = {
    sideBarVisible: false
  };

  setSideBarVisible = val => this.setState({ sideBarVisible: val });

  handleMenuClick = () => this.setSideBarVisible(!this.state.sideBarVisible);

  render() {
    return (
      <>
        <Navbar user={this.props.user} handleMenuClick={this.handleMenuClick} />
        <SideBarMenu
          onHide={this.setSideBarVisible}
          visible={this.state.sideBarVisible}
          user={this.props.user}
        />
      </>
    );
  }
}

export default Navigation;
