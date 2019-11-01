import React, {useState, useEffect} from 'react';
import './App.css';
import {routes} from './config/routes';
import { Route, Switch } from "react-router-dom";
import { Message, Container } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import API from "./adapters/API";
import SideBarMenu from './components/SideBarMenu';


const App = props => {
  const [user, setUser] = useState(null);
  const [sideBarVisible, setSideBarVisible] = useState(false);

  const login = user => {
    setUser(user)
    props.history.push('/')
  }

  const logout = () => {
    API.logout()
    setUser(null)
    props.history.push('/')
  }

  const handleMenuClick = () => setSideBarVisible(!sideBarVisible)

  useEffect(() => {
    API.validateUser().then(user => user.id && setUser(user))
  }, []);


  const notFoundMessage = () => <Message negative>Not Found</Message>

  return (
    <div className="App">
      <Navbar user={user} handleMenuClick={handleMenuClick}/>
      <Container>
        <SideBarMenu onHide={setSideBarVisible} visible={sideBarVisible} user={user}/>
        <Switch>
          {
            routes.map(route => (
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
