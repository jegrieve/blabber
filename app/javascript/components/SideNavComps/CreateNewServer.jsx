import React, {useEffect, useState} from "react";


const CreateNewServer = (props) => {
  const [createServerInputs, setCreateServerInputs] = useState({
    serverName: "",
    serverInfo: "",
    serverImage: null
  });
  const [submitType, setSubmitType] = useState("text");

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
          props.history.push(`/server/${response.id}`);
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
    .catch(error => console.log(error.message))
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
      <div className = "page-display create-server-container d-flex justify-content-center">
        <form className = "create-server-form form-group" onSubmit = {submitCreateServerForm}>
        <div className = "form-group">
          <label className = "server-inputs" htmlFor = "server-name-value">Server Name:
            <input id = "server-name-value" name = "serverName" className = "form-control form-control-lg server-inputs" type = "text" onChange = {enterServerInputs} value = {createServerInputs["serverName"]} minLength = "5" maxLength="15"/>
          </label>
        </div>
        <div className = "form-group">
          <label className = "server-inputs" htmlFor  = "server-info-value">Server Info:
            <input id = "server-info-value" name = "serverInfo" className = "form-control form-control-lg server-inputs" type = "text" onChange = {enterServerInputs} value = {createServerInputs["serverInfo"]} />
          </label>
        </div>
        {submitType === "text" ? 
          <div>
            <button onClick = {toggleSubmitType}>Add Banner</button> 
          </div>
          :         
          <div>
            <div className = "form-group">
              <input id = "server-image-value" className = "form-control-file" type = "file" accept = "image/*" multiple = {false} onChange = {onImageChange} />
            </div>
            <button onClick = {toggleSubmitType}>Cancel</button>
          </div>}
          <button type = "submit" className = "btn btn-success">Create</button>
        </form>
      </div>
  )
}

export default CreateNewServer;