import React, {useState, useEffect} from 'react';
import './App.css';
import {allRoutes} from './config/routes';
import { Route, Switch } from "react-router-dom";
import { Message, Container } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import API from "./adapters/API";
import SideBarMenu from './components/SideBarMenu';


const App = props => {
  const [user, setUser] = useState(null);
  const [sideBarVisible, setSideBarVisible] = useState(false);
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

  const logout = () => {
    API.logout()
    setUser(null)
    props.history.push('/')
  }

  const handleMenuClick = () => setSideBarVisible(!sideBarVisible)

  useEffect(() => {
    API.validateUser().then(user => {
      if (user.errors) {
        setIsAuthenticated(false)
      } else {
        setUser(user)
        setIsAuthenticated(true)
      }
    })
  }, []);


  const notFoundMessage = () => <Message negative>Not Found</Message>

  return (
    <div className="App">
      <Navbar user={user} handleMenuClick={handleMenuClick}/>
      <Container>
        <SideBarMenu onHide={setSideBarVisible} visible={sideBarVisible} user={user}/>
        <Switch>
          {
            allRoutes.map(route => (
              <Route
                key={route.path}
                exact={route.exact}
                path={route.path}
                component={routerProps => route.component ? (
                  <route.component
                    {...routerProps}
                    login={login}
                    logout={logout}
                    user={user}
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                    updateUser={updateUser}
                  />
                ) : (
                  notFoundMessage()
                )}
              />
            ))
          }
        </Switch>
      </Container>
    </div>
  );
}

export default App;
