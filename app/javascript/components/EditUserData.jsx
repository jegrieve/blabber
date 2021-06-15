import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'


const EditUserData = (props) => {
  const [imageData, setImageData] = useState({
    image: null
  });
  const [bioData, setBioData] = useState(null);
  const [editImage, setEditImage] = useState(false);
  const [editBio, setEditBio] = useState(false);

  const handleImage = () => {
    setEditImage(!editImage)
  }

  const onImageChange = (e) => {
    setImageData((prev) => ({
        image: e.target.files[0]
    }))
  };

  //so the button will now submit it or will cancel it once the image is loaded onto it.


  return (
      <div>
          <div>{props.userData.username}</div>
          <div>
              {props.userData.user_image ? 
              <div>
                  <img src = {props.userData.user_image} />
              </div> 
              :
              <FontAwesomeIcon icon = {faUserCircle} />
              }
               {editImage ? 
                 <div className = "form-group">
                  <input className = "form-control" name = "image" type="file" accept="image/*" multiple={false} onChange={onImageChange} /> 
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