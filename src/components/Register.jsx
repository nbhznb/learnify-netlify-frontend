// src/components/Register.jsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../hooks/useAuth';
import { calculatePasswordStrength, PasswordStrength } from './PasswordStrength';
import { APIURL } from '../store/actions/quizActions';

const Register = ({ onClose, onLoginClick }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useAuth();

  // Log the API URL for debugging
  console.log('APIURL:', APIURL);
  console.log('Environment variables:', import.meta.env.VITE_API_URL, import.meta.env.VITE_BACKEND_URL);

  const handleRegister = async () => {
    // Reset error state
    setError('');

    // Validate inputs
    if (!email.trim() || !username.trim() || !password || (!showPassword && !confirmPassword)) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword && !showPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      console.log('Making API request to:', `${APIURL}/auth/user/register`);
      const response = await fetch(`${APIURL}/auth/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          username: username.trim(),
          password
        })
      });

      const data = await response.json();
      console.log('API response:', data);

      if (response.ok) {
        // Auto-login after successful registration
        await loginUser(username.trim(), password);
        onClose();
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <Box sx={{
      p: 3,
      bgcolor: 'background.paper',
      borderRadius: 2,
      width: '400px',
      maxHeight: '90vh',
      overflowY: 'auto'
    }}>
      <Typography variant="h5" gutterBottom>Register</Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
        autoFocus
        autoComplete="email"
      />
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
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
        autoComplete="new-password"
      />
      {!showPassword && (
        <TextField
          label="Confirm Password"
          fullWidth
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          autoComplete="new-password"
        />
      )}
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
      <PasswordStrength strength={calculatePasswordStrength(password)} />
      {error && (
        <Typography color="error" sx={{ mt: 1, textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        fullWidth
        onClick={handleRegister}
        sx={{ mt: 2 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
      </Button>
      <Button
        fullWidth
        onClick={onLoginClick}
        sx={{ mt: 1 }}
        disabled={isLoading}
      >
        Back to Login
      </Button>
    </Box>
  );
};

export default Register;
