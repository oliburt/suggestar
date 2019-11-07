import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../adapters/API";

export class ListingEdit extends Component {
  state = {
    id: null,
    title: "",
    description: "",
    ticket_url: "",
    age_restriction: "",
    begin_datetime: new Date(),
    end_datetime: new Date(),
    venueOptions: [],
    categoryOptions: [],
    venue_id: null,
    selectedCategories: [],
    errors: []
  };
  _isMounted = false


  componentDidMount() {
    this._isMounted = true

    const listing = this.props.listings.find(
      l => l.id === parseInt(this.props.match.params.id)
    );

    if (this.props.user && this.props.user.id === listing.user_id) {
      if (listing && this._isMounted) {
        const usersVenues = this.props.user.venues.map(v_id => {
          return this.props.venues.find(venue => venue.id === v_id);
        });
        this.setState({
          venueOptions: usersVenues.map(venue => {
            return { key: venue.id, text: venue.name, value: venue.id };
          }),
          id: listing.id,
          title: listing.title,
          ticket_url: listing.ticket_url,
          age_restriction: listing.age_restriction,
          venue_id: listing.venue_id,
          selectedCategories: listing.categories.map(cat => cat.id),
          description: listing.description,
          begin_datetime: new Date(listing.begin_datetime),
          end_datetime: new Date(listing.end_datetime)
        });
      } else if (!this._isMounted) {
        
      } else {
        return this.setState({ errors: ["Listing not found"] });
      }
    } else {
      return this.props.history.push("/");
    }

    if (this.state.categoryOptions.length === 0 && this._isMounted) {
      API.getCategories().then(categories => {
        this.setState({
          categoryOptions: categories.map(category => {
            return {
              key: category.id,
              text: category.name,
              value: category.id
            };
          })
        });
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }
  

  handleBeginDateTimeChange = date => {
    this.setState({ begin_datetime: date });
    if (this.state.end_datetime < date) {
      this.setState({ end_datetime: date });
    }
  };

  handleEndDateTimeChange = date => {
    if (date >= this.state.begin_datetime) {
      this.setState({ end_datetime: date });
    } else {
      this.setState({ end_datetime: this.state.begin_datetime });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const listing = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      ticket_url: this.state.ticket_url,
      age_restriction: this.state.age_restriction,
      begin_datetime: this.state.begin_datetime,
      end_datetime: this.state.end_datetime,
      venue_id: this.state.venue_id,
      category_ids: this.state.selectedCategories
    };
    API.patchListing(listing).then(listing => {
      if (listing && listing.id) {
        this.props.updateListing(listing)
        this.props.history.push(`/listings/${listing.id}`);
      } else {
        console.log("todo: error handling");
      }
    });
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      venue_id,
      title,
      description,
      ticket_url,
      age_restriction,
      selectedCategories,
      categoryOptions,
      venueOptions,
      end_datetime,
      begin_datetime
    } = this.state;
    return this.state.errors.length > 0 ? (
      <Message warning>
        <Message.Header>Something went Wrong!</Message.Header>
        {this.state.errors.map(error => (
          <p>{error}</p>
        ))}
      </Message>
    ) : (
      <Form onSubmit={this.handleSubmit}>
        <Form.Select
          options={venueOptions}
          label="Select Venue"
          placeholder="Venue"
          value={venue_id}
          onChange={(e, data) => this.setState({ venue_id: data.value })}
        />
        <Form.Dropdown
          options={categoryOptions}
          label="Select Categories (Select all that apply)"
          placeholder="Categories"
          value={selectedCategories}
          onChange={(e, data) =>
            this.setState({ selectedCategories: data.value })
          }
          fluid
          multiple
          selection
        />
        <Form.Input
          placeholder="title..."
          value={title}
          name="title"
          onChange={this.handleChange}
        />
        <Form.TextArea
          placeholder="description..."
          value={description}
          name="description"
          onChange={this.handleChange}
        />
        <Form.Input
          placeholder="ticket url (if necessary)..."
          value={ticket_url}
          name="ticket_url"
          onChange={this.handleChange}
        />
        <Form.Input
          placeholder="age restriction...?"
          value={age_restriction}
          name="age_restriction"
          onChange={this.handleChange}
        />
        <p>Begin Date:</p>
        <DatePicker
          selected={begin_datetime}
          onChange={this.handleBeginDateTimeChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="MMM d, yyyy h:mm aa"
        />
        <p>End Date:</p>
        <DatePicker
          selected={end_datetime}
          onChange={this.handleEndDateTimeChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="MMM d, yyyy h:mm aa"
        />
        <br />
        <Button type="submit">Save</Button>
      </Form>
    );
  }
}

export default ListingEdit;
