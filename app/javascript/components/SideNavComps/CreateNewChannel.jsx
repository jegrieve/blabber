import React, {useState} from "react";

const CreateNewChannel = (props) => {
    const [createChannelInputs, setCreateChannelInputs] = useState({
      channelName: "",
      channelColour: "#000000"
    })
  
    const enterChannelInputs = (e) => {
      setCreateChannelInputs((prev) => ({
          ...prev,
          [e.target.name]: e.target.value
      }));
    };
  
    const submitCreateChannelForm = (e) => {
      e.preventDefault();
      postCreateChannelData();
  }
  
    const postCreateChannelData = () => {
        const body = {
            name: createChannelInputs["channelName"],
            colour: createChannelInputs["channelColour"]
        }
        const url = `/api/v1/channels/create?server_id=${props.serverId}`
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
            props.history.push(`/channel/${response.id}`);
        })
        .catch(error => console.log('did not post'))
    }
    
    const handleChannelColour = (e) => {
      setCreateChannelInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
    }
  
    return (
      <div className = "page-display create-channel-container d-flex justify-content-center">
        <form className = "create-channel-form form-group" onSubmit = {submitCreateChannelForm}>
        <div className = "form-group">
          <label className = "channel-inputs" for = "channel-name-value">Channel Name:
            <input id = "channel-name-value" name = "channelName" className = "form-control form-control-lg channel-inputs" type = "text" onChange = {enterChannelInputs} value = {createChannelInputs["channelName"]} maxLength="17"/>
            <input type = "color" name = "channelColour" className = "form-control" value = {createChannelInputs["channelColour"]} onChange = {handleChannelColour} />
          </label>
        </div>
          <button type = "submit" className = "btn btn-success">Create</button>
        </form>
      </div>  
    )
  }

export default CreateNewChannel;