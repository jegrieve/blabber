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
          console.log(response)
      })
      .catch(error => console.log('did not post'))
  }
  

  return (
      <div>
        <form onSubmit = {submitCreateServerForm}>
          <label>Server Name:
            <input name = "serverName" type = "text" onChange = {enterServerInputs} value = {createServerInputs["serverName"]} />
          </label>
          <label>Server Info:
            <input name = "serverInfo" type = "text" onChange = {enterServerInputs} value = {createServerInputs["serverInfo"]} />
          </label>
          <button type = "submit">Create</button>
        </form>
      </div>
  )
}

export default CreateNewServer;