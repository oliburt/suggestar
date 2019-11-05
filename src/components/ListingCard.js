import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";


const ListingCard = ({ title, categories, description, id, venue, distance }) => {
  const history = useHistory()
  
  const convertDistance = (distance) => {
      return (distance/1000).toFixed(1)
  }
  
  return (
    <Card>
      <Card.Content onClick={() => history.push(`/listings/${id}`)}>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{categories.map(c => c.name).join(", ")}</Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra onClick={() => history.push(`/venues/${venue.id}`)}>
          <Icon name="map pin" />
          {venue.name} - {convertDistance(distance)}km
      </Card.Content>
    </Card>
  );
};

export default ListingCard;
