import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Login from './Login';
import Signup from './Signup';
import { auth } from './firebase';


 
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function Header({user, username, setUsername}) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const classes = useStyles();
  
  const [modalStyle] = useState(getModalStyle);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleOpenSignup = () => {
    setOpenSignup(true);
  };

  const handleCloseSignup = () => {
    setOpenSignup(false);
  };

  const handleLogout = () => {
    return auth.signOut();
  }

 

  return (
    <div className="header">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
           className="header-logo"
           alt="Instagram"
      />

      {user ? (
        <div className="buttonlogout">
          <button className="header-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="buttons">
          <button className="header-button" onClick={handleOpenLogin}>Login</button>
          <button className="header-button" onClick={handleOpenSignup}>Signup</button>
        </div>
      )}


    {/* Login Modal*/}
      <Modal
        open={openLogin}
        onClose={handleCloseLogin}
      >
        <div style={modalStyle} className={classes.paper}>
            <Login setOpenLogin={setOpenLogin}/>
        </div>
      </Modal>

    {/* Signup Modal*/}
      <Modal
        open={openSignup}
        onClose={handleCloseSignup}
      >
        <div style={modalStyle} className={classes.paper}>
            <Signup setOpenSignup={setOpenSignup} username={username} setUsername={setUsername}/>
        </div>
      </Modal>
      
    </div>
  )
}

export default Header
