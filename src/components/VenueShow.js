import React from "react";
import { Grid } from "semantic-ui-react";
import VenueShowMenu from "./VenueShowMenu";
import VenueReviews from "./VenueReviews";
import VenueUpcomingListings from "./VenueUpcomingListings";
import VenueAbout from "./VenueAbout";
import VenueEdit from "./VenueEdit";
import VenueDestroy from "./VenueDestroy";

const VenueShow = ({
  name,
  description,
  address,
  listings,
  id,
  user_id,
  user,
  venues,
  location,
  reviews,
  addReview,
  updateReview,
  removeReview,
  activeMenuItem,
  setActiveVenueMenuItem,
  image_url,
  updateLikeOnListing,
  windowWidth,
  history,
  match,
  addVenueToCurrentUser,
  removeVenue
}) => {
  const renderContent = activeMenuItem => {
    if (activeMenuItem === "About")
      return (
        <VenueAbout
          name={name}
          user={user}
          user_id={user_id}
          id={id}
          description={description}
          address={address}
          reviews={reviews}
          image_url={image_url}
        />
      );
    if (activeMenuItem === "Upcoming Listings")
      return (
        <VenueUpcomingListings
          user={user}
          listings={listings}
          user_id={user_id}
          location={location}
          updateLikeOnListing={updateLikeOnListing}
          venues={venues}
        />
      );
    if (activeMenuItem === "Reviews")
      return (
        <VenueReviews
          id={id}
          reviews={reviews}
          user={user}
          addReview={addReview}
          updateReview={updateReview}
          removeReview={removeReview}
        />
      );
    if (activeMenuItem === "Edit")
      return (
        <VenueEdit
          history={history}
          match={match}
          venues={venues}
          user={user}
          addVenueToCurrentUser={addVenueToCurrentUser}
          setActiveVenueMenuItem={setActiveVenueMenuItem}
        />
      );
    if (activeMenuItem === "Delete Venue")
      return (
        <VenueDestroy 
        match={match}
        removeVenue={removeVenue}
        user={user}
        setActiveVenueMenuItem={setActiveVenueMenuItem}
        />
      );
  };

  return (
    <div>
      {windowWidth > 600 ? (
        <Grid>
          <Grid.Column width={6}>
            <VenueShowMenu
              activeMenuItem={activeMenuItem}
              handleItemClick={setActiveVenueMenuItem}
              windowWidth={windowWidth}
              user={user}
              venue_user_id={user_id}
            />
          </Grid.Column>
          <Grid.Column width={10}>{renderContent(activeMenuItem)}</Grid.Column>
        </Grid>
      ) : (
        <>
          <VenueShowMenu
            activeMenuItem={activeMenuItem}
            handleItemClick={setActiveVenueMenuItem}
            windowWidth={windowWidth}
            user={user}
            venue_user_id={user_id}
          />
          {renderContent(activeMenuItem)}
        </>
      )}
    </div>
  );
};

export default VenueShow;
