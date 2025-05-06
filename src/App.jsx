import React, { useState, useContext, useEffect, Suspense } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider as CustomThemeProvider, ThemeContext } from "./theme/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import RoutesConfig from "./RoutesConfig";
import getTheme from "./theme/theme";
import AuthContainer from "./components/AuthContainer";
import { useAuth } from './hooks/useAuth';

const App = () => {
  useAuth(); // This will handle automatic token validation on app load
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    console.log("Open profile is: ", openProfile)
  }, [openProfile]);

  return (
    <Router>
      <CustomThemeProvider>
        <AppContent
          openLogin={openLogin}
          setOpenLogin={setOpenLogin}
          openRegister={openRegister}
          setOpenRegister={setOpenRegister}
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
        />
      </CustomThemeProvider>
    </Router>
  );
};

const AppContent = ({
  openLogin,
  setOpenLogin,
  openRegister,
  setOpenRegister,
  openProfile,
  setOpenProfile
}) => {
  const { isDarkMode } = useContext(ThemeContext);
  const theme = getTheme(isDarkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Navbar
          openLogin={openLogin}
          setOpenLogin={setOpenLogin}
          openRegister={openRegister}
          setOpenRegister={setOpenRegister}
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
        />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <RoutesConfig
            openLogin={openLogin}
            setOpenLogin={setOpenLogin}
            openRegister={openRegister}
            setOpenRegister={setOpenRegister}
            openProfile={openProfile}
            setOpenProfile={setOpenProfile}
          />
        </Box>
        <Footer />
        <AuthContainer
          openLogin={openLogin}
          setOpenLogin={setOpenLogin}
          openRegister={openRegister}
          setOpenRegister={setOpenRegister}
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
        />
      </Box>
    </ThemeProvider>
  );
};

export default App;
