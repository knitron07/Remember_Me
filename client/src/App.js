import React from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/Profile/profile";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/">
              <Home />
          </Route>
          <Route  path="/profile/:username">
              <Profile />
          </Route>
          <Route  path="/login">
              <Login />
          </Route>
          <Route  path="/register">
              <Register />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
