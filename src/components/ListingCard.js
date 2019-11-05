import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";


const ListingCard = ({ title, categories, description, id, venue }) => {
  const history = useHistory()
  return (
    <Card>
      <Card.Content onClick={() => history.push(`/listings/${id}`)}>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{categories.map(c => c.name).join(", ")}</Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to={`/venues/${venue.id}`}>
          <Icon name="map pin" />
          {venue.name}
        </Link>
      </Card.Content>
    </Card>
  );
};

export default ListingCard;
