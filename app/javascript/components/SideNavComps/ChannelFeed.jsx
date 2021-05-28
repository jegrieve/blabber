import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import Channel from "./Channel"
const ChannelFeed = (props) => {
  const [currentServer, setCurrentServer] = useState(null);
  const [serverChannels, setServerChannels] = useState(null); 
  const [offsetNum, setOffsetNum] = useState(0);

  useEffect(() => {
    getCurrentServer();
  }, [offsetNum])

  useEffect(() => {
    if (currentServer) {
      getServerChannels();
    }
  }, [currentServer])
  
  const getCurrentServer = () => {
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
        setCurrentServer(response);
      }
        )
      .catch((error) => console.log(error.message));
  }

  const getServerChannels = () => {
    const id = props.currentServer.id
    const url = `/api/v1/channels/index?server_id=${id}&offset_num=${offsetNum}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        if (response.length > 0) {
          setServerChannels(response)
        } else {
          setOffsetNum(offsetNum - 15);
        }
      })
      .catch((error) => console.log(error.message));
  }


  const handleOffsetNum = (e) => {
    if (e.target.id === "channel-decrement" && offsetNum >= 15) {
      setOffsetNum(offsetNum - 15)
    } else if (e.target.id === "channel-increment") {
      setOffsetNum(offsetNum + 15)
    }
  }

  return (
      <div>
        <NavLink to = {"/"}>
          Return to servers
        </NavLink>
        {serverChannels ? 
          <div>
          {serverChannels.map((channel) => {
           return (
             <div key = {"c" + channel.id}> 
               <Channel data = {channel} />
             </div>
           )
         })}
          </div> : false}

          <div>
            <NavLink to = {"/create-new-channel"}>
              <button>Create Channel</button>
            </NavLink>
          </div>
          <div>
            <button id = "channel-decrement" onClick = {handleOffsetNum}>Left</button>
            <button id = "channel-increment" onClick = {handleOffsetNum}>Right</button> 
          </div>
      </div>
  )
}


export default ChannelFeed;