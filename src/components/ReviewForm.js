import React, { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import { Form, Button } from "semantic-ui-react";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  return (
    <Form>
      <StarRatingComponent
        name="rating"
        value={rating}
        starCount={5}
        onStarClick={setRating}
        starColor={"#ffb400"}
        emptyStarColor={"#333"}
        editing={true}
      />
      <Form.TextArea value={content} onChange={(e,data) => setContent(data.value)}/>
          <Button type='submit'>Submit</Button>
    </Form>
  );
};

export default ReviewForm;
