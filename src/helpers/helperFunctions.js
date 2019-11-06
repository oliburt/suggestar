import API from "../adapters/API";
import ListingCard from "../components/ListingCard";
import React from 'react';


export const getDistance = (listing_or_venue, location) => {
  if (!location) return "Calculating...";

  const loc1 = [...location];
  let loc2;
  // if (listing_or_venue.latitude) {
  //   loc2 = [listing_or_venue.latitude, listing_or_venue.longitude];
  // } else {
    loc2 = [listing_or_venue.venue.latitude, listing_or_venue.venue.longitude];
  // }
  const rad_per_deg = Math.PI / 180;
  const rkm = 6371;
  const rm = rkm * 1000;

  const dlat_rad = (loc2[0] - loc1[0]) * rad_per_deg;
  const dlon_rad = (loc2[1] - loc1[1]) * rad_per_deg;

  const [lat1_rad] = loc1.map(i => i * rad_per_deg);
  const [lat2_rad] = loc2.map(i => i * rad_per_deg);

  const a =
    Math.sin(dlat_rad / 2) ** 2 +
    Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return rm * c;
};

export const filterByRadius = (listings, location, radius) =>
  listings.filter(listing => getDistance(listing, location) <= radius);

export const filterListingsByEvent = (listings, filter) => {
  if (filter === "All") return listings;
  return listings.filter(listing => {
    return listing.categories.find(cat => cat.name === filter);
  });
};

export const handleLikeButtonClick = (user_id, listing_id, updateListingShow, updateListings) => {
  const like = {
    user_id,
    listing_id
  };
  API.likeListing(like).then(like => {
    if (like && like.errors) {
      console.log(like.errors);
    } else if (like && like.error) {
      console.log(like);
    } else if (like && (like.deleted || like.id)) {
      updateListingShow(like)
      updateListings(like)
    } else {
      console.log("Return Value:", like);
    }
  });
};

const getAddress = (venue, obj) => {
  let map = new window.google.maps.Map(document.getElementById("map"), {
    center: { lat: venue.latitude, lng: venue.longitude }
  });

  let service = new window.google.maps.places.PlacesService(map);

  service.getDetails(
    {
      placeId: venue.place_id
    },
    (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        obj.setState({ address: place.formatted_address });
      }
    }
  );
};

export  const renderCards = (listings, location, user) =>
listings.map(listing => <ListingCard key={listing.id} {...listing} distance={getDistance(listing, location)} user={user}/>);

export default {
  getDistance,
  filterByRadius,
  filterListingsByEvent,
  getAddress,
  renderCards
};
