import React from 'react';
import { Link } from "react-router-dom";
import { Header, Button } from "semantic-ui-react";

const UserShow = ({user, history}) => {
    const handleVenueClick = id => history.push(`/venues/${id}`)
    
    return (
        <div>
            <Header as='h1'>{user.full_name}</Header>
            <Button as={Link} to="/user/edit">Edit</Button>
            <p>Email: {user.email}</p>
            <p>Venues:</p>
            <ul>
                {user.venues.map(v => <li key={v.id} onClick={e => handleVenueClick(v.id)}>{v.name}</li>)}
            </ul>
            <Button as={Link} to="/venues/new">New Venue</Button>

        </div>
    );
}

export default UserShow;
