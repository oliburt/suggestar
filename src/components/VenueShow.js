import React, { useState } from "react";
import { Header } from "semantic-ui-react";
import VenueShowMenu from "./VenueShowMenu";
import VenueReviews from "./VenueReviews";
import VenueUpcomingListings from "./VenueUpcomingListings";
import VenueAbout from "./VenueAbout";

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
  updateLikeOnListing

}) => {

  const renderContent = activeMenuItem => {
    if (activeMenuItem === "About") return <VenueAbout user={user} user_id={user_id} id={id} description={description} address={address} reviews={reviews} image_url={image_url}/>
    if (activeMenuItem === "Upcoming Listings") return <VenueUpcomingListings user={user} listings={listings} user_id={user_id} location={location} updateLikeOnListing={updateLikeOnListing} venues={venues} />
    return <VenueReviews id={id} reviews={reviews} user={user} addReview={addReview} updateReview={updateReview} />
  };

  return (
    <div>
      <Header as="h1">{name}</Header>
      <VenueShowMenu activeMenuItem={activeMenuItem} handleItemClick={setActiveVenueMenuItem}/>
      
      {renderContent(activeMenuItem)}
      
    </div>
  );
};

export default VenueShow;
