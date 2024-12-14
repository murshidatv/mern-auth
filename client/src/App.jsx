import { BrowserRouter , Route , Routes ,useLocation} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import AdminHeader from "./components/AdminHeader"
import PrivateRoute from "./components/PrivateRoute"
import AdminDashboard from "./pages/AdminDashboard"
import AdminRoute from "./components/AdminRoute"
import AdminProfile from './pages/AdminProfile'
import AdminData from "./pages/AdminData"
import EditUser from "./pages/EditUser"
export default function App() {

  return (
   
    <BrowserRouter>
      <AppWithHeader />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/userDetails" element={<AdminData />} />
          <Route path="/admin/edit/:id" element={<EditUser />} /> 
        </Route>
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

// Create a new component that wraps the header logic
function AppWithHeader() {
  const location = useLocation(); // Get the current location (path)

  // Conditionally render the header based on the route
  const renderHeader = () => {
    if (location.pathname.startsWith("/admin")) {
      // Render AdminHeader only for admin routes
      return <AdminHeader />;
    } else {
      // Render regular Header for all other routes
      return <Header />;
    }
  };

  return renderHeader();
}