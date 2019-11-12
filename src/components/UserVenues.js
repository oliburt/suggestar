import React from "react";
import { Item } from "semantic-ui-react";
import VenueItem from "./VenueItem";

const UserVenues = ({userVenues, history}) => {
  return (
    <div>
      <Item.Group divided>
        {userVenues.map(v => (
          <VenueItem key={v.id} {...v} history={history} />
        ))}
      </Item.Group>
    </div>
  );
};

export default UserVenues;
