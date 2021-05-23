import React from "react";
import Message from "./Message";

const MessageFeed = (props) => {
  const deleteMessage = (e) => {
    const url = `/api/v1/messages/destroy/${e.target.id}`;
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
        props.getChannelMessages();
      })
      .catch(error => console.log(error.message));
  }

  return (
    <div>
        {props.channelMessageData.map((messageData) => {
           return (
             <div className = "channel-message" key = {"m" + messageData.id}> 
                {props.currentUser && messageData.user_id === props.currentUser.id ?       
                  <div className = "message-delete">
                    <button id = {messageData.id} onClick = {deleteMessage}>Delete</button> {/* change id eventually */}
                  </div> : false}
               <Message messageData = {messageData} />
             </div>
           )
         })}
    </div>
  )
}


export default MessageFeed;