import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'


const EditUserData = (props) => {
  const [imageData, setImageData] = useState({
    image: null
  });
  const [editImage, setEditImage] = useState(false);
  const [bioText, setBioText] = useState("");
  const [editBio, setEditBio] = useState(false);

  useEffect(() => {
    if (!imageData.image) {
      setEditImage(false);
    }
  }, [imageData])

  useEffect(() => {
    if (!props.userData.bio) {
      setBioText("This user has not set a bio.")
    } else {
      setBioText(props.userData.bio)
    }
  },[editBio])

  const handleImage = () => {
    setEditImage(!editImage)
  }

  const handleBio = () => {
    setEditBio(!editBio)
  }

  const onImageChange = (e) => {
    setImageData((prev) => ({
        image: e.target.files[0]
    }))
  };

  const saveEditImage = () => {
    props.updateProfileImage(props.userData.id, imageData);
  }

  const exitEditImage = () => {
    setImageData({
      image: null
    })
  }

  const saveEditBio = () => {
    props.updateProfileBio(props.userData.id, bioText);
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
               {editImage ? 
                 <div>
                  <div className = "form-group" >
                    <input className = "form-control" name = "image" type="file" accept="image/*" multiple={false} onChange={onImageChange} /> 
                  </div>
                  <button onClick = {saveEditImage}>Save</button>
                  <button onClick = {exitEditImage}>Exit</button>
                 </div> : 
                 <div>
                   <button onClick = {handleImage}>Edit Image</button>
                  </div>}
          </div>
          <div>
            {editBio ? 
            <div>
              <textarea value = {bioText} onChange = {onBioInputChange} />
                <button onClick = {saveEditBio}>Save</button>
                <button onClick = {exitEditBio}>Exit</button>
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