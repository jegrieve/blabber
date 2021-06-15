import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'


const EditUserData = (props) => {
  const [imageData, setImageData] = useState({
    image: null
  });
  const [editImage, setEditImage] = useState(false);
  const [bioData, setBioData] = useState(null);
  const [editBio, setEditBio] = useState(false);

  useEffect(() => {
    if (!imageData.image) {
      setEditImage(false);
    }
  }, [imageData])

  const handleImage = () => {
    setEditImage(!editImage)
  }

  const onImageChange = (e) => {
    setImageData((prev) => ({
        image: e.target.files[0]
    }))
  };

  const saveEditImage = () => {
    props.updateProfileImage(props.userData.id, imageData);
  }

  const cancelEditImage = () => {
    setImageData({
      image: null
    })
  }

  //so the button will now submit it or will cancel it once the image is loaded onto it.
  //SO... now work on the buttons that will show up with the image input
  //a check button to submit it and reload the new image and a cancel button that puts the image state back to null.


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
                  <button onClick = {cancelEditImage}>Exit</button>
                 </div> : 
                 <div>
                   <button onClick = {handleImage}>Edit Image</button>
                  </div>}
          </div>
          <div>{props.userData.bio}</div>
          <div>Recent Activity:</div>
      </div>
  )
}


export default EditUserData;