import React from "react";
import { NavLink } from "react-router-dom";
import ServerFeed from "./ServerFeed";
import ChannelFeed from "./ChannelFeed";

const SideNav = (props) => {
  console.log(props.showServers)
  return (
      <div className = "side-nav">
        {props.showServers ? <ServerFeed /> : <ChannelFeed/> }
      </div>
  )
}

export default SideNav;