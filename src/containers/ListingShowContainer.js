import React, { PureComponent } from "react";
import ListingShow from "../components/ListingShow";
import { Message } from "semantic-ui-react";
import { connect } from "react-redux"

export class ListingShowContainer extends PureComponent {
  state = {
    errors: []
  };

  componentDidMount() {
    if (this.props.activeHomeMenuItem !== 'Listings') {
      this.props.setActiveHomeMenuItem('Listings')
    }
    if (this.props.activeUserMenuItem !== 'My Venues') {
      this.props.setActiveUserMenuItem('My Venues')
    }
    if (this.props.activeVenueMenuItem !== 'About') {
      this.props.setActiveVenueMenuItem('About')
    }
    if (this.props.selectedListingId) {
      this.props.setSelectedListingId(null)
    }
  }

  render() {
    const {
      listings,
      venues,
      user,
      match,
      history,
      setSelectedListingId,
      windowWidth,
      setActiveListingMenuItem,
      activeListingMenuItem,
      setActiveHomeMenuItem
    } = this.props;

    const listing = listings.find(l => l.id === parseInt(match.params.id));
    if (!listing) {
      history.push('/')
      return <></>
    } 
    const venue = venues.find(v => v.id === listing.venue_id);

    return (
      <div>
        {this.state.errors.length > 0 ? (
          <Message warning>
            <Message.Header warning>Something went Wrong!</Message.Header>
            {this.state.errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
          </Message>
        ) : listing ? (
          <ListingShow
            {...listing}
            venues={venues}
            listing={listing}
            setSelectedListingId={setSelectedListingId}
            history={history}
            venue={venue}
            user={user}
            windowWidth={windowWidth}
            setActiveListingMenuItem={setActiveListingMenuItem}
            activeListingMenuItem={activeListingMenuItem}
            match={match}
            setActiveHomeMenuItem={setActiveHomeMenuItem}
          />
        ) : (
          <Message>
            <Message.Header>Listing not found</Message.Header>
            <p>Try again later</p>
          </Message>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listings: state.listings
})

export default connect(mapStateToProps)(ListingShowContainer);
