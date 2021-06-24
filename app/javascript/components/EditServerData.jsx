import React, {useState, useEffect} from "react";


const EditServerData = (props) => {
    const [imageData, setImageData] = useState({
        image: null
      });
      const [editImage, setEditImage] = useState(false);
      const [infoText, setInfoText] = useState("");
      const [editInfo, setEditInfo] = useState(false);
    
      useEffect(() => {
        if (!imageData.image) {
          setEditImage(false);
        }
      }, [imageData])
    
      useEffect(() => {
        if (!props.serverData.info) {
          setInfoText("This server has no info.")
        } else {
          setInfoText(props.serverData.info)
        }
      },[editInfo])
    
      useEffect(() => {
        if (editInfo === "submitted") {
          props.updateServerInfo(props.serverData.id, infoText);
        }
        if (editImage === "submitted") {
          props.updateServerImage(props.serverData.id, imageData);
        }
      }, [editInfo, editImage])
    
      const handleImage = () => {
        if (!editImage || editImage === "submitted") {
          setEditImage(true)
        } else {
          setEditImage(false)
        }
      }
    
      const handleInfo = () => {
        if (!editInfo || editInfo === "submitted") {
          setEditInfo(true)
        } else {
          setEditInfo(false)
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
    
      const saveEditInfo = () => {
        setEditInfo("submitted")
      }
    
      const exitEditInfo = () => {
        setEditInfo(!editInfo)
      }
    
      const onInfoInputChange = (e) => {
        setInfoText(e.target.value);
      }
    
      return (
          <div>
              <div>{props.serverData.name}</div>
              <div>
                  {props.serverData.server_image ? 
                  <div>
                      <img src = {props.serverData.server_image.url} width = {300} />
                  </div> 
                  :
                //   <FontAwesomeIcon icon = {faUserCircle} />
                <div>placeholder image</div>
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
                {editInfo === true ? 
                <div>
                  <textarea value = {infoText} onChange = {onInfoInputChange} />
                    <button onClick = {saveEditInfo}>Save</button>
                    <button onClick = {exitEditInfo}>Cancel</button>
                </div> 
                : 
                <div>
                    {!props.serverData.info ? <div>This server has no info.</div> : <div>{props.serverData.info}</div>}
                    <button onClick = {handleInfo}>Edit info</button>
                </div>}
              </div>
          </div>
      )
}


export default EditServerData;