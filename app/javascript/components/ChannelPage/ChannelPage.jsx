import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import MessageFeed from "./MessageFeed";
import CreateMessage from "./CreateMessage";
import noMessagesImg from 'images/no_messages.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ChannelPage = (props) => {
    const [channelMessages, setChannelMessages] = useState(null);
    const [currentChannel, setCurrentChannel] = useState(null);
    const [messageLimit, setMessageLimit] = useState(10);

    useEffect(() => {
        getChannelMessages(true); 
    }, [messageLimit])

    useEffect(() => {
      if (!currentChannel || Number(props.match.params.id) !== currentChannel.id) {
          getCurrentChannel();
          setMessageLimit(10);
      }
    })

    useEffect(() => { 
      return (() => {
        props.setCurrentChannel(null)
      })
    },[])

    useEffect(() => {
      if (currentChannel) {
        props.setCurrentChannel(currentChannel)
        getChannelMessages();
        getChannelFeed();
      }
    }, [currentChannel])

    // useEffect(() => {
    //   if (currentChannel) {
    //     getChannelMessages();
    //     getChannelFeed();
    //   }
    // }, [currentChannel])

    // useEffect(() => {
    //   if (!props.currentServer && currentChannel) {
    //     getChannelFeed();
    //   }
    // })

    // useEffect(() => {
    //   if (channelMessages.length && channelMessages.length !== messageLimit) {
    //     if (channelMessages.length === messageLimit - 10) {
    //       handleLoadBtnNoMsgs();
    //       setMessageLimit(channelMessages.length);
    //     } else if (channelMessages.length < 10) {
    //       setMessageLimit(10 - channelMessages.length + channelMessages.length);
    //     } else {
    //       setMessageLimit(channelMessages.length); 
    //     }
    //   } 
    // }, [channelMessages])

    // useEffect(() => {
    //     const refresher = setTimeout(() => {
    //       console.log("refreshed")
    //         getChannelMessages(true);
    //       }, 1000);
    //       return () => clearTimeout(refresher);
    // })

    const handleLoadBtnNoMsgs = () => {
      document.getElementById("new-messages-alert").innerHTML = "No new messages";
    }

    const handleLoadBtnMsgs = () => {
      document.getElementById("new-messages-alert").innerHTML = "";
      document.getElementById("load-messages-btn").style.visibility = "hidden";
      setTimeout(() => {
        document.getElementById("load-messages-btn").style.visibility = "visible";
      }, 2000)
    }

    const getChannelFeed = () => {
      props.setCurrentServer(currentChannel.server)
    }

    const loadMoreMessages = () => { 
      handleLoadBtnMsgs();
      setMessageLimit(messageLimit + 10); 
    }

    const getCurrentChannel = () => {
      const id = props.match.params.id
      const url = `/api/v1/channels/show/${id}`;
  
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => {
          setCurrentChannel(response)
        }
          )
        .catch((error) => console.log(error.message));
    }

    const getChannelMessages = (noScroll) => {
        const id = props.match.params.id
        const url = `/api/v1/messages/index?channel_id=${id}&limit=${messageLimit}`;
    
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            if (response.length > 0) {
              setChannelMessages(response);
            } else {
              setChannelMessages([]);
            }
            if (noScroll !== true) {
              window.scrollTo(0,document.body.scrollHeight); 
            }
          }
            )
          .catch((error) => console.log(error.message));
      }
    
  return (
      <div>
          {channelMessages && channelMessages.length >= 10 ? 
              <div className = "load-more-messages-btn">
                <button id = "load-messages-btn" className = "btn btn-secondary" onClick = {loadMoreMessages}>Load More</button>
                <small id = "new-messages-alert" className="form-text red-text"></small>
                </div> 
              : false}
          {channelMessages && channelMessages.length > 0 ? 
            <MessageFeed currentUser= {props.currentUser} getChannelMessages = {getChannelMessages} channelMessageData = {channelMessages} /> 
          : channelMessages && channelMessages.length === 0 ? 
            <div className = "message-page d-flex align-items-center justify-content-center">
              <div>
                <img className = "message-page-empty-img" src = {noMessagesImg} width = {300} />
                <div className = "d-flex justify-content-center">
                  No Messages, start chatting!
                </div>
              </div>
            </div> : 
              <div className = "channelpage-spinner">
                <FontAwesomeIcon icon = {faSpinner} className = "fa-pulse" size = "9x" color = {"#f50057"}/>
              </div>
            } 
          {currentChannel && props.currentUser ? <CreateMessage messageLimit = {messageLimit} setMessageLimit = {setMessageLimit} channelId = {currentChannel.id} getChannelMessages = {getChannelMessages} /> : 
            props.currentUser ? 
            false :
            <div className = "tiny-padding-top">Please&nbsp; 
            <NavLink to = {`/sign-in`} >Sign In</NavLink>
            &nbsp;or&nbsp; 
            <NavLink to = {`/sign-up`} >Sign Up</NavLink>
            &nbsp;to send messages.</div>         
          }
      </div>
  )
}

export default ChannelPage;