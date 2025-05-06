// src/hooks/useAuth.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, clearCredentials, updateUser, selectAuth } from '../features/authSlice';
import { APIURL } from '../store/actions/quizActions';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const validateToken = async (token) => {
    try {
      const response = await fetch(`${APIURL}/auth/user/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Token validation failed');

      const userData = await response.json();
      return { isValid: true, userData };
    } catch (error) {
      return { isValid: false };
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      const userDataString = localStorage.getItem('userData');

      if (token && userDataString) {
        const { isValid, userData: freshUserData } = await validateToken(token);
        if (isValid) {
          const storedUserData = JSON.parse(userDataString);
          dispatch(setCredentials({
            user: { ...freshUserData, id: storedUserData.id },
            token
          }));
        } else {
          dispatch(clearCredentials());
        }
      }
    };

    initializeAuth();
  }, [dispatch]);

  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    token: auth.token,

    loginUser: async (username, password) => {
      try {
        const response = await fetch(`${APIURL}/auth/user/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Invalid credentials');

        const userData = { id: data.user, username };
        dispatch(setCredentials({ user: userData, token: data.access_token }));
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    logoutUser: () => {
      dispatch(clearCredentials());
    },

    updateProfile: async (updates) => {
      if (!auth.token) {
        dispatch(clearCredentials());
        return { success: false, error: 'Not authenticated' };
      }

      try {
        const response = await fetch(`${APIURL}/auth/user/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`
          },
          body: JSON.stringify(updates)
        });

        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401) dispatch(clearCredentials());
          throw new Error(data.error || 'Update failed');
        }

        dispatch(updateUser(updates));
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  };
};
