import React from "react";
import UserPlaceHolder from "../components/UserPlaceHolder";
import VenueShow from "../components/VenueShow";
import API from "../adapters/API";

class VenueShowContainer extends React.Component {
  state = {
    venue: null,
    address: null
  }

  componentDidMount() {
    const id = this.props.match.params.id
    API.getVenue(id).then(venue => {
      if (venue && venue.id) {
        this.setState({venue})
      } else {
        console.log("error")
        console.log("Server response", venue)
      }
      return venue
    }).then(this.getAddress)
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isAuthenticated === false) return this.props.history.push("/");
  }

  getAddress = (venue) => {
    let map = new window.google.maps.Map(document.getElementById("map"), {
      center: {lat: venue.latitude, lng: venue.longitude}
    });

    let service = new window.google.maps.places.PlacesService(map)
    
    service.getDetails({
      placeId: venue.place_id
    },(place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        this.setState({address: place.formatted_address})
      }
    })
  }
  

  render() {
    return (
      <div>
        {this.props.isAuthenticated && this.state.venue ? <VenueShow {...this.state.venue} address={this.state.address}/> : <UserPlaceHolder />}
        <div id='map'></div>
      </div>
    );
  }
}

export default VenueShowContainer;
