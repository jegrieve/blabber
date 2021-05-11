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

  const submitCreateServerForm = () => {

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