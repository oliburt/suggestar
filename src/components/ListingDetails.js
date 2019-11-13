import React from "react";
import { Segment, Icon, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import {
  handleLikeButtonClick,
  isListingInNext24hours,
  formatDate
} from "../helpers/helperFunctions";
import "../styles/ListingDetails.css";
import { connect } from "react-redux";

const ListingDetails = ({
  title,
  id,
  likes,
  begin_datetime,
  end_datetime,
  description,
  user,
  updateLikeOnListing,
  age_restriction,
  ticket_url,
  categories,
  setSelectedListingId,
  setActiveHomeMenuItem
}) => {
  const history = useHistory();
  const startDate = new Date(begin_datetime);
  const endDate = new Date(end_datetime);

  const handleViewOnMapClick = id => {
    setSelectedListingId(id);
    setActiveHomeMenuItem("Map");
    history.push("/");
  };

  return (
    <div>
      <Segment.Group>
        <Segment>
          <Header as="h1">{title}</Header>
          <p>
            {categories.map((category, index) =>
              index === categories.length - 1
                ? category.name
                : `${category.name}, `
            )}
          </p>
          <div>
            <span
              className="clickable"
              onClick={() =>
                handleLikeButtonClick(user.id, id, updateLikeOnListing)
              }
            >
              <Icon
                name="thumbs up"
                color={likes.find(l => l.user_id === user.id) ? "blue" : null}
              />
              <span
                style={{ fontSize: "9px", marginRight: "10px" }}
              >
                {likes.length} Likes
              </span>
            </span>
            {isListingInNext24hours({ begin_datetime, end_datetime }) ? (
              <span
                onClick={() => handleViewOnMapClick(id)}
                className="clickable"
              >
                <Icon color="red" name="map pin" />
                <span style={{ fontSize: "9px", marginRight: "10px" }}>
                  View on Map
                </span>
              </span>
            ) : null}
            {age_restriction.length > 0 ? (
              <>
                <Icon color="orange" name="ban" />
                <span style={{ fontSize: "9px", marginRight: "10px" }}>
                  {age_restriction}
                </span>
              </>
            ) : (
              <>
                <Icon color="green" name="ban" />
                <span style={{ fontSize: "9px", marginRight: "10px" }}>
                  All welcome
                </span>
              </>
            )}
          </div>
          <p style={{ textAlign: "left", marginTop: "2rem" }}>{description}</p>
        </Segment>

        {ticket_url.length > 0 ? (
          <Segment>
            <p>
              Find Tickets here: <a href={ticket_url}>{ticket_url}</a>
            </p>
          </Segment>
        ) : null}

        <Segment>
          <p>
            {formatDate(startDate)[0] !== formatDate(endDate)[0]
              ? `${formatDate(startDate)[0]} - ${formatDate(endDate)[0]}`
              : formatDate(startDate)[0]}
          </p>
          <p>
            {formatDate(startDate)[1]} - {formatDate(endDate)[1]}
          </p>
        </Segment>
      </Segment.Group>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  updateLikeOnListing: (like) => dispatch({ type: 'TOGGLE_LIKE', payload: like })
})

export default connect(null, mapDispatchToProps)(ListingDetails);