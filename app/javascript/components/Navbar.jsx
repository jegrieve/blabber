import React from "react";
import { NavLink } from "react-router-dom";
import SignOut from "./SignOut";
const Navbar = (props) => {
  return (
    <div>
      {props.currentUser ?       
        <div className = "site-navbar d-flex justify-content-around align-items-center">
          <NavLink to={"/"}>Current User</NavLink>
          
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