import createTheme from "@mui/material/styles/createTheme";

const getTheme = (isDarkMode) =>
  createTheme({
    typography: {
      fontFamily: '"Open Sans", sans-serif',
      h1: { fontFamily: '"Montserrat", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
      h2: { fontFamily: '"Montserrat", sans-serif', fontWeight: 700, letterSpacing: '-0.01em' },
      h3: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600 },
      h4: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600, fontSize: '1.75rem' },
      h5: { fontFamily: '"Montserrat", sans-serif', fontWeight: 500 },
      h6: { fontFamily: '"Montserrat", sans-serif', fontWeight: 500 },
      button: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600, textTransform: 'none', letterSpacing: '0.02em' },
      body1: { fontSize: '1rem', lineHeight: 1.6, letterSpacing: '0.01em' },
      body2: { fontSize: '0.875rem', lineHeight: 1.5, letterSpacing: '0.01em' },
    },
    palette: {
      mode: isDarkMode ? "dark" : "light",
      background: {
        default: isDarkMode ? "#0A1929" : "#F8FAFC",
        paper: isDarkMode ? "#132F4C" : "#FFFFFF",
      },
      primary: { main: isDarkMode ? "#66B2FF" : "#2563EB" },
      secondary: { main: isDarkMode ? "#FF9580" : "#F97316" },
      text: { primary: isDarkMode ? "#F3F6F9" : "#1E293B", secondary: isDarkMode ? "#B2BAC2" : "#64748B" },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "html, body": { margin: 0, padding: 0, minHeight: "100vh", fontFamily: '"Open Sans", sans-serif' },
          "#root": { minHeight: "100vh", position: "relative", transition: "all 0.5s ease-in-out" },
        },
      },
      MuiModal: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(4px)',
          },
        },
      },
    },
  });

export default getTheme;
