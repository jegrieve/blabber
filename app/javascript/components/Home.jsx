import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import homepageUsers from 'images/homepage_users.svg'
import homepageUser from 'images/homepage_user.svg'
import createServerPerson from 'images/create_server_person.svg'
import homepagePerson from 'images/homepage_person.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'


const Home = (props) => {
  const [homepageInfo, setHomepageInfo] = useState(null);
  useEffect(() => {
    props.setCurrentServer(null);
  },[])
  
  useEffect(() => {
    getHomeData();
  },[])

  const getHomeData = () => {
    const id = props.match.params.id
    const url = `/api/v1/pages/show?homepage=${true}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        setHomepageInfo(response);
    })
      .catch(() => console.log("error"));
  }

  return (
    <div className = "page-display page-centered">
      {!props.currentUser ? 
      <div>
        <div className = "page-title">The best place to chat!</div>
        <div className = "home-page container row align-items-center">
          <div className = "col-6">
            <div className = "home-info">Chat with others, join different servers. <br/> Send pictures, videos, gifs and more.</div>
          </div>
          <div className = "col-6">
            <img src = {homepageUsers} width = {300} />
          </div>
          <div className = "col-6">
            <img src = {homepagePerson} width = {300} />
          </div>
          <div className = "col-6">
            <div className = "home-info">Join or create a server, and chat publicly or privately.</div>
          </div>
          {/* <div className = "home-info">Data about app (servers/channels/users)</div> */}
          <div className = "col-12 home-user">
            <span>Please 
              <NavLink history = {props.history} to = {"/sign-in"}> sign in</NavLink>
            </span>
            <span> or
              <NavLink history = {props.history} to={"/sign-up"}> sign up </NavLink>
              to begin chatting
            </span>
          </div>       
          {/* {homepageInfo ? 
          <div>
            <div>{homepageInfo.servers} servers created</div>
            <div>{homepageInfo.users} users registered</div>
          </div>
        :false} */}
        </div>
      </div> : 
      <div>
        <div className = "page-title">Welcome&nbsp;             
          <NavLink to={`/user/${props.currentUser.id}`}>
            {props.currentUser.username}
          </NavLink> 
        </div>
        <div className = "home-page container row align-items-center">
          <div className = "col-6">
            <div className = "home-info">Start chatting (join server/ create server under arrows)
              <div className = "homepage-arrows">
                <span className = "arrow-left">
                  <FontAwesomeIcon icon={faLongArrowAltLeft} size = "6x" />
                </span>
                <span className = "arrow-right">
                  <FontAwesomeIcon icon={faLongArrowAltRight} size = "6x" />
                </span>
              </div>
            </div>
          </div>
          <div className = "col-6">
            <NavLink to={`/create-new-server`}>
              <img src = {createServerPerson} width = {300} />
            </NavLink> 
          </div>
        </div>
      </div>}
    </div>
  )
}


export default Home;