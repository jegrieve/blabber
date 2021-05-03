import React, {useEffect, useState} from "react";


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
                console.error("Invalid Username/Password.")
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
        <form onSubmit = {submitSignInForm}>
            <label>Username:
                <input name = "username" type="text" onChange = {enterSignInInputs} value = {setSignInUserInputs["username"]}/>
            </label>
            <label>Password:
                <input name = "password" type="password" onChange = {enterSignInInputs} value = {setSignInUserInputs["password"]}/>
            </label>
            <button type = "submit">Sign In</button>
        </form>
      </div>
  )
}


export default SignInForm;