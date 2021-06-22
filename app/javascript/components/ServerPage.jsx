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

    {serverData ?
    <div>
      <div className = "server-banner">
        {/* serverData.server_image */}
      </div>
      <div className = "server-title">
        {serverData.name}
      </div>
      <div className = "server-info">
        {serverData.info}
      </div>
      <div className = "server-data">
        {/* serverData.data */}
      </div>
    </div>
    :
    <div>
      No server here.
    </div>
  }
    </div>
  )
}


export default ServerPage;