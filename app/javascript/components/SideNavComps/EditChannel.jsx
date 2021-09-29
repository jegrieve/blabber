import React, { useEffect } from "react";

const EditChannel = (props) => {
  const [editChannelData, setEditChannelData] = useState(null);
  const [channelData, setChannelData] = useState(null);

  useEffect(() => {
    getChannelData();
  },[]);

  useEffect(() => {
    setEditChannelData({...channelData})
  }, [channelData])

  const getChannelData = () => {
    const id = props.match.params.id
    const url = `/api/v1/channels/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        console.log(response)
        setChannelData(response)
    })
      .catch(() => console.log("error"));
  }


  return (
      <div>
          Edit Channel Stuff.
      </div>
  )
}

export default EditChannel;
