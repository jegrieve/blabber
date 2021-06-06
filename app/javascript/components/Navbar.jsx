import React from "react";
import { NavLink } from "react-router-dom";
import SignOut from "./UserRegistration/SignOut";

const Navbar = (props) => {
  return (
    <div className = "site-navbar d-flex align-items-center">
      {props.currentUser ?       
        <div className = "nav-elements d-flex justify-content-around">
          <div>
            <NavLink to={`/user/${props.currentUser.id}`}>Current User</NavLink>
          </div>
          <div>
            <SignOut history = {props.history} currentUser = {props.currentUser} setCurrentUser = {props.setCurrentUser} />
          </div>
        </div> 
          : 
        <div className = "nav-elements d-flex justify-content-around">
          <NavLink history = {props.history} to={"/sign-up"}>Sign Up</NavLink>
          <NavLink history = {props.history} to = {"/sign-in"}>Sign In</NavLink>
        </div>
       }
    </div>
  )
}


export default Navbar;