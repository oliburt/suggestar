import API from "../adapters/API";
import ListingCard from "../components/ListingCard";
import React from "react";

export const getDistance = (venue, location) => {
  if (!location) return "Calculating...";

  const loc1 = [...location];
  let loc2;

  loc2 = [venue.latitude, venue.longitude];

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

export const filterByRadius = (listings, venues, location, radius) =>
  listings.filter(listing => {
    const venue = venues.find(v => v.id === listing.venue_id);
    return getDistance(venue, location) <= radius;
  });

export const filterListingsByEvent = (listings, filter) => {
  if (filter === "All") return listings;
  return listings.filter(listing => {
    return listing.categories.find(cat => cat.name === filter);
  });
};

export const handleLikeButtonClick = (
  user_id,
  listing_id,
  updateLikeOnListing
) => {
  if (!user_id) return
  const like = {
    user_id,
    listing_id
  };
  updateLikeOnListing(like)
  API.likeListing(like).then(like => {
    if (like && like.errors) {
      console.log(like.errors);
    } else if (like && like.error) {
      console.log(like);
    } else if (like && (like.deleted || like.id)) {
      // updateLikeOnListing(like);
    } else {
      console.log("Return Value:", like);
    }
  });
};

export const isListingInNext24hours = listing => {
  const dateNow = new Date()
  const datePlus24Hours = new Date(dateNow.getTime() + 24*60*60*1000)
  const listingBegin = new Date(listing.begin_datetime)
  const listingEnd = new Date(listing.end_datetime)
  return (dateNow <= listingBegin && listingBegin <= datePlus24Hours) || (dateNow > listingBegin && dateNow <= listingEnd)
}

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

export const formatDate = datetime => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const day = datetime.getDate();
  const month = monthNames[datetime.getMonth()];
  const year = datetime.getFullYear();
  let hours = datetime.getHours();
  let minutes = datetime.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const fullTime = `${hours}:${minutes} ${ampm}`;

  return [`${day} ${month} ${year}`, `${fullTime}`];
};


export const renderCards = (listings, location, user, updateLikeOnListing, venues) => {
  if (venues) {
    return listings.map(listing => {
      const venue = venues.find(v => v.id === listing.venue_id);

      return (
        <ListingCard
          key={listing.id}
          {...listing}
          distance={getDistance(venue, location)}
          user={user}
          venue={venue}
          updateLikeOnListing={updateLikeOnListing}
        />
      );
    });
  } else {
    return listings.map(listing => {

      return (
        <ListingCard
          key={listing.id}
          {...listing}
          user={user}
          updateLikeOnListing={updateLikeOnListing}
        />
      );
    });
  }
};

export const getAverageRating = reviews => {
  const numOfReviews = reviews.length
  if (numOfReviews > 0) return reviews.map(r => r.rating).reduce((acc, rating) => acc + rating) / numOfReviews
  return 0
}

export const getVenue = (listing, venues) => venues.find(v => v.id === listing.venue_id)

export const convertDistance = (distance) => {
  return (distance/1000).toFixed(1)
}

export const formatAddress = address => {
  const slitAddress = address.split(', ')
  return <p>
    {slitAddress.map(part => <span>{part}<br/></span>)}
  </p>

}
 
export default {
  getDistance,
  filterByRadius,
  filterListingsByEvent,
  getAddress,
  renderCards,
  getAverageRating
};
