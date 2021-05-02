import React from "react";
import SignInForm from "./SignInForm";

const SignIn = (props) => {
  return (
      <div>
          Sign in to your Account.
          <SignInForm setCurrentUser = {props.setCurrentUser} />
      </div>
  )
}


export default SignIn;