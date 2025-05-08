import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, User, LogOut } from 'lucide-react'; // Import icons (Heart and User for Profile)
import Modal from '../components/Modal'; // Import Modal component
import axios from 'axios';

function Navbar() {
  const [showModal, setShowModal] = useState(false); // Track modal visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
  const [user, setUser] = useState<any>(null); // Store logged-in user's data
  const [dropdownVisible, setDropdownVisible] = useState(false); // Track dropdown visibility

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Get user from localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user data from localStorage
      setIsLoggedIn(true);
    }
  }, []);

  const openModal = () => {
    setShowModal(true); // Show modal when "Login" is clicked
  };

  const closeModal = () => {
    setShowModal(false); // Close modal
  };

  const handleLoginSuccess = (userData: any) => {
    setIsLoggedIn(true); // User is logged in
    setUser(userData); // Store user data
    localStorage.setItem('user', JSON.stringify(userData)); // Save user to localStorage
    closeModal(); // Close the modal after successful login/registration
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Log the user out
    setUser(null); // Clear user data
    localStorage.removeItem('user'); // Remove user from localStorage
    setDropdownVisible(false); // Close dropdown on logout
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  const closeDropdown = () => {
    setDropdownVisible(false); // Close dropdown
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Heart className="h-8 w-8 text-red-500" />
          <span className="ml-2 text-xl font-bold text-gray-800">LifeShare</span>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 flex items-center">
          <Link to="/" className="text-gray-800 hover:text-red-600">Home</Link>
          <Link to="/schedule" className="text-gray-800 hover:text-red-600">Schedule</Link>
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
                <User className="h-6 w-6 mr-2" />
                Profile
              </button>

              {/* Dropdown Menu */}
              {dropdownVisible && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
                  onClick={closeDropdown} // Close the dropdown when clicked outside
                >
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

      {/* Modal for Login or Register */}
      <Modal 
        showModal={showModal} 
        closeModal={closeModal} 
        onLoginSuccess={handleLoginSuccess} // Pass the success handler to Modal
      />
    </nav>
  );
}

export default Navbar;
