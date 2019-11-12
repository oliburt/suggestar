import React from "react";
import { Menu } from "semantic-ui-react";
import '../styles/Menus.css'

const VenueShowMenu = ({
  activeMenuItem,
  handleItemClick,
  windowWidth,
  user,
  venue_user_id
}) => {
  const handleClick = (e, data) => {
    handleItemClick(data.name);
  };

  return windowWidth > 600 ? (
    <Menu secondary tabular fluid vertical>
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
      {user && user.id === venue_user_id ? (
        <>
          <Menu.Item
            name="Edit"
            active={activeMenuItem === "Edit"}
            onClick={handleClick}
          />
          <Menu.Item
            name="Delete Venue"
            active={activeMenuItem === "Delete Venue"}
            onClick={handleClick}
          />
        </>
      ) : null}
    </Menu>
  ) : (
    <Menu secondary tabular fluid className="small-screen-menu">
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
      {user && user.id === venue_user_id ? (
        <>
          <Menu.Item
            name="Edit"
            active={activeMenuItem === "Edit"}
            onClick={handleClick}
          />
          <Menu.Item
            name="Delete Venue"
            active={activeMenuItem === "Delete Venue"}
            onClick={handleClick}
          />
        </>
      ) : null}
    </Menu>
  );
};

export default VenueShowMenu;
