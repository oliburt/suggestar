const API_ENDPOINT = "http://localhost:3000/api/v1";
const LOGIN_URL = `${API_ENDPOINT}/login`;
const REGISTER_URL = `${API_ENDPOINT}/register`;
const VALIDATE_URL = `${API_ENDPOINT}/validate`;
const USER_URL = id => `${API_ENDPOINT}/users/${id}`
const VENUES_URL = `${API_ENDPOINT}/venues`

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

const postVenue = venue => {
  let config = {
    method: "POST",
    headers: jsonHeaders(authHeader()),
    body: JSON.stringify({venue})
  }
  return fetch(VENUES_URL, config).then(handleServerResponse).catch(handleError)
}

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

const validateUser = () =>
  fetch(VALIDATE_URL, {
    method: "POST",
    headers: jsonHeaders(authHeader())
  })
    .then(handleServerResponse)
    .then(userDetails => {
      if (!userDetails) {
        return { errors: ["No user Found"] };
      }
      if (userDetails.token) {
        localStorage.setItem("token", userDetails.token);
      }
      return userDetails.user || userDetails;
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
        method: 'PATCH',
        headers: jsonHeaders(),
        body: JSON.stringify({ user: userDetails })
    }
    return fetch(USER_URL(id), config).then(handleServerResponse).catch(handleError)
}

export default {
  register,
  validateUser,
  logout,
  login,
  updateUser,
  postVenue
};
