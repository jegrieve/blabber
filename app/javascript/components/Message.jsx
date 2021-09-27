import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faTrashAlt, faEdit, faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'
import { Gif } from '@giphy/react-components'


const Message = (props) => {
  const [editMessageData, setEditMessageData] = useState(null);
  const [editMessage, setEditMessage] = useState(false);
  const [gifData, setGifData] = useState(null);

  useEffect(() => {
    if (props.messageData.gif) {
      fetchGifDataById(props.messageData.gif)
    }
  },[])

  useEffect(() => {
    setEditMessageData({...props.messageData})
  },[])

  useEffect(() => {
    if (editMessage === "submitted") {
      props.editMessage(props.messageData.id, editMessageData);
    }
  }, [editMessage])

  const deleteMessage = () => {
    props.deleteMessage(props.messageData.id)
  }
  
  const toggleEditMessage = () => {
    if (editMessage === "submitted" || !editMessage) {
      setEditMessage(true);
    } else {
      setEditMessage(false);
    }
  }

  const fetchGifDataById = (id) => {
    props.fetchGif.gif(id)
    .then((gifObj) => {
      setGifData(gifObj)
    })
    .catch(error => console.log(error.message))
  }

  const submitEditMessageData = (e) => {
    e.preventDefault();
    setEditMessage("submitted");
  }

  const handleEditMessage = (e) => {
    setEditMessageData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const onImageChange = (e) => {
    setEditMessageData((prev) => ({
        ...prev,
        message_image: e.target.files[0]
    }))
};

const handleGifClick = (gif, e) => {
  e.preventDefault();
}

  return (
    <div className = "message-contents">
      <form onSubmit = {submitEditMessageData}>
      <div className = "message-header d-flex justify-content-between">
          <div className = "message-info d-flex align-items-center">
              <div className = "message-avatar">
                {props.messageData.user.user_image ? 
                  <NavLink to = {`/user/${props.messageData.user.id}`}>
                    <img className = "message-avatar-img" src = {props.messageData.user.user_image.url}/>
                  </NavLink>
                    : 
                  <NavLink to = {`/user/${props.messageData.user.id}`}>
                    <FontAwesomeIcon icon={faUserCircle} />
                  </NavLink>
                  } 
              </div>
            <div className = "message-username">
              {props.messageData.user.username}
            </div>
          <div className = "message-dot">
            •
          </div>
          <div className = "message-time">
            {props.messageData.created_at}
          </div>
        </div>
        {props.currentUser && props.messageData.user_id === props.currentUser.id ?       
          <div className = "message-modifiers">
            {editMessage === true ? 
                <button type = "submit" className = "confirm-edit-btn">
                  <FontAwesomeIcon icon={faCheck} />
                </button>
               :
              <span className = "edit-msg-btn" onClick = {toggleEditMessage}>
                <FontAwesomeIcon icon={faEdit} />
              </span> }
            {editMessage === true ? 
                <span className = "cancel-edit-btn" onClick = {toggleEditMessage}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
                :
              <span className = "delete-msg-btn" onClick = {deleteMessage}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </span>  }
         </div> : false}
      </div>
      <div className = "message-body"> 
        {editMessage  === true ? 
          <div className = "form-group">
            <textarea className = "message-body-edit form-control" type = "text" name = "body" value = {editMessageData["body"]} onChange = {handleEditMessage} maxLength = "750" rows = "4" required/>
          </div>
             : 
          <div>
            {props.messageData.body}
          </div>}
      </div>
        {props.messageData.message_image ? 
        <div className = "message-img">
          <img className = "message-img-file" src = {props.messageData.message_image.url} />
          {editMessage === true ? <div className = "form-group"><input className = "form-control" name = "message_image" type="file" accept="image/*" multiple={false} onChange={onImageChange} required/> </div> : false}
        </div> : false}
        {props.messageData.video_link ? 
        <div className = "message-video">
          <iframe className = "message-video-iframe" src={props.messageData.video_link} />
          {editMessage  === true ? <div className = "form-group">New Vid <input className = "form-control" name = "video_link" type="text" onChange={handleEditMessage} placeholder = {"Post a valid youtube link"} required/></div> : false}
        </div> : false}
        {gifData ? 
        <div className = "message-gif">
          <Gif gif={gifData.data} width = {280} onGifClick = {handleGifClick}/>
        </div> 
        : false}
        </form>
    </div>
  )
}
export default Message;
