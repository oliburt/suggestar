import React, { Component } from "react";
import ListingShowMenu from "./ListingShowMenu";
import ListingDetails from "./ListingDetails";
import ListingVenue from "./ListingVenue";
import ListingEdit from "./ListingEdit";
import ListingDestroy from "./ListingDestroy";
import { Grid } from "semantic-ui-react";

export class ListingShow extends Component {
  handleViewOnMapClick = id => {
    this.props.setSelectedListingId(id);
    this.props.history.push("/map");
  };

  render() {
    const {
      title,
      description,
      venue,
      categories,
      ticket_url,
      age_restriction,
      end_datetime,
      begin_datetime,
      id,
      likes,
      user,
      updateLikeOnListing,
      windowWidth,
      history,
      match,
      setActiveListingMenuItem,
      activeListingMenuItem,
      listing,
      venues,
      updateListing,
      removeListing
    } = this.props;

    const renderContent = activeMenuItem => {
      if (activeMenuItem === "Details")
        return (
          <ListingDetails
            begin_datetime={begin_datetime}
            end_datetime={end_datetime}
            title={title}
            description={description}
            user={user}
            categories={categories}
            likes={likes}
            ticket_url={ticket_url}
            age_restriction={age_restriction}
            id={id}
            updateLikeOnListing={updateLikeOnListing}
          />
        );
      if (activeMenuItem === "Venue")
        return (
          <ListingVenue
            venue={venue}
            history={history}
            windowWidth={windowWidth}
          />
        );
      if (activeMenuItem === "Edit")
        return (
          <ListingEdit
            user={user}
            listing={listing}
            venues={venues}
            history={history}
            updateListing={updateListing}
            match={match}
            setActiveListingMenuItem={setActiveListingMenuItem}
          />
        );
      if (activeMenuItem === "Delete Listing")
        return (
          <ListingDestroy
            match={match}
            removeListing={removeListing}
            user={user}
            history={history}
            listing={listing}
            venues={venues}
            setActiveListingMenuItem={setActiveListingMenuItem}
          />
        );
    };

    return (
      <div>
        {windowWidth > 600 ? (
          <Grid>
            <Grid.Column width={6}>
              <ListingShowMenu
                activeMenuItem={activeListingMenuItem}
                handleItemClick={setActiveListingMenuItem}
                windowWidth={windowWidth}
                user={user}
                listing_user_id={venue.user_id}
              />
            </Grid.Column>
            <Grid.Column width={10}>
              {renderContent(activeListingMenuItem)}
            </Grid.Column>
          </Grid>
        ) : (
          <>
            <ListingShowMenu
              activeMenuItem={activeListingMenuItem}
              handleItemClick={setActiveListingMenuItem}
              windowWidth={windowWidth}
              user={user}
              listing_user_id={venue.user_id}
            />
            {renderContent(activeListingMenuItem)}
          </>
        )}
      </div>
    );
  }
}

export default ListingShow;
