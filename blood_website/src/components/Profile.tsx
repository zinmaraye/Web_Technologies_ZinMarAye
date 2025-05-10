import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate the user if not logged in
import { LogOut } from 'lucide-react'; // Logout icon
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState<any>(null); // State to store user data
  const [donations, setDonations] = useState<any[]>([]); // State to store user donation data
  const [error, setError] = useState<string>(''); // Error state for API calls
  const navigate = useNavigate(); // Hook to navigate to other pages (like Home after logout)

  // Fetch the logged-in user's data and donation list when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Stored user:', storedUser); // Log the stored user data for debugging
    if (!storedUser) {
      navigate('/'); // Redirect to home page if no user is found in localStorage
    } else {
      const userData = JSON.parse(storedUser); // Parse and set user data from localStorage
      setUser(userData);
      
      // Fetch donation list for the logged-in user
      fetchUserDonations(userData.id);
    }
  }, [navigate]);

  // Fetch donations for the logged-in user
  const fetchUserDonations = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/${userId}/donations`); // Replace with your actual API endpoint
      setDonations(response.data.donations); // Assuming the API returns a 'donations' array
    } catch (error: any) {
      console.error('Error fetching donations:', error);
      setError('Failed to load donations. Please try again later.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <p className="text-gray-600 mb-4">Welcome, {user?.name || 'Guest'}!</p>
        
        {/* Check if user is available and display information */}
        {user ? (
          <div>
            <div className="flex items-center mb-6">
              {/* Display profile image if available */}
              {user?.profile_image ? (
                <img
                  src={`http://localhost/storage/${user.profile_image}`} // Adjust URL as needed
                  alt="User Profile"
                  className="h-16 w-16 rounded-full mr-4"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-400 flex items-center justify-center mr-4">
                  <span className="text-white text-xl">{user?.name?.charAt(0) || 'N'}</span> {/* Display first letter */}
                </div>
              )}
              <div>
                {/* Safely access user name and email */}
                <h3 className="text-xl font-semibold">{user?.name || 'No name available'}</h3>
                <p className="text-gray-600">{user?.email || 'No email available'}</p>
              </div>
            </div>

            {/* User Donations List */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Your Donations</h3>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              
              {donations.length > 0 ? (
                <table className="min-w-full table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b text-left">Donation ID</th>
                      <th className="px-4 py-2 border-b text-left">Donation Date</th>
                      <th className="px-4 py-2 border-b text-left">Blood Type</th>
                      {/* Add more columns as needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((donation, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="px-4 py-2 border-b">{donation.id}</td>
                        <td className="px-4 py-2 border-b">{donation.donation_date}</td>
                        <td className="px-4 py-2 border-b">{donation.blood_type}</td>
                        {/* Add more donation details here if necessary */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-600">You haven't made any donations yet.</p>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-6 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </button>
          </div>
        ) : (
          // If user is not logged in, prompt login
          <div className="text-center">
            <p>You are not logged in. Please login to view your profile.</p>
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline"
            >
              Login here
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
