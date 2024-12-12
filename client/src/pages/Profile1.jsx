import { useSelector }from 'react-redux'
import { useRef, useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { 
  updateUserStart,
  updateUserSuccess, 
  updateUserFailure, 
  deleteUserStart,
  deleteUserSuccess, 
  deleteUserFailure, 
} from '../redux/user/userSlice.js'
import { deleteUser } from '../../../api/controllers/user.controller.js';





function Profile() {
  const fileRef = useRef(null);
  const [ formData,setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  
  const handleChange = (e) => {
    setFormData({ ...formData,[e.target.id]: e.target.value });
  };
  //console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res = await fetch ('/api/auth/update',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
      });
      const data = await res.json();
      if (data.success === false){
        dispatch(updateUserStart(data));
        return;

      }
      dispatch(updateUserSuccess(data));

    }catch(error){
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async() => {
    try{
      dispatch(deleteUserStart());
      const res = await fetch (`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',

      });
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data));

        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch(error){
      dispatch(deleteUserFailure(error));
    }
  }




  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
<form onSubmit={handleSubmit}  className='flex flex-col gap-4'>
  <input type="file" ref= {fileRef} hidden accept='image/*'/>
  <img 
  src={currentUser.profilePicture}
  alt='profile'
  className='h-24 w-24 self-center cursor-pointer 
  rounded-full object-cover mt-2'
  onClick={() => fileRef.current.click()}
  />
  <input 
    defaultValue={currentUser.username} 
    type='text' 
    id= 'username'
    placeholder='Username' 
    className='bg-slate-100 rounded-lg p-3'
    onChange={handleChange} 
    />
  <input 
    defaultValue={currentUser.email} 
    type='email' 
    id= 'email'
    placeholder='Email' 
    className='bg-slate-100 placeholder:rounded-lg p-3' 
    onChange={handleChange}
    />
  <input 
    type='password' 
    id= 'password'
    placeholder='Password' 
    className='bg-slate-100 rounded-lg p-3' 
    onChange={handleChange}
    />
<button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95
disabled:opacity-80'>Update</button>

</form>
<div className='flex justify-between mt-5'>
  <span onClick= {handleDeleteAccount}className='text-red-700 cursor-pointer'>Delete 
    Account</span>
  <span className='text-red-700 cursor-pointer'>Sign Out</span>
</div>
    </div>
  )
}

export default Profile