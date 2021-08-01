import React from "react";
import Message from "./Message";
import { GiphyFetch } from '@giphy/js-fetch-api';

const MessageFeed = (props) => {

  const editMessage = (messageId, editMessageData) => {
    if (editMessageData.message_image) {
      editMessageImg(messageId, editMessageData);
    } else {
      editMessageNoImg(messageId, editMessageData);
    }
  }

  const deleteMessage = (messageId) => {
    const url = `/api/v1/messages/destroy/${messageId}`;
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

  const editMessageImg = (messageId, editMessageData) => {
    const formData =  new FormData();
    formData.append('body', editMessageData["body"]);
    formData.append('message_image', editMessageData["message_image"]);
    const url = `/api/v1/messages/update/${messageId}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
    method: "PATCH",
    body: formData,
    headers: {
    "X-CSRF-Token": token, 
  },
})
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error("Network response was not ok.");
    })
    .then(response => {
        props.getChannelMessages()
    })
    .catch(error => console.log(error.message))
  }

  const editMessageNoImg = (messageId, editMessageData) => {
    const body = {
      body: editMessageData["body"],
      video_link: editMessageData["video_link"]
  }
    const url = `/api/v1/messages/update/${messageId}`;
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
      props.getChannelMessages()
  })
  .catch(error => console.log(error.message))
  }

  const formatVideoUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}

  const gf = new GiphyFetch('gB3rscHDQDNmLTvDhqUmWDw1sli5qesi')

  return (
    <div className = "message-page">
        {props.channelMessageData.map((messageData) => {
          if (messageData.video_link) {
            messageData.video_link =  "https://www.youtube.com/embed/" + formatVideoUrl(messageData.video_link)
          }
          return (
            <div className = "channel-message" key = {"m" + messageData.id}> 
              <Message currentUser = {props.currentUser} messageData = {messageData} deleteMessage = {deleteMessage} editMessage = {editMessage} fetchGif = {gf} /> 
            </div>
          )
        })}
    </div>
  )
}

export default MessageFeed;