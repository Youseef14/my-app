import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user');

  if (!isAuthenticated) {
    return <Navigate to="/register" />;
  }

  return children;
};

export default ProtectedRoute;
