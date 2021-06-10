import React, {useState, useEffect, useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faImage, faFileVideo } from '@fortawesome/free-solid-svg-icons'
import {faYoutube } from '@fortawesome/free-brands-svg-icons';
import { GiphyFetch } from '@giphy/js-fetch-api'
import {
    SearchBar, 
    SearchContext, 
    SearchContextManager, 
    SuggestionBar, 
    Grid, 
    Carousel,
    Gif
} from '@giphy/react-components'

const CreateMessage = (props) => {
    const [messageData, setMessageData] = useState({
        body: "",
        image: null,
        video: null
    });
    const [submitType, setSubmitType] = useState("text");
    const [giffy, setGiffy] = useState(null); //delete this

    useEffect(() => {
        window.scrollTo(0,document.body.scrollHeight);
      }, [submitType])

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

    const test = (gif,e) => {
        e.preventDefault();
        console.log(gif)
    }
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
    
    const gf = new GiphyFetch('gB3rscHDQDNmLTvDhqUmWDw1sli5qesi')
    const fetchGifs = (offset) => gf.trending({ offset, limit: 10 })
    // useEffect(() => { //delete this
    //     gf.gif("5QRmvfdoMKH4cemL4w")
    //     .then(response => {
    //         setGiffy(response.data);
    //     })
    //     .catch(error => console.log(error.message))
    // },[])
    useEffect(() => { //delete this
        gf.emoji()
        .then(response => {
            console.log(response)
            setGiffy(response.data[0])
        })
        .catch(error => console.log(error.message))
    },[])

    const SearchExperience = () => (
        <SearchContextManager apiKey={'gB3rscHDQDNmLTvDhqUmWDw1sli5qesi'}>
            <SearchExperienceComponents />
        </SearchContextManager>
    )

    const SearchExperienceComponents = () => {
        const { fetchGifs, searchKey } = useContext(SearchContext)
        return (
            <>
                <SearchBar />
                <SuggestionBar />
                <Carousel key={searchKey} columns={3} width={800} fetchGifs={fetchGifs} onGifClick={test} gifHeight={200} gutter={6} /> 
            </>
        )
    }
  
    return (
        <div className = "create-message container-fluid">
            <form className = "create-message-form row form-group d-flex align-items-center" onSubmit = {submitMessage}>
                <div className = "main-input col-md-8 form-group">
                    <input className = "message-text-input form-control form-control-lg" onChange = {handleMessageBody} name = "body" type = "text" value = {messageData["body"]} maxLength = "750"/>
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
                        <FontAwesomeIcon icon={faFileVideo} />{/*delete below*/}
                        {SearchExperience()}
                        {/* {giffy ? <Gif gif={giffy} onGifClick={test} width={200} />  
                        : false}      */}
                        {/* also maybe i should add emojis/stickers (i dont think it would bethat hard/time consuming) */}
                        {/* <iframe width = "300" height = "300" src = {"https://giphy.com/embed/5QRmvfdoMKH4cemL4w"} /> delete this */} 
                        {/* <Carousel fetchGifs={fetchGifs} onGifClick={test} gifHeight={200} gutter={6} /> */}
                    </span>
                    <div className = "row">
                    {submitType === "image" ? 
                        <div className = "form-group col-md-12">
                            <input className = "form-control" name = "image" type="file" accept="image/*" multiple={false} onChange={onImageChange} /> 
                            <button className = "remove-link-btn btn btn-danger"  onClick = {addTextSubmit} > Cancel </button>
                        </div> 
                    : submitType === "video" ? 
                        <div className = "form-group col-md-12">
                            <input className = "form-control" name = "video" type="text" onChange={onVideoLinkChange} placeholder = {"Post a valid youtube link"}/>
                            <button className = "remove-link-btn btn btn-danger" onClick = {addTextSubmit} > Cancel </button>  
                        </div> 
                    : false}
                    </div>

                </span>
            </form>
        </div>
    )
}

export default CreateMessage;