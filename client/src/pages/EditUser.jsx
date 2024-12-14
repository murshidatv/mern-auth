import React, { useState, useEffect,useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const fileRef = useRef(null)
    const [image,setImage] = useState(undefined)
    const [imagePercent,setImagePercent]=useState(0);
    const [imageError,setImageError] = useState(false)
    const [formData,setFormData]=useState({})

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/admin/users/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setUser(data);
                } else {
                    setError('User not found');
                }
            } catch (err) {
                setError('Error fetching user data');
            }
        };

        fetchUser();
    }, [id]);

    useEffect(()=>{
        if(image){
          handleFileUpload(image)
        }
      },[image])
      const handleFileUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImagePercent(Math.round(progress));
          },
          (error) => {
            setImageError(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
              setFormData({ ...formData, profilePicture: downloadURL })
            );
          }
        );
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = { ...user, ...formData };
            const response = await fetch(`/api/admin/update/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
                credentials: 'include',
            });

            if (response.ok) {
                navigate('/admin/userDetails'); // Redirect back to user list
            } else {
                setError('Failed to update user');
            }
        } catch (err) {
            setError('Error updating user');
        }
    };

    if (error) return <p>{error}</p>;
    if (!user) return <p>Loading...</p>;

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className='text-3xl font-semibold text-center my-7'>Edit User</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
               
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={(e)=>setImage(e.target.files[0])}/>
        <img src={formData.profilePicture || user.profilePicture} alt="profile" onClick={()=>fileRef.current.click()} className="h-24 w-24 rounded-full self-center cursor-pointer object-cover mt-2"/>
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
                    
                    <input
                        className="bg-slate-100 rounded-lg p-3"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
               
                    
                    <input
                        className="bg-slate-100 rounded-lg p-3"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                
               
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80" type="submit">Update</button>
            </form>
        </div>
    );
}