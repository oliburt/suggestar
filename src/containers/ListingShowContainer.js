import React, { Component } from 'react';
import ListingShow from '../components/ListingShow';
import API from '../adapters/API';
import UserPlaceHolder from '../components/UserPlaceHolder';


export class ListingShowContainer extends Component {
    state = {
        listing: null
    }
    
      componentDidMount() {
        const id = this.props.match.params.id
        API.getListing(id).then(listing => {
          if (listing && listing.id) {
            this.setState({listing})
          } else {
            console.log("error")
            console.log("Server response", listing)
          }
        })
        
      }
    
      componentDidUpdate(prevProps, prevState) {
        if (this.props.isAuthenticated === false) return this.props.history.push("/");
      }
    
    
    render() {
        return (
            <div>
                {this.state.listing ? <ListingShow {...this.state.listing} /> : <UserPlaceHolder />}
            </div>
        );
    }
}

export default ListingShowContainer;
