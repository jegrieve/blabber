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

    const submitSignUpForm = (e) => {
        e.preventDefault();
        const body = {
            email: createUserInputs["email"],
            username: createUserInputs["username"],
            password: createUserInputs["password"],
            password_confirmation: createUserInputs["passwordConfirm"],
        }
        const url = "/api/v1/registrations/create"
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
        method: "POST",
        headers: {
        "X-CSRF-Token": token, 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => {
            console.log(response) 
            if (response.id) {
                // exitSignUpForm();
                props.setCurrentUser(response)
            } else {
                // setFormErrors(response);
                console.log("form errors")
            }
        })
        .catch(error => console.log(error.message))
    }

  return (
      <div>
          <form onSubmit = {submitSignUpForm}>
            <label>Email:
                <input name = "email" type="email" onChange = {enterSignUpInputs} value = {createUserInputs["email"]} />
            </label>
            <label>Username:
                <input name = "username" type="text" onChange = {enterSignUpInputs} value = {createUserInputs["username"]} minLength = "5"/>
            </label>
            <label>Password:
                <input name = "password" type="password" onChange = {enterSignUpInputs} value = {createUserInputs["password"]} minLength = "5"/>
            </label>
            <label>Password Confirmation:
                <input name = "passwordConfirm" type="password" onChange = {enterSignUpInputs} value = {createUserInputs["passwordConfirm"]} minLength = "5"/>
            </label>
            <button type = "submit">Create</button>
          </form>
      </div>
  )
}


export default SignUpForm;