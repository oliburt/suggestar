import React from "react";
import ReviewForm from "./ReviewForm";
import { Header } from "semantic-ui-react";
import ReviewListContainer from "../containers/ReviewListContainer";

const VenueReviews = ({id, user, addReview, updateReview, reviews}) => {
  return (
    <>
      {user ? <ReviewForm
        venue_id={id}
        user_id={user.id}
        addReview={addReview}
        updateReview={updateReview}
      /> : null}

      {reviews.length > 0 ? (
        <ReviewListContainer reviews={reviews} />
      ) : (
        <Header as="h4">No Reviews</Header>
      )}
    </>
  );
};

export default VenueReviews;
