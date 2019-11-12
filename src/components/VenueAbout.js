import React from "react";
import { Image, Header } from "semantic-ui-react";
import StarRatingComponent from "react-star-rating-component";
import { getAverageRating, formatAddress } from "../helpers/helperFunctions";

const VenueAbout = ({
  user,
  user_id,
  id,
  description,
  address,
  reviews,
  image_url,
  name
}) => {
  return (
    <>
      <div>
        <Header as="h1">{name}</Header>
        <span>Average Rating</span>
        <br />
        <StarRatingComponent
          name="rating"
          value={reviews ? getAverageRating(reviews) : 0}
          starCount={5}
          starColor={"#ffb400"}
          emptyStarColor={"#333"}
          editing={false}
        />
      </div>
      <Image src={image_url} wrapped />
      <p>{description}</p>
      {formatAddress(address)}
    </>
  );
};

export default VenueAbout;
