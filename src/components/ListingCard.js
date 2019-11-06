import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";


const ListingCard = ({ title, categories, description, id, venue, distance, likes, user }) => {
  const history = useHistory()
  
  const convertDistance = (distance) => {
      return (distance/1000).toFixed(1)
  }
  
  return (
    <Card fluid>
      <Card.Content onClick={() => history.push(`/listings/${id}`)}>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{categories.map(c => c.name).join(", ")}</Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra onClick={() => history.push(`/venues/${venue.id}`)}>
          <Icon name="map pin" />
          {venue.name} - {convertDistance(distance)}km
      </Card.Content>
      <Card.Content extra>
          <Icon name="thumbs up" color={likes.find(l => l.id === user.id) ? 'blue' : null} size="large" />
          <span>{likes.length} Likes</span>
      </Card.Content>
    </Card>
  );
};

export default ListingCard;
