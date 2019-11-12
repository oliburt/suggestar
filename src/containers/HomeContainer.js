import React from "react";
import { Grid } from "semantic-ui-react";
import HomeMenu from "../components/HomeMenu";
import HomeListingContainer from "./HomeListingContainer";
import MapContainer from "./MapContainer";
import FilterForm from "../components/FilterForm";
import '../styles/Grids.css'

const HomeContainer = ({
  windowWidth,
  user,
  activeHomeMenuItem,
  setActiveHomeMenuItem,
  listings,
  location,
  radius,
  filter,
  venues,
  updateLikeOnListing,
  selectedListingId,
  setSelectedListingId,
  changeFilter,
  setRadius
}) => {
  const renderContent = activeMenuItem => {
    if (activeMenuItem === "Listings")
      return (
        <HomeListingContainer
          listings={listings}
          location={location}
          radius={radius}
          filter={filter}
          user={user}
          venues={venues}
          updateLikeOnListing={updateLikeOnListing}
        />
      );
    if (activeMenuItem === "Map")
      return (
        <MapContainer
          listings={listings}
          location={location}
          selectedListingId={selectedListingId}
          setSelectedListingId={setSelectedListingId}
          radius={radius}
          filter={filter}
          venues={venues}
          windowWidth={windowWidth}
        />
      );
  };

  return (
    <div>
      {windowWidth > 600 ? (
        <Grid>
          <Grid.Column width={6}>
            <HomeMenu
              activeMenuItem={activeHomeMenuItem}
              handleItemClick={setActiveHomeMenuItem}
              windowWidth={windowWidth}
            />
            <FilterForm
              listings={listings}
              changeFilter={changeFilter}
              filter={filter}
              radius={radius}
              setRadius={setRadius}
              windowWidth={windowWidth}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            {renderContent(activeHomeMenuItem)}
          </Grid.Column>
        </Grid>
      ) : (
        <>
          <HomeMenu
            activeMenuItem={activeHomeMenuItem}
            handleItemClick={setActiveHomeMenuItem}
            windowWidth={windowWidth}
          />
          <FilterForm
            listings={listings}
            changeFilter={changeFilter}
            filter={filter}
            radius={radius}
            setRadius={setRadius}
          />
          {renderContent(activeHomeMenuItem)}
        </>
      )}
    </div>
  );
};

export default HomeContainer;
