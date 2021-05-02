import React, { useState } from 'react'
import { auth } from './firebase';

function Signup({setOpenSignup, username, setUsername}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          return authUser.user.updateProfile({
            displayName : username
          })
        })
        .catch((error)=>{
            alert(error.message)
        });

        setUsername('');
        setPassword('');
        setEmail('');

        setOpenSignup(false);

    }

  return (
    <div className="signupandlogin">
      <form onSubmit={handleSignup}>
          <input 
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
          />
          <input 
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
          <input 
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
          <button>Signup</button>
      </form>
    </div>
  )
}

export default Signup
