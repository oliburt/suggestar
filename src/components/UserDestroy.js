import React, { useState } from "react";
import API from "../adapters/API";
import { Icon, Button, Header, Message } from "semantic-ui-react";

const UserDestroy = ({ user, setActiveUserMenuItem, removeUser }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleDeleteClick = () => {
    setLoading(true);

    API.destroyUser(user.id).then(user => {
      if (user && user.error) {
        setErrors([user.error]);
        setLoading(false);
      } else if (user && user.errors) {
        setErrors([...user.errors]);
        setLoading(false);
      } else if (user && user.id) {
        removeUser(user)
    } else {
        console.log("Return Value:", user);
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
      <Button onClick={handleDeleteClick}>Delete</Button>
      <Button onClick={() => setActiveUserMenuItem('Details')}>Cancel</Button>
    </div>
  ) : (
    <Icon loading size="big" name="spinner" />
  );
};

export default UserDestroy;
