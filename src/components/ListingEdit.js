import React, { Component } from 'react';
import { Form, Button } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../adapters/API";

export class ListingEdit extends Component {
    state = {
        id: null, 
        title: '',
        description: '',
        ticket_url: '',
        age_restriction: '',
        begin_datetime: new Date(),
        end_datetime: new Date(),
        venueOptions: [],
        categoryOptions: [],
        venue_id: null,
        selectedCategories: []
    }

    
  
    componentDidMount() {
      if (this.props.user) {
          this.setState({
              venueOptions: this.props.user.venues.map(venue => {
                return { key: venue.id, text: venue.name, value: venue.id };
              })
          });
        } else {
            return this.props.history.push('/')
        }
    
        if (this.state.categoryOptions.length === 0) {
          API.getCategories().then(categories => {
            this.setState({
                categoryOptions: categories.map(category => {
                    return { key: category.id, text: category.name, value: category.id}
                  })
            }
                )
          })
        }

        API.getListing(this.props.match.params.id).then(listing => {
            if (listing && listing.error) {
                console.log('error: ', listing.error)
            } else if (listing && listing.errors) {
                console.log('errors: ', listing.errors)
            } else if (listing && listing.id) {
                this.setState({
                    id: listing.id,
                    title: listing.title,
                    ticket_url: listing.ticket_url,
                    age_restriction: listing.age_restriction,
                    venue_id: listing.venue.id,
                    selectedCategories: listing.categories.map(cat => cat.id),
                    description: listing.description,
                    begin_datetime: new Date(listing.begin_datetime),
                    end_datetime: new Date(listing.end_datetime)
                })
            } else {
                console.log('Return Value: ', listing)
            }
        })
    };
  
     handleBeginDateTimeChange = date => {
      this.setState({ begin_datetime: date});
      if (this.state.end_datetime < date) {
        this.setState({end_datetime: date});
      }
    };
  
     handleEndDateTimeChange = date => {
      if (date >= this.state.begin_datetime) {
        this.setState({end_datetime: date});
      } else {
        this.setState({end_datetime: this.state.begin_datetime});
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
      }
      API.patchListing(listing).then(listing => {
        if (listing && listing.id) {
          this.props.history.push(`/listings/${listing.id}`)
        } else {
          console.log('todo: error handling')
        }
      })
    };

    handleChange = e => this.setState({[e.target.name]: e.target.value})
    
    render() {
        const { venue_id, title, description, ticket_url, age_restriction, selectedCategories, categoryOptions, venueOptions, end_datetime, begin_datetime} = this.state
        return (
            <Form onSubmit={this.handleSubmit}>
      <Form.Select
        options={venueOptions}
        label="Select Venue"
        placeholder="Venue"
        value={venue_id}
        onChange={(e,data) => this.setState({venue_id: data.value})} 
      />
      <Form.Dropdown 
        options={categoryOptions}
        label="Select Categories (Select all that apply)"
        placeholder="Categories"
        value={selectedCategories}
        onChange={(e, data) => this.setState({selectedCategories: data.value})}        
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
      <br/>
      <Button type="submit">Save</Button>
    </Form>
        );
    }
}

export default ListingEdit;
