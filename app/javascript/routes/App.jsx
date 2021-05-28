import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../components/Home";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNavComps/SideNav";
import SignIn from "../components/UserRegistration/SignIn";
import SignUp from "../components/UserRegistration/SignUp";
import ServerPage from "../components/ServerPage";
import ChannelPage from "../components/ChannelPage";
import CreateNewServer from "../components/SideNavComps/CreateNewServer";
import CreateNewChannel from "../components/SideNavComps/CreateNewChannel";

const Routes = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentServer, setCurrentServer] = useState(null); 
  const [currentChannel, setCurrentChannel] = useState(null); 


  console.log(currentUser)
  console.log(currentServer)
  console.log(currentChannel)

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
            <div className = "d-none d-lg-block col-lg-2">
              <SideNav currentServer = {currentServer} currentChannel = {currentChannel} />
            </div>
          <div className = "app-page col-lg-10 col-md-12"> {/* put the border on the specific page-div comps and not on channel */}
            <Switch>
            <Route
                  exact
                  path="/"
                  render={(props) => (
                    <Home
                      {...props}
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
                    />
                  )}
              />      
              <Route
                  exact
                  path="/create-new-channel"
                  render={(props) => (
                    <CreateNewChannel
                      {...props}
                      serverId={currentServer.id}
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
