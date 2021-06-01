import React from "react";
import SignInForm from "./SignInForm";

const SignIn = (props) => {
  return (
      <div className = "page-display sign-in-container d-flex justify-content-center">
          <SignInForm history = {props.history} setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser} />
      </div>
  )
}


export default SignIn;