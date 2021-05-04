import React from "react";
import { NavLink } from "react-router-dom";
import ServerFeed from "./ServerFeed";
import ChannelFeed from "./ChannelFeed";

const SideNav = (props) => {
  return (
      <div className = "side-nav">
          sidenav
          <ServerFeed /> {/*we're gonna send in data to these to show each specific server/channel */}
          or
          <ChannelFeed /> {/*we take the associated data with the servers to show its channels*/}
      </div>
  )
}

export default SideNav;