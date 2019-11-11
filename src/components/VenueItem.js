import React from "react";
import { Item } from "semantic-ui-react";
import StarRatingComponent from "react-star-rating-component";
import { getAverageRating } from "../helpers/helperFunctions";

const VenueItem = ({ id, name, history, image_url, reviews }) => {
  return (
    <Item onClick={() => history.push(`/venues/${id}`)}>
      {image_url ? (
        <Item.Image src={image_url} size="tiny" />
      ) : (
        <Item.Image
          size="tiny"
          src="https://react.semantic-ui.com/images/wireframe/image.png"
        />
      )}

      <Item.Content verticalAlign="middle">
        <Item.Header>{name}</Item.Header>
        <Item.Extra>
          <StarRatingComponent
            name="rating"
            value={reviews ? getAverageRating(reviews) : 0}
            starCount={5}
            starColor={"#ffb400"}
            emptyStarColor={"#333"}
            editing={false}
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default VenueItem;
