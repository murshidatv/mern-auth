import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createUserStart, updateUserStart } from '../redux/admin/adminSlice';

const AdminUserForm = ({ user }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      dispatch(updateUserStart({ id: user.id, name, email }));
    } else {
      dispatch(createUserStart({ name, email }));
    }
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">{user ? 'Update User' : 'Create User'}</button>
    </form>
  );
};

export default AdminUserForm;
