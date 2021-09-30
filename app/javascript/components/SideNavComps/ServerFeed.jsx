import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import Server from "./Server";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faPlusCircle, faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ServerFeed = (props) => {
  const [loadedServers, setLoadedServers] = useState(null);
  const [offsetNum, setOffsetNum] = useState(0);
  const [loadFavouriteServers, setLoadFavouriteServers] = useState(false);

console.log(loadedServers)
console.log(offsetNum)

  useEffect(() => {
    getServers();
  }, [offsetNum])

  useEffect(() => {
      setLoadedServers(null);
      if (offsetNum === 0) {
        getServers();
      } else {
        setOffsetNum(0);
      }
  }, [loadFavouriteServers])

  const getServers = () => {
    const url = `/api/v1/servers/index?offset_num=${offsetNum}&favourite_servers=${loadFavouriteServers}`;
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
        } else if (response.length === 0 ) {
          setLoadedServers([])
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

  const toggleFavourites = () => {
    if (props.currentUser) {
      setLoadFavouriteServers(!loadFavouriteServers)
    }
  }

  return (
      <div>
        <div className = "servers-title">
          <span className = "title-padded">
            Servers
          </span>
          {!loadFavouriteServers ? <span className = "toggle-fav-btn" onClick = {toggleFavourites}> <FontAwesomeIcon icon = {faStar} color = "yellow"/></span> 
          : <span className = "toggle-fav-btn" onClick = {toggleFavourites}> <FontAwesomeIcon icon = {faStarSolid} color = "yellow"/></span>}
        </div>
        {loadedServers && loadedServers.length ? loadedServers.map((serverData) => {
           return (
             <div className = "server-item" key = {"s" + serverData.id}> 
               <Server data = {serverData} />
             </div>
           )
         }) : loadedServers === null ?
          <div className = "serverfeed-spinner">
            <FontAwesomeIcon icon = {faSpinner} className = "fa-pulse" size = "3x" />
          </div> : <div>No servers.</div>}
          <div className = "server-feed-nav-elements">
            <div className = "chevron-btn" id = "server-decrement" onClick = {decrementOffsetNum}>
              <FontAwesomeIcon icon = {faChevronLeft} size = "2x" color = {"white"} /> 
            </div>
          <div className = "server-feed-add-server">
            <NavLink to = {"/create-new-server"}>
              <FontAwesomeIcon icon = {faPlusCircle} size = "2x" color = {"#f50057"} /> 
            </NavLink>
          </div>
            <div className = "chevron-btn" id = "server-increment" onClick = {incrementOffsetNum}>
              <FontAwesomeIcon icon = {faChevronRight} size = "2x" color = {"white"} /> 
            </div> 
          </div>
      </div>
  )
}

export default ServerFeed;