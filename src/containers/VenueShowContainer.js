import React from "react";
import VenueShow from "../components/VenueShow";
import { Icon } from "semantic-ui-react";
import { connect } from "react-redux";

class VenueShowContainer extends React.Component {
componentDidMount() {
    if (this.props.activeHomeMenuItem !== 'Listings') {
      this.props.setActiveHomeMenuItem('Listings')
    }
    if (this.props.activeListingMenuItem !== 'Details') {
      this.props.setActiveListingMenuItem('Details')
    }
    if (this.props.activeUserMenuItem !== 'My Venues') {
      this.props.setActiveUserMenuItem('My Venues')
    }
    if (this.props.selectedListingId) {
      this.props.setSelectedListingId(null)
    }
  }
  
  
  render() {
    const venue = this.props.venues.find(
      v => v.id === parseInt(this.props.match.params.id)
    );
    const venuesListings = this.props.listings.filter(
      l => l.venue_id === venue.id
    );

    
    
    

    return (
      <div>
        {venue ? (
          <VenueShow
            {...venue}
            venues={this.props.venues}
            user={this.props.user}
            location={this.props.location}
            listings={venuesListings}
            addReview={this.props.addReview}
            updateReview={this.props.updateReview}
            removeReview={this.props.removeReview}
            activeMenuItem={this.props.activeVenueMenuItem}
            setActiveVenueMenuItem={this.props.setActiveVenueMenuItem}
            updateLikeOnListing={this.props.updateLikeOnListing}
            windowWidth={this.props.windowWidth}
            history={this.props.history}
            match={this.props.match}
            addVenueToCurrentUser={this.props.addVenueToCurrentUser}
            removeVenue={this.props.removeVenue}
          />
        ) : (
          <Icon loading size="huge" name="spinner" />
        )}
        <div id="map"></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listings: state.listings
})

export default connect(mapStateToProps)(VenueShowContainer);