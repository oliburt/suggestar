import React from 'react';
import { Card, Feed } from 'semantic-ui-react';
import ReviewShow from '../components/ReviewShow';

const ReviewListContainer = ({reviews, setReviewToEdit}) => {
    const sortReviewsByMostRecent = reviews => reviews.sort((a, b) => {
        const date1 = new Date(a.created_at)
        const date2 = new Date(b.created_at)
        return date2 - date1
    }) 

    return (
        <Card fluid>
          <Card.Content>
            <Card.Header>Venue Reviews:</Card.Header>            
          </Card.Content>
          <Feed>
            {sortReviewsByMostRecent(reviews).map(rev => (
              <ReviewShow key={rev.id} {...rev} setReviewToEdit={setReviewToEdit}/>
            ))}

          </Feed>
        </Card>
    );
}

export default ReviewListContainer;
