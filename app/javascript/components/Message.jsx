import React from "react";

const Message = (props) => {
  return (
    <div>
      <div className = "message-avatar">
        {/* {props.messageData.user.username} 
        eventually use link to img*/}
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