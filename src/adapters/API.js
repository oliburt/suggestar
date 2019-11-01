const API_ENDPOINT = "http://localhost:3000/api/v1";
const LOGIN_URL = `${API_ENDPOINT}/login`;
const REGISTER_URL = `${API_ENDPOINT}/register`;
const VALIDATE_URL = `${API_ENDPOINT}/validate`;

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
      return userDetails.user;
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
      return userDetails.user;
    })
    .catch(handleError);

const logout = () => {
  localStorage.removeItem("token");
};

export default {
  register,
  validateUser,
  logout,
  login
};
