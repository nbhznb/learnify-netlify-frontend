export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
export const RESET_QUIZ = 'RESET_QUIZ';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_QUIZ_STYLE = 'SET_QUIZ_STYLE';

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category
});

export const setCurrentQuestion = (index) => ({
  type: SET_CURRENT_QUESTION,
  payload: index
});

export const setQuestions = (questions) => ({
  type: SET_QUESTIONS,
  payload: questions
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
});

export const resetQuiz = () => ({
  type: RESET_QUIZ
});

export const setQuizStyle = (style) => ({
  type: SET_QUIZ_STYLE,
  payload: style
});

// Use environment variables with fallbacks
export const backendURL = import.meta.env.VITE_BACKEND_URL || "https://learnify-render-backend.onrender.com";
export const APIURL = import.meta.env.VITE_API_URL || "https://learnify-render-backend.onrender.com/api";

// For debugging during development
if (import.meta.env.DEV) {
  console.log('Using API URL:', APIURL);
  console.log('Using Backend URL:', backendURL);
}

// Thunk action creator for fetching questions
export const fetchQuestions = (category, limit = 10) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    let url = `${APIURL}/questions/${category.toLowerCase()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (category === 'NVR' || category === 'Spatial') {
      // For NVR and Spatial, fetch individual questions
      const question = data.questions[0];
      const mappedQuestion = {
        text: question.text,
        question: question.question,
        correctAnswer: question.answer,
        wrongAnswers: question.distractors,
        explanation: question.explanation,
        type: 'mcq',
      };
      dispatch(setQuestions([mappedQuestion]));
    } else {
      // For other categories, use the fetched JSON data
      const categoryQuestions = data.categories.flatMap(category => category.questions);
      if (!categoryQuestions.length) {
        throw new Error('No questions found for this category');
      }

      // For Marathon style, use all available questions
      if (limit === Infinity) {
        const shuffledQuestions = [...categoryQuestions].sort(() => Math.random() - 0.5);
        dispatch(setQuestions(shuffledQuestions));
        return;
      }

      // For other styles, ensure we have enough questions by duplicating if necessary
      let questions = [...categoryQuestions];
      while (questions.length < limit) {
        questions = [...questions, ...categoryQuestions];
      }

      // Shuffle and slice to get exact number needed
      const shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, limit);
      dispatch(setQuestions(shuffledQuestions));
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
