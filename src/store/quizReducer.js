import {
  SET_CATEGORY,
  SET_QUESTIONS,
  SET_CURRENT_QUESTION,
  RESET_QUIZ,
  SET_LOADING,
  SET_ERROR,
  SET_QUIZ_STYLE
} from './actions/quizActions';

const initialState = {
  category: null,
  questions: [],
  currentQuestionIndex: 0,
  isLoading: false,
  error: null,
  isCompleted: false,
  quizStyle: null
};


const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        isCompleted: false,
        error: null
      };
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        currentQuestionIndex: 0,
        error: null
      };
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case RESET_QUIZ:
      return initialState;
    case SET_QUIZ_STYLE:
      return {
        ...state,
        quizStyle: action.payload
      };
    default:
      return state;
  }
};

export default quizReducer;
