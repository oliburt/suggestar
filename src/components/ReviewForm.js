import React, { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import { Form, Button, Header } from "semantic-ui-react";
import API from "../adapters/API";

const ReviewForm = ({venue_id, user_id}) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    const review = {
      rating,
      content,
      venue_id,
      user_id 
    }
    API.postReview(review).then(console.log)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Header as='h3'>Add a review</Header>
      <StarRatingComponent
        name="rating"
        value={rating}
        starCount={5}
        onStarClick={setRating}
        starColor={"#ffb400"}
        emptyStarColor={"#333"}
        editing={true}
      />
      <Form.TextArea value={content} onChange={(e,data) => setContent(data.value)} placeholder="Content..."/>
          <Button type='submit'>Submit</Button>
    </Form>
  );
};

export default ReviewForm;
