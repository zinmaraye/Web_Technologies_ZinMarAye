import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react'; // Icons for logout and user profile
import Modal from '../components/Modal'; // Import Modal component

function Navbar() {
  const [showModal, setShowModal] = useState(false); // Track modal visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
  const [user, setUser] = useState<any>(null); // Store logged-in user's data
  const [dropdownVisible, setDropdownVisible] = useState(false); // Track dropdown visibility

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const openModal = () => setShowModal(true); // Show login modal
  const closeModal = () => setShowModal(false); // Close login modal

  const handleLoginSuccess = (userData: any) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data in localStorage
    setShowModal(false); // Close the login modal
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage
    setDropdownVisible(false); // Close dropdown menu
  };

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible); // Toggle dropdown menu visibility

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src="logo.png" alt="LifeShare" height="20px" width="150px" />
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 flex items-center">
          <Link to="/" className="text-gray-800 hover:text-red-600">Home</Link>
          <Link to="/event" className="text-gray-800 hover:text-red-600">Event</Link>
          <Link to="/urgent-needs" className="text-gray-800 hover:text-red-600">Urgent Needs</Link>
          <Link to="/gallery" className="text-gray-800 hover:text-red-600">Gallery</Link>
          <Link to="/requirement" className="text-gray-800 hover:text-red-600">Requirement</Link>

          {/* Login or Profile Button */}
          {!isLoggedIn ? (
            <button 
              onClick={openModal}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200">
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200 flex items-center">
                {/* Display user profile image if available */}
                {user?.profile_image ? (
                  <img
                    src={`http://localhost/storage/${user.profile_image}`} // Adjust URL if needed
                    alt="User Profile"
                    className="h-8 w-8 rounded-full mr-2"
                  />
                ) : (
                  <User className="h-6 w-6 mr-2" />
                )}
                <span>{user?.name || 'Profile'}</span>
              </button>

              {/* Dropdown Menu */}
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-t-lg"
                  >
                    User Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-b-lg"
                  >
                    <LogOut className="inline mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal for Login */}
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </nav>
  );
}

export default Navbar;
