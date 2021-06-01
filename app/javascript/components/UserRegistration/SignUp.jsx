import React from "react";
import SignUpForm from "./SignUpForm";

const SignUp = (props) => {
  return (
      <div className = "page-display sign-up-container d-flex justify-content-center">
        <SignUpForm history = {props.history} setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser}/>
      </div>
  )
}


export default SignUp;