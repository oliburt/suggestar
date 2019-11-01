import React from "react";
import { Menu } from "semantic-ui-react";
// import './Navbar.css'

const Navbar = ({ user, handleMenuClick }) => {
  
  return (
    <Menu>
      <Menu.Item icon="bars" onClick={handleMenuClick} />
      {user ? <Menu.Item position='right'>Welcome {user.full_name}</Menu.Item> : null}
    </Menu>
  );
};

export default Navbar;
