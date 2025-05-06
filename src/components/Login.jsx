import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useAuth } from '../hooks/useAuth';

const Login = ({ onClose, onRegisterClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useAuth();

  const handleLogin = async () => {
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
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Box sx={{
      p: 3,
      bgcolor: 'background.paper',
      borderRadius: 2,
      width: '400px',
      position: 'relative'
    }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Login
      </Typography>

      <TextField
        label="Username/Email"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
        autoComplete="current-password"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            disabled={isLoading}
          />
        }
        label="Show Password"
      />

      {error && (
        <Typography
          color="error"
          sx={{ mt: 1, textAlign: 'center' }}
        >
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        fullWidth
        onClick={handleLogin}
        sx={{ mt: 2 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
      </Button>

      <Button
        fullWidth
        onClick={onRegisterClick}
        sx={{ mt: 1 }}
        disabled={isLoading}
      >
        Register
      </Button>
    </Box>
  );
};

export default Login;
