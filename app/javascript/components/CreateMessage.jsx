import React, {useState, useEffect} from "react";

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

    const changeSubmitType = (e) => {
        e.preventDefault();
        if (e.target.id === "add-img-btn") {
            setSubmitType("image")
        } else if (e.target.id === "add-video-btn") {
            setSubmitType("video")
        } else {
            setSubmitType("text")
        }
    }


    return (
        <div>
            <form onSubmit = {submitMessage}>
                <input onChange = {handleMessageBody} name = "body" type = "text" value = {messageData["body"]} />
                <span>
                    <button id = "add-img-btn" onClick = {changeSubmitType} >Add Image</button>
                    <span>or</span>
                    <button id = "add-video-btn" onClick = {changeSubmitType} >Add Video</button>
                    {submitType === "image" ? 
                        <div>
                            <input name = "image" type="file" accept="image/*" multiple={false} onChange={onImageChange} /> 
                            <button id = "remove-link-btn" onClick = {changeSubmitType} > Cancel (X) </button>
                        </div> 
                    : submitType === "video" ? 
                        <div>
                            <input name = "video" type="text" onChange={onVideoLinkChange} />
                            <button id = "remove-link-btn" onClick = {changeSubmitType} > Cancel (X) </button>  
                        </div> 
                    : false}
                    <button>Post</button>
                </span>
            </form>
        </div>
    )
}

export default CreateMessage;