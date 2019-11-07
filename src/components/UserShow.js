import React from 'react';
import { Link } from "react-router-dom";
import { Header, Button } from "semantic-ui-react";

const UserShow = ({user, history, venues}) => {
    const handleVenueClick = id => history.push(`/venues/${id}`)
    
    const userVenues = venues.filter(ven => ven.user_id === user.id)
    return (
        <div>
            <Header as='h1'>{user.full_name}</Header>
            <Button as={Link} to="/user/edit">Edit</Button>
            <p>Email: {user.email}</p>
            <p>Venues:</p>
            <ul>
                {userVenues.map(v => <li key={v.id} onClick={e => handleVenueClick(v.id)}>{v.name}</li>)}
            </ul>
            <Button as={Link} to="/venues/new">New Venue</Button>

        </div>
    );
}

export default UserShow;
