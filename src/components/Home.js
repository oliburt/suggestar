import React from "react";
import { Card } from "semantic-ui-react";
import ListingCard from "./ListingCard";
import UserPlaceHolder from "./UserPlaceHolder";

const Home = ({ listings, location }) => {
  const getDistance = (listing, location) => {
    if (!location) return 'Calculating...'
    
    const loc1 = [...location]
    const loc2 = [listing.venue.latitude, listing.venue.longitude]
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

  const renderCards = listings =>
    listings.map(listing => <ListingCard key={listing.id} {...listing} distance={getDistance(listing, location)} />);

  return listings.length > 0 ? (
    <Card.Group centered>{renderCards(listings)}</Card.Group>
  ) : (
    <UserPlaceHolder />
  );
};

export default Home;
