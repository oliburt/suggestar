import React from "react";
import { Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import { getAverageRating } from "../helpers/helperFunctions";


const VenueAbout = ({ user, user_id, id, description, address, reviews, image_url }) => {
  return (
    <>
      <div>
        <span>Average Rating</span><br/>
        <StarRatingComponent
          name="rating"
          value={reviews ? getAverageRating(reviews) : 0}
          starCount={5}
          starColor={"#ffb400"}
          emptyStarColor={"#333"}
          editing={false}
        />
      </div>
      <Image src={image_url} wrapped/>
      <p>Description: {description}</p>
      <p>Address: {address}</p>
      {user && user.id === user_id ? (
        <div>
          <Link to={`/venues/${id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <Link to={`/venues/${id}/destroy`}>
            <Button>Delete</Button>
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default VenueAbout;
