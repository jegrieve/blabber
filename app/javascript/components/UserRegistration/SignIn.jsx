import React from "react";
import SignInForm from "./SignInForm";

const SignIn = (props) => {
  return (
      <div>
          Sign in to your Account.
          <SignInForm history = {props.history} setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser} />
      </div>
  )
}


export default SignIn;