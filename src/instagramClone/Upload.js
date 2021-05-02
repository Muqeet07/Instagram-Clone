import React, { useState } from 'react'
import { db, storage, auth } from './firebase'
import firebase from 'firebase/app';

function Upload() {

    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [progressState, setProgressState] = useState(0);

    console.log(auth.currentUser)

    const changeHandler = (e) => {
        if(e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();

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
                    db.collection('posts').add({
                        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                        username : auth.currentUser.displayName,
                        imageUrl : url,
                        caption : caption
                    })

                    setProgressState(0);
                    setFile(null);
                    setCaption("");
                })
            }
        )
    }

   

  return (
    <div className="upload">
        <h3>Upload Your Post</h3>
      <form onSubmit={submitHandler}>
          <br />
          <progress 
            value={progressState}
            max="100" 
            className="upload-progress"
          />

          <br />
          <input
            type="file"
            onChange={changeHandler} 
            className="upload-file"
          />

          <br />
          <input
            type="text"
            name="caption"
            placeholder="Caption"
            value={caption}
            onChange={(e)=> setCaption(e.target.value)}
            className="upload-caption-input"
          />

          <br />
          <button className="upload-button">Upload</button>
      </form>
    </div>
  )
}

export default Upload
