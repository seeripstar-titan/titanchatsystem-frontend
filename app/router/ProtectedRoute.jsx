import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If the user's role isn't allowed the route, redirect to their default dashboard
    return <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/agent-dashboard'} replace />;
  }

  return children;
};