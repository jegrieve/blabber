import React from "react";
import { NavLink } from "react-router-dom";
import SignOut from "../UserRegistration/SignOut";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import logo from 'images/blabberlogo.png'
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

const Navbar = (props) => {
  return (
    <div className = "site-navbar">
      <div className = "nav-items d-flex align-items-center justify-content-between">
        <div>
          <div className = "nav-logo">
            <NavLink to={`/`}><img className = "navbar-logo" src = {logo}/></NavLink>
          </div>
          <div className = "nav-trackers">
            {props.currentServer ? <span>Current Server: <NavLink className = "nav-tracker" to = {`/server/${props.currentServer.id}`}> {props.currentServer.name}</NavLink> </span> : false}
            {props.currentChannel ? <span> <FontAwesomeIcon icon = {faCaretRight} color = "white" /> <NavLink className = "nav-tracker" to = {`/channel/${props.currentChannel.id}`}> {props.currentChannel.name} </NavLink> </span> : false}
          </div>
        </div>

        {props.currentUser ?       
        <div className = "nav-elements d-flex justify-content-around">
          <div className = "nav-user">
            <NavLink to={`/user/${props.currentUser.id}`}>
              <FontAwesomeIcon icon={faUser} size = '2x' color = "white" />
            </NavLink>
          </div>
          <div className = "nav-help">
            <NavLink to={`/help`}>
              <FontAwesomeIcon icon={faQuestionCircle} size = '2x' color = "white"/>
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
            <div id = "sign-up-btn" className = "btn btn-light">Sign Up</div>
          </NavLink>
          </div>
          <div className = "nav-sign-in">
          <NavLink history = {props.history} to = {"/sign-in"}>
            <div id = "sign-in-btn" className = "btn btn-light">Sign In</div>
          </NavLink>
          </div>
        </div>
       }
      </div>
    </div>
  )
}


export default Navbar;