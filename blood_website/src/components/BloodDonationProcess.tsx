import React from 'react';
import { FaClock, FaClipboardCheck, FaHeartbeat, FaCoffee } from 'react-icons/fa';

function BloodDonationProcess() {
  const steps = [
    {
      id: 1,
      icon: <FaClipboardCheck className="text-3xl text-red-500" />,
      title: "Registration",
      description: "Present valid ID and complete a confidential medical history questionnaire.",
      duration: "10-15 minutes"
    },
    {
      id: 2,
      icon: <FaHeartbeat className="text-3xl text-red-500" />,
      title: "Medical Screening",
      description: "Quick physical examination including blood pressure, pulse, and hemoglobin test.",
      duration: "10-15 minutes"
    },
    {
      id: 3,
      icon: <FaClock className="text-3xl text-red-500" />,
      title: "Blood Donation",
      description: "The actual blood donation process using sterile, disposable equipment.",
      duration: "8-10 minutes"
    },
    {
      id: 4,
      icon: <FaCoffee className="text-3xl text-red-500" />,
      title: "Recovery",
      description: "Rest and refreshments while ensuring you're feeling well before leaving.",
      duration: "10-15 minutes"
    }
  ];

  const tips = [
    "Get a good night's sleep before donation",
    "Eat a healthy meal within 2-3 hours before donating",
    "Drink plenty of fluids before and after donation",
    "Avoid strenuous physical activity for a few hours after donation",
    "Keep the bandage on for several hours post-donation"
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 py-10">Blood Donation Process</h1>
        <p className="text-center text-gray-600 mb-12">Understanding what happens during your blood donation</p>

        <div className="max-w-4xl mx-auto">
          {/* Process Steps */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {steps.map(step => (
              <div key={step.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  {step.icon}
                  <h3 className="text-xl font-semibold ml-3">{step.title}</h3>
                </div>
                <p className="text-gray-600 mb-3">{step.description}</p>
                <p className="text-sm text-red-500">Duration: {step.duration}</p>
              </div>
            ))}
          </div>

          {/* Tips Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-red-600 text-white py-3 px-6">
              <h2 className="text-xl font-semibold">Important Tips for Blood Donors</h2>
            </div>
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left py-2">#</th>
                    <th className="text-left py-2">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {tips.map((tip, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 text-gray-500">{index + 1}</td>
                      <td className="py-3">{tip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BloodDonationProcess;