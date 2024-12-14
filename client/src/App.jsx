import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import AdminHeader from './components/AdminHeader.jsx'; // Import the AdminHeader
function App() {
  const isAdminRoute = location.pathname.startsWith("/admin");
  console.log(isAdminRoute)
  return (

    <BrowserRouter>
    <Header />
      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        
        {/* User Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
       
        {/* Admin Private Routes with AdminHeader */}
        <Route element={<AdminPrivateRoute />}>
          {/* Render AdminHeader only for admin routes */}
          
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
