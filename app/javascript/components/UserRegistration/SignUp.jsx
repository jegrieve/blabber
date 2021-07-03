import React from "react";
import SignUpForm from "./SignUpForm";

const SignUp = (props) => {
  return (
      <div className = "page-display page-centered">
        <div className = "page-title">Sign Up</div>
        <div>
          <SignUpForm history = {props.history} setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser}/>
        </div>
      </div>
  )
}


export default SignUp;