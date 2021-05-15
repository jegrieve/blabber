import React, {useState, useEffect} from "react";
import MessageFeed from "./MessageFeed";
import CreateMessage from "./CreateMessage";

const ChannelPage = (props) => {
    const [channelMessages, setChannelMessages] = useState(null);
    const [currentChannelId, setCurrentChannelId] = useState(null);

    useEffect(() => {
      if (props.match.params.id !== currentChannelId) {
        setCurrentChannelId(props.match.params.id);
      }
    })

    useEffect(() => {
        getChannelMessages();
    }, [currentChannelId])

    useEffect(() => {
      window.scrollTo(0,document.body.scrollHeight);
    }, [channelMessages])

    // this will keep refreshing messagefeed for new messages
    // useEffect(() => {
    //     const refresher = setTimeout(() => {
    //         getChannelMessages();
    //       }, 15000);
    //       return () => clearTimeout(refresher);
    // })

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
          ChannelPage
          {/* put the channelpage data here plus the messagefeed and create message*/}
          {channelMessages ? <MessageFeed channelMessageData = {channelMessages} /> : false }
          {channelMessages ? <CreateMessage channelId = {currentChannelId} getChannelMessages = {getChannelMessages} /> : false}
      </div>
  )
}

export default ChannelPage;