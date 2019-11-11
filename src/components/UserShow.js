import React from "react";
import { Link } from "react-router-dom";
import { Header, Button, Item, Icon } from "semantic-ui-react";
import VenueItem from "./VenueItem";

const UserShow = ({ user, history, venues }) => {
  const userVenues = venues.filter(ven => ven.user_id === user.id);
  return (
    <div>
      <Header as="h1">{user.full_name}</Header>
      <p>
        {user.email}
        <Icon
          name="edit"
          style={{ marginLeft: "5px" }}
          onClick={() => history.push("/user/edit")}
        />
      </p>
      <Header as='h3'>My Venues</Header>
      <Item.Group divided>
        {userVenues.map(v => (
          <VenueItem key={v.id} {...v} history={history} />
        ))}
      </Item.Group>
      <Button as={Link} to="/venues/new">
        New Venue
      </Button>
    </div>
  );
};

export default UserShow;
