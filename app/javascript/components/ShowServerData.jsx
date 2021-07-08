import React from "react";


const ShowServerData = (props) => {
  return (
      <div>
          <div className = "page-title">{props.serverData.name}</div>
          <div className = "server-data">
            {props.serverData.server_image ? 
              <div className = "server-image">
                  <img src = {props.serverData.server_image.url} width = {300} />
              </div> 
              :
              <div className = "server-placeholder-image">placeholder banner here</div>
              }
            <div className = "server-info">{props.serverData.info}</div>
            <div>{props.serverData.channels.length} channels</div>
          </div>
      </div>
  )
}


export default ShowServerData;