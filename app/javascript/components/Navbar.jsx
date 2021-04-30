import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
      <div className = "site-navbar d-flex justify-content-around align-items-center">
          <NavLink to={"/sign-up"}>Sign In</NavLink>
          <NavLink to = {"/sign-in"}>Sign Up</NavLink>
      </div>
  )
}


export default Navbar;