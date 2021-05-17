import React, {useState, useEffect} from "react";

const CreateMessage = (props) => {
    const [messageData, setMessageData] = useState({
        body: "",
        image: null
    });

    const submitMessageData = (e) => {
        e.preventDefault();
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

    const onImageChange = (e) => {
        setMessageData((prev) => ({
            ...prev,
            image: e.target.files[0]
        }))
    };

    return (
        <div>
            <form onSubmit = {submitMessageData}>
                <input onChange = {handleMessageBody} name = "body" type = "text" value = {messageData["body"]} />
                <input type="file" accept="image/*" multiple={false} onChange={onImageChange} />
                <button>Post</button>
            </form>
        </div>
    )
}


export default CreateMessage;

