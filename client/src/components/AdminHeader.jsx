import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
const AdminHeader = () => {
  const {currentUser}=useSelector(state=>state.user)
  return (
    <div className='bg-cyan-100'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/admin/dashboard'>
        <h1 className='font-bold'>Admin App</h1>
        </Link>
        <ul className='flex gap-4'>
            <Link to='/admin/userDetails'> <li>User Data</li></Link>
            
            <Link to='/admin/profile'>
            {currentUser ? (
              <img src={currentUser.profilePicture} alt="profile" className="h-7 w-7 rounded-full object-cover"/>
            ) : (
            <li>Sign In</li>
            )}
             
            </Link>
        </ul>
      </div>
    </div>
  )
}

export default AdminHeader