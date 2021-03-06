import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import createChannelImage from 'images/create_channel_people.svg'
import { useEffect } from "react";

const CreateNewChannel = (props) => {
    const [createChannelInputs, setCreateChannelInputs] = useState({
      channelName: "",
      channelColour: "#000000"
    })

    useEffect(() => {
      if (!props.currentServer) {
        props.history.push(`/`);
      }
    }, [])
  
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
        const url = `/api/v1/channels/create?server_id=${props.currentServer.id}`
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
            props.history.push(`/channel/${response.id}`);
        } else {
            console.error("Did not create user due to invalid inputs.")
            handleFormError(response);
          }
        })
        .catch(error => console.log('did not post'))
    }

    const handleFormError = (formError) => {
      document.getElementById(`channel-name-value`).classList.add("is-invalid")
      document.getElementById(`channel-name-help`).innerHTML = formError["name"];
    }
    
    const handleChannelColour = (e) => {
      setCreateChannelInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
    }
  
    return (
      <div className = "page-display">
        <div className = "page-title">Create Channel</div>
        <div className = "row top-padding-server">
          <div className = "col-6 page-centered">
            <form className = "create-channel-form form-group" onSubmit = {submitCreateChannelForm}>
              <div className = "form-group">
                <label className = "channel-inputs" htmlFor = "channel-name-value">Channel Name:
                  <input id = "channel-name-value" name = "channelName" className = "form-control form-control-lg channel-inputs" type = "text" onChange = {enterChannelInputs} value = {createChannelInputs["channelName"]} minlength = "3" maxLength="16" placeholder = "3-16 characters" />
                  <small id= "channel-name-help" className="form-text red-text"></small>
                </label>
                </div>
                <div className = "form-group">
                  <label className = "channel-inputs" htmlFor = "channel-colour-value">Channel Colour:
                    <input type = "color" name = "channelColour" className = "form-control" value = {createChannelInputs["channelColour"]} onChange = {handleChannelColour} />
                  </label>
                </div>
                {props.currentUser ? 
                  <button type = "submit" className = "btn btn-success">Create</button>:
                  <div className = "tiny-padding-top">Please&nbsp;
                  <NavLink to = {`/sign-in`} >Sign In</NavLink>
                  &nbsp;or&nbsp; 
                  <NavLink to = {`/sign-up`} >Sign Up</NavLink>
                  &nbsp;to create this channel.</div> 
                }
            </form>
          </div>
          <div className = "col-6 create-server-info">
            <div>Create a new channel to add to this server.</div>
            <div>Include a colour to better identify your channel.</div>
            <div className = "create-server-image">
              <img src = {createChannelImage} width = {300} />
            </div>
          </div>
        </div>
      </div>  
    )
  }

export default CreateNewChannel;