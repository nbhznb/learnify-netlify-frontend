import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const PasswordStrength = ({ strength }) => {
  const getStrengthText = (strength) => {
    switch (strength) {
      case 0:
        return { text: 'Very Weak', color: 'red' };
      case 1:
        return { text: 'Weak', color: 'orange' };
      case 2:
        return { text: 'Fair', color: 'yellow' };
      case 3:
        return { text: 'Good', color: 'blue' };
      case 4:
        return { text: 'Strong', color: 'green' };
      case 5:
        return { text: 'Very Strong', color: 'darkgreen' };
      default:
        return { text: 'Very Weak', color: 'red' };
    }
  };

  const strengthInfo = getStrengthText(strength);

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Box sx={{ display: 'flex', height: '4px', overflow: 'hidden', bgcolor: 'grey.200', borderRadius: 1 }}>
        {[...Array(5)].map((_, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              bgcolor: index < strength ? strengthInfo.color : 'grey.200',
              ml: index > 0 ? 0.5 : 0
            }}
          />
        ))}
      </Box>
      <Typography variant="caption" sx={{ textAlign: 'right', color: strength >= 3 ? 'success.main' : 'error.main' }}>
        {strengthInfo.text}
      </Typography>
    </Box>
  );
};

export const calculatePasswordStrength = (password) => {
  if (!password) return 0;

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  return strength;
};
