import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'


//we'll send down a prop that says this one should be in edit mode
//then based on this new mode it will look different.
//then we can pass the changed data into it?
//gotta think about this more.
//Basically 2 things:
//1. We send all the data for the message. so props.messageData has the text/img/vid data
//2. when we are in edit mode, we will fill the new state ex: [editData, setEditData] = { text: props.data.....}
//then basically we can send back all this data to update, and if the data is the same in the update it doesnt matter...
//so basically we change only the text and we send the editData with the newtext/ unchanged video and then the api call updates all of it.

//THEN: if u click the check the commit is saved (call to parent api with the new data)
//, if u click the X then u change the message type back into the non-edit mode through the parent
//(also remember to not let use have a bunch of edit messages open)
const Message = (props) => {
  const [videoLinkFormatted, setVideoLinkFormatted] = useState(null);
  const [editMessageData, setEditMessageData] = useState(null);
  const [editMessage, setEditMessage] = useState(false);

  useEffect(() => {
    setEditMessageData({...props.messageData})
  },[])

  const deleteMessage = () => {
    props.deleteMessage(props.messageData.id)
  }
  const editMessage = () => {
    props.editMessage(props.messageData.id)
  }

  useEffect(() => {
    if (props.messageData.video_link) {
        setVideoLinkFormatted("https://www.youtube.com/embed/" + formatVideoUrl(props.messageData.video_link))
    }
  },[])

const formatVideoUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}

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
            <span className = "edit-msg-btn" onClick = {editMessage}>
              <FontAwesomeIcon icon={faEdit} />
            </span> 
            <span className = "delete-msg-btn" onClick = {deleteMessage}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </span> 
         </div> : false}
      </div>
      <div className = "message-body">
        {props.messageData.body}
      </div>
        {props.messageData.message_image ? 
        <div className = "message-img">
          <img className = "message-img-file" src = {props.messageData.message_image.url} />
        </div> : false}
        {props.messageData.video_link ? 
        <div className = "message-video">
          <iframe className = "message-video-iframe" src={videoLinkFormatted} />
        </div> : false}
    </div>
  )
}

export default Message;
