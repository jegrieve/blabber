import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import Server from "./Server";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faPlus} from '@fortawesome/free-solid-svg-icons'

const ServerFeed = (props) => {
  const [loadedServers, setLoadedServers] = useState([]);
  const [offsetNum, setOffsetNum] = useState(0);

console.log(loadedServers)
console.log(offsetNum)

  useEffect(() => {
    getServers();
  }, [offsetNum])

  const getServers = () => {
    const url = `/api/v1/servers/index?offset_num=${offsetNum}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        if (response.length > 0) {
          setLoadedServers(response)
        } else if (offsetNum >= 5) {
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
        <div className = "servers-title">
          Servers
        </div>
        {loadedServers.length ? loadedServers.map((serverData) => {
           return (
             <div className = "server-item" key = {serverData.id}> 
               <Server data = {serverData} />
             </div>
           )
         }) : false}
          <div className = "server-feed-nav-elements">
            <div className = "chevron-btn" id = "server-decrement" onClick = {decrementOffsetNum}>
              <FontAwesomeIcon icon = {faChevronLeft} size = "2x"/> 
            </div>
          <div className = "server-feed-add-server">
            <NavLink to = {"/create-new-server"}>
              <FontAwesomeIcon icon = {faPlus} size = "2x" /> 
            </NavLink>
          </div>
            <div className = "chevron-btn" id = "server-increment" onClick = {incrementOffsetNum}>
              <FontAwesomeIcon icon = {faChevronRight} size = "2x"/> 
            </div> 
          </div>
      </div>
  )
}

export default ServerFeed;