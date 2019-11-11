import React from "react";
import { Card, Image } from "semantic-ui-react";
import StarRatingComponent from "react-star-rating-component";
import { getAverageRating } from "../helpers/helperFunctions";

const VenueCard = ({id, name, history, image_url, reviews}) => {
  return (
    <Card fluid onClick={() => history.push(`/venues/${id}`)}>
      {image_url ? (
        <Image src={image_url} />
      ) : null}

      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Description>
        <StarRatingComponent
            name="rating"
            value={reviews ? getAverageRating(reviews) : 0}
            starCount={5}
            starColor={"#ffb400"}
            emptyStarColor={"#333"}
            editing={false}
          />
        </Card.Description>
      </Card.Content>
      
    </Card>
  );
};

export default VenueCard;
