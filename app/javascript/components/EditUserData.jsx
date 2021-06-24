import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'


const EditUserData = (props) => {
  const [imageData, setImageData] = useState({
    image: null
  });
  const [editImage, setEditImage] = useState(false);
  const [bioText, setBioText] = useState("");
  const [editBio, setEditBio] = useState(false
    );

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

  return (
      <div>
          <div>{props.userData.username}</div>
          <div>
              {props.userData.user_image ? 
              <div>
                  <img src = {props.userData.user_image.url} width = {300} />
              </div> 
              :
              <FontAwesomeIcon icon = {faUserCircle} />
              }
               {editImage === true ? 
                 <div>
                  <div className = "form-group" >
                    <input className = "form-control" name = "image" type="file" accept="image/*" multiple={false} onChange={onImageChange} /> 
                  </div>
                  <button onClick = {saveEditImage}>Save</button>
                  <button onClick = {exitEditImage}>Cancel</button>
                 </div> : 
                 <div>
                   <button onClick = {handleImage}>Edit Image</button>
                  </div>}
          </div>
          <div>
            {editBio === true ? 
            <div>
              <textarea value = {bioText} onChange = {onBioInputChange} />
                <button onClick = {saveEditBio}>Save</button>
                <button onClick = {exitEditBio}>Cancel</button>
            </div> 
            : 
            <div>
                {!props.userData.bio ? <div>This user has not set a bio.</div> : <div>{props.userData.bio}</div>}
                <button onClick = {handleBio}>Edit Bio</button>
            </div>}
          </div>
          <div>Recent Activity:</div>
      </div>
  )
}


export default EditUserData;