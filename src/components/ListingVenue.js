import React from 'react';
import { Segment, Image, Header } from 'semantic-ui-react';
import { getAverageRating } from '../helpers/helperFunctions';
import StarRatingComponent from "react-star-rating-component";
import '../styles/VenueItem.css';



const ListingVenue = ({venue, history, windowWidth}) => {
    return (
         <Segment className="clickable">
            Venue
            <div style={{ display: "flex" }} onClick={() => history.push(`/venues/${venue.id}`)}>
              <div style={{minWidth: '100px'}}>
                <Image src={venue.image_url} size="small" />
              </div>
              <div style={{ marginLeft: "1rem", paddingTop: "1rem", minWidth: '75px' }}>
                <Header as="h3">{venue.name}</Header>
                <StarRatingComponent
                  name="rating"
                  value={venue.reviews ? getAverageRating(venue.reviews) : 0}
                  starCount={5}
                  starColor={"#ffb400"}
                  emptyStarColor={"#333"}
                  editing={false}
                />
              </div>
              {windowWidth > 800 ? (
                <div style={{ marginLeft: "2rem", paddingTop: "2rem", fontSize: '0.7rem' }}>
                  <p>{venue.description}</p>
                </div>
              ) : null}
            </div>
          </Segment>
    );
}

export default ListingVenue;
