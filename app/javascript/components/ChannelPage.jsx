import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import MessageFeed from "./MessageFeed";
import CreateMessage from "./CreateMessage";

const ChannelPage = (props) => {
    const [channelMessages, setChannelMessages] = useState([]);
    const [currentChannel, setCurrentChannel] = useState(null);
    const [messageLimit, setMessageLimit] = useState(10);

    useEffect(() => {
        getChannelMessages(); 
    }, [messageLimit])

    useEffect(() => {
      if (!currentChannel || Number(props.match.params.id) !== currentChannel.id) {
          getCurrentChannel();
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
      }
    }, [currentChannel])

    useEffect(() => {
      if (currentChannel) {
        getChannelMessages();
      }
    }, [currentChannel])

    useEffect(() => {
      if (!props.currentServer && currentChannel) {
        getChannelFeed();
      }
    })

    useEffect(() => {
      if (channelMessages.length && channelMessages.length !== messageLimit) {
        if (channelMessages.length === messageLimit - 10) {
          handleLoadBtnNoMsgs();
          setMessageLimit(channelMessages.length);
        } else if (channelMessages.length < 10) {
          setMessageLimit(10 - channelMessages.length + channelMessages.length);
        } else {
          setMessageLimit(channelMessages.length); 
        }
      } 
    }, [channelMessages])


    //so basically only if you post a message should it go down, otherwise stay up...
    // useEffect(() => {
    //   window.scrollTo(0,document.body.scrollHeight); //***8/4/21 --> make this scrollup when loadmore is clicked. */
    // }, [channelMessages])

    // useEffect(() => {
    //   window.scrollTo(0,document.body.scrollHeight); //so the problem here is this is fine.. but when loadmore is clicked go up instead...
    // }, [channelMessages])
    //so im thinking only when u create/edit/delete emssages u make it pop down/ on first messagepage load/channel change
    //but then when u click load more dont do it.

    // this will keep refreshing messagefeed for new messages
    // useEffect(() => {
    //     const refresher = setTimeout(() => {
    //         getChannelMessages();
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

    const getChannelMessages = () => {
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
            console.log(response)
            setChannelMessages(response)
          }
            )
          .catch((error) => console.log(error.message));
      }
    
  return (
      <div>
          {/* put the channelpage data here plus the messagefeed and create message*/}
          {/* so i need to load messagefeed with createmessage at the sametime cause im getting
          a weird looking page where the createmessage stuff loads before the messagefeed then its normal */}
          {channelMessages.length >= 10 ? 
              <div className = "load-more-messages-btn">
                <button id = "load-messages-btn" className = "btn btn-secondary" onClick = {loadMoreMessages}>Load More</button>
                <small id = "new-messages-alert" className="form-text red-text"></small>
                </div> 
              : false}
          {channelMessages.length ? <MessageFeed currentUser= {props.currentUser} getChannelMessages = {getChannelMessages} channelMessageData = {channelMessages} /> : false }
          {currentChannel && props.currentUser ? <CreateMessage messageLimit = {messageLimit} setMessageLimit = {setMessageLimit} channelId = {currentChannel.id} getChannelMessages = {getChannelMessages} /> : 
            props.currentUser ? 
            <button type = "submit" className = "btn btn-success">Create</button>:
            <div className = "tiny-padding-top">Please 
            <NavLink to = {`/sign-in`} > Sign In </NavLink>
             or 
            <NavLink to = {`/sign-up`} > Sign Up </NavLink>
             to send messages.</div>         
          }
      </div>
  )
}

export default ChannelPage;