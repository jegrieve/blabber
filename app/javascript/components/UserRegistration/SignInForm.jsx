import React, {useEffect, useState} from "react";
import loginUser from 'images/login_person.svg'

const SignInForm = (props) => {
    const [signInUserInputs, setSignInUserInputs] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        if (props.currentUser) {
            props.history.push("/");
        };
    })


    const submitSignInForm = (e) => {
        e.preventDefault();
        postSignInData();
    };

    const signInErrorHandling = () => {
        document.getElementById("sign-in-username-error").innerHTML = "Invalid User/Pass"
        document.getElementById("sign-in-username").classList.add("is-invalid")
        document.getElementById("sign-in-password").classList.add("is-invalid")
    }

    const postSignInData = () => {
        const body = {
            username: signInUserInputs["username"],
            password: signInUserInputs["password"],
        }
        const url = "/api/v1/sessions/create"
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
            if (response === null) {
                signInErrorHandling();
            } else if (response.id) {
                props.setCurrentUser(response)
            }
        })
        .catch(error => console.log(error.message))
    }

    const enterSignInInputs = (e) => {
        setSignInUserInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };


  return (
    <div>
        <form className = "sign-in-inputs" onSubmit = {submitSignInForm}>
            <div className = "form-group">
                <label className = "input-label">Username:
                    <input id="sign-in-username" name = "username" type="text" className = "form-control" onChange = {enterSignInInputs} value = {signInUserInputs["username"]}/>
                    <small id="sign-in-username-error" className="form-text red-text"></small>
                </label>
            </div>
            <div className = "form-group">
                <label className = "input-label">Password:
                    <input id="sign-in-password" name = "password" className = "form-control" type="password" onChange = {enterSignInInputs} value = {signInUserInputs["password"]}/>
                </label>
            </div>
            <div className = "sign-in-btn">
                <button className = "btn btn-success" type = "submit">Log In</button>
            </div>
        </form>
        <div className = "login-user-img">
            <img src = {loginUser} width = {300} />
        </div>
    </div>
  )
}


export default SignInForm;