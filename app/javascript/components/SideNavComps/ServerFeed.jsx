import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import Server from "./Server";

const ServerFeed = (props) => {
  const [loadedServers, setLoadedServers] = useState([]);
  const [offsetNum, setOffsetNum] = useState(0);

console.log(loadedServers)
console.log(offsetNum)

  useEffect(() => {
    getServers();
  }, [offsetNum])

  const getServers = () => {
    const url = `/api/v1/servers/index?offset_num=${offsetNum}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        if (response.length > 0) {
          setLoadedServers(response)
        } else if (offsetNum >= 15) {
          setOffsetNum(offsetNum - 15);
        }
      })
      .catch((error) => console.log(error.message));
  }

  const handleOffsetNum = (e) => {
    if (e.target.id === "server-decrement" && offsetNum >= 15) {
      setOffsetNum(offsetNum - 15)
    } else if (e.target.id === "server-increment") {
      setOffsetNum(offsetNum + 15)
    }
  }

  return (
      <div>
         {loadedServers.map((serverData) => {
           return (
             <div key = {serverData.id}> 
               <Server data = {serverData} />
             </div>
           )
         })}
          <NavLink to = {"/create-new-server"}>
            <button>Create Server</button>
          </NavLink>
          <div>
            <button id = "server-decrement" onClick = {handleOffsetNum}>Left</button>
            <button id = "server-increment" onClick = {handleOffsetNum}>Right</button> 
          </div>
      </div>
  )
}

export default ServerFeed;
