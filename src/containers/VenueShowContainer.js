import React from "react";
import UserPlaceHolder from "../components/UserPlaceHolder";
import VenueShow from "../components/VenueShow";
import API from "../adapters/API";

class VenueShowContainer extends React.Component {
  state = {
    venue: null
  }

  componentDidMount() {
    const id = this.props.match.params.id
    API.getVenue(id).then(venue => {
      console.log(venue)
      if (venue && venue.id) {
        this.setState({venue})
      } else {
        console.log("error")
        console.log("Server response", venue)
      }
    })
    
  }

  
  

  render() {
    return (
      <div>
        {this.state.venue ? <VenueShow {...this.state.venue} user={this.props.user} location={this.props.location}/> : <UserPlaceHolder />}
        <div id='map'></div>
      </div>
    );
  }
}

export default VenueShowContainer;
