import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faImage, faFileVideo } from '@fortawesome/free-solid-svg-icons'
import {faYoutube } from '@fortawesome/free-brands-svg-icons';

const CreateMessage = (props) => {
    const [messageData, setMessageData] = useState({
        body: "",
        image: null,
        video: null
    });
    const [submitType, setSubmitType] = useState("text");

    const submitMessage = (e) => {
        e.preventDefault();
        if (submitType === "text" || submitType === "video") {
            submitMessageDataNoImage()
        } else {
            submitMessageDataWithImage()
        }
    }

    const submitMessageDataNoImage = () => {
        const body = {
            body: messageData["body"],
            video_link: messageData["video"]
        }
        const url = `/api/v1/messages/create/${props.channelId}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
        method: "POST",
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

    const submitMessageDataWithImage = () => {
        const formData =  new FormData();
        formData.append('body', messageData["body"]);
        formData.append('message_image', messageData["image"]);
        const url = `/api/v1/messages/create/${props.channelId}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
        method: "POST",
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

    const handleMessageBody = (e) => {
        setMessageData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    
    const onVideoLinkChange = (e) => {
        setMessageData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const onImageChange = (e) => {
        setMessageData((prev) => ({
            ...prev,
            image: e.target.files[0]
        }))
    };

    const addImgSubmit = () => {
        setSubmitType("image")
    }
    const addVideoSubmit = () => {
        setSubmitType("video")
    }
    const addGifSubmit = () => {
        //setSubmitType("gif")
    }
    const addTextSubmit = () => {
        setSubmitType("text")
    }


    return (
        <div className = "create-message container-fluid">
            <form className = "create-message-form row form-group d-flex align-items-center" onSubmit = {submitMessage}>
                <div className = "main-input col-md-8 form-group">
                    <input className = "message-text-input form-control form-control-lg" onChange = {handleMessageBody} name = "body" type = "text" value = {messageData["body"]} />
                </div>
                <span className = "extra-inputs col-md-4">
                    <button type = "submit" className = "message-post-btn">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                    <span id = "add-img-btn" className = "extra-input-btn" onClick = {addImgSubmit}>
                        <FontAwesomeIcon icon={faImage} />
                    </span>
                    <span id = "add-video-btn" className = "extra-input-btn" onClick = {addVideoSubmit}>
                        <FontAwesomeIcon icon={faYoutube} />
                    </span>
                    <span id = "add-gif-btn" className = "extra-input-btn" onClick = {addGifSubmit}>
                        <FontAwesomeIcon icon={faFileVideo} />
                    </span>
                    {/* <button id = "add-img-btn" onClick = {changeSubmitType} >Image</button>
                    <button id = "add-video-btn" onClick = {changeSubmitType} >Video</button> */}
                    {/* <button id = "add-gif-btn" onClick = {changeSubmitType} >Gif</button> */}
                    {submitType === "image" ? 
                        <div className = "form-group">
                            <input className = "form-control" name = "image" type="file" accept="image/*" multiple={false} onChange={onImageChange} /> 
                            <button id = "remove-link-btn" onClick = {addTextSubmit} > Cancel (X) </button>
                        </div> 
                    : submitType === "video" ? 
                        <div className = "form-group">
                            <input className = "form-control" name = "video" type="text" onChange={onVideoLinkChange} />
                            <button id = "remove-link-btn" onClick = {addTextSubmit} > Cancel (X) </button>  
                        </div> 
                    : false}
                </span>
            </form>
        </div>
    )
}

export default CreateMessage;