import React, { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import { Form, Button, Header, Message } from "semantic-ui-react";
import API from "../adapters/API";

const ReviewForm = ({ venue_id, user_id, addReview, id }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    const review = {
      rating,
      content,
      venue_id,
      user_id
    };
    API.postReview(review).then(review => {
      if (review && review.error) return setErrors([review.error])
      if (review && review.errors) return setErrors([...review.errors])
      if (review && review.id) return addReview(review)
      return setErrors(["Server Error, please try again later"])
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errors.length > 0 ? (
        <Message warning>
          <Message.Header>Something went Wrong!</Message.Header>
          {errors.map(error => (
            <p>{error}</p>
          ))}
        </Message>
      ) : null}
      <Header as="h3">Add a review</Header>
      <StarRatingComponent
        name="rating"
        value={rating}
        starCount={5}
        onStarClick={setRating}
        starColor={"#ffb400"}
        emptyStarColor={"#333"}
        editing={true}
      />
      <Form.TextArea
        value={content}
        onChange={(e, data) => setContent(data.value)}
        placeholder="Content..."
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default ReviewForm;
