import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Banner = ({ title, color, image, onClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          width: '100%',
          paddingTop: '200%', // 1:2 aspect ratio
          backgroundColor: color,
          borderRadius: '8px',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          overflow: 'hidden',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
            '& .overlay': {
              opacity: 0.6,
            }
          },
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
          }}
        />

        {/* Color Overlay */}
        <Box
          className="overlay"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: color,
            opacity: 0.7,
            transition: 'opacity 0.3s ease-in-out',
            zIndex: 2,
          }}
        />



        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            position: 'absolute',
            bottom: '30px',
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            zIndex: 3,
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
