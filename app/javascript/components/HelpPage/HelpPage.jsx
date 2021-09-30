import React, {useState, useEffect} from "react";
import helpImg from 'images/help.svg';
import githubImg from 'images/github.svg';

const HelpPage = (props) => {
  return (
      <div className = "page-display">
        <div className = "page-title">Help</div>
        <div className = "container">
          <div className = "row">
            <div className = "col-6 d-flex align-items-center">
              <div className = "help-info">
               <span className = "logo-colour">blabber</span> is an online messaging app that lets you chat with others.
              </div>
            </div>
            <div className = "col-6 d-flex justify-content-center">
              <img src = {helpImg} width = {200} />
            </div>
          </div>
          <div className = "row">
            <div className = "col-6">
              <div className = "help-info">To get started, join or create a server and then select a channel to start chatting in.</div>
            </div>
            <div className = "col-6 d-flex justify-content-center">  
              <div className = "help-github">
                  <a className = "github-link" href = "https://github.com/jegrieve/discord-clone">
                  <img className = "github-logo" src = {githubImg} width = {150} />  
                  <div>
                    Checkout the GitHub repo here.
                  </div>
                </a>
              </div>       
            </div>
          </div>
        </div>
        {/* <div className = "help-info">
          <div></div> 
        </div> */}
      </div>
  )
}

export default HelpPage;