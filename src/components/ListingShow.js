import React, { Component } from "react";
import { Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export class ListingShow extends Component {
  formatDate = datetime => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
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

    return `${day} ${month} ${year} - ${fullTime}`;
  };

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
      user
    } = this.props;
    const startDate = new Date(begin_datetime);
    const endDate = new Date(end_datetime);

    return (
      <div>
        <Header as="h1">{title}</Header>
        <div><span>Likes: {likes.length}</span><Button>Like</Button></div>
        <span
          style={{ color: "blue" }}
          onClick={() => this.handleViewOnMapClick(id)}
        >
          >>View on Map
        </span>
        {user && user.id === venue.user_id ? (
          <div>
            <Link to={`/listings/${id}/edit`}>
              <Button>Edit</Button>
            </Link>
            <Link to={`/listings/${id}/destroy`}>
              <Button>Delete</Button>
            </Link>
          </div>
        ) : null}
        <Header as="h3">Description</Header>
        <p>{description}</p>

        <Header as="h3">Categories</Header>
        <p>
          {categories.map((category, index) =>
            index === categories.length - 1
              ? category.name
              : `${category.name}, `
          )}
        </p>

        <Header as="h3">Tickets</Header>
        <p>{ticket_url}</p>
        <Header as="h3">Age Restriction</Header>
        <p>{age_restriction}</p>
        <Header as="h3">Start Date</Header>
        <p>{this.formatDate(startDate)}</p>
        <Header as="h3">End Date</Header>
        <p>{this.formatDate(endDate)}</p>

        <Header as="h3">Venue</Header>
        <p>{venue.title} - Todo Venue Card</p>
        <Link to={`/venues/${venue.id}`}>Click Here to see Venue</Link>
      </div>
    );
  }
}

export default ListingShow;
