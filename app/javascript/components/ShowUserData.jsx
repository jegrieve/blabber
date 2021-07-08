import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'

const ShowUserData = (props) => {
  return (
      <div className = "page-display page-centered">
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
          {props.userActivity ? <div>Recent activity in {props.userActivity.name}</div> : false}
      </div>
  )
}


export default ShowUserData;