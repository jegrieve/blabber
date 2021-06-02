import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'



const Message = (props) => {
  const [videoLinkFormatted, setVideoLinkFormatted] = useState(null);

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
        {props.currentUser && props.messageData.user_id === props.currentUser.id ?       
          <div className = "message-modifiers">
            <button onClick = {editMessage}>Edit</button> 
            <button onClick = {deleteMessage}>Delete</button> 
         </div> : false}
      </div>
      <div className = "message-body">
        {props.messageData.body}
      </div>
        {props.messageData.message_image ? 
        <div className = "message-img">
          <img src = {props.messageData.message_image.url} width = {200} height = {200}  />
        </div> : false}
        {props.messageData.video_link ? 
        <div className = "message-video">
          <iframe width="250" height="250" src={videoLinkFormatted} />
        </div> : false}
    </div>
  )
}

export default Message;