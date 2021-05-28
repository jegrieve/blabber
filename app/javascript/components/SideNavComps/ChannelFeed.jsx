import React from "react";
import { NavLink } from "react-router-dom";
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
        <NavLink to = {"/"}>
          Return to servers
        </NavLink>
          {serverChannels.map((channelData) => {
           return (
             <div key = {"c" + channelData.id}> 
               <Channel data = {channelData} />
             </div>
           )
         })}
          <div>
            <NavLink to = {"/create-new-channel"}>
              <button>Create Channel</button>
            </NavLink>
          </div>
      </div>
  )
}


export default ChannelFeed;