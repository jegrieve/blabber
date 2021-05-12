import React, {useState} from "react";

const CreateNewChannel = (props) => {
    const [createChannelInputs, setCreateChannelInputs] = useState({
      channelName: "",
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
    
  
    return (
        <div>
          <form onSubmit = {submitCreateChannelForm}>
            <label>Channel Name:
              <input name = "channelName" type = "text" onChange = {enterChannelInputs} value = {createChannelInputs["channelName"]} />
            </label>
            <button type = "submit">Create</button>
          </form>
        </div>
    )
  }

export default CreateNewChannel;