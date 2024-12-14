import React , {useState,useEffect} from 'react'

import { useParams, useNavigate } from 'react-router-dom';


export default function AdminData() {

    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch('/api/admin/users');
            const data = await response.json();
            
            if (response.ok) {
              setUsers(data); 
            } else {
              setError('Failed to load users');
            }
          } catch (err) {
            setError('An error occurred while fetching users');
          } finally {
            setLoading(false);
          }
        };
    
        fetchUsers();
      }, []);

      const handleSearch = async () => {
        try {
            const response = await fetch(`/api/admin/users/search?query=${searchQuery}`);
            const data = await response.json();
            if (response.ok) {
                setUsers(data); // Update user list with search results
            } else {
                setError("Failed to perform search");
            }
        } catch (err) {
            setError("Error performing search");
        }
    };

      const handleEdit = (userId) => {
        // Navigate to the Edit page for that user
        navigate(`/admin/edit/${userId}`);
    };

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`/api/admin/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                setUsers(users.filter((user) => user._id !== userId)); // Remove user from UI
            } else {
                setError('Failed to delete user');
            }
        } catch (err) {
            setError('An error occurred while deleting the user');
        }
    };


      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error}</p>;

  return (
    <div>
      
      <div className="container">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
     
      <div className="flex gap-2 mb-4 justify-end">
    <input
        type="text"
        className="p-2 border rounded w-64"
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSearch}
    >
        Search
    </button>
</div>

            {error && <p className="text-red-500">{error}</p>}
      {/* Table structure */}
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Picture</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <img src={user.profilePicture} alt="User" className="w-16 h-16 rounded-full" />
              </td>
              <td className="border p-2">
              <button
                                    className="bg-blue-500 text-white p-2 rounded-lg mr-2"
                                    onClick={() => handleEdit(user._id)} 
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white p-2 rounded-lg"
                                    onClick={() => handleDelete(user._id)} 
                                >
                                    Delete
                                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}