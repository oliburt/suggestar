import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-less/semantic.less";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import manageListings from "./redux/reducers/manageListings";

const store = createStore(
  manageListings,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={routerProps => <App {...routerProps} />} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
