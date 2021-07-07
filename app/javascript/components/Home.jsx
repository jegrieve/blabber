import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";

const Home = (props) => {
  const [homepageInfo, setHomepageInfo] = useState(null);
  useEffect(() => {
    props.setCurrentServer(null);
  },[])
  
  useEffect(() => {
    getHomeData();
  },[])

  const getHomeData = () => {
    const id = props.match.params.id
    const url = `/api/v1/pages/show?homepage=${true}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        setHomepageInfo(response);
    })
      .catch(() => console.log("error"));
  }

  return (
    <div className = "page-display page-centered">
        <div className = "page-title">Welcome to MessageApp!</div>
        <div className = "home-page">
          <div className = "home-help">Pick a server, then pick a channel and send some messages!</div>
          <div className = "home-info">Data about app (servers/channels/users)</div>
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
          {homepageInfo ? 
          <div>
            <div>{homepageInfo.servers} servers</div>
            <div>{homepageInfo.users} users</div>
          </div>
        :false}
        </div>

    </div>
  )
}


export default Home;