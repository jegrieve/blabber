import React, {useState, useEffect} from "react";
import MessageFeed from "./MessageFeed";
import CreateMessage from "./CreateMessage";

const ChannelPage = (props) => {
    const [channelMessages, setChannelMessages] = useState(null);
    const [currentChannel, setCurrentChannel] = useState(null);
 
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

    // useEffect(() => {
    //   window.scrollTo(0,document.body.scrollHeight);
    // }, [channelMessages])

    // this will keep refreshing messagefeed for new messages
    // useEffect(() => {
    //     const refresher = setTimeout(() => {
    //         getChannelMessages();
    //       }, 15000);
    //       return () => clearTimeout(refresher);
    // })

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
        const url = `/api/v1/messages/index?channel_id=${id}`;
    
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
          {channelMessages ? <MessageFeed currentUser= {props.currentUser} getChannelMessages = {getChannelMessages} channelMessageData = {channelMessages} /> : false }
          {currentChannel ? <CreateMessage channelId = {currentChannel.id} getChannelMessages = {getChannelMessages} /> : false}
      </div>
  )
}

export default ChannelPage;