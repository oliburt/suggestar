import React from "react";
import { Menu } from "semantic-ui-react";
import '../styles/Menus.css'

const UserShowMenu = ({ activeMenuItem, handleItemClick, windowWidth }) => {
  const handleClick = (e, data) => {
    handleItemClick(data.name);
  };

  return windowWidth > 600 ? (
    <Menu secondary={true} tabular fluid vertical>
      <Menu.Item
        name="My Venues"
        active={activeMenuItem === "My Venues"}
        onClick={handleClick}
      />
      <Menu.Item
        name="My Upcoming Listings"
        active={activeMenuItem === "My Upcoming Listings"}
        onClick={handleClick}
      />

      <Menu.Item
        name="Edit"
        active={activeMenuItem === "Edit"}
        onClick={handleClick}
      />
      <Menu.Item
        name="Delete"
        active={activeMenuItem === "Delete"}
        onClick={handleClick}
      />
    </Menu>
  ) : (
    <Menu secondary tabular fluid className="small-screen-menu">
        <Menu.Item
          name="My Venues"
          active={activeMenuItem === "My Venues"}
          onClick={handleClick}
        />
        <Menu.Item
          name="My Upcoming Listings"
          active={activeMenuItem === "My Upcoming Listings"}
          onClick={handleClick}
        />
        <Menu.Item
          name="Edit"
          active={activeMenuItem === "Edit"}
          onClick={handleClick}
        />
        <Menu.Item
          name="Delete"
          active={activeMenuItem === "Delete"}
          onClick={handleClick}
        />
    </Menu>
  );
};

export default UserShowMenu;
