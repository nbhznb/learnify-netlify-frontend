// RoutesConfig.js
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./components/HomePage";
import QuizStyle from "./components/QuizStyle";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Results from "./components/Results";

// Create the lazy loaded quiz component
const Quiz = React.lazy(() => import('./components/Quiz'));

// Export the loadQuiz function for prefetching
export const loadQuiz = () => import('./components/Quiz');

// Loading component remains the same
const LoadingComponent = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="400px"
  >
    <CircularProgress />
  </Box>
);

const RoutesConfig = ({
  openLogin,
  setOpenLogin,
  openRegister,
  setOpenRegister,
  openProfile,
  setOpenProfile
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            openLogin={openLogin}
            setOpenLogin={setOpenLogin}
            openRegister={openRegister}
            setOpenRegister={setOpenRegister}
            openProfile={openProfile}
            setOpenProfile={setOpenProfile}
          />
        }
      />
      <Route path="/style" element={<ProtectedRoute component={QuizStyle} />} />
      <Route
        path="/quiz"
        element={
          <ProtectedRoute
            component={() => (
              <Suspense fallback={<LoadingComponent />}>
                <Quiz />
              </Suspense>
            )}
          />
        }
      />
      <Route path="/results" element={<ProtectedRoute component={Results} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RoutesConfig;
