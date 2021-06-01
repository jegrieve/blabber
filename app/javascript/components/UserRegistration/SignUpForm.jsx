import React, {useState, useEffect} from "react";


const SignUpForm = (props) => {
    const [createUserInputs, setCreateUserInputs] = useState({
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
    });

    useEffect(() => {
        if (props.currentUser) {
            props.history.push("/");
        };
    })

    const enterSignUpInputs = (e) => {
        setCreateUserInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const submitSignUpForm = (e) => {
        e.preventDefault();
        postSignUpData();
    }

    const postSignUpData = () => {
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
                props.setCurrentUser(response)
            } else {
                console.error("Did not create user due to invalid inputs.")
            }
        })
        .catch(error => console.log(error.message))
    }

  return (
      <div>
          <form className = "sign-up-inputs" onSubmit = {submitSignUpForm}>
            <div className = "form-group">
            <label>Email:
                <input id="sign-up-email" name = "email" type="email" className = "form-control" onChange = {enterSignUpInputs} value = {createUserInputs["email"]} />
            </label>
            </div>
            <div className = "form-group">
            <label>Username:
                <input id="sign-up-username" name = "username" type="text" className = "form-control" onChange = {enterSignUpInputs} value = {createUserInputs["username"]} minLength = "5"/>
            </label>
            </div>
            <div className = "form-group">
            <label>Password:
                <input id="sign-up-password" name = "password" type="password" className = "form-control" onChange = {enterSignUpInputs} value = {createUserInputs["password"]} minLength = "5"/>
            </label>
            </div>
            <div className = "form-group">
            <label>Password Confirmation:
                <input id="sign-up-confirm" name = "passwordConfirm" type="password" className = "form-control" onChange = {enterSignUpInputs} value = {createUserInputs["passwordConfirm"]} minLength = "5"/>
            </label>
            </div>
            <div>
                <button type = "submit" className = "btn btn-success">Create</button>
            </div>
          </form>
      </div>
  )
}


export default SignUpForm;