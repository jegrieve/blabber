import React from "react";


const ShowServerData = (props) => {
  return (
      <div>
          <div>{props.serverData.name}</div>
          <div>
              {props.serverData.server_image ? 
              <div>
                  <img src = {props.serverData.server_image.url} width = {300} />
              </div> 
              :
            //   <FontAwesomeIcon icon = {faUserCircle} />
            <div>placeholder banner here</div>
              }
          </div>
          <div>{props.serverData.info}</div>
      </div>
  )
}


export default ShowServerData;