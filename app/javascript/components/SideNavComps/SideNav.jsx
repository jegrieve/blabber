import React, { useEffect } from "react";
import ServerFeed from "./ServerFeed";
import ChannelFeed from "./ChannelFeed";

const SideNav = (props) => {

  useEffect(() => {
    if (props.currentChannel) {
      document.querySelector(".side-nav").classList.add("fixed-nav")
    } else {
      document.querySelector(".side-nav").classList.remove("fixed-nav")
    }
  })

  return (
      <div className = "side-nav">
        {props.currentServer ? <ChannelFeed currentServer = {props.currentServer} currentChannel = {props.currentChannel} /> : <ServerFeed /> }
      </div>
  )
}

export default SideNav;
