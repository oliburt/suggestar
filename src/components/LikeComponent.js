import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import { handleLikeButtonClick } from "../helpers/helperFunctions";

const LikeComponent = ({
  likes,
  user,
  id,
  updateLikeOnListing
}) => {
  const [likeError, setLikeError] = useState(null);
  const handleLikeClick = () => {
    if (!user) return setLikeError("Must be signed in to like a listing!");
    handleLikeButtonClick(user.id, id, updateLikeOnListing);
  };

  return (
    <div>
      <Icon
        name="thumbs up"
        color={likes.find(l => user && l.user_id === user.id) ? "blue" : null}
        size="large"
        onClick={handleLikeClick}
      />
      <span>{likes.length} Likes</span>
      {likeError ? (
        <>
          <br />
          <span style={{ color: "red", fontSize: "10px" }}>{likeError}</span>
        </>
      ) : null}
    </div>
  );
};

export default LikeComponent;
