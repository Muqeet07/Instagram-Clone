import React, {useState} from 'react'
import { auth } from './firebase';

function Login({setOpenLogin}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .catch((error)=>{
            alert(error.message)
        });

        setPassword('');
        setEmail('');

        setOpenLogin(false);

    }

  return (
    <div className="signupandlogin">
      <form onSubmit={handleLogin}>
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
          <button>Login</button>
      </form>
    </div>
  )
}

export default Login
