// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import quizReducer from './quizReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
