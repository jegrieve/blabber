import React, {useEffect, useState} from "react";
import EditUserData from "./EditUserData"
import ShowUserData from "./ShowUserData"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const UserPage = (props) => {
    const [userData, setUserData] = useState(null);
    const [userPageId, setUserPageId] = useState(null);
    const [sameUser, setSameUser] = useState(null);
    const [userActivity, setUserActivity] = useState(null);

    useEffect(() => {
      getUserData();
    },[])

    useEffect(() => {
      if (userData) {
        getUserActivity();
      }
    }, [userData])

    useEffect(() => {
      if (userData && props.currentUser && userData.id === props.currentUser.id) {
        setSameUser(true);
      } else if (sameUser && !props.currentUser) {
        props.history.push("/")
      }
    })

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
            setUserData(response)
        })
          .catch(() => console.log("error"));
      }

      const getUserActivity = () => {
        const id = props.match.params.id
        const url = `/api/v1/pages/show?user_id=${userData.id}`;
    
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            setUserActivity(response);
        })
          .catch(() => console.log("error"));
      }

      const updateProfileImage = (userId, imageData) => {
        const formData =  new FormData();
        formData.append('user_image', imageData["image"]);
        const url = `/api/v1/users/update/${userId}`;
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
          getUserData();
        })
        .catch(error => console.log(error.message))
      }

      const updateProfileBio = (userId, bioText) => {
        const body = {
          bio: bioText,
      }
        const url = `/api/v1/users/update/${userId}`;
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
          getUserData();
      })
      .catch(error => console.log(error.message))
      }

  return (
      <div className = "page-display userpage">
        {props.currentUser 
        && userData 
        && props.currentUser.id === userData.id 
        ? 
        <EditUserData currentUser = {props.currentUser} setCurrentUser = {props.setCurrentUser} history = {props.history} userData = {userData} updateProfileImage = {updateProfileImage} updateProfileBio = {updateProfileBio} userActivity = {userActivity} />
        : userData ? 
        <ShowUserData userData = {userData} userActivity = {userActivity}/>
        :
        <div className = "page-spinner">
          <FontAwesomeIcon icon = {faSpinner} className = "fa-pulse" size = "9x" color = {"#f50057"}/>
        </div>
        }
      </div>
  )
}

export default UserPage;
