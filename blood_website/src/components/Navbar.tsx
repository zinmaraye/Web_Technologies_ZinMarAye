import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User, Menu } from 'lucide-react'; 
import Modal from '../components/Modal'; 
import LoadingSpinner from '../components/LoadingSpinner';

function Navbar() {
  const [showModal, setShowModal] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [user, setUser] = useState<any>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // 👈 Mobile menu toggle

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleLoginSuccess = (userData: any) => {
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setShowModal(false);
      setLoading(false);
      window.location.reload();
    }, 500);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('user');
      setDropdownVisible(false);
      setLoading(false);
      window.location.reload();
    }, 500);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" onClick={() => setTimeout(() => window.location.reload(), 100)} className="flex items-center">
            <img src="logo.png" alt="LifeShare" height="20" width="150" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-800 hover:text-red-600">Home</Link>
            <Link to="/event" className="text-gray-800 hover:text-red-600">Event</Link>
            <Link to="/urgent-needs" className="text-gray-800 hover:text-red-600">Urgent Needs</Link>
            <Link to="/gallery" className="text-gray-800 hover:text-red-600">Gallery</Link>
            <Link to="/requirement" className="text-gray-800 hover:text-red-600">Requirement</Link>

            {!isLoggedIn ? (
              <button 
                onClick={openModal}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200">
                Login
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
                >
                  {user?.profile_image ? (
                    <img
                      src={`http://localhost/storage/${user.profile_image}`}
                      alt="User Profile"
                      className="h-8 w-8 rounded-full mr-2"
                    />
                  ) : (
                    <User className="h-6 w-6 mr-2" />
                  )}
                  <span>{user?.name || 'Profile'}</span>
                </button>

                {dropdownVisible && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">User Profile</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      <LogOut className="inline mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {mobileMenuOpen && (
      <div className="md:hidden bg-white px-6 pb-4 space-y-3">
        <Link to="/" onClick={() => setTimeout(() => window.location.reload(), 100)} className="block text-gray-800 hover:text-red-600">Home</Link>
        <Link to="/event" onClick={() => setTimeout(() => window.location.reload(), 100)} className="block text-gray-800 hover:text-red-600">Event</Link>
        <Link to="/urgent-needs" onClick={() => setTimeout(() => window.location.reload(), 100)} className="block text-gray-800 hover:text-red-600">Urgent Needs</Link>
        <Link to="/gallery" onClick={() => setTimeout(() => window.location.reload(), 100)} className="block text-gray-800 hover:text-red-600">Gallery</Link>
        <Link to="/requirement" onClick={() => setTimeout(() => window.location.reload(), 100)} className="block text-gray-800 hover:text-red-600">Requirement</Link>

        {!isLoggedIn ? (
          <button 
            onClick={openModal}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Login
          </button>
        ) : (
          <div className="space-y-2">
            <Link to="/profile" onClick={() => setTimeout(() => window.location.reload(), 100)} className="block text-gray-800 hover:text-red-600">User Profile</Link>
            <button onClick={handleLogout} className="block w-full text-left text-gray-800 hover:text-red-600">
              Logout
            </button>
          </div>
    )}
  </div>
)}
      </nav>

      <Modal
        showModal={showModal}
        closeModal={closeModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default Navbar;
