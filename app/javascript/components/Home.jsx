import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";

const Home = (props) => {
  useEffect(() => {
    props.setCurrentServer(null);
  },[])
  
  return (
    <div className = "page-display server-page">
        <div className = "page-title">Welcome to MessageApp!</div>
        <div className = "home-info">Pick a server, then pick a channel and send some messages!</div>
        <div className = "home-data">Data about app (servers/channels/users)</div>
      {props.currentUser ? 
        <div>
          welcome {props.currentUser.username}
        </div> 
        : 
        <div>
          <span>Please 
            <NavLink history = {props.history} to = {"/sign-in"}> sign in</NavLink>
          </span>
          <span> or
            <NavLink history = {props.history} to={"/sign-up"}> sign up </NavLink>
            to begin chatting
          </span>
        </div>}
    </div>
  )
}


export default Home;