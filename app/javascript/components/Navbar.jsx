import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
      <div className = "site-navbar d-flex justify-content-around align-items-center">
          <div>User Sign In</div>
          <div>User Sign up</div>
      </div>
  )
}


export default Navbar;