import React, {useEffect, useState} from "react";

const UserPage = (props) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const id = props.match.params.id
        const url = `/api/v1/users/show/${id}`;
    
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            console.log(response)
            setUserData(response)
        })
          .catch(() => console.log("error"));
      }, []);

  return (
      <div className = "page-display userpage">
          Userpage
          {userData ? <div>{userData.username}</div> : false}
      </div>
  )
}


export default UserPage;