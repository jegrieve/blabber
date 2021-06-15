import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'

const ShowUserData = (props) => {
  return (
      <div>
          <div>{props.userData.username}</div>
          <div>
              {props.userData.user_image ? 
              <div>
                  <img src = {props.userData.user_image.url} width = {300} />
              </div> 
              :
              <FontAwesomeIcon icon = {faUserCircle} />
              }
          </div>
          <div>{props.userData.bio}</div>
          <div>Recent Activity:</div>
      </div>
  )
}


export default ShowUserData;