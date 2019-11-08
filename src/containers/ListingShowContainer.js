import React, { PureComponent } from "react";
import ListingShow from "../components/ListingShow";
import { Message } from "semantic-ui-react";

export class ListingShowContainer extends PureComponent {


  state = {
        errors: []
      };

  // _isMounted = false

  // componentDidMount() {
  //   this._isMounted = true
  //   const id = this.props.match.params.id;
  //   API.getListing(id).then(listing => {
  //     if (listing && listing.id && this._isMounted) {
  //       this.setState({ listing });
  //     } else if (listing && listing.error && this._isMounted) {
  //       console.log(listing.error);
  //       this.setState({ errors: [listing.error] });
  //     } else if (listing && listing.errors && this._isMounted) {
  //       console.log(listing.error);
  //       this.setState({ errors: [...listing.error] });
  //     } else {
  //       console.log("error");
  //       console.log("Server response", listing);
  //     }
  //   });
  // }

  // updateListingShow = returnObj => {
  //   if (returnObj.deleted) {
  //     this.setState({
  //       listing: {
  //         ...this.state.listing,
  //         likes: this.state.listing.likes.filter(l => l.id !== returnObj.like.id)
  //       }
  //     })
  //   } else {
  //     this.setState({
  //       listing: {
  //         ...this.state.listing,
  //         likes: [...this.state.listing.likes, returnObj]
  //       }
  //     })
  //   }
  // }

  // componentWillUnmount() {
  //   this._isMounted = false
  // }

  render() {
    const { listings, venues, user, match, history, setSelectedListingId, updateLikeOnListing } = this.props
    
    const listing = listings.find(l => l.id === parseInt(match.params.id))
    const venue = venues.find(v => v.id === listing.venue_id)

    return (
      <div>
        {this.state.errors.length > 0 ? (
          <Message warning>
            <Message.Header>Something went Wrong!</Message.Header>
            {this.state.errors.map(error => (
              <p>{error}</p>
            ))}
          </Message>
        ) : listing ? (
          <ListingShow
            {...listing}
            setSelectedListingId={setSelectedListingId}
            history={history}
            venue={venue}
            user={user}
            updateLikeOnListing={updateLikeOnListing}
          />
        ) : (
          <Message>
            <Message.Header>Listing not found</Message.Header>
            <p>Try again later</p>
          </Message>
        )}
      </div>
    );
  }
}

export default ListingShowContainer;
