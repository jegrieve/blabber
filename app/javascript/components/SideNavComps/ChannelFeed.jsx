import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import Channel from "./Channel"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faPlus, faArrowLeft, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

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
        } else if (offsetNum >= 5){
          setOffsetNum(offsetNum - 5);
        }
      })
      .catch((error) => console.log(error.message));
  }

  const decrementOffsetNum = () => {
    if (offsetNum >= 5) {
      setOffsetNum(offsetNum - 5)
    } 
  }

  const incrementOffsetNum = () => {
      setOffsetNum(offsetNum + 5)
  }
  
  return (
      <div>
        <div className = "channels-title">
          <div>
          <NavLink to = {`/`}>
            <FontAwesomeIcon icon = {faArrowLeft} />
          </NavLink>
          </div>
          <NavLink to = {`/server/${props.currentServer.id}`}>
            {props.currentServer.name}'s channels
          </NavLink>
        </div>
        {serverChannels ? 
          <div>
          {serverChannels.map((channel) => {
           return (
             <div className = "channel-item" key = {"c" + channel.id}> 
               <FontAwesomeIcon icon = {faCircleNotch} color = {`${channel.colour}`}/>
               <Channel data = {channel} />
             </div>
           )
         })}
          </div> : false}
          <div className = "channel-feed-nav-elements">
            <div className = "chevron-btn" onClick = {decrementOffsetNum}>
              <FontAwesomeIcon icon = {faChevronLeft} size = "2x" /> 
            </div>
            <div className = "channel-feed-add-channel">
            <NavLink to = {"/create-new-channel"}>
              <FontAwesomeIcon icon = {faPlus} size = "2x" /> 
            </NavLink>
            </div>
            <div className = "chevron-btn" onClick = {incrementOffsetNum}>
              <FontAwesomeIcon icon = {faChevronRight} size = "2x" /> 
            </div> 
          </div>
      </div>
  )
}

export default ChannelFeed;