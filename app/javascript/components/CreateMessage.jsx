import React, {useState, useEffect, useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faImage, faFileVideo, faSmileWink } from '@fortawesome/free-solid-svg-icons'
import {faYoutube } from '@fortawesome/free-brands-svg-icons';
import { GiphyFetch } from '@giphy/js-fetch-api'
import {
    SearchBar, 
    SearchContext, 
    SearchContextManager, 
    SuggestionBar, 
    Carousel
} from '@giphy/react-components';
import Picker from 'emoji-picker-react';
//fix glitch where canceling the gif input will put the emoji input instead.
const CreateMessage = (props) => {
    const [messageData, setMessageData] = useState({
        body: "",
        image: null,
        video: "",
        gif: ""
    });
    const [submitType, setSubmitType] = useState("text");
    const [gifData, setGifData] = useState({
        title: "",
        id: ""
    });
    const [emojiInput, setEmojiInput] = useState(null);

    useEffect(() => {
        if (emojiInput && emojiInput !== true) {
            console.log(messageData.body)
            setMessageData((prev) => ({
                ...prev,
                body: messageData.body + emojiInput.emoji
            }))
        }
    }, [emojiInput])

    useEffect(() => {
        window.scrollTo(0,document.body.scrollHeight);
        if (submitType === "text") {
            setMessageData((prev) => ({
                ...prev,
                video: ""
            }))
        } else {
            setEmojiInput(null);
        }
      }, [submitType])

      useEffect(() => {
        setMessageData((prev) => ({
            ...prev,
            gif: gifData["id"]
        }))
      }, [gifData])

      useEffect(() => {
          if (!messageData.body && !messageData.image && !messageData.video && !messageData.gif) {
            props.getChannelMessages();
          }
      }, [messageData])

      const onEmojiClick = (event, emojiObject) => {
        setEmojiInput(emojiObject);
      };

      const handleSuccessfulPost = () => {
          setMessageData({
            body: "",
            image: null,
            video: "",
            gif: ""
            })
      }

    const submitMessage = (e) => {
        e.preventDefault();
        if (submitType === "text" || submitType === "video") {
            submitMessageDataNoImage()
        } else if (submitType === "gif") {
            submitMessageDataGif();
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
            handleSuccessfulPost();
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
            handleSuccessfulPost();
        })
        .catch(error => console.log(error.message))
    }

    const submitMessageDataGif = () => {
        const body = {
            body: messageData["body"],
            gif: messageData["gif"]
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
            handleSuccessfulPost();
        })
        .catch(error => console.log(error.message))
    };

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

    const onGifChange = (e) => {
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

    const handleGifClick = (gif,e) => {
        e.preventDefault();
        setGifData(gif);
    }
    const addImgSubmit = () => {
        setSubmitType("image")
    }
    const addVideoSubmit = () => {
        setSubmitType("video")
    }
    const addGifSubmit = () => {
        setSubmitType("gif")
    }
    const addTextSubmit = () => {
        setSubmitType("text")
    }

    const bringUpEmojiInput = () => {
        setEmojiInput(true);
    }

    const removeEmojiInput = () => {
        setEmojiInput(null);
    }

    const SearchExperience = () => (
        <SearchContextManager apiKey={'gB3rscHDQDNmLTvDhqUmWDw1sli5qesi'}>
            <SearchExperienceComponents />
        </SearchContextManager>
    )

    const SearchExperienceComponents = () => {
        const { fetchGifs, searchKey } = useContext(SearchContext)
        return (
            <>
                <div className = "search-gif">
                    <SearchBar />
                </div>
                <div className = "search-suggestion">
                    <SuggestionBar />
                </div>
                <div className = "search-carousel">
                    <Carousel key={searchKey} columns={3} width={800} fetchGifs={fetchGifs} onGifClick={handleGifClick} gifHeight={200} gutter={6} /> 
                </div>
            </>
        )
    }
  
    return (
        <div className = "create-message container-fluid">
            <form className = "create-message-form row form-group d-flex align-items-start" onSubmit = {submitMessage}>
                <div className = "main-input col-md-8 form-group">
                    <textarea className = "message-text-input form-control form-control-lg" onChange = {handleMessageBody} name = "body" type = "text" value = {messageData["body"]} rows="3" maxLength = "750" />
                    {/* <input className = "message-text-input form-control form-control-lg" onChange = {handleMessageBody} name = "body" type = "text" value = {messageData["body"]} maxLength = "750"/> */}
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
                    <span id = "add-emoji-btn" className = "extra-input-btn" onClick = {bringUpEmojiInput}>
                        <FontAwesomeIcon icon={faSmileWink} />
                    </span>
                    <div className = "row">
                    {submitType === "image" ? 
                        <div className = "form-group col-md-12">
                            <input className = "form-control" name = "image" type="file" accept="image/*" multiple={false} onChange={onImageChange} /> 
                            <button className = "remove-link-btn btn btn-danger"  onClick = {addTextSubmit} > Cancel </button>
                        </div> 
                    : submitType === "video" ? 
                        <div className = "form-group col-md-12">
                            <input className = "form-control" name = "video" type="text" onChange={onVideoLinkChange} placeholder = {"Post a valid youtube link"} value = {messageData['video']}/>
                            <button className = "remove-link-btn btn btn-danger" onClick = {addTextSubmit} > Cancel </button>  
                        </div> 
                    : submitType === "gif" ?
                        <div className = "form-group col-md-12">
                            <input className = "form-control" name = "gif" type="text" onChange={onGifChange} placeholder = {"Selected Gif Title"} value = {gifData['title']} disabled />
                            {SearchExperience()}
                            <button className = "remove-link-btn btn btn-danger" onClick = {addTextSubmit} > Cancel </button>  
                        </div>
                    : emojiInput ? 
                        <div className = "col-md-12">
                            <Picker onEmojiClick = {onEmojiClick} />
                            <button className = "remove-link-btn btn btn-danger" onClick = {removeEmojiInput} > Exit </button>  
                        </div>
                    : false}
                    </div>
                </span>
            </form>
        </div>
    )
}

export default CreateMessage;