export default function manageListings(
  state = {
    listings: []
  },
  action
) {
  switch (action.type) {
    case "ADD_LISTING":
      return { listings: [...state.listings, action.payload] };

    case "ADD_LISTINGS":
      return { listings: action.payload };

    case "UPDATE_LISTING":
      return {
        listings: state.listings.map(l => {
          if (l.id === action.payload.id) return action.payload;
          return l;
        })
      };
    case "REMOVE_LISTING":
      return {
        listings: state.listings.filter(l => l.id !== action.payload.id)
      };
    case "REMOVE_LISTINGS_FOR_VENUE":
      return {
        listings: state.listings.filter(l => l.venue_id !== action.payload.id)
      };
    case "REMOVE_LISTINGS_FOR_USER":
      return {
        listings: state.listings.filter(l => l.user_id !== action.payload.id)
      };

    case "TOGGLE_LIKE":
      const theListing = state.listings.find(
        l => l.id === action.payload.listing_id
      );
      if (
        theListing.likes.find(like => like.user_id === action.payload.user_id)
      )
        return {
          listings: state.listings.map(listing => {
            if (listing.id === action.payload.listing_id)
              return {
                ...listing,
                likes: listing.likes.filter(
                  like => like.user_id !== action.payload.user_id
                )
              };
            return listing;
          })
        };

      return {
        listings: state.listings.map(listing => {
          if (listing.id === action.payload.listing_id)
            return { ...listing, likes: [...listing.likes, action.payload] };
          return listing;
        })
      };

    default:
      return state;
  }
}
