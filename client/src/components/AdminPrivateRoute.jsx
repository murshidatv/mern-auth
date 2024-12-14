import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminPrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  // Check if the user is an admin (you can adjust the logic based on how you store user roles)
  if (!currentUser || currentUser.isAdmin !== true){
    // Redirect to home or sign-in page if not an admin
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default AdminPrivateRoute;
