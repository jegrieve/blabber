import React from "react";
import SignUpForm from "./SignUpForm";

const SignUp = (props) => {
  return (
      <div>
        Create a new Account.
        <SignUpForm history = {props.history} setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser}/>
      </div>
  )
}


export default SignUp;