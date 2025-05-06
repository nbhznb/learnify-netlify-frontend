// ProtectedRoute.js
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ component: Component }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = useSelector(state => state.quiz);
  const { isAuthenticated, user, logoutUser } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    // For Quiz route
    if (location.pathname === '/quiz' && !category) {
      navigate('/');
      return;
    }

    // For Results route
    if (location.pathname === '/results' && !location.state) {
      navigate('/');
      return;
    }
  }, [location, navigate, category, isAuthenticated]);

  // Handle the case where the component is wrapped in Suspense
  if (typeof Component !== 'function') {
    return Component;
  }

  return <Component />;
};

export default ProtectedRoute;
