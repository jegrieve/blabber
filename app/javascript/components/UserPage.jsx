import React, {useEffect, useState} from "react";
import EditUserData from "./EditUserData"
import ShowUserData from "./ShowUserData"

const UserPage = (props) => {
    const [userData, setUserData] = useState(null);
    const [userPageId, setUserPageId] = useState(null);

    useEffect(() => {
      getUserData();
    },[])

    useEffect(() => {
      if (props.match.params.id !== userPageId) {
        setUserPageId(props.match.params.id);
      }
    })
    
    useEffect(() => {
      getUserData();
    }, [userPageId])

      const getUserData = () => {
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
      }

  return (
      <div className = "page-display userpage">
        {props.currentUser 
        && userData 
        && props.currentUser.id === userData.id 
        ? 
        <EditUserData userData = {userData} />
        : userData ? 
        <ShowUserData userData = {userData} />
        :
        false
        }
      </div>
  )
}

export default UserPage;
