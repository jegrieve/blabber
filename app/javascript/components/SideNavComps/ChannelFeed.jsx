import React from "react";
import { useEffect, useState } from "react/cjs/react.development";

const ChannelFeed = (props) => {
  const [serverChannels, setServerChannels] = useState(null);

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
          ChannelFeed
          {console.log(serverChannels)}
      </div>
  )
}


export default ChannelFeed;