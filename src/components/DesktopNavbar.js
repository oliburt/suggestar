import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const DesktopNavbar = ({ user }) => {
  return (
    <Menu>
      <Menu.Item key={"/"} as={NavLink} to={"/"} exact>
        Home
      </Menu.Item>
      {user ? (
        <>
          <Dropdown text="Profile" simple className="link item">
            <Dropdown.Menu>
              <Dropdown.Header>Profile</Dropdown.Header>
              <Dropdown.Item key={"/user"} as={NavLink} to={"/user"} exact>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item key={"/logout"} as={NavLink} to={"/logout"} exact>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown text="New" simple className="link item">
            <Dropdown.Menu>
              <Dropdown.Header>New</Dropdown.Header>
              <Dropdown.Item
                key={"/venues/new"}
                as={NavLink}
                to={"/venues/new"}
                exact
              >
                New Venue
              </Dropdown.Item>
              <Dropdown.Item
                key={"/listings/new"}
                as={NavLink}
                to={"/listings/new"}
                exact
              >
                New Listing
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : (
        <Dropdown text="Login" simple className="link item">
          <Dropdown.Menu>
            <Dropdown.Item
              key={"/login"}
              as={NavLink}
              to={"/login"}
              exact
            >
              Login
            </Dropdown.Item>
            <Dropdown.Item
              key={"/register"}
              as={NavLink}
              to={"/register"}
              exact
            >
              Register
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </Menu>
  );
};

export default DesktopNavbar;
