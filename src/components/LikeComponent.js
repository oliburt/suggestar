import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import { handleLikeButtonClick } from "../helpers/helperFunctions";
import { connect } from "react-redux";
import "../styles/ListingCard.css";

const LikeComponent = ({ user, id, updateLikeOnListing, listings }) => {
  const [likeError, setLikeError] = useState(null);
  const handleLikeClick = () => {
    if (!user) return setLikeError("Must be signed in to like a listing!");
    handleLikeButtonClick(user.id, id, updateLikeOnListing);
  };

  const likes = listings.find(l => l.id === id).likes;

  return (
    <div>
      <span className="clickable" onClick={handleLikeClick}>
        <Icon
          name="thumbs up"
          color={likes.find(l => user && l.user_id === user.id) ? "blue" : null}
          size="large"
        />
        <span>{likes.length} Likes</span>
      </span>
      {likeError ? (
        <>
          <br />
          <span style={{ color: "red", fontSize: "10px" }}>{likeError}</span>
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({ listings: state.listings });
const mapDispatchToProps = dispatch => ({
  updateLikeOnListing: like => dispatch({ type: "TOGGLE_LIKE", payload: like })
});

export default connect(mapStateToProps, mapDispatchToProps)(LikeComponent);
