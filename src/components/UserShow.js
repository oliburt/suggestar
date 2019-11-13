import React from "react";
import { Grid } from "semantic-ui-react";
import UserVenues from "./UserVenues";
import UserListings from "./UserListings";
import UserEdit from "./UserEdit";
import UserDestroy from "./UserDestroy";
import UserShowMenu from "./UserShowMenu";
import { connect } from "react-redux";

const UserShow = ({
  user,
  history,
  venues,
  windowWidth,
  activeUserMenuItem,
  setActiveUserMenuItem,
  updateUser,
  location,
  listings,
  removeUser
}) => {
  const userVenues = venues.filter(ven => ven.user_id === user.id);
  const userListings = listings.filter(l => l.user_id === user.id)
  const renderContent = activeMenuItem => {
    if (activeMenuItem === "My Venues")
      return <UserVenues userVenues={userVenues} history={history} />;
    if (activeMenuItem === "My Upcoming Listings") return <UserListings listings={userListings}
    location={location}
    user={user}
    venues={venues}/>;
    if (activeMenuItem === "Edit")
      return <UserEdit user={user} updateUser={updateUser} setActiveUserMenuItem={setActiveUserMenuItem}/>;
    if (activeMenuItem === "Delete")
      return (
        <UserDestroy
          user={user}
          setActiveUserMenuItem={setActiveUserMenuItem}
          removeUser={removeUser}
        />
      );
  };

  return (
    <div>
      {windowWidth > 600 ? (
        <Grid>
          <Grid.Column width={6}>
            <UserShowMenu
              activeMenuItem={activeUserMenuItem}
              handleItemClick={setActiveUserMenuItem}
              windowWidth={windowWidth}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            {renderContent(activeUserMenuItem)}
          </Grid.Column>
        </Grid>
      ) : (
        <>
          <UserShowMenu
            activeMenuItem={activeUserMenuItem}
            handleItemClick={setActiveUserMenuItem}
            windowWidth={windowWidth}
          />
          {renderContent(activeUserMenuItem)}
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => ({listings: state.listings})


export default connect(mapStateToProps)(UserShow);
