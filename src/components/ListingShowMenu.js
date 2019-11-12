import React from "react";
import { Menu } from "semantic-ui-react";
import '../styles/Menus.css'

const ListingShowMenu = ({windowWidth, handleItemClick, activeMenuItem, user, listing_user_id}) => {
  const handleClick = (e, data) => {
    handleItemClick(data.name);
  };

  return windowWidth > 600 ? (
    <Menu secondary tabular fluid vertical>
      <Menu.Item
        name="Details"
        active={activeMenuItem === "Details"}
        onClick={handleClick}
      />
      <Menu.Item
        name="Venue"
        active={activeMenuItem === "Venue"}
        onClick={handleClick}
      />
      {user && user.id === listing_user_id ? (
        <>
          <Menu.Item
            name="Edit"
            active={activeMenuItem === "Edit"}
            onClick={handleClick}
          />
          <Menu.Item
            name="Delete Listing"
            active={activeMenuItem === "Delete Listing"}
            onClick={handleClick}
          />
        </>
      ) : null}
    </Menu>
  ) : (
    <Menu secondary tabular fluid className="small-screen-menu">
    <Menu.Item
        name="Details"
        active={activeMenuItem === "Details"}
        onClick={handleClick}
      />
      <Menu.Item
        name="Venue"
        active={activeMenuItem === "Venue"}
        onClick={handleClick}
      />
      {user && user.id === listing_user_id ? (
        <>
          <Menu.Item
            name="Edit"
            active={activeMenuItem === "Edit"}
            onClick={handleClick}
          />
          <Menu.Item
            name="Delete Listing"
            active={activeMenuItem === "Delete Listing"}
            onClick={handleClick}
          />
        </>
      ) : null}
    </Menu>
  );
};

export default ListingShowMenu;
