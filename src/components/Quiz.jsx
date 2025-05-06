import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { fetchQuestions, resetQuiz, backendURL, APIURL } from '../store/actions/quizActions';
import Chart from './Chart';

const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors
  const category = useSelector(state => state.quiz.category);
  const questions = useSelector(state => state.quiz.questions);
  const isLoading = useSelector(state => state.quiz.isLoading);
  const error = useSelector(state => state.quiz.error);
  const currentQuestionIndex = useSelector(state => state.quiz.currentQuestionIndex);
  const quizStyle = useSelector(state => state.quiz.quizStyle);

  // Use refs to persist values across renders
  const totalQuestionsAnsweredRef = useRef(0);
  const correctAnswersRef = useRef(0);
  const wrongAnswersRef = useRef(0);
  const isFetchingRef = useRef(false);

  // Define currentQ first since other hooks depend on it
  const currentQ = useMemo(() =>
    questions.length > 0 ? questions[currentQuestionIndex] : null,
    [questions, currentQuestionIndex]
  );

  // Constants that depend on currentQ
  const isSequentialFetch = category === 'NVR' || category === 'Spatial';
  const isWritingPrompt = useMemo(() =>
    currentQ && category === 'English' && currentQ.type === 'writing-prompt',
    [currentQ, category]
  );

  // Timer initialization
  const initialTimer = useMemo(() => {
    switch (quizStyle) {
      case 'Spartan': return 60;
      case 'Flash':
      case 'Bolt': return 30;
      case 'Marathon': return 0;
      default: return 30;
    }
  }, [quizStyle]);

  // State
  const [timer, setTimer] = useState(initialTimer);
  const [disabled, setDisabled] = useState(false);
  const [result, setResult] = useState('');
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [diagramUrl, setDiagramUrl] = useState(null);

  // Questions limit
  const questionsLimit = useMemo(() => {
    switch (quizStyle) {
      case 'Flash': return 10;
      case 'Bolt': return 100;
      case 'Spartan': return 300;
      case 'Marathon': return Infinity;
      default: return 10;
    }
  }, [quizStyle]);

  // Shuffle function
  const shuffleArray = useCallback((array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }, []);

  // Initialize quiz
  useEffect(() => {
    if (!category || !quizStyle) {
      navigate('/');
      return;
    }

    // Reset progress when starting a new quiz
    totalQuestionsAnsweredRef.current = 0;
    correctAnswersRef.current = 0;
    wrongAnswersRef.current = 0;

    if (isSequentialFetch) {
      dispatch(fetchQuestions(category, 1));
    } else {
      dispatch(fetchQuestions(category, questionsLimit));
    }
  }, [category, quizStyle, questionsLimit, dispatch, navigate, isSequentialFetch]);

  // Handle shuffled answers
  useEffect(() => {
    if (currentQ?.type === 'mcq') {
      const answers = shuffleArray([...currentQ.wrongAnswers, currentQ.correctAnswer]);
      setShuffledAnswers(answers);
    }
  }, [currentQuestionIndex, currentQ, shuffleArray]);

  // Timer effect
  useEffect(() => {
    let timeoutId;

    if (timer > 0 && !disabled && !showExplanation && quizStyle !== 'Marathon' && !isWritingPrompt) {
      timeoutId = setTimeout(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && !disabled && quizStyle !== 'Marathon' && !isWritingPrompt) {
      // Only trigger handleSkip if we're not already fetching
      if (!isFetchingRef.current) {
        handleSkip();
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timer, disabled, showExplanation, quizStyle, isWritingPrompt]);

  // Handle diagram fetching
  useEffect(() => {
    if (currentQ?.type === 'diagram') {
      const fetchDiagram = async () => {
        try {
          const response = await fetch(`${APIURL}/diagram`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentQ)
          });
          const data = await response.json();
          setDiagramUrl(data.image_url);
        } catch (err) {
          console.error("Error fetching diagram:", err);
        }
      };
      fetchDiagram();
    } else {
      setDiagramUrl(null);
    }
  }, [currentQ]);

  // Define proceedToNextQuestion before it's used in other functions
  const proceedToNextQuestion = useCallback((isCorrect) => {
    if (isFetchingRef.current) return;

    totalQuestionsAnsweredRef.current += 1;
    if (isCorrect) {
      correctAnswersRef.current += 1;
    } else {
      wrongAnswersRef.current += 1;
    }

    if (totalQuestionsAnsweredRef.current >= questionsLimit) {
      navigate('/results', {
        state: {
          correctAnswers: correctAnswersRef.current,
          wrongAnswers: wrongAnswersRef.current,
          category
        }
      });
      return;
    }

    if (isSequentialFetch) {
      isFetchingRef.current = true;
      dispatch(fetchQuestions(category, 1))
        .then(() => {
          setResult('');
          setDisabled(false);
          setShowExplanation(false);
          setTimer(initialTimer);
          isFetchingRef.current = false;
        })
        .catch(() => {
          isFetchingRef.current = false;
        });
    } else {
      if (currentQuestionIndex < questions.length - 1) {
        dispatch({ type: 'SET_CURRENT_QUESTION', payload: currentQuestionIndex + 1 });
        setResult('');
        setDisabled(false);
        setShowExplanation(false);
        setTimer(initialTimer);
      } else {
        navigate('/results', {
          state: {
            correctAnswers: correctAnswersRef.current,
            wrongAnswers: wrongAnswersRef.current,
            category
          }
        });
      }
    }
  }, [
    isSequentialFetch,
    questionsLimit,
    category,
    dispatch,
    navigate,
    initialTimer,
    currentQuestionIndex,
    questions.length
  ]);

  // Define handleSkip before it's used in other functions
  const handleSkip = useCallback(() => {
    if (isFetchingRef.current) return;

    setDisabled(true);
    wrongAnswersRef.current += 1;
    totalQuestionsAnsweredRef.current += 1;

    if (totalQuestionsAnsweredRef.current >= questionsLimit) {
      navigate('/results', {
        state: {
          correctAnswers: correctAnswersRef.current,
          wrongAnswers: wrongAnswersRef.current,
          category
        }
      });
      return;
    }

    if (isSequentialFetch) {
      isFetchingRef.current = true;
      dispatch(fetchQuestions(category, 1))
        .then(() => {
          setResult('');
          setDisabled(false);
          setShowExplanation(false);
          setTimer(initialTimer);
          isFetchingRef.current = false;
        })
        .catch(() => {
          isFetchingRef.current = false;
        });
    } else {
      if (currentQuestionIndex < questions.length - 1) {
        dispatch({ type: 'SET_CURRENT_QUESTION', payload: currentQuestionIndex + 1 });
        setResult('');
        setDisabled(false);
        setShowExplanation(false);
        setTimer(initialTimer);
      } else {
        navigate('/results', {
          state: {
            correctAnswers: correctAnswersRef.current,
            wrongAnswers: wrongAnswersRef.current,
            category
          }
        });
      }
    }
  }, [
    currentQuestionIndex,
    questions.length,
    category,
    dispatch,
    navigate,
    initialTimer,
    isSequentialFetch,
    questionsLimit
  ]);

  // Define handleEndQuiz before it's used in other functions
  const handleEndQuiz = useCallback(() => {
    navigate('/results', {
      state: {
        correctAnswers: correctAnswersRef.current,
        wrongAnswers: wrongAnswersRef.current,
        category
      }
    });
  }, [correctAnswersRef, wrongAnswersRef, category, navigate]);

  // Memoize handlers
  const handleAnswer = useCallback(async (selectedAnswer, selectedIndex) => {
    setDisabled(true);

    const cleanedAnswer = currentQ.type === 'diagram'
      ? currentQ.correctAnswer.replace(/\s*cm[²³]\s*/, '').trim()
      : currentQ.correctAnswer;
    const cleanedSelected = currentQ.type === 'diagram'
      ? selectedAnswer.replace(/\s*cm[²³]\s*/, '').trim()
      : selectedAnswer;

    const isCorrect = cleanedSelected === cleanedAnswer;

    if (isCorrect) {
      setResult('Correct!');
      setTimeout(() => {
        proceedToNextQuestion(isCorrect);
      }, 2000);
    } else {
      setResult(`Incorrect. You chose "${selectedAnswer}", but the correct answer is "${currentQ.correctAnswer}"`);
      setShowExplanation(true);
    }
  }, [currentQ, proceedToNextQuestion]);

  const handleEssay = useCallback(async () => {
    setDisabled(true);

    // Automatically mark as correct if the question is of type essay
    setResult('Correct!');
    setTimeout(() => {
      proceedToNextQuestion(true);
    }, 2000);
    document.getElementById('essay').value = '';
  }, [proceedToNextQuestion]);

  // Early return conditions
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!questions.length || !currentQ) return null;

  // Calculate progress
  const progress = isSequentialFetch
    ? (totalQuestionsAnsweredRef.current / questionsLimit) * 100
    : (currentQuestionIndex / questions.length) * 100;

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: '64px',
        width: '100vw',
        position: 'relative',
        px: 2,
        marginTop: '100px',
        marginBottom: '100px'
      }}
    >
      {/* Main content container */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: theme => theme.palette.background.paper,
          borderRadius: 2,
          p: 4,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          minHeight: '400px'
        }}
      >
        {/* Header */}
        <Box sx={{ width: '100%', textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            {category}
          </Typography>

          {quizStyle !== 'Marathon' && (
            <Typography variant="h6" sx={{ mb: 2 }}>
              {isWritingPrompt ? 'Timer paused for writing prompt' : `Time Remaining: ${timer}s`}
            </Typography>
          )}

          {/* Progress Bar */}
          <Box sx={{ width: '100%', mb: 3 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                },
              }}
            />
            {quizStyle !== 'Marathon' && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Question {Math.min(totalQuestionsAnsweredRef.current + 1, questionsLimit)} of {questionsLimit}
              </Typography>
            )}
          </Box>

          {/* Result Message */}
          <Typography
            variant="body1"
            sx={{
              color: result.includes('Correct') ? 'success.main' : 'error.main',
              fontWeight: 'bold',
              minHeight: '24px',
            }}
          >
            {result}
          </Typography>
        </Box>

        {/* Question */}
        <Box sx={{ width: '100%', mb: 4 }}>
          {currentQ.type === 'chart' ? (
            <>
              <Typography variant="h6" sx={{ mb: 4 }}>
                {currentQ.text}
              </Typography>
              <Box sx={{ width: '100%', mb: 4, display: 'flex', justifyContent: 'center' }}>
                <Chart question={currentQ} />
              </Box>
            </>
          ) : currentQ.type === 'diagram' ? (
            <>
              <Typography variant="h6" sx={{ mb: 4 }}>
                {currentQ.text}
              </Typography>
              {diagramUrl ? (
                <Box sx={{ width: '100%', mb: 4 }}>
                  <img
                    src={diagramUrl}
                    alt="Diagram"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxWidth: '700px',
                      maxHeight: '500px',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              ) : (
                <CircularProgress />
              )}
            </>
          ) : category === 'NVR' || category === 'Spatial' ? (
            <>
              <Typography variant="h6" sx={{ mb: 4 }}>
                {currentQ.text}
              </Typography>
              <Box sx={{ width: '100%', mb: 4 }}>
                <img
                  src={`${backendURL}${currentQ.question}`}
                  alt="Question"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '500px',
                    maxHeight: '300px',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </>
          ) : (
            <Typography variant="h6" sx={{ mb: 4 }}>
              {currentQ.text}
            </Typography>
          )}
        </Box>

        {/* Answers */}
        <Grid container spacing={2}>
          {category === 'NVR' || category === 'Spatial' ? (
            shuffledAnswers.map((answer, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box
                  onClick={() => handleAnswer(answer, index + 1)}
                  sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '2px solid transparent',
                    '&:hover': {
                      borderColor: '#1976d2', // Highlight on hover
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {index + 1}
                  </Typography>
                  <img
                    src={`${backendURL}${answer}`}
                    alt={`Answer ${index + 1}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxWidth: '120px',
                      maxHeight: '120px',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              </Grid>
            ))
          ) : currentQ.type === 'mcq' ? (
            shuffledAnswers.map((answer, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleAnswer(answer, index + 1)}
                  disabled={disabled}
                  sx={{
                    minHeight: '50px',
                    textTransform: 'none',
                    fontSize: '1rem',
                  }}
                >
                  {answer}
                </Button>
              </Grid>
            ))
          ) : currentQ.type === 'writing-prompt' || currentQ.type === 'text-analysis' ? (
            <Grid item xs={12}>
              <textarea
                id="essay"
                placeholder="Enter your answer"
                disabled={disabled}
                style={{
                  width: '100%',
                  height: '400px',
                  padding: '12px',
                  fontSize: '1rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              ></textarea>
              <Button
                variant="contained"
                onClick={() => handleEssay()}
                sx={{
                  background: "linear-gradient(135deg, #4CAF50 30%, #458B00 90%)",
                  color: "#fff",
                  padding: "12px 24px",
                  fontSize: "16px",
                  borderRadius: "30px",
                  fontWeight: "600",
                  textTransform: "none",
                  boxShadow: "0px 4px 10px rgba(76, 175, 80, 0.4)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    background: "linear-gradient(135deg, #458B00 30%, #4CAF50 90%)",
                    boxShadow: "0px 6px 12px rgba(76, 175, 80, 0.5)",
                  },
                  mx: 1,
                }}
              >
                Submit
              </Button>

            </Grid>
          ) : (
            <Grid item xs={12}>
              <input
                type="text"
                placeholder="Enter your answer"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAnswer(e.target.value);
                  }
                }}
                disabled={disabled}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </Grid>
          )}
        </Grid>

        {/* Explanation Section */}
        {showExplanation && (
          <Box
            sx={{
              mt: 4,
              p: 3,
              backgroundColor: 'background.default',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
              Explanation:
            </Typography>
            <Typography variant="body1">{currentQ.explanation}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => proceedToNextQuestion(false)}
              sx={{
                mt: 3,
                textTransform: 'none',
                fontSize: '1rem',
              }}
            >
              Next Question
            </Button>
          </Box>
        )}

        {/* Buttons Container */}
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="outlined"
            color="warning"
            onClick={handleSkip}
            disabled={disabled || showExplanation}
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            Skip Question
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleEndQuiz}
            disabled={showExplanation}
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            End Quiz
          </Button>
        </Box>

      </Box>
    </Box>
  );
};

export default React.memo(Quiz);
