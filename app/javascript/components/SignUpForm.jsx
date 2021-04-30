import React, {useState, useEffect} from "react";


const SignUpForm = (props) => {
    const [createUserInputs, setCreateUserInputs] = useState({
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
    });

    const enterSignUpInputs = (e) => {
        setCreateUserInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };



  return (
      <div>
          <form onSubmit = {submitSignUpForm}>
            <label>Email:
                <input name = "email" type="email" onChange = {enterSignUpInputs} value = {createUserInputs["email"]} />
            </label>
            <label>Username:
                <input name = "username" type="text" onChange = {enterSignUpInputs} value = {createUserInputs["username"]} minLength = "5"/>
            </label>
          </form>
          <label>Password:
                <inputname type="password" onChange = {enterSignUpInputs} value = {createUserInputs["password"]} minLength = "5"/>
          </label>
          <label>Password Confirmation:
                <inputname type="password" onChange = {enterSignUpInputs} value = {createUserInputs["passwordConfirm"]} minLength = "5"/>
          </label>
      </div>
  )
}


export default SignUpForm;