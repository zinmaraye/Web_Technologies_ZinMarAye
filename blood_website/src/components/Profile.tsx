import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState<any>(null);
  const [donations, setDonations] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
    } else {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchUserDonations(userData.id);
    }
  }, [navigate]);

  const fetchUserDonations = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/${userId}/donations`);
      console.log('API response:', response.data);

      // If API returns donations inside a wrapper
      if (Array.isArray(response.data.donations)) {
        setDonations(response.data.donations);
      } 
      // If API returns donations directly as an array
      else if (Array.isArray(response.data)) {
        setDonations(response.data);
      } 
      else {
        throw new Error('Unexpected response format');
      }
    } catch (error: any) {
      console.error('Error fetching donations:', error);
      setError('Failed to load donations. Please try again later.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-white shadow-md p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl py-10 font-semibold">User Profile</h2>
        </div>

        <p className="text-gray-600 mb-4">Welcome, {user?.name || 'Guest'}!</p>

        {user && (
          <div>
            <div className="flex items-center mb-6">
              {user?.profile_image ? (
                <img
                  src={`http://localhost/storage/${user.profile_image}`}
                  alt="User Profile"
                  className="h-16 w-16 rounded-full mr-4"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-400 flex items-center justify-center mr-4">
                  <span className="text-white text-xl">
                    {user?.name?.charAt(0) || 'N'}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold">{user?.name || 'No name available'}</h3>
                <p className="text-gray-600">{user?.email || 'No email available'}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Your Donations</h3>
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {donations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 border-b text-left">ID</th>
                        <th className="px-4 py-2 border-b text-left">Event Title</th>
                        <th className="px-4 py-2 border-b text-left">Event Date</th>
                        <th className="px-4 py-2 border-b text-left">Blood Type</th>
                        <th className="px-4 py-2 border-b text-left">Appointment Date</th>
                        <th className="px-4 py-2 border-b text-left">Appointment Time</th>
                        <th className="px-4 py-2 border-b text-left">Last Donation Date</th>
                        <th className="px-4 py-2 border-b text-left">Type</th>
                        <th className="px-4 py-2 border-b text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((donation, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border-b">{donation.id}</td>
                          <td className="px-4 py-2 border-b">{donation.event_title}</td>
                          <td className="px-4 py-2 border-b">{donation.event_date}</td>
                          <td className="px-4 py-2 border-b">{donation.blood_type}</td>
                          <td className="px-4 py-2 border-b">{donation.appointment_date}</td>
                          <td className="px-4 py-2 border-b">{donation.appointment_time}</td>
                          <td className="px-4 py-2 border-b">{donation.last_donation_date}</td>
                          <td className="px-4 py-2 border-b capitalize">{donation.type}</td>
                          <td className="px-4 py-2 border-b">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                donation.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : donation.status === 'Completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {donation.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">You haven't made any donations yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
