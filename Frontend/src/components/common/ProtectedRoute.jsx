import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ClipLoader } from 'react-spinners';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <ClipLoader size={50} color="#a7afff" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to the appropriate login page based on target role
    let redirectPath = '/userLogin';
    if (allowedRoles.includes('admin')) {
      redirectPath = '/adminLogin';
    } else if (allowedRoles.includes('owner')) {
      redirectPath = '/ownerLogin';
    }
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // If authenticated but wrong role, redirect to appropriate home
    if (role === 'admin') return <Navigate to="/adminHome" replace />;
    if (role === 'owner') return <Navigate to="/ownerHome" replace />;
    return <Navigate to="/userHome" replace />;
  }

  return children;
};

export default ProtectedRoute;
