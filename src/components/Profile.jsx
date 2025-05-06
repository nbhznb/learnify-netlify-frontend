// src/components/Profile.jsx
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

const Profile = ({ onClose }) => {
  const { user, updateProfile, logoutUser } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If user is not logged in, close the profile modal
  if (!user) {
    onClose();
    return null;
  }

  const handleUpdateProfile = async () => {
    setError('');

    if (!username.trim() || !email.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (password && password !== confirmPassword && !showPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      const updates = {
        username: username.trim(),
        email: email.trim(),
        ...(password && { password })
      };

      const result = await updateProfile(updates);

      if (result.success) {
        onClose();
      } else {
        setError(result.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        setIsLoading(true);
        const response = await fetch(`${APIURL}/user/profile`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (response.ok) {
          logoutUser();
          onClose();
        } else {
          setError('Failed to delete account');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
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
      <Typography variant="h5" gutterBottom>Profile</Typography>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
        required
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        required
      />
      <TextField
        label="New Password (optional)"
        fullWidth
        margin="normal"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      {!showPassword && password && (
        <TextField
          label="Confirm New Password"
          fullWidth
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
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
      {password && <PasswordStrength strength={calculatePasswordStrength(password)} />}
      {error && (
        <Typography color="error" sx={{ mt: 1, textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        fullWidth
        onClick={handleUpdateProfile}
        sx={{ mt: 2 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Update Profile'}
      </Button>
      <Button
        variant="contained"
        fullWidth
        onClick={handleDeleteAccount}
        sx={{
          mt: 2,
          bgcolor: 'error.main',
          '&:hover': { bgcolor: 'error.dark' }
        }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Delete Account'}
      </Button>
    </Box>
  );
};

export default Profile;
