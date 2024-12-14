import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminRoute() {
  const { currentUser } = useSelector(state => state.user);

  // If the user is not logged in or is not an admin, redirect to the homepage or another page
  if (!currentUser || currentUser.isAdmin !== 1) {
    return <Navigate to="/" />;  // Redirect to the home page if not an admin
  }

  return <Outlet />;  // Allow access to the dashboard if the user is an admin
}