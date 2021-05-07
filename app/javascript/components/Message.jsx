import React from "react";

const Message = (props) => {
  return (
    <div>
        {props.messageData.body}
    </div>
  )
}


export default Message;