import React from "react";


const SignOut = (props) => {
    const signOutUser = () => {
        const currentUserId = props.currentUser.id
        const url = `/api/v1/sessions/destroy/${currentUserId}`;
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
          .then((response) => props.setCurrentUser(null))
          .catch(error => console.log(error.message));
}

return (
<div>
    <button className = "btn btn-danger" onClick = {signOutUser}>Sign Out</button>
</div>
)

}


export default SignOut;