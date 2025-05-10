import React, { useState, useEffect } from 'react';
import { MapPin, Clock, X } from 'lucide-react';
import axios from 'axios';

const Event = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    bloodType: '',
    preferredDonationDate: '',
    preferredDonationTime: '',
    lastDonationDate: '',
    weight: '',
    additionalNotes: '',
  });

  // Fetch events from the backend API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/event/list');
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setEvents(response.data.data); // Use the correct path to access event data
        } else {
          setError('Unexpected response structure');
        }
      } catch (error) {
        console.error(error); // Log the error in case of failure
        setError('Error fetching events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
    setSelectedEvent(event); // Show the appointment form when event is selected
  };

  const urgencyClasses = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-red-500 text-white';
      case 'High':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-yellow-500 text-white';
    }
  };

  if (loading) return <div className="text-center">Loading events...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
      {/* Banner Section */}
      <div className="w-full h-[550px] relative">
        <img
          src="7233454.jpg"
          alt="Banner Image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="py-16 bg-gray-50 py-20">
      <h1 className="text-black text-center text-4xl font-bold">Upcoming Donation Events</h1>
        <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.length > 0 ? (
              events.map((event, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  {/* Event Image */}
                  {event.image && (
                    <img
                      src={event.image.startsWith('http') ? event.image : `http://localhost:8000/images/event/${event.image}`} // Handle relative or full URL
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
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Schedule Donation Appointment</h3>
              <button onClick={() => setSelectedEvent(null)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name and Email on the same row */}
              <input type="hidden" name='type' value={'event'} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Your Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Phone and Password on the same row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="phone">
                    Your Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Blood Type Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="bloodType">
                    Blood Type
                  </label>
                  <select
                    id="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
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
              </div>

              {/* Preferred Donation Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="preferredDonationDate">
                    Preferred Donation Date
                  </label>
                  <input
                    type="date"
                    id="preferredDonationDate"
                    value={formData.preferredDonationDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="preferredDonationTime">
                    Preferred Donation Time
                  </label>
                  <input
                    type="time"
                    id="preferredDonationTime"
                    value={formData.preferredDonationTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Last Donation Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="lastDonationDate">
                    Last Donation Date
                  </label>
                  <input
                    type="date"
                    id="lastDonationDate"
                    value={formData.lastDonationDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="weight">
                    Weight
                  </label>
                  <input
                    type="text"
                    id="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="additionalNotes">
                  Additional Notes
                </label>
                <textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Any additional information..."
                ></textarea>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
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
