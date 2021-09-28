import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-regular-svg-icons'
import { faServer, faCircleNotch, faUsers } from '@fortawesome/free-solid-svg-icons'

const ShowServerData = (props) => {
  return (
      <div>
          <div className = "page-title">
            <span className = "title-icon">
              <FontAwesomeIcon icon = {faServer} color = "#f50057"/>
            </span>
            {props.serverData.name}
            </div>
            <div className = "row server-padding-top">
              <div className = "col-6 page-centered">
              <div className = "server-data">
            {props.serverData.server_image ? 
              <div className = "server-image">
                  <img src = {props.serverData.server_image.url} width = {450} />
              </div> 
              :
              <div className = "server-placeholder-img">
                <FontAwesomeIcon icon = {faComments} size = "6x" color = "#f50057"/>
              </div>
              }
              </div>
            </div>
            <div className = "col-6">
              <div className = "server-title">Info</div>
              <div className = "server-info">{props.serverData.info}</div>
            </div>
          </div>
          <div className = "page-centered server-app-info">
            <div>
              {props.serverData.channels.length} 
              <FontAwesomeIcon icon = {faCircleNotch} title = "Channels" color = "#f50057"/>
            </div>
            <div>
              {props.serverData.unique_users}
              <FontAwesomeIcon icon = {faUsers} title = "Users" color = "#f50057"/>
            </div>
          </div>
      </div>
  )
}


export default ShowServerData;