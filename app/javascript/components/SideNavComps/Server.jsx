import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-regular-svg-icons'

const Server = (props) => {

  return (
      <div className = "server-feed-item">
        <NavLink to = {`/server/${props.data.id}`}>
          <div>
            {/* props.serverData.server_image ? <FontAwesomeIcon icon = {faCircle} /> : <img src = {props.serverData.server_image} />*/}
            <FontAwesomeIcon icon = {faCircle} size = "3x"/> 
          </div>
          <div>
            {props.data.name}
          </div>
        </NavLink>
      </div>
  )
}


export default Server;