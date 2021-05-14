import React from "react";
import Message from "./Message";

const MessageFeed = (props) => {
  return (
    <div>
        {props.channelMessageData.map((messageData) => {
           return (
             <div className = "channel-message" key = {"m" + messageData.id}> 
               <Message messageData = {messageData} />
             </div>
           )
         })}
    </div>
  )
}


export default MessageFeed;