import React, { useState } from 'react';
import { AlertCircle, Phone, X } from 'lucide-react';

const UrgentNeeds = () => {
  const [selectedRequest, setSelectedRequest] = useState<null | {
    bloodType: string;
    location: string;
    contact: string;
    urgency: string;
  }>(null);

  const urgentRequests = [
    {
      bloodType: "A+",
      location: "City Hospital",
      contact: "+1 234-567-8900",
      urgency: "High"
    },
    {
      bloodType: "O-",
      location: "Memorial Hospital",
      contact: "+1 234-567-8901",
      urgency: "Critical"
    },
    {
      bloodType: "B+",
      location: "General Hospital",
      contact: "+1 234-567-8902",
      urgency: "Medium"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Urgent Blood Needs</h2>
          <p className="text-gray-600">These patients need immediate blood donations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {urgentRequests.map((request, index) => (
            <div key={index} className="border border-red-100 p-6 rounded-lg bg-red-50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-red-500">{request.bloodType}</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  request.urgency === 'Critical' ? 'bg-red-500 text-white' :
                  request.urgency === 'High' ? 'bg-orange-500 text-white' :
                  'bg-yellow-500 text-white'
                }`}>
                  {request.urgency}
                </span>
              </div>
              
              <p className="text-gray-700 mb-2">{request.location}</p>
              
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>{request.contact}</span>
              </div>
              
              <button 
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                onClick={() => setSelectedRequest(request)}
              >
                Respond to Request
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Response Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Respond to Blood Request</h3>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Blood Type:</span>
                <span className="text-xl font-bold text-red-500">{selectedRequest.bloodType}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Location:</span>
                <span className="ml-2">{selectedRequest.location}</span>
              </div>
              <div className="mb-4">
                <span className="font-semibold">Contact:</span>
                <span className="ml-2">{selectedRequest.contact}</span>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="phone">
                  Your Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="time">
                  Preferred Donation Time
                </label>
                <input
                  type="datetime-local"
                  id="time"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="notes">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Any additional information..."
                ></textarea>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Confirm Response
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UrgentNeeds;