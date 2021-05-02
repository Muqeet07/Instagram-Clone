import React, { useState } from 'react'
import { db, storage, auth } from './firebase'

function Update({postId, updatePost}) {

    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [progressState, setProgressState] = useState(0);

    console.log(auth.currentUser)

    const changeHandler = (e) => {
        if(e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }

    const updateHandler = (e) => {
        e.preventDefault();

        if(!file){
          db.collection('posts').doc(postId).update({
            caption : caption
        })
        updatePost();
        }else {
          const uploadTask = storage.ref(`images/${file.name}`).put(file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgressState(progress)
            },
            (error) => {
                console.log(error)
                alert(error.message)
            },
            ()=>{
                storage.ref("images")
                .child(file.name)
                .getDownloadURL()
                .then(url => {
                    db.collection('posts').doc(postId).update({
                        imageUrl : url,
                        caption : caption
                    })

                    setProgressState(0);
                    setFile(null);
                    setCaption("");
                    updatePost();
                })
            }
        )
        }
    }

   

  return (
    <div className="updatecontainer">
    <div className="update">
        <h3>Update Your Post</h3>
      <form onSubmit={updateHandler}>
          <br />
          <progress 
            value={progressState}
            max="100" 
            className="update-progress"
          />

          <br />
          <input
            type="file"
            onChange={changeHandler} 
            className="update-file"
          />

          <br />
          <input
            type="text"
            name="caption"
            placeholder="Caption"
            value={caption}
            onChange={(e)=> setCaption(e.target.value)}
            className="update-caption-input"
          />

          <br />
          <button type="submit" disabled={!file && !caption} className="update-button">Update</button>
          <button className="cancel-button" onClick={updatePost}>Cancel</button>
      </form>
    </div>
    </div>
  )
}

export default Update;
