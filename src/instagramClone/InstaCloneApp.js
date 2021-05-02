import React, { useState, useEffect } from 'react'
import './App.css';
import Header from './Header';
import Post from './Post';
import { db,auth } from './firebase';
import Upload from './Upload';

function InstaCloneApp() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(()=>{
        db.collection('posts').orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    postdata : doc.data()
                }
            )))
        })
    },[])


    
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if(user) {
          setUser(user);

        } else {
          setUser(null);
        }
    })

    return ()=> {
      unsubscribe();
    }
  },[user, username])


    console.log(posts)

  return (
    <div className="app">
      {/* Header */}
      <Header user={user} username={username} setUsername={setUsername}/>

      {/* Posts */}
      {posts.map(post => (
          <Post 
            key = {post.id}
            postId = {post.id}
            user = {user}
            username = {post.postdata.username}
            imageUrl = {post.postdata.imageUrl}
            caption = {post.postdata.caption}
            />
      ))}

      {/* Upload Data */}

      {user ? <Upload /> : ""}

    </div>
  )
}

export default InstaCloneApp
