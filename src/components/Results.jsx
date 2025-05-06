import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { resetQuiz } from '../store/actions/quizActions';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { correctAnswers, wrongAnswers, category, quizStyle } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  }, [location.state, navigate]);

  const handleRetry = () => {
    dispatch(resetQuiz());
    navigate('/');
  };

  if (!category) {
    navigate('/');
    return null;
  }

  const totalQuestions = correctAnswers + wrongAnswers;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100) || 0;

  return (
    <Box sx={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      mt: '64px',
      width: '100vw',
      position: 'relative',
      px: 2
    }}>
      <Box sx={{
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme => theme.palette.background.paper,
        borderRadius: 2,
        p: 4,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Quiz Complete!</Typography>

        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 4 }}>
          <CircularProgress
            variant="determinate"
            value={percentage}
            size={120}
            thickness={4}
            sx={{ color: percentage >= 70 ? 'success.main' : 'warning.main' }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" component="div">
              {percentage}%
            </Typography>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
            {category}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
            {quizStyle} Style
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Correct Answers: {correctAnswers}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Wrong Answers: {wrongAnswers}
          </Typography>
          <Typography variant="body1">
            Total Questions: {totalQuestions}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleRetry}
          sx={{
            textTransform: 'none',
            fontSize: '1rem'
          }}
        >
          Try Another Quiz
        </Button>
      </Box>
    </Box>
  );
};

export default Results;
