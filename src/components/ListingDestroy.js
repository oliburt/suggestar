import React, { useState } from "react";
import API from "../adapters/API";
import { Icon, Message, Button, Header } from "semantic-ui-react";

const ListingDestroy = ({
  match,
  removeListing,
  setActiveListingMenuItem
}) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleDeleteClick = () => {
      API.destroyListing(match.params.id).then(listing => {
        if (listing && listing.error) {
          setErrors([listing.error]);
          setLoading(false);
        } else if (listing && listing.errors) {
          setErrors([...listing.errors]);
          setLoading(false);
        } else if (listing && listing.id) {
          removeListing(listing);
        } else {
          console.log("Return Value:", listing);
        }
      });
  };

  return !loading ? (
    <div>
      {errors.length > 0 ? (
        <Message warning>
          <Message.Header>Something went Wrong!</Message.Header>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </Message>
      ) : null}
      <Header as="h4">Are you sure?</Header>
      <Button negative onClick={handleDeleteClick}>Delete</Button>
      <Button secondary onClick={() => setActiveListingMenuItem("Details")}>Cancel</Button>
    </div>
  ) : (
    <Icon loading size="big" name="spinner" />
  );
};

export default ListingDestroy;
