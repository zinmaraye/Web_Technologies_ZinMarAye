import { useState, useEffect } from 'react';
import { MapPin, Clock, X } from 'lucide-react';
import axios from 'axios';

const Schedule = () => {
  interface Event {
    title: string;
    event_date: string;
    event_time: string;
    address: string;
  }

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/event/list');
        
        console.log(response.data); 
        if (response.data && Array.isArray(response.data.data)) {
          setEvents(response.data.data); 
        } else {
          setError("Unexpected response structure");
        }
        
        setLoading(false);
      } catch (error) {
        setError("Error fetching events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); 

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Upcoming Donation Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.length > 0 ? (
              events.map((event, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
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
                    onClick={() => setSelectedEvent(event)}
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

      {/* Schedule Appointment Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Schedule Donation Appointment</h3>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-lg mb-2">{selectedEvent.title}</h4>
              <p className="text-gray-600">{selectedEvent.event_date}</p>
              <p className="text-gray-600">{selectedEvent.event_time}</p>
              <p className="text-gray-600">{selectedEvent.address}</p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="appointmentDate">
                    Date
                  </label>
                  <input
                    type="date"
                    id="appointmentDate"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="appointmentTime">
                    Time
                  </label>
                  <input
                    type="time"
                    id="appointmentTime"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="phone">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="bloodType">
                  Blood Type
                </label>
                <select
                  id="bloodType"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Confirm Appointment
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
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
};

export default Schedule;
