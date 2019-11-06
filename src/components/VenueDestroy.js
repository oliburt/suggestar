import React from 'react';
import API from '../adapters/API';

const VenueDestroy = ({match, removeVenueFromUser, user, history}) => {
    API.destroyVenue(match.params.id).then(venue => {
        if (venue && venue.error) {
            console.log('error:', venue.error)
        } else if (venue && venue.errors) {
            console.log('errors:', venue.errors)
        } else if (venue && venue.id) {
            removeVenueFromUser(user, venue)
            history.push('/')
        } else {
            console.log('Return Value:', venue)
        }
    })
    return <></>
}

export default VenueDestroy;
