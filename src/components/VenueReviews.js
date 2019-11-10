import React, {useState} from "react";
import ReviewForm from "./ReviewForm";
import { Header } from "semantic-ui-react";
import ReviewListContainer from "../containers/ReviewListContainer";

const VenueReviews = ({ id, user, addReview, updateReview, reviews }) => {
  const [reviewToEdit, setReviewToEdit] = useState(null);
  
  const getReview = (reviews, id) => reviews.find(r => r.id === id)

  return (
    <>
      {user && reviewToEdit ? (
        <ReviewForm
          venue_id={id}
          user_id={user.id}
          updateReview={updateReview}
          id={getReview(reviews, reviewToEdit).id}
          ratingToEdit={getReview(reviews, reviewToEdit).rating}
          contentToEdit={getReview(reviews, reviewToEdit).content}
        />
      ) : user ? (
        <ReviewForm venue_id={id} user_id={user.id} addReview={addReview} />
      ) : (
        <span style={{ fontSize: "10px" }}>Sign in to add a review!</span>
      )}

      {reviews.length > 0 ? (
        <ReviewListContainer reviews={reviews} setReviewToEdit={setReviewToEdit}/>
      ) : (
        <Header as="h4">No Reviews</Header>
      )}
    </>
  );
};

export default VenueReviews;
