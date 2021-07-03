import React from "react";
import SignInForm from "./SignInForm";

const SignIn = (props) => {
  return (
      <div className = "page-display page-centered">
          <div className = "page-title">Sign In</div>
          <div>
            <SignInForm history = {props.history} setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser} />
          </div>
      </div>
  )
}


export default SignIn;