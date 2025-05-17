import React, { useState, useEffect } from 'react';
import { Phone, X, CheckCircle } from 'lucide-react';
import axios from 'axios';
import Modal from './Modal';

const UrgentNeeds = () => {
  const [urgentRequests, setUrgentRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [pendingRequest, setPendingRequest] = useState<any | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('user'));
  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    appointment_date: '',
    appointment_time: '',
    last_donation_date: '',
    weight: '',
    bloodType: '',
    additionalNotes: '',
    event_id: '',
    type: 'urgent'
  });

  useEffect(() => {
    const fetchUrgentRequests = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/urgent/blood/list');
        if (response.data && response.data.data && Array.isArray(response.data.data[0])) {
          setUrgentRequests(response.data.data[0]);
        } else {
          setError('Unexpected response structure');
        }
      } catch (error) {
        setError('Error fetching urgent requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchUrgentRequests();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleScheduleClick = (request: any) => {
    if (isLoggedIn) {
      setSelectedRequest(request);
      setFormData((prev) => ({
        ...prev,
        event_id: request.id,
        bloodType: request.blood_group
      }));
    } else {
      setPendingRequest(request);
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = (userData: any) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowLoginModal(false);

    if (pendingRequest) {
      setSelectedRequest(pendingRequest);
      setFormData((prev) => ({
        ...prev,
        event_id: pendingRequest.id,
        bloodType: pendingRequest.blood_group
      }));
      setPendingRequest(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      user_id: user?.id
    };

    try {
      await axios.post('http://localhost:8000/api/user/appointments', payload);
      setShowSuccess(true);
      setSelectedRequest(null);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      alert('Submission failed. Please try again.');
    }
  };

  const urgencyClasses = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-500 text-white';
      case 'High': return 'bg-orange-500 text-white';
      default: return 'bg-yellow-500 text-white';
    }
  };

  return (
    <div className="py-20 bg-white relative">
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-100 text-green-800 border border-green-300 rounded px-4 py-2 flex items-center shadow-lg z-50">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span>Response submitted successfully!</span>
        </div>
      )}

      <Modal
        showModal={showLoginModal}
        closeModal={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Urgent Blood Needs</h2>
          <p className="text-gray-600">These patients need immediate blood donations</p>
        </div>

        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {urgentRequests.map((request, index) => (
            <div key={index} className="border border-red-100 p-6 rounded-lg bg-red-50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-red-500">{request.blood_group}</span>
                <span className={`px-3 py-1 rounded-full text-sm ${urgencyClasses(request.urgency)}`}>{request.urgency}</span>
              </div>
              <p className="text-gray-700 mb-2">{request.location}</p>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>{request.contact}</span>
              </div>
              <button
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                onClick={() => handleScheduleClick(request)}
              >
                Respond to Request
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Respond to Blood Request</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input type="hidden" id="type" name="type" value="urgent" onChange={handleChange} />
              <input type="hidden" name="user_id" value={user?.id || ''} />
              <input type="hidden" name="event_id" value={selectedRequest?.id || ''} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="appointment_date">Preferred Donation Date</label>
                  <input
                    type="date"
                    id="appointment_date"
                    value={formData.appointment_date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="appointment_time">Preferred Donation Time</label>
                  <input
                    type="time"
                    id="appointment_time"
                    value={formData.appointment_time}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="last_donation_date">Last Donation Date</label>
                  <input
                    type="date"
                    id="last_donation_date"
                    value={formData.last_donation_date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="weight">Weight (lb)</label>
                  <input
                    type="text"
                    id="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="additionalNotes">Additional Notes</label>
                <textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Any additional information..."
                ></textarea>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                >
                  Confirm Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrgentNeeds;
