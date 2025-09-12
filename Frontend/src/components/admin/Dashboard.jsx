import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserCheck, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import AdminForm from './AdminForm';
import StoryForm from './StoryForm';

export default function Dashboard() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [users, setUsers] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isPrimaryAdmin = user?.email === 'dynamicphillic77777@gmail.com';

  const bg = isDarkMode ? 'bg-[#111]' : 'bg-white';
  const text = isDarkMode ? 'text-white' : 'text-gray-800';
  const subText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const boxBg = isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-50';
  const border = isDarkMode ? 'border-gray-700' : 'border-gray-100';

  const API_BASE = `${import.meta.env.VITE_BACKEND_URL}`;

  useEffect(() => {
    if (isPrimaryAdmin) {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/auth/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      setStatusMessage('Failed to fetch users.');
    }
  };

  const handleAllowAccess = async (email) => {
    try {
      await axios.post(
        `${API_BASE}/auth/admin/allow-creation`,
        { emails: [email] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatusMessage(`Access granted to ${email}`);
      fetchUsers(); // Refresh
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to grant access.';
      setStatusMessage(msg);
    }
  };


const toggleUserPermission = async (userId) => {
  try {
    const res = await fetch(`${API_BASE}/auth/toggle-permission/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      setStatusMessage(data.message);
      fetchUsers(); // Refresh list
    } else {
      setStatusMessage(data.message);
    }
  } catch (err) {
    console.error(err);
    setStatusMessage('Error toggling permission');
  }
};



const handleDeleteUser = async (userId) => {
  if (!window.confirm(`Are you sure you want to delete this user?`)) return;
  try {
    await axios.post(`${API_BASE}/auth/admin/delete-user`, 
      { userId }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers(); // Refresh user list
  } catch (err) {
    const msg = err.response?.data?.message || 'Failed to delete user.';
    setStatusMessage(msg);
  }
};


  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <div className={`min-h-screen ${bg} ${text} px-4 md:px-8 py-12`}>
      <div className="max-w-6xl mx-auto">
        <header className={`mb-12 py-4 sticky top-0 z-10 ${bg} ${border} border-b`}>
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome, {user?.username || user?.name || 'Admin'}!
          </h1>
        </header>

        {/* ✅ Access Grant Panel for Primary Admin */}
        {isPrimaryAdmin && (
          <section className={`${boxBg} rounded-xl shadow-md p-6 mb-12`}>
            <h2 className="text-2xl font-semibold mb-3">Grant Admin Access</h2>
            <p className={`mb-5 ${subText}`}>
              Approve new users to create content. Only visible to Primary Admin.
            </p>

            <div className="overflow-auto">
              <table className="min-w-full text-sm border-collapse">
                <thead>
                  <tr className={`${text} border-b ${border}`}>
                    <th className="text-left py-2 px-3">Username</th>
                    <th className="text-left py-2 px-3">Email</th>
                    <th className="text-left py-2 px-3">Signup Date</th>
                    <th className="text-left py-2 px-3">Access</th>
                    <th className="text-left py-2 px-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.email} className="border-b last:border-0">
                      <td className="py-2 px-3">{u.username}</td>
                      <td className="py-2 px-3">{u.email}</td>
                      <td className="py-2 px-3">{formatDate(u.createdAt)}</td>
                      <td className="py-2 px-3">
                        {u.isAllowedToCreate ? (
                          <span className="text-green-500 font-medium">Allowed</span>
                        ) : (
                          <span className="text-yellow-500 font-medium">Pending</span>
                        )}
                   <input
  className="mx-2"
  type="checkbox"
  checked={u.isAllowedToCreate}
  onChange={() => toggleUserPermission(u._id)}
/>


                      </td>
                      <td className="py-2 px-3 flex gap-3">
                        {!u.isAllowedToCreate && (
                          <button
                            onClick={() => handleAllowAccess(u.email)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs"
                          >
                            <FaUserCheck className="inline mr-1" /> Approve
                          </button>
                        )}
                        <button
                      onClick={() => handleDeleteUser(u._id)}

                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs"
                        >
                          <FaTrash className="inline mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {statusMessage && (
              <p className="mt-4 text-sm text-green-500">{statusMessage}</p>
            )}
          </section>
        )}

        {/* ✅ Admin Content Forms */}
        <section>
          <AdminForm />
          <StoryForm />
        </section>
      </div>
    </div>
  );
}
