// src/components/HomePage.jsx
import React, { memo, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import Banner from './Banner';
import { setCategory } from '../store/actions/quizActions';
import { lightPattern, darkPattern } from '../theme/backgroundPatterns';

const sections = [
  { title: "English", color: "rgba(33, 150, 243, 0.8)", image: "/Janenglish.jpg" },
  { title: "Maths", color: "rgba(244, 67, 54, 0.8)", image: "/Mathodious.jpg" },
  { title: "VR", color: "rgba(76, 175, 80, 0.8)", image: "/RobertVanDerVerb.jpg" },
  { title: "NVR", color: "rgba(255, 152, 0, 0.8)", image: "/Meliquiet.jpg" },
  { title: "Spatial", color: "rgba(128, 0, 128, 0.8)", image: "/Rubik.jpg" },
];

// Extract styles as constants
const containerStyle = {
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  paddingTop: "64px",
  position: "relative",
  zIndex: 1,
};

const backgroundStyle = (theme) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: theme.palette.mode === "dark" ? darkPattern.backgroundImage : lightPattern.backgroundImage,
  backgroundColor: theme.palette.mode === "dark" ? darkPattern.backgroundColor : lightPattern.backgroundColor,
  backgroundSize: "20px 20px",
  opacity: theme.palette.mode === "dark" ? darkPattern.opacity : lightPattern.opacity,
  zIndex: -1,
});

const gridContainerStyle = {
  maxWidth: "1500px",
  padding: 2,
};

const headerStyle = {
  textAlign: "center",
  mb: 4,
};

const loginButtonStyle = {
  background: "linear-gradient(135deg, #2563EB 30%, #1D4ED8 90%)",
  color: "#fff",
  padding: "12px 24px",
  fontSize: "16px",
  borderRadius: "30px",
  fontWeight: "600",
  textTransform: "none",
  boxShadow: "0px 4px 10px rgba(37, 99, 235, 0.4)",
  transition: "background 0.3s ease-in-out, transform 0.2s ease-in-out", // Specific transitions
  "&:hover": {
    background: "linear-gradient(135deg, #1D4ED8 30%, #2563EB 90%)",
    boxShadow: "0px 6px 12px rgba(37, 99, 235, 0.5)",
    transform: "translateY(-2px)",
  },
  mx: 1,
};

const registerButtonStyle = {
  background: "linear-gradient(135deg, #F97316 30%, #EA580C 90%)",
  color: "#fff",
  padding: "12px 24px",
  fontSize: "16px",
  borderRadius: "30px",
  fontWeight: "600",
  textTransform: "none",
  boxShadow: "0px 4px 10px rgba(249, 115, 22, 0.4)",
  transition: "background 0.3s ease-in-out, transform 0.2s ease-in-out", // Specific transitions
  "&:hover": {
    background: "linear-gradient(135deg, #EA580C 30%, #F97316 90%)",
    boxShadow: "0px 6px 12px rgba(249, 115, 22, 0.5)",
    transform: "translateY(-2px)",
  },
  mx: 1,
};

const HomePage = memo(({
  openLogin,
  setOpenLogin,
  openRegister,
  setOpenRegister,
  openProfile,
  setOpenProfile
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, logoutUser } = useAuth();

  const handleSectionClick = useCallback((title) => {
    dispatch(setCategory(title));
    navigate("/style");
  }, [dispatch, navigate]);

  const handleLoginClick = useCallback(() => {
    setOpenLogin(true);
  }, [setOpenLogin]);

  const handleRegisterClick = useCallback(() => {
    setOpenRegister(true);
  }, [setOpenRegister]);

  return (
    <Box sx={containerStyle}>
      {/* Background pattern */}
      <Box sx={backgroundStyle} />

      <Grid container spacing={4} direction="column" alignItems="center" justifyContent="center" sx={gridContainerStyle}>
        <Grid item xs={12} sx={headerStyle}>
          <Typography variant="h4" gutterBottom>
            Welcome to Learnify – The Ultimate 11+ Mock Exam Experience!
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: "800px", textAlign: "center" }}>
            Learnify is an interactive and engaging platform designed for <strong>Wright Education</strong>, offering 11+ students a dynamic way to study and revise. Covering all five essential sections—<strong>English, Maths, Verbal Reasoning (VR), Non-Verbal Reasoning (NVR), and Spatial Reasoning</strong>—Learnify transforms exam preparation into an exciting journey. Students can tailor their learning experience by selecting different quiz styles, making revision not only effective but also fun!
          </Typography>
        </Grid>

        {isAuthenticated ? (
          <>
            <Grid item xs={12} sx={headerStyle}>
              <Typography variant="h5">Choose a Section</Typography>
            </Grid>

            <Grid container item spacing={3} justifyContent="center">
              {sections.map((section) => (
                <Grid item xs={12} sm={4} md={2.4} key={section.title}>
                  <Banner title={section.title} color={section.color} image={section.image} onClick={() => handleSectionClick(section.title)} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Grid item xs={12} sx={headerStyle}>
            <Button
              variant="contained"
              onClick={handleLoginClick}
              sx={loginButtonStyle}
            >
              Login
            </Button>

            <Button
              variant="contained"
              onClick={handleRegisterClick}
              sx={registerButtonStyle}
            >
              Register
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
});

export default HomePage;
