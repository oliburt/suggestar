import React, { PureComponent } from "react";
import ListingShow from "../components/ListingShow";
import { Message } from "semantic-ui-react";

export class ListingShowContainer extends PureComponent {
  state = {
    errors: []
  };

  render() {
    const {
      listings,
      venues,
      user,
      match,
      history,
      setSelectedListingId,
      updateLikeOnListing,
      windowWidth,
      setActiveListingMenuItem,
      activeListingMenuItem,
      removeListing,
      updateListing
    } = this.props;

    const listing = listings.find(l => l.id === parseInt(match.params.id));
    const venue = venues.find(v => v.id === listing.venue_id);

    return (
      <div>
        {this.state.errors.length > 0 ? (
          <Message warning>
            <Message.Header warning>Something went Wrong!</Message.Header>
            {this.state.errors.map(error => (
              <p>{error}</p>
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
            updateLikeOnListing={updateLikeOnListing}
            windowWidth={windowWidth}
            setActiveListingMenuItem={setActiveListingMenuItem}
            activeListingMenuItem={activeListingMenuItem}
            match={match}
            removeListing={removeListing}
            updateListing={updateListing}
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

export default ListingShowContainer;
