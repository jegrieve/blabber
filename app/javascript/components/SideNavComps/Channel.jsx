import React from "react";
import { NavLink } from "react-router-dom";
const Channel = (props) => {

  return (
      <div className = "channel-feed-item">
        <NavLink className = "channel-link-nav" to = {`/channel/${props.data.id}`}>
          <div className = "channel-name">
            {props.data.name}
          </div>
        </NavLink>
      </div>
  )
}

export default Channel;