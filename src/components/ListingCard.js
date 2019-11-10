import React, {useState} from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { handleLikeButtonClick } from "../helpers/helperFunctions";


const ListingCard = ({ title, categories, description, id, venue, distance, likes, user, updateLikeOnListing }) => {
  const history = useHistory()
  const [likeError, setLikeError] = useState(null);
  
  const convertDistance = (distance) => {
      return (distance/1000).toFixed(1)
  }

  const handleLikeClick = () => {
    if (!user) return setLikeError('Must be signed in to like a listing!')
    handleLikeButtonClick(user.id, id, updateLikeOnListing)
  }
  
  return (
    <Card fluid>
      {venue && venue.image_url ? <Image src={venue.image_url} wrapped ui={false}/> : null}
      
      <Card.Content onClick={() => history.push(`/listings/${id}`)}>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{categories.map(c => c.name).join(", ")}</Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      {
        venue ? 
      <Card.Content extra onClick={() => history.push(`/venues/${venue.id}`)}>
          <Icon name="map pin" />
          {venue.name} - {convertDistance(distance)}km
      </Card.Content>
      : null

      }
      <Card.Content extra>
          <Icon name="thumbs up" color={likes.find(l => user && l.user_id === user.id) ? 'blue' : null} size="large" onClick={handleLikeClick}/>
          <span>{likes.length} Likes</span>
          {likeError ? <><br/><span style={{color: 'red', fontSize: '10px'}}>{likeError}</span></> : null}
      </Card.Content>
    </Card>
  );
};

export default ListingCard;
