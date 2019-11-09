import React from "react";
import UserPlaceHolder from "../components/UserPlaceHolder";
import VenueShow from "../components/VenueShow";

class VenueShowContainer extends React.Component {
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
            user={this.props.user}
            location={this.props.location}
            listings={venuesListings}
            addReview={this.props.addReview}
            updateReview={this.props.updateReview}
            removeReview={this.props.removeReview}
            activeMenuItem={this.props.activeVenueMenuItem}
            setActiveVenueMenuItem={this.props.setActiveVenueMenuItem}
          />
        ) : (
          <UserPlaceHolder />
        )}
        <div id="map"></div>
      </div>
    );
  }
}

export default VenueShowContainer;
