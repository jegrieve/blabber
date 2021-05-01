import React from "react";
import SignUpForm from "./SignUpForm";

const SignUp = (props) => {
  return (
      <div>
        Create a new Account.
        <SignUpForm setCurrentUser = {props.setCurrentUser} />
      </div>
  )
}


export default SignUp;