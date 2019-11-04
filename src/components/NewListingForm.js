import React, {useState} from "react";
import { Form, Button } from "semantic-ui-react";

const NewListingForm = () => {
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [ticketURL, setTicketURL] = useState(null);
    const [ageRestriction, setAgeRestriction] = useState(null);

  return (
    <Form onSubmit={() => {}}>
      <Form.Input
        placeholder="title..."
        value={title}
        name="name"
        onChange={e => setTitle(e.target.value)}
      />
      <Form.TextArea
        placeholder="description..."
        value={description}
        name="description"
        onChange={e => setDescription(e.target.value)}
      />
      <Form.Input
        placeholder="ticket url (if necessary)..."
        value={ticketURL}
        name="ticketURL"
        onChange={e => setTicketURL(e.target.value)}
      />
      <Form.Input
        placeholder="age restriction...?"
        value={ageRestriction}
        name="ageRestriction"
        onChange={e => setAgeRestriction(e.target.value)}
      />

      <Button type="submit">Create Venue</Button>
    </Form>
  );
};

export default NewListingForm;

//     t.datetime "datetime"
