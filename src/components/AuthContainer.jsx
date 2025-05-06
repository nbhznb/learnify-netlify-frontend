// src/components/AuthContainer.jsx
import React, { memo } from 'react';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Login from './Login';
import Register from './Register';
import Profile from './Profile';

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // Remove transition: all
};

const boxStyle = {
  position: 'relative',
  maxHeight: '90vh',
  overflowY: 'auto',
  // Add specific transitions instead of transition: all
  opacity: 1,
  transform: 'scale(1)',
  // Add will-change for properties that need animation
  willChange: 'opacity, transform',
  // Use hardware acceleration
  WebkitBackfaceVisibility: 'hidden',
  backfaceVisibility: 'hidden',
};

const AuthContainer = memo(({
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
      disableAutoFocus
      disableEnforceFocus
      disablePortal={false}
      closeAfterTransition
      sx={modalStyle}
    >
      <Box sx={boxStyle}>
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
});

export default AuthContainer;
