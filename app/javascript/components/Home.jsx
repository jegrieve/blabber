import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import homepageUsers from 'images/homepage_users.svg'
import homepageUser from 'images/homepage_user.svg'
import createServerPerson from 'images/create_server_person.svg'
import homepagePerson from 'images/homepage_person.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight, faLongArrowAltLeft, faUser, faQuestionCircle, faServer, faUsers } from '@fortawesome/free-solid-svg-icons'


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
        <div className = "home-page container">
          <div className = "row align-items-center">
            <div className = "col-6">
              <div className = "home-info">Chat with others, join different servers. <br/> Send pictures, videos, gifs and more.</div>
            </div>
            <div className = "col-6">
              <img src = {homepageUsers} width = {300} />
            </div>
          </div>
          <div className = "row align-items-center">
            <div className = "col-6">
              <img src = {homepagePerson} width = {300} />
            </div>
            <div className = "col-6">
              <div className = "home-info">Join or create a server, and chat publicly or privately.</div>
            </div>
          </div>
          {/* <div className = "home-info">Data about app (servers/channels/users)</div> */}
          <div className = "row">
            <div className = "col-12 home-user">
              <span>Please 
                <NavLink history = {props.history} to = {"/sign-in"}> sign in</NavLink>
              </span>
              <span> or
                <NavLink history = {props.history} to={"/sign-up"}> sign up </NavLink>
                to begin chatting
              </span>
            </div>
          </div>       
        </div>
      </div> : 
      <div>
        <div className = "page-title">Welcome&nbsp;             
          <NavLink to={`/user/${props.currentUser.id}`}>
            {props.currentUser.username}
          </NavLink> 
        </div>
        <div className = "home-page container align-items-center">
          <div className = "row top-row-homepage">
            <div className = "col-6">
              <div className = "home-info">Start chatting
                <div className = "homepage-arrows">
                  <span className = "arrow-left">
                    <div>
                      <FontAwesomeIcon icon={faLongArrowAltLeft} size = "6x" />
                    </div>
                    <div>
                      Join a Server
                    </div>
                  </span>
                  <span>or</span>
                  <span className = "arrow-right">
                    <div>
                      <FontAwesomeIcon icon={faLongArrowAltRight} size = "6x" />
                    </div>
                    <div>
                      Create a Server
                    </div>
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
          <div className = "row med-padding-top align-items-center">
            <div className = "col-4">
              <div>
                <NavLink to={`/user/${props.currentUser.id}`}>
                  <FontAwesomeIcon icon = {faUser} size = "6x" title = "Profile" />
                </NavLink>
              </div>
              <div>
                Profile
              </div>
            </div>
            <div className = "col-4">
            {homepageInfo ? 
            <div className = "homepage-app-info">
              <div>Stats</div>
              <div>{homepageInfo.servers} <FontAwesomeIcon icon = {faServer} title = "Servers" /></div>
              <div>{homepageInfo.users} <FontAwesomeIcon icon = {faUsers} title = "Users"/></div>
            </div>
            :false}
            </div>
            <div className = "col-4">
              <div>
                <NavLink to={`/help`}>
                  <FontAwesomeIcon icon = {faQuestionCircle}  size = "6x" title = "Help" />
                </NavLink>
              </div>
              <div>
                Help
              </div>
            </div> 
          </div>
        </div>
      </div>}
    </div>
  )
}


export default Home;