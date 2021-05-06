import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import Channel from "./Channel"
const ChannelFeed = (props) => {
  const [serverChannels, setServerChannels] = useState([]);

  useEffect(() => {
    getServerData();
  }, [])

  const getServerChannels = (serverData) => {
    setServerChannels(serverData.channels)
  }
  
  const getServerData = () => {
    const id = props.currentServer.id
    const url = `/api/v1/servers/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        getServerChannels(response)
      }
        )
      .catch((error) => console.log(error.message));
  }

  return (
      <div>
          {serverChannels.map((channelData) => {
           return (
             <div key = {channelData.id}> 
               <Channel data = {channelData} />
             </div>
           )
         })}
      </div>
  )
}


export default ChannelFeed;