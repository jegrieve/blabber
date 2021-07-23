import React, {useState, useEffect} from "react";
import { faEdit, faComments } from '@fortawesome/free-regular-svg-icons'
import { faServer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EditServerData = (props) => {
    const [imageData, setImageData] = useState({
        image: null
      });
      const [editImage, setEditImage] = useState(false);
      const [infoText, setInfoText] = useState("");
      const [editInfo, setEditInfo] = useState(false);
      const [confirmDelete, setConfirmDelete] = useState(false);

      useEffect(() => {
        if (!props.serverData.info) {
          setInfoText("This server has no info.")
        } else {
          setInfoText(props.serverData.info)
        }
      },[])
    
      useEffect(() => {
        if (!imageData.image) {
          setEditImage(false);
        }
      }, [imageData])
    
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
    
      const toggleConfirmDelete = () => {
        setConfirmDelete(!confirmDelete)
      }

      const deleteServer = () => {
        const url = `/api/v1/servers/destroy/${props.serverData.id}`;
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
            props.history.push("/")
          })
          .catch(error => console.log(error.message));    
      }

      const cancelDelete = () => {
        setConfirmDelete(false);
      }

      return (
          <div>
              <div className = "page-title">
                <span className = "title-icon">
                  <FontAwesomeIcon icon = {faServer}/>
                </span>
                {props.serverData.name}
                </div>
                <div className = "row server-padding-top">
                <div className = "col-6 page-centered">
                  {props.serverData.server_image ? 
                  <div>
                      <img src = {props.serverData.server_image.url} width = {450} />
                  </div> 
                  :
                  <div className = "server-placeholder-img">
                    <FontAwesomeIcon icon = {faComments} size = "6x"/>
                  </div>
                  }
                   {editImage === true ? 
                     <div>
                      <div className = "form-group" >
                        <input className = "form-control" name = "image" type="file" accept="image/*" multiple={false} onChange={onImageChange} /> 
                      </div>
                      <button className = "btn btn-success" onClick = {saveEditImage}>Save</button>
                      <button className = "btn btn-danger cancel-btn" onClick = {exitEditImage}>Cancel</button>
                     </div> : 
                     <div>
                       <span className = "server-edit" onClick = {handleImage}><FontAwesomeIcon icon = {faEdit} size = "2x"/>Edit Image</span>
                      </div>}
                  </div>
                  <div className = "col-6">
                {editInfo === true ? 
                <div>
                  <div>
                    <textarea className = "server-info-edit" value = {infoText} onChange = {onInfoInputChange} maxLength = "400"/>
                  </div>
                    <button className = "btn btn-success" onClick = {saveEditInfo}>Save</button>
                    <button className = "btn btn-danger cancel-btn" onClick = {exitEditInfo}>Cancel</button>
                </div> 
                : 
                <div>
                    {!props.serverData.info ? <div>This server has no info.</div> : <div className = "server-info">{props.serverData.info}</div>}
                    <span className = "server-edit" onClick = {handleInfo}><FontAwesomeIcon icon = {faEdit} size = "2x"/>Edit info</span>
                </div>}
              </div>
                </div>
              <div className = "page-centered">{props.serverData.channels.length} channels</div>
              <div>
                  {!confirmDelete ? 
                  <div className = "page-centered">
                    <button className = "btn btn-warning" onClick = {toggleConfirmDelete}>Delete Server</button>
                  </div> 
                  : 
                  <div className = "page-centered">
                    <div className = "red-text">Warning: delete server and all associated channels/messages.</div>
                    <button className = "btn btn-danger" onClick = {deleteServer}>Confirm Delete</button>
                    <button className = "btn btn-primary cancel-btn" onClick = {cancelDelete}>Cancel</button>
                  </div> }
              </div>
          </div>
      )
}


export default EditServerData;