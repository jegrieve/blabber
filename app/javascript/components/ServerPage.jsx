import React, {useState, useEffect} from "react";
import ShowServerData from "./ShowServerData";
import EditServerData from "./EditServerData";

const ServerPage = (props) => {
  const [serverData, setServerData] = useState(null);
  const [serverPageId, setServerPageId] = useState(null);

  useEffect(() => {
    getServerData();
  },[])

  useEffect(() => {
    if (serverData) {
      props.setCurrentServer(serverData);
    }
  }, [serverData])

  useEffect(() => {
    if (props.match.params.id !== serverPageId) {
      setServerPageId(props.match.params.id);
    }
  })
  
  useEffect(() => {
    getServerData();
  }, [serverPageId])

    const getServerData = () => {
      const id = props.match.params.id
      const url = `/api/v1/servers/show/${id}`;
  
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => {
          console.log(response)
          setServerData(response)
      })
        .catch(() => console.log("error"));
    }

    const updateServerImage = (serverId, imageData) => {
      const formData =  new FormData();
      formData.append('server_image', imageData["image"]);
      const url = `/api/v1/servers/update/${serverId}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
      method: "PATCH",
      body: formData,
      headers: {
      "X-CSRF-Token": token, 
    },
  })
      .then(response => {
          if (response.ok) {
              return response.json()
          }
          throw new Error("Network response was not ok.");
      })
      .then(response => {
        getServerData();
      })
      .catch(error => console.log(error.message))
    }

    const updateServerInfo = (serverId, infoText) => {
      const body = {
        info: infoText,
    }
      const url = `/api/v1/servers/update/${serverId}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
      method: "PATCH",
      headers: {
      "X-CSRF-Token": token, 
      "Content-Type": "application/json"
    },
      body: JSON.stringify(body)
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error("Network response was not ok.");
    })
    .then(response => {
        getServerData();
    })
    .catch(error => console.log(error.message))
    }

  return (
    <div className = "page-display page-centered">
    {props.currentUser && 
    serverData && 
    props.currentUser.id === serverData.user.id
    ? 
    <EditServerData history = {props.history} serverData = {serverData} updateServerImage = {updateServerImage} updateServerInfo = {updateServerInfo} currentUser = {props.currentUser} />
    : serverData ? 
    <ShowServerData serverData = {serverData} />
    :
    <div>
      This server could not be found.
    </div>
    }
  </div>
  )
}


export default ServerPage;
