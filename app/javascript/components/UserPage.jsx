import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'

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
        {props.currentUser 
        && userData 
        && props.currentUser.id === userData.id 
        ? 
        <EditUserData userData = {userData} />
        :
        <ShowUserData userData = {userData} />
        }
      </div>
  )
}

export default UserPage;
