import React, { useState, memo, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useAuth } from '../hooks/useAuth';

// Extract styles as constants to prevent recreation on each render
const containerStyle = {
  p: 3,
  bgcolor: 'background.paper',
  borderRadius: 2,
  width: '400px',
  position: 'relative',
  // Avoid transition: all
  transition: 'opacity 0.2s ease-out',
  // Add GPU acceleration
  WebkitBackfaceVisibility: 'hidden',
  backfaceVisibility: 'hidden',
};

const titleStyle = { mb: 2 };
const errorStyle = { mt: 1, textAlign: 'center' };
const primaryButtonStyle = { mt: 2 };
const secondaryButtonStyle = { mt: 1 };

const Login = memo(({ onClose, onRegisterClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useAuth();

  // Use useCallback to memoize handlers
  const handleLogin = useCallback(async () => {
    // Reset error state
    setError('');

    // Validate inputs
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      const result = await loginUser(username.trim(), password);

      if (result.success) {
        setIsLoading(false);
        onClose();
      } else {
        setError(result.error || 'Login failed. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  }, [username, password, loginUser, onClose]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  }, [handleLogin]);

  const handleUsernameChange = useCallback((e) => setUsername(e.target.value), []);
  const handlePasswordChange = useCallback((e) => setPassword(e.target.value), []);
  const handleShowPasswordChange = useCallback((e) => setShowPassword(e.target.checked), []);

  return (
    <Box sx={containerStyle}>
      <Typography variant="h5" gutterBottom sx={titleStyle}>
        Login
      </Typography>

      <TextField
        label="Username/Email"
        fullWidth
        margin="normal"
        value={username}
        onChange={handleUsernameChange}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
        autoFocus
        autoComplete="username"
      />

      <TextField
        label="Password"
        fullWidth
        margin="normal"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handlePasswordChange}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
        autoComplete="current-password"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={showPassword}
            onChange={handleShowPasswordChange}
            disabled={isLoading}
          />
        }
        label="Show Password"
      />

      {error && (
        <Typography
          color="error"
          sx={errorStyle}
        >
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        fullWidth
        onClick={handleLogin}
        sx={primaryButtonStyle}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
      </Button>

      <Button
        fullWidth
        onClick={onRegisterClick}
        sx={secondaryButtonStyle}
        disabled={isLoading}
      >
        Register
      </Button>
    </Box>
  );
});

export default Login;
