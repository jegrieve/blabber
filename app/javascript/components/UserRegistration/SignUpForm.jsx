import React, {useState, useEffect} from "react";
import signUpPerson from 'images/signup_person.svg';


const SignUpForm = (props) => {
    const [createUserInputs, setCreateUserInputs] = useState({
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
    });
    const [formErrors, setFormErrors] = useState(null);

    useEffect(() => {
        if (formErrors) {
            const formSuccesses = {
                email: true,
                username: true,
                password: true,
                password_confirmation: true
            }
            for (let key in formErrors) {
                if (key !== "password_digest") {
                    document.getElementById(`sign-up-${key}`).classList.remove("is-valid")
                    document.getElementById(`sign-up-${key}`).classList.add("is-invalid")
                    document.getElementById(`sign-up-${key}-help`).innerHTML = `${formErrors[key]}`
                    formSuccesses[key] = false;
                }
            }
            for (let key in formSuccesses) {
                if (formSuccesses[key]) {
                    document.getElementById(`sign-up-${key}`).classList.add("is-valid")
                    document.getElementById(`sign-up-${key}`).classList.remove("is-invalid")
                    document.getElementById(`sign-up-${key}-help`).innerHTML = ""
                }
            }
        }
    }, [formErrors])

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
                setFormErrors(response);
            }
        })
        .catch(error => console.log(error.message))
    }

  return (
      <div>
          <form className = "sign-up-inputs" onSubmit = {submitSignUpForm}>
            <div className = "form-group sign-up-input">
            <label className = "input-label">Email:
                <input id="sign-up-email" name = "email" type="email" className = "form-control" onChange = {enterSignUpInputs} value = {createUserInputs["email"]} placeholder = {"example@example.com"}/>
                <small id="sign-up-email-help" className="form-text red-text"></small>
            </label>
            </div>
            <div className = "form-group sign-up-input">
            <label className = "input-label">Username:
                <input id="sign-up-username" name = "username" type="text" className = "form-control" onChange = {enterSignUpInputs} value = {createUserInputs["username"]} placeholder = {"5-15 characters"} minLength = "5"  maxLength = {"15"}/>
                <small id="sign-up-username-help" className="form-text red-text"></small>
            </label>
            </div>
            <div className = "form-group sign-up-input">
            <label className = "input-label">Password:
                <input id="sign-up-password" name = "password" type="password" className = "form-control" onChange = {enterSignUpInputs} value = {createUserInputs["password"]} placeholder = {"5-12 characters"} minLength = "5"  maxLength = {"12"}/>
                <small id="sign-up-password-help" className="form-text red-text"></small>
            </label>
            </div>
            <div className = "form-group sign-up-input">
            <label className = "input-label">Password Confirmation:
                <input id="sign-up-password_confirmation" name = "passwordConfirm" type="password" className = "form-control" onChange = {enterSignUpInputs} value = {createUserInputs["passwordConfirm"]} minLength = "5"/>
                <small id="sign-up-password_confirmation-help" className="form-text red-text"></small>
            </label>
            </div>
            <div className = "create-btn">
                <button type = "submit" className = "btn btn-success">Create</button>
            </div>
          </form>
          <div className = "signup-user-img">
            <img src = {signUpPerson} width = {300} />
        </div>
      </div>
  )
}
export default SignUpForm;