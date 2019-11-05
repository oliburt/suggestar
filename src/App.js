import React, {useState, useEffect} from 'react';
import './App.css';
import API from "./adapters/API";
import MainContainer from './containers/MainContainer';


const App = props => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  const login = user => {
    setUser(user)
    setIsAuthenticated(true)
    props.history.push('/')
  }

  const updateUser = user => {
    setUser(user)
    props.history.push(`/users/${user.id}`)
  }

  const addVenueToCurrentUser = (user, venue) => setUser({
    ...user,
    venues: [...user.venues, venue]
  })

  const logout = () => {
    API.logout()
    setUser(null)
    props.history.push('/')
  }


  useEffect(() => {
    API.validateUser().then(user => {
      if (user && user.errors) {
        setIsAuthenticated(false)
      } else if (user && user.id) {
        setUser(user)
        setIsAuthenticated(true)
      } else {
        logout()
      }
    })
  }, []);



  return (
    <div className="App">
      <MainContainer user={user} login={login} logout={logout} updateUser={updateUser} isAuthenticated={isAuthenticated} addVenueToCurrentUser={addVenueToCurrentUser} setIsAuthenticated={setIsAuthenticated}/>
    </div>
  );
}

export default App;
