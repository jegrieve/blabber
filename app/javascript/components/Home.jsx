import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div>
        <div>Welcome to MessageApp!</div>
        <div>Pick a server, then pick a channel, then send some messages!</div>
      {props.currentUser ? 
        <div>
          welcome {props.currentUser.username}
        </div> 
        : 
        <div>
          Please Log In/Sign up
        </div>}
    </div>
  )
}


export default Home;