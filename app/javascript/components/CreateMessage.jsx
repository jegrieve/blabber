import React, {useState, useEffect} from "react";

const CreateMessage = (props) => {
    const [messageData, setMessageData] = useState("");

    const submitMessageData = (e) => {
        e.preventDefault();
        const body = {
            body: messageData,
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
            props.getChannelData()
            // props.setLoadedFeedComments(false);
            //deal with this next to reload
            //feed once posted/ in general

            //when we get a response we can just
            //call a method on the channelpage
            //to api call to get new messages
            //instead of doing anything with
            //the response
        })
        .catch(error => console.log(error.message))
    }

    const changeMessageData = (e) => {
        setMessageData(e.target.value)
    }

    return (
        <div>
            <form onSubmit = {submitMessageData}>
                <input onChange = {changeMessageData} type = "text" value = {messageData} />
                <button>Post</button>
            </form>
        </div>
    )
}


export default CreateMessage;

