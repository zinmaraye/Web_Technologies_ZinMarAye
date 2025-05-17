import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { X } from 'lucide-react';
import axios from 'axios';

const SuccessPopup = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000); // Auto close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-fadeInOut"
      role="alert"
    >
      {message}
    </div>
  );
};

const Banner: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDonorModal, setShowDonorModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    bloodType: '',
    appointment_date: '',
    appointment_time: '',
    last_donation_date: '',
    weight: '',
    age: '',
    notes: '',
    type: 'normal',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleBecomeDonorClick = () => {
    if (isLoggedIn) {
      setShowDonorModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = (userData: any) => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowDonorModal(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShowSuccessPopup(false);

    try {
      const userData = localStorage.getItem('user');
      if (!userData) throw new Error('User not logged in');

      const user = JSON.parse(userData);

      const payload = {
        user_id: user.id,
        blood_type: formData.bloodType,
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        last_donation_date: formData.last_donation_date,
        weight: formData.weight,
        age: formData.age,
        notes: formData.notes,
        type: formData.type,
      };

      await axios.post('http://localhost:8000/api/user/appointments', payload);

      setFormData({
        bloodType: '',
        appointment_date: '',
        appointment_time: '',
        last_donation_date: '',
        weight: '',
        age: '',
        notes: '',
        type: 'normal',
      });

      setShowDonorModal(false);
      setShowSuccessPopup(true);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Failed to submit appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative h-[600px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Every Drop Counts</h1>
            <p className="text-xl mb-8">
              Your blood donation can save up to three lives. Join our mission.
            </p>
            <button
              onClick={handleBecomeDonorClick}
              className="bg-red-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Become a Donor
            </button>
          </div>
        </div>
      </div>

      {/* Login/Register Modal */}
      <Modal
        showModal={showLoginModal}
        closeModal={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Donor Modal */}
      {showDonorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative">
            <button
              onClick={() => setShowDonorModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              title="Close"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6">Confirm Your Donation Info</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bloodType" className="block mb-1 text-gray-700">
                    Blood Type
                  </label>
                  <select
                    id="bloodType"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded bg-gray-100"
                    required
                  >
                    <option value="">Select blood type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="age" className="block mb-1 text-gray-700">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    min={18}
                    max={120}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="appointment_date" className="block mb-1 text-gray-700">
                    Preferred Donation Date
                  </label>
                  <input
                    type="date"
                    id="appointment_date"
                    name="appointment_date"
                    value={formData.appointment_date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="appointment_time" className="block mb-1 text-gray-700">
                    Preferred Donation Time
                  </label>
                  <input
                    type="time"
                    id="appointment_time"
                    name="appointment_time"
                    value={formData.appointment_time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="last_donation_date" className="block mb-1 text-gray-700">
                    Last Donation Date
                  </label>
                  <input
                    type="date"
                    id="last_donation_date"
                    name="last_donation_date"
                    value={formData.last_donation_date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div>
                  <label htmlFor="weight" className="block mb-1 text-gray-700">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    min={30}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block mb-1 text-gray-700">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Any additional information..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  rows={3}
                />
              </div>

              {error && <p className="text-red-600">{error}</p>}

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowDonorModal(false)}
                  className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Confirm Response'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <SuccessPopup
          message="Your donation appointment has been successfully submitted!"
          onClose={() => setShowSuccessPopup(false)}
        />
      )}

      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translateY(-10px); }
          10%, 90% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease forwards;
        }
      `}</style>
    </>
  );
};

export default Banner;
