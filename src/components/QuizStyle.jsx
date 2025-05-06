// src/components/QuizStyle.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Banner from './Banner';
import { setQuizStyle } from '../store/actions/quizActions';
import { lightPattern, darkPattern } from '../theme/backgroundPatterns';
import { loadQuiz } from '../RoutesConfig'; // Import the loadQuiz function

const QuizStyle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category = useSelector(state => state.quiz.category);

  // Prefetch the Quiz component when the QuizStyle component mounts
  useEffect(() => {
    // Start prefetching immediately
    const prefetchQuiz = async () => {
      try {
        await loadQuiz();
      } catch (error) {
        console.error('Error prefetching Quiz component:', error);
      }
    };

    prefetchQuiz();
  }, []);

  // Redirect if no category selected
  useEffect(() => {
    if (!category) {
      navigate('/');
    }
  }, [category, navigate]);

  const styles = [
    {
      title: "Flash",
      color: "rgba(33, 150, 243, 0.8)",
      image: "Flash.jpg",
      description: "Quick 10-question sprint with 30 seconds per question. Perfect for a quick practice session."
    },
    {
      title: "Bolt",
      color: "rgba(244, 67, 54, 0.8)",
      image: "Bolt.jpg",
      description: "100 questions with 30 seconds each. A substantial challenge that tests your speed and accuracy."
    },
    {
      title: "Spartan",
      color: "rgba(76, 175, 80, 0.8)",
      image: "Sparta.jpg",
      description: "300 questions, 1 minute each. The ultimate endurance test for serious preparation."
    },
    {
      title: "Marathon",
      color: "rgba(255, 152, 0, 0.8)",
      image: "Marathon.jpg",
      description: "No time limit, infinite questions. Practice at your own pace until you're ready."
    }
  ];

  // Prefetch on hover for even faster loading
  const handleStyleHover = async () => {
    try {
      await loadQuiz();
    } catch (error) {
      console.error('Error prefetching Quiz component:', error);
    }
  };

  const handleStyleSelect = (style) => {
    dispatch(setQuizStyle(style));
    navigate('/quiz');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '64px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Background Layer */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme => theme.palette.mode === 'dark' ? darkPattern.backgroundImage : lightPattern.backgroundImage,
          backgroundColor: theme => theme.palette.mode === 'dark' ? darkPattern.backgroundColor : lightPattern.backgroundColor,
          backgroundSize: '20px 20px',
          opacity: theme => theme.palette.mode === 'dark' ? darkPattern.opacity : lightPattern.opacity,
          zIndex: -1,
        }}
      />
      <Grid
        container
        spacing={4}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          maxWidth: '1200px',
          padding: 2,
        }}
      >
        <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h4">Quiz Style</Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            Choose your preferred quiz format for {category}
          </Typography>
        </Grid>

        <Grid container item spacing={3} justifyContent="center">
          {styles.map((style) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={style.title}
              onMouseEnter={handleStyleHover}
            >
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Banner
                  title={style.title}
                  color={style.color}
                  image={style.image}
                  onClick={() => handleStyleSelect(style.title)}
                />
                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    textAlign: 'center',
                    color: 'text.secondary',
                    px: 1,
                  }}
                >
                  {style.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuizStyle;
