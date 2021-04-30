import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <div className = "container-fluid">
        <div className = "row">
          <div className = "col-4">
            <SideNav />
          </div>
          <div className = "col-8">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/sign-up" exact component={SignIn} />
              <Route path="/sign-in" exact component={SignUp} />
            </Switch>
          </div>
        </div>
      </div>
  </Router>
  )
};


export default Routes;