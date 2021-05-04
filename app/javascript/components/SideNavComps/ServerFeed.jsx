import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import Server from "./Server";

const ServerFeed = (props) => {
  const [loadedServers, setLoadedServers] = useState([]);

  useEffect(() => {
    getServers();
  })

  const getServers = () => {
    const url = "/api/v1/servers/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        setLoadedServers(response)
      })
      .catch((error) => console.log(error.message));
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
      </div>
  )
}

export default ServerFeed;
