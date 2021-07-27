import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-regular-svg-icons'

const Server = (props) => {
  return (
      <div className = "server-feed-item">
        <NavLink to = {`/server/${props.data.id}`} >
          <div className = "server-img-container">
            {props.data.server_image ? 
            <img className = "server-sidenav-img" src = {props.data.server_image.url}/> 
            : 
            <div className = "server-img-container">
              <FontAwesomeIcon icon = {faCircle} size = "3x" />
            </div>
             }
          </div>
          <div className = "server-name">
            {props.data.name}
          </div>
        </NavLink>
      </div>
  )
}


export default Server;
