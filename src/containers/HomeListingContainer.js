import React, { Component } from "react";
import Home from "../components/Home";
import {
  filterByRadius,
  filterListingsByEvent,
  isListingInNext24hours
} from "../helpers/helperFunctions";
import { Message, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import '../styles/HomeListings.css'


export class HomeListingContainer extends Component {
  componentDidMount() {
    if (this.props.selectedListingId) {
      this.props.setSelectedListingId(null)
    }
  }
  
  render() {
    const {
      listings,
      location,
      radius,
      filter,
      user,
      venues
    } = this.props;

    const currentListings = listings.filter(l => isListingInNext24hours(l));
    const radiusFilteredListings = filterByRadius(
      currentListings,
      venues,
      location,
      radius
    );
    const eventFilteredListings = filterListingsByEvent(
      radiusFilteredListings,
      filter
    );
    
    

    return eventFilteredListings.length > 0 ? (
      <div id="scrollable-div">
      <Header as="h2">Today's Listings</Header>

        <Home
          listings={eventFilteredListings}
          location={location}
          user={user}
          venues={venues}
        />
      </div>
    ) : (
      <Message>
        <Message.Header>No Listings Today</Message.Header>
      </Message>
    );
  }
}

const mapStateToProps = state => ({listings: state.listings})

export default connect(mapStateToProps)(HomeListingContainer);
