import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../adapters/API";
import FormWrapper from "./FormWrapper";

const NewListingForm = ({ user, addListing, venues, windowWidth }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ticketURL, setTicketURL] = useState("");
  const [ageRestriction, setAgeRestriction] = useState("");
  const [beginDateTime, setBeginDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  let history = useHistory();

  useEffect(() => {
    if (categoryOptions.length === 0) {
      API.getCategories().then(categories => {
        setCategoryOptions(
          categories.map(category => {
            return {
              key: category.id,
              text: category.name,
              value: category.id
            };
          })
        );
      });
    }
  }, [categoryOptions.length]);

  const handleBeginDateTimeChange = date => {
    setBeginDateTime(date);
    if (endDateTime < date) {
      setEndDateTime(date);
    }
  };

  const handleEndDateTimeChange = date => {
    if (date >= beginDateTime) {
      setEndDateTime(date);
    } else {
      setEndDateTime(beginDateTime);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const listing = {
      title,
      description,
      ticket_url: ticketURL,
      age_restriction: ageRestriction,
      begin_datetime: beginDateTime,
      end_datetime: endDateTime,
      venue_id: selectedVenue,
      category_ids: selectedCategories
    };
    API.postListing(listing).then(listing => {
      if (listing && listing.id) {
        addListing(listing);
        history.push(`/listings/${listing.id}`);
      } else {
        console.log("todo: error handling");
      }
    });
  };

  const getVenueOptions = venues =>
    venues
      .filter(v => v.user_id === user.id)
      .map(v => ({ key: v.id, text: v.name, value: v.id }));

  return (
    <FormWrapper windowWidth={windowWidth}>
      <Form onSubmit={handleSubmit}>
        <Form.Select
          options={getVenueOptions(venues)}
          label="Select Venue"
          placeholder="Venue"
          value={selectedVenue}
          onChange={(e, data) => setSelectedVenue(data.value)}
        />
        <Form.Dropdown
          options={categoryOptions}
          label="Select Categories (Select all that apply)"
          placeholder="Categories"
          value={selectedCategories}
          onChange={(e, data) => setSelectedCategories(data.value)}
          fluid
          multiple
          selection
        />
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
        <p>Begin Date:</p>
        <DatePicker
          selected={beginDateTime}
          onChange={handleBeginDateTimeChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="MMM d, yyyy h:mm aa"
        />
        <p>End Date:</p>
        <DatePicker
          selected={endDateTime}
          onChange={handleEndDateTimeChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="MMM d, yyyy h:mm aa"
        />
        <br />
        <Button type="submit">Create Listing</Button>
        <Button type="button" onClick={() => history.push("/")}>
          Cancel
        </Button>
      </Form>
    </FormWrapper>
  );
};

export default NewListingForm;
