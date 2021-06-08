import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faTrashAlt, faEdit, faYinYang } from '@fortawesome/free-solid-svg-icons'

const Message = (props) => {
  const [editMessageData, setEditMessageData] = useState(null);
  const [editMessage, setEditMessage] = useState(false);

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

  const submitEditMessageData = () => {
    setEditMessage("submitted");
    // props.editMessage(props.messageData.id, editMessageData);
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

  return (
    <div className = "message-contents">
      <div className = "message-header d-flex justify-content-between">
          <div className = "message-info d-flex align-items-center">
              <div className = "message-avatar">
              <NavLink to = {`/user/${props.messageData.user.id}`}>
                <FontAwesomeIcon icon={faUserCircle} />
                </NavLink>
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
              <div>
                <button onClick = {submitEditMessageData}>Save</button>
              </div> :
              <span className = "edit-msg-btn" onClick = {toggleEditMessage}>
                <FontAwesomeIcon icon={faEdit} />
              </span> }
            {editMessage === true ? 
              <div>
                <button onClick = {toggleEditMessage}>Exit</button>
              </div> :
              <span className = "delete-msg-btn" onClick = {deleteMessage}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </span>  }

         </div> : false}
      </div>
      <div className = "message-body"> 
        {editMessage  === true ? 
          <input type = "text" name = "body" value = {editMessageData["body"]} onChange = {handleEditMessage} />
             : 
          <div>
            {props.messageData.body}
          </div>}
      </div>
        {props.messageData.message_image ? 
        <div className = "message-img">
          <img className = "message-img-file" src = {props.messageData.message_image.url} />
          {editMessage === true ? <div><input className = "form-control" name = "message_image" type="file" accept="image/*" multiple={false} onChange={onImageChange} /> </div> : false}
        </div> : false}
        {props.messageData.video_link ? 
        <div className = "message-video">
          <iframe className = "message-video-iframe" src={props.messageData.video_link} />
          {editMessage  === true ? <div>New Vid <input className = "form-control" name = "video_link" type="text" onChange={handleEditMessage} placeholder = {"Post a valid youtube link"}/></div> : false}
        </div> : false}
    </div>
  )
}
export default Message;
