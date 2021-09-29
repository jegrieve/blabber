import React, { useEffect, useState } from "react";

const EditChannel = (props) => {
  const [editChannelData, setEditChannelData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [channelId, setChannelId] = useState(null);
  console.log(editChannelData)

  useEffect(() => {
    getChannelData();
  },[]);

  useEffect(() => {
      getChannelData();
      setEditChannelData({...channelData})
  }, [channelId])

  useEffect(() => {
    if (props.match.params.id !== channelId) {
      setChannelId(props.match.params.id);
    }
  })

  const getChannelData = () => {
    const id = props.match.params.id
    const url = `/api/v1/channels/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        console.log(response)
        setChannelData(response)
    })
      .catch(() => console.log("error"));
  }

  const toggleEdit = () => {
    setEditMode(!editMode);
  }

  const handleChannelColour = (e) => {
    setEditChannelData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
  }));
  }

  const enterChannelInputs = (e) => {
    setEditChannelData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
  };

  
  const submitEditChannelForm = () => {
    const body = {
      name: editChannelData["name"],
      colour: editChannelData["colour"]
  }
    const url = `/api/v1/channels/update/${editChannelData.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
    method: "PATCH",
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
      props.getChannelData();
  })
  .catch(error => console.log(error.message))
  }


  return (
    <div className = "page-display">
    {channelData ? 
    <div>
    <div className = "page-title">Channel Info</div>
    <div className = "row top-padding-server">
      <div className = "col-6 page-centered">
        <form className = "edit-channel-form form-group" onSubmit = {submitEditChannelForm} > 
        {props.currentUser && props.currentUser.id === channelData.server.user_id ? 
          <div>
            {editMode ? 
            <div>
              <div className = "form-group">
                <label className = "channel-inputs" htmlFor = "channel-name-value">Channel Name:
                <input id = "channel-name-value" name = "name" className = "form-control form-control-lg channel-inputs" type = "text" onChange = {enterChannelInputs} value = {editChannelData["name"]} minLength = "3" maxLength="16" placeholder = "3-16 characters" />
                <small id= "channel-name-help" className="form-text red-text"></small>
                </label>
              </div>
              <div className = "form-group">
                <label className = "channel-inputs" htmlFor = "channel-colour-value">Channel Colour:
                <input type = "color" name = "colour" className = "form-control" value = {editChannelData["colour"]} onChange = {handleChannelColour} />
                </label>
              </div>
            </div> : 
            <div>
              <div>Name: {channelData.name}</div>
              <div><button onClick = {toggleEdit}>Edit Channel</button></div>
            </div>}
          </div> : 
          <div>
              <div>Name: {channelData.name}</div>
              <div>Server: {channelData.server.name}</div>
          </div>}
            {props.currentUser && props.currentUser.id === channelData.server.user_id && editMode ? 
              <div>
                <button type = "submit" className = "btn btn-success">Save Changes</button>
                <button onClick = {toggleEdit} className = "btn btn-danger">Cancel</button>
              </div> : false
            }
        </form>
      </div>
      <div className = "col-6 create-server-info">
          <div>Channel Info here</div>
          <div>Channel Info here</div>
        <div className = "create-server-image">
          Optional image or something else
          {/* <img src = {createChannelImage} width = {300} /> */}
        </div>
      </div>
    </div>
        </div> 
        : <div>No channel exists.</div>}
  </div>  
  )
}

export default EditChannel;

// Channel Name: <input type = "text" />
// Channel Colour <input type = "color" />
// <button type = "submit">Submit</button>
// <button>Delete Channel</button>
// Unique Users:
// Messages In channel: 
// Channel Creator:
// Server its on:

// Use create channel as template
//Basically, show everything but add the ability to click an edit btn for name or colour.
//Then on the right side, show some info about the app state, and below it, if you created the server you can delete this channel/everything in it.

// {channelData ? 
//   <form>
//       <div>{channelData.name}</div>
//       {props.currentUser.id === channelData.server.user_id ? <button>Edit</button> : false}
//   </form>
// : false}