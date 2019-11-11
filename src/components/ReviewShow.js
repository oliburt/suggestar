import React, { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import { Feed, Icon, Message } from "semantic-ui-react";
import API from "../adapters/API";

const ReviewShow = ({
  content,
  rating,
  created_at,
  users_name,
  id,
  setReviewToEdit,
  removeReview
}) => {
  const [errors, setErrors] = useState([]);

  const convertTimeCreated = datetime => {
    const createdAt = new Date(datetime);
    const timeNow = new Date();

    const diffTime = Math.abs(timeNow - createdAt);
    const diffMins = Math.round(diffTime / (1000 * 60));
    const diffHours = Math.round(diffTime / (1000 * 60 * 60));
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "a few seconds ago...";
    if (diffMins >= 1 && diffHours < 1) return `${diffMins} minutes ago`;
    if (diffHours >= 1 && diffDays < 1) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  const iconColor = rating => {
    if (rating === 5) return "green";
    if (rating === 4) return "olive";
    if (rating === 3) return "yellow";
    if (rating === 2) return "orange";
    if (rating === 1) return "red";
    return "grey";
  };

  const handleDeleteClick = id => {
    API.destroyReview(id).then(review => {
      if (review && review.error) return setErrors([review.error]);
      if (review && review.errors) return setErrors([...review.errors]);
      if (review && review.id) return removeReview(review);
      return setErrors(["Server Error, please try again later"]);
    });
  };

  return (
    <>
      {errors.length > 0 ? (
        <Message warning>
          <Message.Header>Something went Wrong!</Message.Header>
          {errors.map(error => (
            <p>{error}</p>
          ))}
        </Message>
      ) : null}
      <div style={{ textAlign: "right" }}>
        <Icon name="edit" onClick={() => setReviewToEdit(id)} />
        <Icon
          name="trash alternate"
          color="red"
          onClick={() => handleDeleteClick(id)}
        />
      </div>
      <Feed.Event>
        <Feed.Label>
          <Icon name="star" color={iconColor(rating)} />
        </Feed.Label>
        <Feed.Content style={{ borderBottom: "1px solid black" }}>
          <StarRatingComponent
            name="rating"
            value={rating}
            starCount={5}
            starColor={"#ffb400"}
            emptyStarColor={"#333"}
            editing={false}
          />
          <Feed.Summary>{content}</Feed.Summary>
          <Feed.Meta>by {users_name}</Feed.Meta>
          <Feed.Date content={convertTimeCreated(created_at)} />
        </Feed.Content>
      </Feed.Event>
    </>
  );
};

export default ReviewShow;
