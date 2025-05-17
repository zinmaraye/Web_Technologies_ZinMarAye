import React, { useState, useEffect } from 'react';
import { MapPin, Clock, X } from 'lucide-react';
import axios from 'axios';
import Modal from './Modal';

const Event = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [pendingEvent, setPendingEvent] = useState<any | null>(null);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('user'));
  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    bloodType: '',
    appointment_date: '',
    appointment_time: '',
    last_donation_date: '',
    weight: '',
    age: '',
    notes: '',
    type: 'event'
  });

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/event/list');
        if (Array.isArray(response.data?.data)) {
          setEvents(response.data.data);
        } else {
          setError('Unexpected response structure');
        }
      } catch (err) {
        setError('Error fetching events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleScheduleClick = (event: any) => {
    if (isLoggedIn) {
      setSelectedEvent(event);
    } else {
      setPendingEvent(event);
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = (userData: any) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowLoginModal(false);

    if (pendingEvent) {
      setSelectedEvent(pendingEvent);
      setPendingEvent(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.bloodType) {
      alert('Please fill out all required fields.');
      return;
    }

    const payload = {
      ...formData,
      user_id: user?.id,
      event_id: selectedEvent?.id,
    };

    console.log("Submitting data:", payload);

    try {
      await axios.post('http://localhost:8000/api/user/appointments', payload);
      setSuccessMessage('Your appointment has been successfully submitted!');
      setSelectedEvent(null);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      console.error("Submission error:", err.response?.data || err.message);
      alert('Submission failed. Please try again.');
    }
  };

  if (loading) return <div className="text-center">Loading events...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
      {successMessage && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50 transition-all duration-300">
          {successMessage}
        </div>
      )}

      <Modal
        showModal={showLoginModal}
        closeModal={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <div className="w-full h-64 md:h-[550px] relative">
        <img src="7233454.jpg" alt="Banner" className="w-full h-full object-cover" />
      </div>

      <div className="py-16 bg-gray-50">
        <h1 className="text-3xl font-bold text-center mb-12">Upcoming Donation Events</h1>
        <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                {event.image && (
                  <img
                    src={event.image.startsWith('http') ? event.image : `http://localhost:8000/images/event/${event.image}`}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-red-500 mr-2" />
                  <p>{event.event_date}</p>
                </div>
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-red-500 mr-2" />
                  <p>{event.event_time}</p>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-red-500 mr-2" />
                  <p>{event.address}</p>
                </div>
                <button
                  onClick={() => handleScheduleClick(event)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Schedule Appointment
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Schedule Donation Appointment</h3>
              <button onClick={() => setSelectedEvent(null)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" id="type" name="type" value="event" onChange={handleChange} />
              <input type="hidden" name="user_id" value={user?.id || ''} />
              <input type="hidden" name="event_id" value={selectedEvent?.id || ''} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="bloodType">Blood Type</label>
                  <select
                    id="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                  >
                    <option value="">Select</option>
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
                  <label htmlFor="age" className="block text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    id="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="appointment_date" className="block text-gray-700 mb-2">Preferred Donation Date</label>
                  <input
                    type="date"
                    id="appointment_date"
                    value={formData.appointment_date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="appointment_time" className="block text-gray-700 mb-2">Preferred Donation Time</label>
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
                  <label htmlFor="last_donation_date" className="block text-gray-700 mb-2">Last Donation Date</label>
                  <input
                    type="date"
                    id="last_donation_date"
                    value={formData.last_donation_date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="weight" className="block text-gray-700 mb-2">Weight(lb)</label>
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
                <label htmlFor="notes" className="block text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Any additional information..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
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
    </>
  );
};

export default Event;
