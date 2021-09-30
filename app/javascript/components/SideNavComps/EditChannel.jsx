import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer, faUsers } from '@fortawesome/free-solid-svg-icons'
import createChannelImage from 'images/create_channel_people.svg'
import { faComment, faEdit } from "@fortawesome/free-regular-svg-icons";

const EditChannel = (props) => {
  const [editChannelData, setEditChannelData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [channelId, setChannelId] = useState(null);
  const [confirmDeleteChannel, setConfirmDeleteChannel] = useState(false);
  console.log(editChannelData)

  useEffect(() => {
    getChannelData();
  },[]);

  useEffect(() => {
      getChannelData();
  }, [channelId])

  useEffect(() => {
    if (channelData) {
      setEditChannelData({...channelData})
    }
  }, [channelData])

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

  
  const submitEditChannelForm = (e) => {
    e.preventDefault();
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
      getChannelData();
      setEditMode(false);
      props.history.push(`/channel/${response.id}`)
  })
  .catch(error => console.log(error.message))
  }

  const confirmDelete = () => {
    setConfirmDeleteChannel(true);
  }

  const cancelDelete = () => {
    setConfirmDeleteChannel(false);
  }

  const deleteChannel = () => {
    const url = `/api/v1/channels/destroy/${channelData.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
  
    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        props.history.push("/")
      })
      .catch(error => console.log(error.message));    
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
                <label className = "channel-inputs" htmlFor = "channel-name-value">Name:
                <input id = "channel-name-value" name = "name" className = "form-control form-control-lg channel-inputs" type = "text" onChange = {enterChannelInputs} value = {editChannelData["name"]} minLength = "3" maxLength="16" placeholder = "3-16 characters" />
                </label>
              </div>
              <div className = "form-group">
                <label className = "channel-inputs" htmlFor = "channel-colour-value">Colour:
                <input type = "color" name = "colour" className = "form-control" value = {editChannelData["colour"]} onChange = {handleChannelColour} />
                </label>
              </div>
            </div> : 
            <div>
              <div>
                <span className = "channel-info">
                  {channelData.name}
                </span>
                <span onClick = {toggleEdit}> <FontAwesomeIcon icon = {faEdit} size = "2x" color = "#f50057"/></span>
                </div>
                <div className = "channel-info">
                  {channelData.server.name} <FontAwesomeIcon icon = {faServer} title = "Server" color = "#f50057" />
                </div>
            </div>}
          </div> : 
          <div>
              <div className = "channel-info">{channelData.name}</div>
              <div className = "channel-info">{channelData.server.name} <FontAwesomeIcon icon = {faServer} title = "Server" color = "#f50057" /></div>
          </div>}
            {props.currentUser && props.currentUser.id === channelData.server.user_id && editMode ? 
              <div>
                <button type = "submit" className = "btn btn-success">Submit</button>
                <button onClick = {toggleEdit} className = "btn btn-danger cancel-btn">Cancel</button>
              </div> : false
            }
        </form>
        {props.currentUser && props.currentUser.id === channelData.server.user_id 
        && confirmDeleteChannel ? 
              <div>
                  <div>
                    <div className = "red-text">Warning: delete channel and all associated messages.</div>
                    <button className = "btn btn-danger" onClick = {deleteChannel}>Confirm Delete</button>
                    <button className = "btn btn-primary cancel-btn" onClick = {cancelDelete}>Cancel</button>
                  </div>
              </div> : props.currentUser && props.currentUser.id === channelData.server.user_id ? 
              <button className = "btn btn-warning" onClick = {confirmDelete}>Delete Channel</button> : false
            }
      </div>
      <div className = "col-6 edit-channel-info">
          <div>{channelData.unique_users} <FontAwesomeIcon icon = {faUsers} title = "Users" color = "#f50057" /></div>
          <div>{channelData.messages.length} <FontAwesomeIcon icon = {faComment} title = "Messages" color = "#f50057" /></div>
        <div className = "create-server-image">
          <img src = {createChannelImage} width = {300} />
        </div>
      </div>
    </div>
        </div> 
        : <div>No channel exists.</div>}
  </div>  
  )
}

export default EditChannel;
