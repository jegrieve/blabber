import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'



const Message = (props) => {
  return (
    <div className = "message-contents">
      <div className = "message-info d-flex align-items-center justify-content-around">
        <div className = "message-avatar">
        {/* {props.messageData.user.username} 
        eventually use link to img*/}
        <FontAwesomeIcon icon={faUserCircle} />
        </div>
        <div className = "message-username">
        {props.messageData.user.username}
        </div>
        <div>
          •
        </div>
        <div className = "message-time">
        {props.messageData.created_at}
        </div>
      </div>

      <div className = "message-body">
        {props.messageData.body}
      </div>
        {props.messageData.message_image ? <div className = "message-img">
          <img src = {props.messageData.message_image.url} width = {200} height = {200}  />
        </div> : false}
    </div>
  )
}

export default Message;