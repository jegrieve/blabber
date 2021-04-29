import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <SideNav />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
  </Router>
  )
};


export default Routes;