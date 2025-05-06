// src/components/Navbar.jsx
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useThemeToggle } from '../theme/ThemeContext';
import { useAuth } from '../hooks/useAuth';


const Navbar = ({ openLogin, setOpenLogin, openProfile, setOpenProfile }) => {
  const { isDarkMode, toggleTheme } = useThemeToggle();
  const navigate = useNavigate();
  const { isAuthenticated, user, logoutUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleHomeClick = () => navigate('/');
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logoutUser();
    handleMenuClose();
    navigate('/');
  };

  const handleProfileClick = () => {
    setOpenProfile(true);
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: isDarkMode ? "#121826" : "#F9FAFB",
        backdropFilter: "blur(10px)",
        boxShadow: "none",
        borderBottom: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
        padding: "8px 0",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Left Side - Login/Profile */}
        {isAuthenticated ? (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircleIcon sx={{ fontSize: 32, color: isDarkMode ? "#F3F6F9" : "#1E293B" }} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            onClick={() => setOpenLogin(true)}
            sx={{
              background: "#2563EB",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: 600,
              px: 3,
              "&:hover": { background: "#1E40AF" },
            }}
          >
            Login
          </Button>
        )}

        {/* Center - Logo and Title */}
        <Box
          onClick={handleHomeClick}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            '&:hover': { opacity: 0.8 },
          }}
        >
          <img src="/logo.svg" alt="Learnify Logo" style={{ height: "40px", marginRight: "12px" }} />
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 700,
              fontSize: "1.5rem",
              color: isDarkMode ? "#F3F6F9" : "#1E293B",
            }}
          >
            Learnify
          </Typography>
        </Box>

        {/* Right Side - Theme Toggle */}
        <IconButton
          onClick={toggleTheme}
          sx={{
            ml: 2,
            color: isDarkMode ? "#F3F6F9" : "#1E293B",
          }}
        >
          {isDarkMode ? <LightModeIcon sx={{ fontSize: 28 }} /> : <DarkModeIcon sx={{ fontSize: 28 }} />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
