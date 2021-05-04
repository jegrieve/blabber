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

//Create a Server model
// The model will have name (server name, no duplicate)
// and body (info about server), 
// and optional img (server banner/img)
// has_many :channels
// belongs_to :user (for admin purposes), maybe?
//SO basically, its literally the exact same as board
//except for board is board and has posts, while this
//is server and has channels

//Create a channel model
//This model follows the same general ideas as the post BUT:
//the comments will actually be the "messages"
//So i'll figure this out when  I get to it
//so dont confuse this with the comments
//this will have many comments (messages)
//the messages will be the one with videos/images/texts etc.

export default SideNav;