import React, { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">LifeShare</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-red-500">Home</button>
              <button onClick={() => scrollToSection('schedule')} className="text-gray-700 hover:text-red-500">Schedule</button>
              <button onClick={() => scrollToSection('urgent-needs')} className="text-gray-700 hover:text-red-500">Urgent Needs</button>
              <button onClick={() => scrollToSection('gallery')} className="text-gray-700 hover:text-red-500">Gallery</button>
              <button onClick={() => scrollToSection('education')} className="text-gray-700 hover:text-red-500">Education</button>
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => setShowDonateModal(true)}
              >
                Donate Now
              </button>
            </div>
            
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => scrollToSection('home')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 rounded-md"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('schedule')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 rounded-md"
                >
                  Schedule
                </button>
                <button
                  onClick={() => scrollToSection('urgent-needs')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 rounded-md"
                >
                  Urgent Needs
                </button>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 rounded-md"
                >
                  Gallery
                </button>
                <button
                  onClick={() => scrollToSection('education')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 rounded-md"
                >
                  Education
                </button>
                <button
                  onClick={() => {
                    setShowDonateModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Donate Now
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Donate Now Modal */}
      {showDonateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Make a Donation</h3>
              <button 
                onClick={() => setShowDonateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="donationType">
                  Donation Type
                </label>
                <select
                  id="donationType"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="whole">Whole Blood</option>
                  <option value="plasma">Plasma</option>
                  <option value="platelets">Platelets</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="preferredDate">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="preferredTime">
                  Preferred Time
                </label>
                <input
                  type="time"
                  id="preferredTime"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="location">
                  Preferred Location
                </label>
                <select
                  id="location"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="central">Central Hospital</option>
                  <option value="community">Community Center</option>
                  <option value="university">University Campus</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Confirm Donation
                </button>
                <button
                  type="button"
                  onClick={() => setShowDonateModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;