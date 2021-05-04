import React from "react";
import { NavLink } from "react-router-dom";
const Server = (props) => {

  return (
      <div>
          <NavLink to = {`/servers/${props.data.id}`}>
            {props.data.name}
          </NavLink>
      </div>
  )
}


export default Server;