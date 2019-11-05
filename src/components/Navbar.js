import React from "react";
import { Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
// import './Navbar.css'

const Navbar = ({ user, handleMenuClick }) => {
  const history = useHistory()

  return (
    <Menu>
      <Menu.Item icon="bars" onClick={handleMenuClick} />
      {user ? <Menu.Item position='right' onClick={() => history.push('/')}>Welcome {user.full_name}</Menu.Item> : null}
    </Menu>
  );
};

export default Navbar;