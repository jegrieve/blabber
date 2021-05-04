import React, {useState, useEffect} from "react";

const ServerPage = (props) => {
  const [serverData, setServerData] = useState(null)

  useEffect(() => {
      getServerData();
  }, [])

  useEffect(() => {
    props.setShowServers(false);
  }, [])

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
      }
        )
      .catch((error) => console.log(error.message));
  }

  return (
      <div>
          ServerPage
      </div>
  )
}


export default ServerPage;