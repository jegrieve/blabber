import React from "react";
import { NavLink } from "react-router-dom";
import SignOut from "./UserRegistration/SignOut";

const Navbar = (props) => {
  return (
    <div>
      {props.currentUser ?       
        <div className = "site-navbar d-flex justify-content-around align-items-center">
          <NavLink to={"/"}>Current User</NavLink>
          <SignOut currentUser = {props.currentUser} setCurrentUser = {props.setCurrentUser} />
        </div> 
          : 
        <div className = "site-navbar d-flex justify-content-around align-items-center">
          <NavLink to={"/sign-up"}>Sign Up</NavLink>
          <NavLink to = {"/sign-in"}>Sign In</NavLink>
        </div>
       }
    </div>
  )
}


export default Navbar;