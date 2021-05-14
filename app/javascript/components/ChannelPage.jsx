import React, {useState, useEffect} from "react";
import MessageFeed from "./MessageFeed";
import CreateMessage from "./CreateMessage";

const ChannelPage = (props) => {
    const [channelData, setChannelData] = useState(null);

    useEffect(() => {
        getChannelData();
    }, [])
    
    useEffect(() => {
      window.scrollTo(0,document.body.scrollHeight);
    })

    // this will keep refreshing messagefeed for new messages
    // useEffect(() => {
    //     const refresher = setTimeout(() => {
    //         getChannelData();
    //       }, 1000);
    //       return () => clearTimeout(refresher);
    // })

    const getChannelData = () => {
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
            setChannelData(response)
          }
            )
          .catch((error) => console.log(error.message));
      }
    
  return (
      <div>
          ChannelPage
          {channelData ? <MessageFeed channelMessageData = {channelData.messages} /> : false }
          {channelData ? <CreateMessage channelId = {channelData.id} getChannelData = {getChannelData} /> : false}
      </div>
  )
}

export default ChannelPage;