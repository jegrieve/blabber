import React from "react";
import { NavLink } from "react-router-dom";
import SignOut from "./UserRegistration/SignOut";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

const Navbar = (props) => {
  return (
    <div className = "site-navbar">
      <div className = "nav-items d-flex align-items-center justify-content-between">
        <div className = "nav-logo">
          <NavLink to={`/`}>Homepage (logo goes here)</NavLink>
        </div>
        {props.currentUser ?       
        <div className = "nav-elements d-flex justify-content-around">
          <div className = "nav-user">
            <NavLink to={`/user/${props.currentUser.id}`}>
              <FontAwesomeIcon icon={faUser} size = '2x' />
            </NavLink>
          </div>
          <div className = "nav-help">
            <NavLink to={`/help`}>
              <FontAwesomeIcon icon={faQuestionCircle} size = '2x' />
            </NavLink>
          </div>
          <div className = "nav-sign-out">
            <SignOut history = {props.history} currentUser = {props.currentUser} setCurrentUser = {props.setCurrentUser} />
          </div>
        </div> 
          : 
        <div className = "nav-elements d-flex justify-content-between">
          <div className = "nav-sign-up">
          <NavLink history = {props.history} to={"/sign-up"}>
            <div className = "btn btn-primary">Sign Up</div>
          </NavLink>
          </div>
          <div className = "nav-sign-in">
          <NavLink history = {props.history} to = {"/sign-in"}>
            <div className = "btn btn-info">Sign In</div>
          </NavLink>
          </div>
        </div>
       }
      </div>
    </div>
  )
}


export default Navbar;