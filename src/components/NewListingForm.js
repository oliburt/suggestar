import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Message } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../adapters/API";
import FormWrapper from "./FormWrapper";
import { connect } from "react-redux";

const NewListingForm = ({
  user,
  addListing,
  venues,
  windowWidth,
  activeUserMenuItem,
  setActiveUserMenuItem,
  activeListingMenuItem,
  setActiveListingMenuItem,
  activeVenueMenuItem,
  setActiveVenueMenuItem,
  activeHomeMenuItem,
  setActiveHomeMenuItem,
  selectedListingId,
  setSelectedListingId
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ticketURL, setTicketURL] = useState("");
  const [ageRestriction, setAgeRestriction] = useState("");
  const [beginDateTime, setBeginDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [errors, setErrors] = useState([]);

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

    if (activeUserMenuItem !== "My Venues") {
      setActiveUserMenuItem("My Venues");
    }
    if (activeListingMenuItem !== "Details") {
      setActiveListingMenuItem("Details");
    }
    if (activeVenueMenuItem !== "About") {
      setActiveVenueMenuItem("About");
    }
    if (activeHomeMenuItem !== "Listings") {
      setActiveHomeMenuItem("Listings");
    }
    if (selectedListingId) {
      setSelectedListingId(null);
    }
  }, [
    categoryOptions.length,
    activeUserMenuItem,
    setActiveUserMenuItem,
    activeListingMenuItem,
    setActiveListingMenuItem,
    activeVenueMenuItem,
    setActiveVenueMenuItem,
    activeHomeMenuItem,
    setActiveHomeMenuItem,
    selectedListingId,
    setSelectedListingId
  ]);

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
    if (title && description && selectedVenue && selectedCategories.length > 0 && beginDateTime && endDateTime) {
      API.postListing(listing).then(listing => {
        if (listing && listing.id) {
          addListing(listing);
          history.push(`/listings/${listing.id}`);
        } else if (listing && listing.error) {
          setErrors([listing.error]);
        } else if (listing && listing.errors) {
          setErrors([...listing.errors]);
        } else {
          setErrors(["Something went wrong! Please try again later."]);
          console.error("Returned: ", listing);
        }
      });
    } else {
      const titleError = !title ? "Please provide a title" : null;
      const descriptionError = !description ? "Please provide a description" : null;
      const venueError = !selectedVenue ? "Please provide a venue for this listing. (If you haven't created a venue please do so first!)" : null;
      const selectedCategoriesError = selectedCategories.length === 0 ? "Please provide at least one category" : null;
      const dateError = (!beginDateTime || !endDateTime) ? "Please provide a beginning and ending date and time for your listing" : null;
      
      const errors = [
        titleError,
        descriptionError,
        venueError,
        selectedCategoriesError,
        dateError
      ];
      const nonNullErrors = errors.filter(e => e);
      setErrors(nonNullErrors);
    }
  };

  const getVenueOptions = venues =>
    venues
      .filter(v => v.user_id === user.id)
      .map(v => ({ key: v.id, text: v.name, value: v.id }));

  return (
    <FormWrapper windowWidth={windowWidth}>
      {errors.length > 0 ? (
        <Message warning>
          <Message.Header warning>Something went Wrong!</Message.Header>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </Message>
      ) : null}
      <Form onSubmit={handleSubmit}>
        <Form.Select
          options={getVenueOptions(venues)}
          label="Select Venue"
          placeholder="Venue"
          value={selectedVenue}
          onChange={(e, data) => setSelectedVenue(data.value)}
          required
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
          required
        />
        <Form.Input
          placeholder="Title..."
          value={title}
          label="Title"
          required
          name="name"
          onChange={e => setTitle(e.target.value)}
        />
        <Form.TextArea
          placeholder="Description..."
          required
          label="Description"
          value={description}
          name="description"
          onChange={e => setDescription(e.target.value)}
        />
        <Form.Input
          placeholder="Ticket Url..."
          value={ticketURL}
          label="Ticket Url (optional)"
          name="ticketURL"
          onChange={e => setTicketURL(e.target.value)}
        />
        <Form.Input
          placeholder="Age Restriction..."
          label="Age Restriction (optional)"
          value={ageRestriction}
          name="ageRestriction"
          onChange={e => setAgeRestriction(e.target.value)}
        />
        <div className="required field">
          <label>Begin Date:</label>
          <DatePicker
            selected={beginDateTime}
            onChange={handleBeginDateTimeChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="MMM d, yyyy h:mm aa"
          />
        </div>
        <div className="required field">
          <label>End Date:</label>
          <DatePicker
            selected={endDateTime}
            onChange={handleEndDateTimeChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="MMM d, yyyy h:mm aa"
          />
        </div>
        <br /> <br />
        <Button primary type="submit">
          Create Listing
        </Button>
        <Button secondary type="button" onClick={() => history.push("/")}>
          Cancel
        </Button>
      </Form>
    </FormWrapper>
  );
};

const mapDispatchToProps = dispatch => ({
  addListing: listing => dispatch({ type: "ADD_LISTING", payload: listing })
});

export default connect(null, mapDispatchToProps)(NewListingForm);
