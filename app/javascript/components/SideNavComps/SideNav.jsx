import React from "react";
import { NavLink } from "react-router-dom";
import ServerFeed from "./ServerFeed";
import ChannelFeed from "./ChannelFeed";

const SideNav = (props) => {

  return (
      <div className = "side-nav">
        {props.currentServer ? <ChannelFeed currentServer = {props.currentServer}/> : <ServerFeed /> }
      </div>
  )
}

export default SideNav;