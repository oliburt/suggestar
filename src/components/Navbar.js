import React from 'react';
import { Menu } from "semantic-ui-react";
import {routes} from '../config/routes';
import { NavLink } from "react-router-dom";

const Navbar = ({user}) => {
    return (
        <Menu>
            {
                routes.map(route => (
                    <Menu.Item 
                        key={route.path}
                        as={NavLink}
                        to={route.path}
                        exact
                        activeClassName='active'
                    >
                        {route.title}
                    </Menu.Item>
                ))
            }
            {user && <Menu.Item>Welcome {user.full_name}</Menu.Item>}
        </Menu>
    );
}

export default Navbar;
