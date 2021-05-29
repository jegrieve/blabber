import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import Channel from "./Channel"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

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
        } else if (offsetNum >= 15){
          setOffsetNum(offsetNum - 15);
        }
      })
      .catch((error) => console.log(error.message));
  }

  const decrementOffsetNum = () => {
    if (offsetNum >= 15) {
      setOffsetNum(offsetNum - 15)
    } 
  }

  const incrementOffsetNum = () => {
      setOffsetNum(offsetNum + 15)
  }
  
  return (
      <div>
        <div>
          Channels
        </div>
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
            <FontAwesomeIcon icon = {faPlusCircle} /> 
          </NavLink>
         </div>
          <div>
            <div className = "chevron-btn" onClick = {decrementOffsetNum}>
              <FontAwesomeIcon icon = {faChevronLeft} /> 
            </div>
            <div className = "chevron-btn" onClick = {incrementOffsetNum}>
              <FontAwesomeIcon icon = {faChevronRight} /> 
            </div> 
          </div>
      </div>
  )
}


export default ChannelFeed;