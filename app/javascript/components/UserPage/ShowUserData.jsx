import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";

const ShowUserData = (props) => {
  return (
      <div className = "page-display page-centered">
          <div className = "user-username page-title">
              <span className = "title-icon">
                <FontAwesomeIcon icon = {faUser} color = "#f50057"/>
              </span>
            {props.userData.username}
            </div>
          <div>
              {props.userData.user_image ? 
              <div>
                  <img className = "user-img" src = {props.userData.user_image.url} width = {350} height = {300} />
              </div> 
              :
              <div className = "user-placeholder-img">
                <FontAwesomeIcon icon = {faUserCircle} size = "6x"/>
              </div>
              }
          </div>
          <div className = "d-flex justify-content-center">
            <div className = "user-bio user-margin-top">
              {props.userData.bio ? 
              <div>
                <div className = "user-title">Bio</div>
                {props.userData.bio}
              </div> : false}
            </div>
          </div>
          {props.userActivity ? 
          <div className = "user-activity user-margin-top">Recent activity in the <NavLink className = "white-link" to={`/server/${props.userActivity.id}`}>{props.userActivity.name}</NavLink> server</div> 
          : 
          <div className = "user-activity user-margin-top">This user has no recent activity</div>}
          <div className = "user-created user-margin-top">
            User created on {props.userData.created_at}
          </div>
      </div>
  )
}


export default ShowUserData;