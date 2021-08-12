import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import createServerImage from 'images/create_server_img.svg'

const CreateNewServer = (props) => {
  const [createServerInputs, setCreateServerInputs] = useState({
    serverName: "",
    serverInfo: "",
    serverImage: null
  });
  const [submitType, setSubmitType] = useState("text");
  const [formErrors, setFormErrors] = useState(null);

  useEffect(() => {
    const formSuccesses = {
      name: true,
      info: true
  }
    if (formErrors) {
        for (let key in formErrors) {
                document.getElementById(`server-${key}-value`).classList.remove("is-valid")
                document.getElementById(`server-${key}-value`).classList.add("is-invalid")
                document.getElementById(`server-${key}-help`).innerHTML = `${formErrors[key]}`
                formSuccesses[key] = false;
        }
        for (let key in formSuccesses) {
            if (formSuccesses[key]) {
                document.getElementById(`server-${key}-value`).classList.add("is-valid")
                document.getElementById(`server-${key}-value`).classList.remove("is-invalid")
                document.getElementById(`server-${key}-help`).innerHTML = ""
            }
        }
    } else {
      for (let key in formSuccesses) {
        document.getElementById(`server-${key}-value`).classList.remove("is-invalid")
        document.getElementById(`server-${key}-value`).classList.remove("is-valid")
        document.getElementById(`server-${key}-help`).innerHTML = ""
      }
    }
}, [formErrors])

  useEffect(() => {
    setFormErrors(null);
  }, [submitType])


  const enterServerInputs = (e) => {
    setCreateServerInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
  };

  const submitCreateServerForm = (e) => {
    e.preventDefault();
    if (submitType === "text") {
      postCreateServerData();
    } else {
      postCreateServerDataWithImage();
    }
}

  const postCreateServerData = () => {
      const body = {
          name: createServerInputs["serverName"],
          info: createServerInputs["serverInfo"]
      }
      const url = "/api/v1/servers/create"
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
        if (response.id) {
          props.history.push(`/server/${response.id}`);
      } else {
          console.error("Did not create user due to invalid inputs.")
          setFormErrors(response);
        }
      })
      .catch(error => console.log('did not post'))
  }

  const postCreateServerDataWithImage = () => {
    const formData =  new FormData();
    formData.append('name', createServerInputs["serverName"]);
    formData.append('info', createServerInputs["serverInfo"]);
    formData.append('server_image', createServerInputs["serverImage"]);
    const url = `/api/v1/servers/create`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
    method: "POST",
    body: formData,
    headers: {
    "X-CSRF-Token": token, 
    },
  })
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error("Network response was not ok.");
    })
    .then(response => {
        props.history.push(`/server/${response.id}`);
    })
    .catch(() => {
        document.getElementById(`server-image-help`).innerHTML = "please make sure each input is filled"
    })
  }

  const onImageChange = (e) => {
    e.preventDefault();
    setCreateServerInputs((prev) => ({
      ...prev,
      serverImage: e.target.files[0]
    }))
  }

  const toggleSubmitType = () => {
    if (submitType === "text") {
      setSubmitType("image")
    } else {
      setSubmitType("text")
    }
  }

  return (
      <div className = "page-display">
        <div className = "page-title">Create Server</div>
        <div className = "row top-padding-server">
          <div className = "col-6 page-centered">
            <form className = "create-server-form form-group" onSubmit = {submitCreateServerForm}>
              <div className = "form-group">
                <label className = "server-inputs" htmlFor = "server-name-value">Server Name:
                <input id = "server-name-value" name = "serverName" className = "form-control form-control-lg server-inputs" type = "text" onChange = {enterServerInputs} value = {createServerInputs["serverName"]} minLength = "3" maxLength="17" placeholder = {"3-17 characters"} />
                <small id="server-name-help" className="form-text red-text"></small>
                </label>
              </div>
              <div className = "form-group">
                <label className = "server-inputs" htmlFor  = "server-info-value">Server Info:
                <textarea id = "server-info-value" name = "serverInfo" className = "form-control form-control-lg server-inputs" type = "text" onChange = {enterServerInputs} value = {createServerInputs["serverInfo"]} maxLength = "400" placeholder = {"minimum 10 characters"} minLength = "10" />
                <small id="server-info-help" className="form-text red-text"></small>
                </label>
              </div>
          {submitType === "text" ? 
          <div>
            <button className = "btn btn-primary" onClick = {toggleSubmitType}>Add Banner Image</button> 
          </div>
          :         
          <div>
            <div className = "form-group server-image-input">
              <input id = "server-image-value" className = "form-control-file" type = "file" accept = "image/*" multiple = {false} onChange = {onImageChange} />
              <small id="server-image-help" className="form-text red-text"></small>
            </div>
            <button className = "btn btn-danger" onClick = {toggleSubmitType}>Cancel</button>
          </div>}
          {props.currentUser ? 
            <button type = "submit" className = "btn btn-success server-create-btn">Create</button> :
            <div className = "tiny-padding-top">Please&nbsp; 
            <NavLink to = {`/sign-in`} >Sign In</NavLink>
            &nbsp;or&nbsp;
            <NavLink to = {`/sign-up`} >Sign Up</NavLink>
            &nbsp;to create this server.</div> 
          }
        </form>
          </div>
          <div className = "col-6 create-server-info">
            <div>Create a new server for your community.</div>
            <div>Include information on what your server is about.</div>
            <div className = "create-server-image">
              <img src = {createServerImage} width = {300} />
            </div>
          </div>
        </div>
      </div>
  )
}

export default CreateNewServer;