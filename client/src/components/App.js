import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import About from "./about";
import Login from "./LoginPage/LoginPage";
import Register from "./RegisterPage/Register";
import auth from "../hoc/auth";
import Home from "./Home/Home";
import NavBar from "./NavBar/NavBar";
class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={auth(Home, null)} />
          <Route exact path="/about" component={auth(About, null)} />
          <Route exact path="/login" component={auth(Login, false)} />
          <Route exact path="/register" component={auth(Register, false)} />
        </Switch>
      </div>
    );
  }
}

export default App;
