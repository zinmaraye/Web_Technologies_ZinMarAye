import { useState, useEffect } from 'react';
import { MapPin, Clock, X } from 'lucide-react';
import axios from 'axios';
import Modal from './Modal'; // Assuming Modal is imported correctly

const Schedule = () => {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); // Track logged-in user
  const [isModalVisible, setModalVisible] = useState(false); // Track if modal is visible

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodType: '',
    appointmentDate: '',
    appointmentTime: '',
  });

  // Fetch events from the backend API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/event/list');
        if (Array.isArray(response.data.data)) {
          setEvents(response.data.data);
        } else {
          setError('Unexpected response structure');
        }
      } catch (error) {
        setError('Error fetching events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData); // Save user data after login
    setModalVisible(false); // Close modal after successful login
    if (selectedEvent) {
      setModalVisible(true); // Automatically show the appointment form after login if an event is selected
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple client-side validation
    if (!formData.name || !formData.email || !formData.phone || !formData.bloodType) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/appointments', {
        ...formData,
        event_title: selectedEvent?.title,
        event_date: selectedEvent?.event_date,
        event_time: selectedEvent?.event_time,
        event_address: selectedEvent?.address,
      });

      alert('Appointment confirmed!');
      setSelectedEvent(null);
    } catch (err) {
      console.error(err);
      alert('Submission failed. Please try again.');
    }
  };

  const handleScheduleClick = (event: any) => {
    if (!user) {
      setModalVisible(true); // Show login modal if user is not logged in
    } else {
      setSelectedEvent(event); // Show the appointment form if user is logged in
      setModalVisible(true); // Directly show the appointment form after login
    }
  };

  if (loading) return <div className="text-center">Loading events...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
      {/* Banner Section */}
      <div className="w-full h-60 bg-cover bg-center" style={{ backgroundImage: `url('/path/to/your/banner-image.png')` }}>
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <h1 className="text-white text-4xl font-bold">Upcoming Donation Events</h1>
        </div>
      </div>

      <div className="py-16 bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.length > 0 ? (
              events.map((event, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  {/* Event Image */}
                  {event.image && (
                    <img
                      src={event.image.startsWith('http') ? event.image : `images/event/${event.image}`} // Handle relative or full URL
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
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    onClick={() => handleScheduleClick(event)} // Trigger schedule appointment
                  >
                    Schedule Appointment
                  </button>
                </div>
              ))
            ) : (
              <div>No events available at the moment.</div>
            )}
          </div>
        </div>
      </div>

      {/* Appointment form modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Schedule Donation Appointment</h3>
              <button onClick={() => setSelectedEvent(null)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={formData.appointmentTime}
                    onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>

              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
                required
              />

              <select
                value={formData.bloodType}
                onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
                required
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>

              <div className="flex space-x-4">
                <button type="submit" className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">
                  Confirm
                </button>
                <button type="button" onClick={() => setSelectedEvent(null)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <Modal showModal={isModalVisible} closeModal={() => setModalVisible(false)} onLoginSuccess={handleLoginSuccess} />
    </>
  );
};

export default Schedule;
