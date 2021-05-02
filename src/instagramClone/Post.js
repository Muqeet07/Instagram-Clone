import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { db, auth } from './firebase';
import firebase from 'firebase/app';
import { MoreVert } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import Update from './Update';


function Post({ postId, user, username, imageUrl, caption }) {
  const [comments, setComments] = useState([]);
  const [commenttext, setCommenttext] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);


  const openDropDown = () => {
     setShowDropDown(prevState => !prevState)
  }

  const updatePost = () => (
     setShowUpdate(prevState => !prevState)
  )

  const deletePost = () => {
    db.collection('posts').doc(postId).delete();
  }


  const submitComment = (e) => {
    e.preventDefault();

    db.collection('posts')
    .doc(postId)
    .collection('comments')
    .add({
      username : auth.currentUser.displayName,
      comment : commenttext,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    })

    setCommenttext("")
  }

  useEffect(()=>{
    if(postId){
      db.collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        setComments(snapshot.docs.map(doc => ({
          commentid : doc.id,
          commentdata : doc.data()
        })))
      })
    }

  }, [postId])

  return (
    <div className="post">
      <div className="post-title">
      <Avatar alt={username} src="/static/images/avatar/1.jpg" />
        <h4>{username}</h4>
        {
          user && auth.currentUser.displayName === username ? (
          <div style={{display: 'flex', marginLeft: 'auto'}}>
            <IconButton 
                onClick={openDropDown}
            >
                <MoreVert />
            </IconButton>
            {showDropDown === true ? (
                  <div style={{position: 'absolute' ,
                  display: 'flex',
                  flexDirection: 'column', 
                  marginLeft: '-45px',
                  marginTop: '15px'}}>

            <button style={{padding: '5px',
                            background: 'none',
                            color: 'black',
                            border: '1px solid gray',
                            backgroundColor: 'white',
                            cursor: 'pointer'}}
                    onClick = {()=>{openDropDown(); updatePost();}}
            >
                Update
            </button>
            <button style={{padding: '5px',
                            background: 'none',
                            color: 'black',
                            border: '1px solid gray',
                            backgroundColor: 'white',
                            cursor: 'pointer'}}
                    onClick = {()=>{openDropDown(); deletePost();}}
            >
                Delete
            </button>
      </div>
            ) : (
                ""
            )}
            
          </div>
          ) : (
            ""
          )
        }
      </div>
      <img 
        src={imageUrl}
        className="post-img"
        alt="postpic"
      />
      <div className="post-caption">
        <p><strong>{username}</strong> &emsp;{caption} </p>
      </div>
      <div className="post-comments">
        {comments.map(comment => {
          return <p key={comment.commentid}><strong>{comment.commentdata.username}</strong> &emsp;{comment.commentdata.comment} </p>
        })}
      </div>
      {user ? (
        <div className="post-commentform">
          <form onSubmit={submitComment}>
            <input
              type="text"
              name="comment"
              placeholder="Comment..."
              value={commenttext}
              onChange={(e)=> setCommenttext(e.target.value)} 
            />
            <button disabled={!commenttext}>Post</button>
          </form>
        </div>
      ) : (
        ""
      )}


      {
        showUpdate ? (
          <Update postId={postId} updatePost={updatePost}/>
        ) : (
          ""
        )
      }
      
    </div>
  )
}

export default Post
