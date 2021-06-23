import React, {useState, useEffect} from "react";
import ShowServerData from "./ShowServerData";
import EditServerData from "./EditServerData";

const ServerPage = (props) => {
  const [serverData, setServerData] = useState(null)

  useEffect(() => {
      getServerData();
  }, [])

  useEffect(() => {
    if (serverData) {
      props.setCurrentServer(serverData);
    }
  }, [serverData])

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
      }
        )
      .catch((error) => console.log(error.message));
  }
  // components updateServerImage = {updateServerImage} updateServerInfo = {updateServerInfo}
  return (
    <div className = "page-display userpage">
    {props.currentUser 
    && serverData 
    && props.currentUser.id === serverData.user.id
    ? 
    <EditServerData serverData = {serverData}  />
    : serverData ? 
    <ShowServerData serverData = {serverData} />
    :
    false
    }
  </div>
  )
}


export default ServerPage;