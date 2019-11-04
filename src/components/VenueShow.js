import React from 'react';
import { Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const VenueShow = ({ name, description, address, listings}) => {
    
    
    return (
        <div>
            <Header as='h1'>{name}</Header>
            <p>Description: {description}</p>
            <p>Address: {address}</p>
            <ul>
                {listings.map(listing => <Link to={`/listings/${listing.id}`} key={listing.id}><li>{listing.title}</li></Link>)}
            </ul>
            <Link to="/listings/new"><Button>Add New Listing</Button></Link>
        </div>
    );
}

export default VenueShow
 

