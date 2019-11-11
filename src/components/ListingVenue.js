import React from 'react';
import { Segment, Image, Header } from 'semantic-ui-react';
import { getAverageRating } from '../helpers/helperFunctions';
import StarRatingComponent from "react-star-rating-component";


const ListingVenue = ({venue, history, windowWidth}) => {
    return (
         <Segment>
            Venue
            <div style={{ display: "flex" }} onClick={() => history.push(`/venues/${venue.id}`)}>
              <div>
                <Image src={venue.image_url} size="small" />
              </div>
              <div style={{ marginLeft: "3rem", paddingTop: "2rem" }}>
                <Header as="h2">{venue.name}</Header>
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
                <div style={{ marginLeft: "5rem", paddingTop: "2rem" }}>
                  <p>{venue.description}</p>
                </div>
              ) : null}
            </div>
          </Segment>
    );
}

export default ListingVenue;
