import React, {useState, useEffect} from "react";
import ShowServerData from "./ShowServerData";
import EditServerData from "./EditServerData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ServerPage = (props) => {
  const [serverData, setServerData] = useState(null);
  const [serverPageId, setServerPageId] = useState(null);
  const [favouriteServer, setFavouriteServer] = useState(false);

  useEffect(() => {
    getServerData();
  },[])

  useEffect(() => {
    if (serverData && props.currentUser) {
      serverData.liking_users.some((ele) => ele.id === props.currentUser.id) ? setFavouriteServer(true) : false;
    }
  }, [serverData])

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

    const likeServer = () => { 
      const body = {
          server_id: serverData.id,
      }
      const url = '/api/v1/likes/create';
      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
      method: "POST",
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
        setFavouriteServer(true);
      })
      .catch(error => console.log(error.message))
  }

  const unLikeServer = () => {
          const url = `/api/v1/likes/destroy/${serverData.id}`;
          const token = document.querySelector('meta[name="csrf-token"]').content;
      
          fetch(url, {
            method: "DELETE",
            headers: {
              "X-CSRF-Token": token,
              "Content-Type": "application/json"
            }
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              throw new Error("Network response was not ok.");
            })
            .then((response) => {
              setFavouriteServer(false);
            })
            .catch(error => console.log(error.message));
  }

    

  return (
    <div className = "page-display">
    {props.currentUser && 
    serverData && 
    props.currentUser.id === serverData.user.id
    ? 
    <EditServerData history = {props.history} serverData = {serverData} updateServerImage = {updateServerImage}
     updateServerInfo = {updateServerInfo} currentUser = {props.currentUser} likeServer = {likeServer} unLikeServer = {unLikeServer} favouriteServer = {favouriteServer} />
    : serverData ? 
    <ShowServerData serverData = {serverData} likeServer = {likeServer} unLikeServer = {unLikeServer} favouriteServer = {favouriteServer} currentUser = {props.currentUser} />
    :
    <div className = "page-spinner">
      <FontAwesomeIcon icon = {faSpinner} className = "fa-pulse" size = "9x" color = {"#f50057"}/>
    </div>
    }
  </div>
  )
}


export default ServerPage;
