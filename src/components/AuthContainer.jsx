// src/components/AuthContainer.jsx
import React from 'react';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Login from './Login';
import Register from './Register';
import Profile from './Profile';

const AuthContainer = ({
  openLogin,
  openRegister,
  openProfile,
  setOpenLogin,
  setOpenRegister,
  setOpenProfile
}) => {
  const isOpen = openLogin || openRegister || openProfile;

  const handleClose = () => {
    setOpenLogin(false);
    setOpenRegister(false);
    setOpenProfile(false);
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(5px)'
      }}
    >
      <Box sx={{
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {openLogin && (
          <Login
            onClose={handleClose}
            onRegisterClick={() => {
              setOpenLogin(false);
              setOpenRegister(true);
            }}
          />
        )}
        {openRegister && (
          <Register
            onClose={handleClose}
            onLoginClick={() => {
              setOpenRegister(false);
              setOpenLogin(true);
            }}
          />
        )}
        {openProfile && (
          <Profile
            onClose={handleClose}
          />
        )}
      </Box>
    </Modal>
  );
};

export default AuthContainer;
