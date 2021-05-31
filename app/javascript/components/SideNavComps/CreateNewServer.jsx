import React, {useEffect, useState} from "react";


const CreateNewServer = (props) => {
  const [createServerInputs, setCreateServerInputs] = useState({
    serverName: "",
    serverInfo: ""
  })

  const enterServerInputs = (e) => {
    setCreateServerInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
  };

  const submitCreateServerForm = (e) => {
    e.preventDefault();
    postCreateServerData();
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

  const onImageChange = () => {
    
  }
  

  return (
      <div className = "page-display create-server-container d-flex justify-content-center">
        <form className = "create-server-form form-group" onSubmit = {submitCreateServerForm}>
        <div className = "form-group">
          <label className = "server-inputs" for = "server-name-value">Server Name:
            <input id = "server-name-value" name = "serverName" className = "form-control form-control-lg server-inputs" type = "text" onChange = {enterServerInputs} value = {createServerInputs["serverName"]} />
          </label>
        </div>
        <div className = "form-group">
          <label className = "server-inputs" for = "server-info-value">Server Info:
            <input id = "server-info-value" name = "serverInfo" className = "form-control form-control-lg server-inputs" type = "text" onChange = {enterServerInputs} value = {createServerInputs["serverInfo"]} />
          </label>
        </div>
        <div className = "form-group">
            <input id = "server-image-value" className = "form-control" type = "file" accept = "image/*" multiple = {false} onChange = {onImageChange} />
        </div>
          <button type = "submit" className = "btn btn-success">Create</button>
        </form>
      </div>
  )
}

export default CreateNewServer;