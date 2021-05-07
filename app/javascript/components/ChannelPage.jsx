import React, {useState, useEffect} from "react";
import MessageFeed from "./MessageFeed";
const ChannelPage = (props) => {
    const [channelData, setChannelData] = useState(null);
    console.log(channelData);
    useEffect(() => {
        getChannelData();
    }, [])

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
          {/* <MessageCreate /> */}
      </div>
  )
}


export default ChannelPage;