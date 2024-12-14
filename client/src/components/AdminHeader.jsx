import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../redux/user/userSlice'; // Assuming you have a signOut action

import { Link } from 'react-router-dom'
const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user.currentUser);
  // Logout functionality
  const handleLogout = () => {
    dispatch(signOut()); // Assuming you have a signOut action that clears the user state
    navigate('/sign-in'); // Redirect to login page after logout
  };

  return (
   
     
        <div className='bg-slate-200'> 
                <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                    <Link to ='/'>
                    <h1 className='font-bold'>Admin Dashboard</h1>
                    </Link>
                    <ul className='flex gap-4'>
                        <Link to='/'>
                        <li>Home</li>
                        </Link>
                        <Link to='/about'>
                        <li>About</li>
                        </Link>
                       
                        
                    </ul>
       
        {currentUser ? (
          <div className="admin-info">
            <span>Welcome, {currentUser.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <p>You are not logged in</p>
          </div>
        )}
      
  </div>
  </div>
  )
}

export default AdminHeader;


