import React, {useState, useEffect} from 'react';
import './App.css';
import {routes} from './config/routes';
import { Route } from "react-router-dom";
import { Message, Container } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import API from "./adapters/API";


const App = props => {
  const [user, setUser] = useState(null);

  const login = user => {
    setUser(user)
    props.history.push('/')
  }

  useEffect(() => {
    API.validateUser().then(user => user.id && setUser(user))
  }, []);


  const notFoundMessage = () => <Message negative>Not Found</Message>

  return (
    <div className="App">
      <Navbar user={user} />
      <Container>
        {
          routes.map(route => (
            <Route
              key={route.path}
              exact
              path={route.path}
              component={routerProps => route.component ? (
                <route.component
                  {...routerProps}
                  login={login}
                />
              ) : (
                notFoundMessage()
              )}
            />
          ))
        }
      </Container>
    </div>
  );
}

export default App;
