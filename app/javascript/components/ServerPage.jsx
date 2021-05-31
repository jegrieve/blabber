import React, {useState, useEffect} from "react";

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

  return (
      <div className = "page-display serverpage">
          <div className = "server-banner">banner</div>
          <div className = "server-title">title</div>
          <div className = "server-info">info</div>
          <div className = "server-data">data</div>
      </div>
  )
}


export default ServerPage;