import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNavComps/SideNav";
import SignIn from "../components/UserRegistration/SignIn";
import SignUp from "../components/UserRegistration/SignUp";
import ServerPage from "../components/ServerPage";
const Routes = () => {
  const [currentUser, setCurrentUser] = useState(null);
  console.log(currentUser)
  
  useEffect(() => {
    getUserSession();
  }, [])

  const getUserSession = () => {
    const url = "/api/v1/sessions/index";
    fetch(url)
      .then(response => {
        if (response.ok) { 
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => setCurrentUser(response))
      .catch(() => console.error("No user session exists."))
  }

  return (
    <Router>
      <Navbar history = {history} currentUser = {currentUser} setCurrentUser = {setCurrentUser} />
      <div className = "container-fluid">
        <div className = "row">
          <div className = "col-4">
            <SideNav />
          </div>
          <div className = "col-8">
            <Switch>
            <Route
                  exact
                  path="/"
                  render={(props) => (
                    <Home
                      {...props}
                      currentUser={currentUser}
                    />
                  )}
              />
              <Route
                  exact
                  path="/sign-up"
                  render={(props) => (
                    <SignUp
                      {...props}
                      setCurrentUser={setCurrentUser}
                      currentUser = {currentUser}
                    />
                  )}
              />
              <Route
                  exact
                  path="/sign-in"
                  render={(props) => (
                    <SignIn
                      {...props}
                      setCurrentUser={setCurrentUser}
                      currentUser = {currentUser}
                    />
                  )}
              />
              <Route
                  exact
                  path="/server/:id"
                  render={(props) => (
                    <ServerPage
                      {...props}
                      currentUser={currentUser}
                    />
                  )}
              />
            </Switch>
          </div>
        </div>
      </div>
  </Router>
  )
};


export default Routes;
