import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'



const Message = (props) => {
  return (
    <div>
      <div className = "message-avatar">
        {/* {props.messageData.user.username} 
        eventually use link to img*/}
        <FontAwesomeIcon icon={faUserCircle} />
      </div>
      <div className = "message-username">
        {props.messageData.user.username}
      </div>
      <div className = "message-body">
        {props.messageData.body}
      </div>
      <div className = "message-time">
        {props.messageData.created_at}
      </div>
    </div>
  )
}


export default Message;