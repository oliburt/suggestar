import React from "react";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import {menuRoutes} from "../config/routes";
import { NavLink } from "react-router-dom";

const SideBarMenu = ({ onHide, user, visible }) => {
  const filteredRoutes = (routes, user) => {
    return user
      ? routes.filter(
          route => route.title !== "Login" && route.title !== "Registration"
        )
      : routes.filter(route => route.title !== "Logout" && route.title !== "My Profile");
  };

  return (
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        onHide={() => onHide(false)}
        vertical
        visible={visible}
        width="thin"
      >
        {filteredRoutes(menuRoutes, user).map(route => (
          <Menu.Item
            key={route.path}
            as={NavLink}
            to={route.path === '/users/:id' ? `/users/${user.id}`: route.path}
            exact
            activeClassName="active"
            onClick={() => onHide(false)}
          >
            <Icon name={route.icon} />
            {route.title}
          </Menu.Item>
        ))}
      </Sidebar>
  );
};

export default SideBarMenu;
