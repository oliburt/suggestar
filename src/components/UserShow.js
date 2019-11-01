import React from 'react';
import { Link } from "react-router-dom";
import { Header, Button, Icon } from "semantic-ui-react";

const UserShow = ({user}) => {
    return (
        <div>
            <Header as='h1'>{user.full_name}</Header>
            <Button as={Link} to="/users/edit">Edit</Button>
            <p>Email: {user.email}</p>
            <p>Venues:</p>
            <ul>
                {user.venues.map(v => <li>{v.name}</li>)}
            </ul>
        </div>
    );
}

export default UserShow;
