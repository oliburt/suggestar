import React from "react";
import { Menu } from "semantic-ui-react";

const VenueShowMenu = ({activeMenuItem, handleItemClick}) => {
  
    const handleClick = (e, data) => {
        handleItemClick(data.name)
    }

  return (
    <Menu secondary>
      <Menu.Item
        name="About"
        active={activeMenuItem === "About"}
        onClick={handleClick}
      />
      <Menu.Item
        name="Upcoming Listings"
        active={activeMenuItem === "Upcoming Listings"}
        onClick={handleClick}
      />
      <Menu.Item
        name="Reviews"
        active={activeMenuItem === "Reviews"}
        onClick={handleClick}
      />
    </Menu>
  );
};

export default VenueShowMenu;
