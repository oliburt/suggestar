const API_ENDPOINT = "http://localhost:3000/api/v1";
const LOGIN_URL = `${API_ENDPOINT}/login`;
const REGISTER_URL = `${API_ENDPOINT}/register`;
const VALIDATE_URL = `${API_ENDPOINT}/validate`;
const USER_URL = id => `${API_ENDPOINT}/users/${id}`;
const VENUES_URL = `${API_ENDPOINT}/venues`;
const CATEGORIES_URL = `${API_ENDPOINT}/categories`;
const LISTINGS_URL = `${API_ENDPOINT}/listings`;
const LIKES_URL = `${API_ENDPOINT}/like`;
const REVIEWS_URL = `${API_ENDPOINT}/reviews`;

const jsonHeaders = (more = {}) => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  ...more
});

const authHeader = (more = {}) => ({
  Authorisation: localStorage.getItem("token"),
  ...more
});

const handleError = () => {
  console.error("Something went wrong");
};

const handleServerResponse = res => {
  if (res.ok)
    return res.text().then(text => {
      try {
        return JSON.parse(text);
      } catch (error) {
        return { staticPageContent: text };
      }
    });
  if (res.status === 503) return { code: 503 };
  if (res.status === 500) return { code: 500, error: "Something went wrong" };

  return res.text().then(text => {
    try {
      return JSON.parse(text);
    } catch (error) {
      return res;
    }
  });
};

const getVenue = id =>
  fetch(`${VENUES_URL}/${id}`)
    .then(handleServerResponse)
    .catch(handleError);

const postVenue = venue => {
  let config = {
    method: "POST",
    headers: jsonHeaders(authHeader()),
    body: JSON.stringify({ venue })
  };
  return fetch(VENUES_URL, config)
    .then(handleServerResponse)
    .catch(handleError);
};

const patchVenue = venue => {
  let config = {
    method: "PATCH",
    headers: jsonHeaders(authHeader()),
    body: JSON.stringify({ venue })
  };
  return fetch(`${VENUES_URL}/${venue.id}`, config)
    .then(handleServerResponse)
    .catch(handleError);
};

const destroyVenue = id => {
  let config = {
    method: "DELETE"
  };
  return fetch(`${VENUES_URL}/${id}`, config)
    .then(handleServerResponse)
    .catch(handleError);
};

const destroyListing = id => {
  let config = {
    method: "DELETE"
  };
  return fetch(`${LISTINGS_URL}/${id}`, config)
    .then(handleServerResponse)
    .catch(handleError);
};

const register = userDetails =>
  fetch(REGISTER_URL, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ user: userDetails })
  })
    .then(handleServerResponse)
    .then(userDetails => {
      if (userDetails.token) {
        localStorage.setItem("token", userDetails.token);
      }
      return userDetails.user || userDetails;
    })
    .catch(handleError);

const initialCall = (latitude, longitude, radius) =>
  fetch(VALIDATE_URL, {
    method: "POST",
    headers: jsonHeaders(authHeader()),
    body: JSON.stringify({
      latitude,
      longitude,
      radius
    })
  }).then(handleServerResponse)
    .then(returnObj => {
      if (!returnObj) {
        return { errors: ["Server Issue. Please try again later"] };
      }
      if (returnObj.token) {
        localStorage.setItem("token", returnObj.token);
      }
      return returnObj;
    })
    .catch(handleError);

const login = userDetails =>
  fetch(LOGIN_URL, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ user: userDetails })
  })
    .then(handleServerResponse)
    .then(userDetails => {
      if (userDetails.token) {
        localStorage.setItem("token", userDetails.token);
      }
      return userDetails.user || userDetails;
    })
    .catch(handleError);

const logout = () => {
  localStorage.removeItem("token");
};

const updateUser = (userDetails, id) => {
  let config = {
    method: "PATCH",
    headers: jsonHeaders(),
    body: JSON.stringify({ user: userDetails })
  };
  return fetch(USER_URL(id), config)
    .then(handleServerResponse)
    .catch(handleError);
};

const getCategories = () => fetch(CATEGORIES_URL).then(handleServerResponse).catch(handleError)

const postListing = listing => {
  let config = {
    method: "POST",
    headers: jsonHeaders(authHeader()),
    body: JSON.stringify({listing, category_ids: listing.category_ids})
  }
  return fetch(LISTINGS_URL, config).then(handleServerResponse).catch(handleError)
}

const patchListing = listing => {
  let config = {
    method: "PATCH",
    headers: jsonHeaders(authHeader()),
    body: JSON.stringify({listing, category_ids: listing.category_ids})
  }
  return fetch(`${LISTINGS_URL}/${listing.id}`, config).then(handleServerResponse).catch(handleError)
}

const getListing = id => fetch(`${LISTINGS_URL}/${id}`).then(handleServerResponse).catch(handleError)

const getNearbyListings = (latitude, longitude, radius) => {
  return fetch(`${LISTINGS_URL}?latitude=${latitude}&longitude=${longitude}&radius=${radius}`).then(handleServerResponse).catch(handleError)
}

const likeListing = like => {
  const config = {
    method: "POST",
    headers: jsonHeaders(authHeader()),
    body: JSON.stringify({like})
  }
  return fetch(LIKES_URL, config).then(handleServerResponse).catch(handleError)
}

const postReview = review => {
  const config = {
    method: "POST",
    headers: jsonHeaders(authHeader()),
    body: JSON.stringify({review})
  }
  return fetch(REVIEWS_URL, config).then(handleServerResponse).catch(handleError)
}



export default {
  register,
  initialCall,
  logout,
  login,
  updateUser,
  postVenue,
  patchVenue,
  destroyVenue,
  getVenue,
  getCategories,
  postListing,
  patchListing,
  getListing,
  getNearbyListings,
  likeListing,
  destroyListing,
  postReview
};
