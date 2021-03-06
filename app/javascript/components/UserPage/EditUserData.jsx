import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";


const EditUserData = (props) => {
  const [imageData, setImageData] = useState({
    image: null
  });
  const [editImage, setEditImage] = useState(false);
  const [bioText, setBioText] = useState("");
  const [editBio, setEditBio] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
      if (!props.userData.bio) {
        setBioText("This user has not set a bio.")
      } else {
        setBioText(props.userData.bio)
      }
    },[])

  useEffect(() => {
    if (!imageData.image) {
      setEditImage(false);
    }
  }, [imageData])

  useEffect(() => {
    if (editBio === "submitted") {
      props.updateProfileBio(props.userData.id, bioText);
    }
    if (editImage === "submitted") {
      props.updateProfileImage(props.userData.id, imageData);
    }
  }, [editBio, editImage])

  const handleImage = () => {
    if (!editImage || editImage === "submitted") {
      setEditImage(true)
    } else {
      setEditImage(false)
    }
  }

  const handleBio = () => {
    if (!editBio || editBio === "submitted") {
      setEditBio(true)
    } else {
      setEditBio(false)
    }
  }

  const onImageChange = (e) => {
    setImageData((prev) => ({
        image: e.target.files[0]
    }))
  };

  const saveEditImage = () => {
    setEditImage("submitted")
  }

  const exitEditImage = () => {
    setImageData({
      image: null
    })
  }

  const saveEditBio = () => {
    setEditBio("submitted")
  }

  const exitEditBio = () => {
    setEditBio(!editBio)
  }

  const onBioInputChange = (e) => {
    setBioText(e.target.value);
  }

  const toggleConfirmDelete = () => {
    setConfirmDelete(!confirmDelete)
  }

  const deleteUser = () => {
    const url = `/api/v1/users/destroy/${props.userData.id}`;
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
        props.setCurrentUser(null);
      })
      .catch(error => console.log(error.message));    
  }

  const cancelDelete = () => {
    setConfirmDelete(false);
  }

  return (
      <div className = "page-display page-centered">
          <div className = "page-title">
                <span className = "title-icon">
                  <FontAwesomeIcon icon = {faUser} color = "#f50057" />
                </span>
            {props.userData.username}
            </div>
          <div>
              {props.userData.user_image ? 
              <div>
                  <img className = "user-img" src = {props.userData.user_image.url} />
              </div> 
              :
              <div className = "user-placeholder-img">
                <FontAwesomeIcon icon = {faUserCircle} size = "6x"/>
              </div>
              }
               {editImage === true ? 
                 <div className = "user-margin-top">
                  <div className = "form-group d-flex justify-content-center" >
                    <input className = "form-control user-image-edit" name = "image" type="file" accept="image/*" multiple={false} onChange={onImageChange} /> 
                  </div>
                  <button className = "btn btn-success" onClick = {saveEditImage}>Save</button>
                  <button  className = "btn btn-danger cancel-btn" onClick = {exitEditImage}>Cancel</button>
                 </div> : 
                 <div className = "user-margin-top">
                   <span className = "user-edit d-flex justify-content-center align-items-center" onClick = {handleImage}><FontAwesomeIcon icon = {faEdit} color = "#f50057"/>Image</span>
                  </div>}
          </div>
          <div>
            {editBio === true ? 
            <div className = "user-margin-top">
              <div>
                <div className = "user-title">Bio</div>
                <textarea className = "user-bio-edit" value = {bioText} onChange = {onBioInputChange} maxLength = "400" />
              </div>
                <button className = "btn btn-success" onClick = {saveEditBio}>Save</button>
                <button className = "btn btn-danger cancel-btn" onClick = {exitEditBio}>Cancel</button>
            </div> 
            : 
            <div>
                <div>
                {!props.userData.bio ? <div className = "user-bio">This user has not set a bio.</div> : 
                <div className = "user-info">
                  <div className = "user-title">Bio</div>
                  <div className = "user-bio">{props.userData.bio}</div>
                </div>}
                </div>
                <div className = "user-edit d-flex justify-content-center align-items-center user-margin-top" onClick = {handleBio}><FontAwesomeIcon icon = {faEdit} color = "#f50057"/>Bio</div>
            </div>}
          </div>
          {!confirmDelete ? 
                  <div className = "delete-user-btn">
                    <button className = "btn btn-warning" onClick = {toggleConfirmDelete}>Delete User</button>
                  </div> 
                  : 
                  <div className = "delete-user-btn">
                    <div className = "red-text">Warning: delete user and all associated servers/channels/messages.</div>
                    <button className = "btn btn-danger" onClick = {deleteUser}>Confirm Delete</button>
                    <button className = "btn btn-primary cancel-btn" onClick = {cancelDelete}>Cancel</button>
                  </div> 
            }
      </div>
  )
}


export default EditUserData;