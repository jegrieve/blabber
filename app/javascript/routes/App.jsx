import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../components/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import SideNav from "../components/SideNavComps/SideNav";
import SignIn from "../components/UserRegistration/SignIn";
import SignUp from "../components/UserRegistration/SignUp";
import ServerPage from "../components/ServerPage/ServerPage";
import ChannelPage from "../components/ChannelPage/ChannelPage";
import CreateNewServer from "../components/SideNavComps/CreateNewServer";
import CreateNewChannel from "../components/SideNavComps/CreateNewChannel";
import UserPage from "../components/UserPage/UserPage";
import HelpPage from "../components/HelpPage/HelpPage";
import EditChannel from "../components/SideNavComps/EditChannel";

const Routes = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentServer, setCurrentServer] = useState(null); 
  const [currentChannel, setCurrentChannel] = useState(null); 
  
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
      <Navbar history = {history} currentUser = {currentUser} setCurrentUser = {setCurrentUser} currentChannel = {currentChannel} 
      currentServer = {currentServer}/>
      <div className = "container-fluid">
        <div className = "row">
            <div className = "d-none d-lg-block col-lg-2 side-nav-container">
              <SideNav currentServer = {currentServer} currentChannel = {currentChannel} currentUser = {currentUser}/>
            </div>
          <div className = "app-page col-lg-10 col-md-12">
            <Switch>
            <Route
                  exact
                  path="/"
                  render={(props) => (
                    <Home
                      {...props}
                      history = {history}
                      currentUser={currentUser}
                      setCurrentServer = {setCurrentServer}
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
                      setCurrentServer= {setCurrentServer}
                      serverPage = {currentServer}
                    />
                  )}
              />
              <Route
                  exact
                  path="/channel/:id"
                  render={(props) => (
                    <ChannelPage
                      {...props}
                      currentUser={currentUser}
                      currentServer = {currentServer}
                      setCurrentServer = {setCurrentServer}
                      setCurrentChannel = {setCurrentChannel}
                    />
                  )}
              /> 
              <Route
                  exact
                  path="/create-new-server"
                  render={(props) => (
                    <CreateNewServer
                      {...props}
                      currentUser = {currentUser}
                    />
                  )}
              />      
              <Route
                  exact
                  path="/create-new-channel"
                  render={(props) => (
                    <CreateNewChannel
                      {...props}
                      currentUser = {currentUser}
                      currentServer = {currentServer}
                    />
                  )}
              />
              <Route
                  exact
                  path="/user/:id"
                  render={(props) => (
                    <UserPage
                      {...props}
                      currentUser={currentUser}
                      setCurrentUser = {setCurrentUser}
                      setCurrentChannel = {setCurrentChannel}
                    />
                  )}
              />
              <Route exact path="/help">
                    <HelpPage />
              </Route>
              <Route
                  exact
                  path="/edit-channel/:id"
                  render={(props) => (
                    <EditChannel
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
