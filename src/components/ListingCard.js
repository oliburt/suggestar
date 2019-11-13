import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { convertDistance } from "../helpers/helperFunctions";
import "../styles/ListingCard.css";
import LikeComponent from "./LikeComponent";

const ListingCard = ({
  title,
  categories,
  description,
  id,
  venue,
  distance,
  likes,
  user,
  updateLikeOnListing
}) => {
  const history = useHistory();

  return (
    <Card fluid className="clickable">
      {venue && venue.image_url ? (
        <Image
          src={venue.image_url}
          wrapped
          ui={false}
          onClick={() => history.push(`/listings/${id}`)}
        />
      ) : null}

      <Card.Content onClick={() => history.push(`/listings/${id}`)}>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{categories.map(c => c.name).join(", ")}</Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      {venue ? (
        <Card.Content extra onClick={() => history.push(`/venues/${venue.id}`)}>
          <Icon name="map pin" color="red" />
          {venue.name} - {convertDistance(distance)}km
        </Card.Content>
      ) : null}
      <Card.Content extra>
        <LikeComponent
          likes={likes}
          user={user}
          id={id}
          updateLikeOnListing={updateLikeOnListing}
        />
      </Card.Content>
    </Card>
  );
};

export default ListingCard;
