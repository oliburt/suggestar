import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import API from "./adapters/API";
import MainContainer from "./containers/MainContainer";
import Navigation from "./containers/Navigation";



const App = props => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const login = user => {
    setUser(user);
    setIsAuthenticated(true);
    props.history.push("/");
  };

  const updateUser = user => {
    setUser(user);
    props.history.push(`/user`);
  };

  const addVenueToCurrentUser = (user, venue) => {
    if (user.venues.find(v => v.id === venue.id)) {
      setUser({
        ...user,
        venues: user.venues.map(v => {
          if (v.id === venue.id) return venue;
          return v;
        })
      });
    } else {
      setUser({
        ...user,
        venues: [...user.venues, venue]
      });
    }
  };

  const removeVenueFromUser = (user, venue) => {
    setUser({
      ...user,
      venues: user.venues.filter(v => v.id !== venue.id)
    });
  };

  const logout = useCallback(() => {
    API.logout();
    setUser(null);
    props.history.push("/");
  }, [props.history]);

  useEffect(() => {
    API.validateUser().then(user => {
      if (user && user.errors) {
        setIsAuthenticated(false);
      } else if (user && user.id) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    });
  }, [logout]);

  return (
    <div className="App">
      <Navigation user={user} />

      <MainContainer
        user={user}
        login={login}
        logout={logout}
        updateUser={updateUser}
        isAuthenticated={isAuthenticated}
        addVenueToCurrentUser={addVenueToCurrentUser}
        setIsAuthenticated={setIsAuthenticated}
        removeVenueFromUser={removeVenueFromUser}
      />
    </div>
  );
};

export default App;
