import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import API from "../adapters/API";
import AutoComplete from "./AutoComplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

export class VenueEdit extends Component {
  state = {
    venue: {},
    placeId: null,
    coordinates: {
      lat: null,
      lng: null
    },
    errors: []
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    const venue = this.props.venues.find(
      v => v.id === parseInt(this.props.match.params.id)
    );

    if (this.props.user && venue.user_id !== this.props.user.id) {
      this.props.history.push("/");
    } else {
      if (venue && venue.id && this._isMounted) {
        this.setState({
          venue: {
            id: venue.id,
            name: venue.name,
            description: venue.description,
            address: venue.address
          },
          placeId: venue.place_id,
          coordinates: {
            lat: venue.latitude,
            lng: venue.longitude
          }
        });
      } else if (!this._isMounted) {
      } else {
        return this.setState({ errors: ["Venue not found"] });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleAutocompleteSelect = async value => {
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    if (this._isMounted) {
      this.setState({
        venue: {
          ...this.state.venue,
          address: value
        },
        placeId: results[0].place_id,
        coordinates: latlng
      });
    }
  };

  handleChangeAddress = () => {
    this.setState({
      placeId: null,
      coordinates: {
        lat: null,
        lng: null
      }
    });
  };

  setAddress = address =>
    this.setState({
      venue: {
        ...this.state.venue,
        address
      }
    });

  handleSubmit = e => {
    e.preventDefault();
    const { name, description, id, address } = this.state.venue;
    const { placeId, coordinates } = this.state;
    const venue = {
      id,
      name,
      description,
      address,
      place_id: placeId,
      latitude: coordinates.lat,
      longitude: coordinates.lng
    };
    API.patchVenue(venue).then(venue => {
      if (venue && venue.id) {
        this.props.addVenueToCurrentUser(this.props.user, venue);
        this.props.history.push(`/venues/${venue.id}`);
      } else {
        console.log("todo: handle errors for edit venue");
      }
    });
  };

  handleChange = e =>
    this.setState({
      venue: {
        ...this.state.venue,
        [e.target.name]: e.target.value
      }
    });

  render() {
    const { name, description, address } = this.state.venue;
    const { placeId } = this.state;

    return this.state.errors.length > 0 ? (
      <Message warning>
        <Message.Header>Something went Wrong!</Message.Header>
        {this.state.errors.map(error => (
          <p>{error}</p>
        ))}
      </Message>
    ) : (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          placeholder="name..."
          value={name ? name : ""}
          name="name"
          onChange={this.handleChange}
        />
        <Form.TextArea
          placeholder="description..."
          value={description}
          name="description"
          onChange={this.handleChange}
        />
        {!placeId ? (
          <AutoComplete
            address={address}
            setAddress={this.setAddress}
            handleSelect={this.handleAutocompleteSelect}
          />
        ) : (
          <div>
            <p>{address}</p>
            <Button onClick={this.handleChangeAddress}>Change address</Button>
          </div>
        )}
        <Button type="submit">Save</Button>
        <div id="map"></div>
      </Form>
    );
  }
}

export default VenueEdit;
