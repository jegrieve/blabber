import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-regular-svg-icons'
import { faServer } from '@fortawesome/free-solid-svg-icons'


const ShowServerData = (props) => {
  return (
      <div>
          <div className = "page-title">
            <span className = "title-icon">
              <FontAwesomeIcon icon = {faServer}/>
            </span>
            {props.serverData.name}
            </div>
          <div className = "server-data">
            {props.serverData.server_image ? 
              <div className = "server-image">
                  <img src = {props.serverData.server_image.url} width = {300} />
              </div> 
              :
              <div className = "server-placeholder-img">
                <FontAwesomeIcon icon = {faComments} size = "6x"/>
              </div>
              }
            <div className = "server-info">{props.serverData.info}</div>
            <div>{props.serverData.channels.length} channels</div>
          </div>
      </div>
  )
}


export default ShowServerData;