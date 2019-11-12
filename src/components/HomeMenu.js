import React from "react";
import { Menu } from "semantic-ui-react";
import '../styles/Menus.css'

const HomeMenu = ({ windowWidth, activeMenuItem, handleItemClick }) => {
  const handleClick = (e, data) => {
    handleItemClick(data.name);
  };

  return windowWidth > 600 ? (
    <Menu secondary tabular fluid vertical>
      <Menu.Item
        name="Listings"
        active={activeMenuItem === "Listings"}
        onClick={handleClick}
      />
      <Menu.Item
        name="Map"
        active={activeMenuItem === "Map"}
        onClick={handleClick}
      />
    </Menu>
  ) : (
    <Menu secondary tabular fluid className="small-screen-menu">
      <Menu.Item
        name="Listings"
        active={activeMenuItem === "Listings"}
        onClick={handleClick}
      />
      <Menu.Item
        name="Map"
        active={activeMenuItem === "Map"}
        onClick={handleClick}
      />
    </Menu>
  );
};

export default HomeMenu;
