import React from "react";
import { NavLink } from "react-router-dom";
const Channel = (props) => {

  return (
      <div>
        <NavLink to = {`/channel/${props.data.id}`}>
            channel
        </NavLink>
      </div>
  )
}

export default Channel;