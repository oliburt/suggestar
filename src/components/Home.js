import React from 'react';
import { Card } from "semantic-ui-react";
import ListingCard from './ListingCard';
import UserPlaceHolder from './UserPlaceHolder';


const Home = ({listings}) => {
    const renderCards = listings => listings.map(listing => <ListingCard key={listing.id} {...listing} />)
    
    return (
        
            (listings.length > 0) ? 
            <Card.Group centered>
                {renderCards(listings)}
            </Card.Group> :
            <UserPlaceHolder/>
    );
}

export default Home;
