import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";

const Home = (props) => {
  useEffect(() => {
    props.setCurrentServer(null);
  },[])
  
  return (
    <div className = "page-display homepage">
        <div className = "home-title">Welcome to MessageApp!</div>
        <div className = "home-info">Pick a server, then pick a channel and send some messages!</div>
        <div className = "home-data">Data about app (servers/channels/users)</div>
      {props.currentUser ? 
        <div>
          welcome {props.currentUser.username}
        </div> 
        : 
        <div>
          <span>Please 
            <NavLink history = {props.history} to = {"/sign-in"}> Sign In</NavLink>
          </span>
          <span> Or
            <NavLink history = {props.history} to={"/sign-up"}> Sign Up</NavLink>
          </span>
        </div>}
    </div>
  )
}


export default Home;