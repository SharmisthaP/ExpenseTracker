import React from 'react';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/navbar.component";
import Landing from "./components/landing.component";
import RegisterUser from "./components/register_user.component";
import LoginUser from "./components/login_user.component";
import PrivateRoute from "./components/private_route/PrivateRoute";
import Dashboard from "./components/dashborad_components/dashboard_main";
import AddEvent from './components/events/add_event';
import ViewEvent from './components/events/view_event';


if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; 
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());   
    window.location.href = "./login";
  }
}
function App() {
  return (
    <Provider store={store}>
    <Router>
      <Navbar />
      <br/>
      <Route path="/" exact component={Landing} />
      <Route path="/register" component={RegisterUser} />
      <Route path="/login" component={LoginUser} />
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/addEvent" component={AddEvent} />
        <PrivateRoute exact path="/viewEvent/:id" component={ViewEvent} />
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
