import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersStart, deleteUserStart } from '../redux/admin/adminSlice'; // Assuming fetchUsers is an async action
import AdminUserTable from '../components/AdminUserTable';
import AdminUserForm from '../components/AdminUserForm';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { currentUser, users, loading, error } = useSelector(state => state.user);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUsersStart()); // Fetch all users on dashboard load
    }
  }, [dispatch, currentUser]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUserStart(userId)); // Dispatch delete action
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <AdminUserTable
        users={filteredUsers}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
      <AdminUserForm user={editingUser} />
    </div>
  );
};

export default AdminDashboard;
