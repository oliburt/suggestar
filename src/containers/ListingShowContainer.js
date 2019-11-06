import React, { Component, PureComponent } from "react";
import ListingShow from "../components/ListingShow";
import API from "../adapters/API";
import UserPlaceHolder from "../components/UserPlaceHolder";
import { Message } from "semantic-ui-react";

export class ListingShowContainer extends PureComponent {
  state = {
    listing: null,
    errors: []
  };
  
  _isMounted = false


  componentDidMount() {
    this._isMounted = true
    const id = this.props.match.params.id;
    API.getListing(id).then(listing => {
      if (listing && listing.id && this._isMounted) {
        this.setState({ listing });
      } else if (listing && listing.error && this._isMounted) {
        console.log(listing.error);
        this.setState({ errors: [listing.error] });
      } else if (listing && listing.errors && this._isMounted) {
        console.log(listing.error);
        this.setState({ errors: [...listing.error] });
      } else {
        console.log("error");
        console.log("Server response", listing);
      }
    });
  }

  updateListingShow = returnObj => {
    if (returnObj.deleted) {
      this.setState({
        listing: {
          ...this.state.listing,
          likes: this.state.listing.likes.filter(l => l.id !== returnObj.like.id)
        }
      })
    } else {
      this.setState({
        listing: {
          ...this.state.listing,
          likes: [...this.state.listing.likes, returnObj]
        }
      })
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }
  

  render() {
    return (
      <div>
        {this.state.errors.length > 0 ? (
          <Message warning>
            <Message.Header>
              Something went Wrong!
            </Message.Header>
            {this.state.errors.map(error => <p>{error}</p>)}
          </Message>
        ) : this.state.listing ? (
          <ListingShow
            {...this.state.listing}
            setSelectedListingId={this.props.setSelectedListingId}
            history={this.props.history}
            user={this.props.user}
            updateListingShow={this.updateListingShow}
            updateListings={this.props.updateListings}
          />
        ) : (
          <UserPlaceHolder />
        )}
      </div>
    );
  }
}

export default ListingShowContainer;
