import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

const Requirement = () => {
  // Data for the eligibility requirements and temporary deferrals
  const generalRequirements = [
    {
      title: "Age Requirement",
      eligible: "Between 18 and 55 years old",
      notEligible: "Under 18 or over 55 years old",
    },
    {
      title: "Weight Requirement",
      eligible: "At least 130 lbs (59 kg) for both men and women",
      notEligible: "Below 130 lbs (59 kg)",
    },
    {
      title: "Physical Condition",
      eligible: "Well-rested with adequate sleep",
      notEligible: "Lack of sleep or fatigue",
    },
    {
      title: "Alcohol Consumption",
      eligible: "No alcohol prior to donation",
      notEligible: "Recent alcohol consumption",
    },
    {
      title: "Health Status",
      eligible: "Good general health",
      notEligible: "Current illnesses or infections",
    },
  ];

  const temporaryDeferrals = [
    "Recent tattoos, piercings, or acupuncture (within 6 months)",
    "Pregnancy or currently breastfeeding",
    "Recent menstruation",
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 py-16">Can You Be a Blood Donor?</h1>
        <p className="text-center text-gray-600 mb-12">Check if you meet our eligibility requirements</p>
        
        <div className="max-w-4xl mx-auto">
          {/* General Requirements */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Basic Requirements</h2>
            {generalRequirements.map((req, index) => (
              <div key={index} className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-red-600 text-white py-3 px-6">
                  <h3 className="text-xl font-semibold">{req.title}</h3>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center text-green-600 mb-2">
                      <FaCheckCircle className="mr-2" />
                      <span className="font-semibold">Eligible:</span>
                    </div>
                    <p className="ml-8 text-gray-700">{req.eligible}</p>
                  </div>
                  <div>
                    <div className="flex items-center text-red-600 mb-2">
                      <FaTimesCircle className="mr-2" />
                      <span className="font-semibold">Not Eligible:</span>
                    </div>
                    <p className="ml-8 text-gray-700">{req.notEligible}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Temporary Deferrals */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
            <div className="bg-yellow-500 text-white py-3 px-6">
              <h2 className="text-xl font-semibold">Temporary Deferrals</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {temporaryDeferrals.map((deferral, index) => (
                  <li key={index} className="flex items-start">
                    <FaInfoCircle className="text-yellow-500 mt-1 mr-2" />
                    <span className="text-gray-700">{deferral}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaInfoCircle className="text-blue-500 text-xl" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-blue-800">Important Note</h3>
                <p className="mt-2 text-blue-700">
                  Even if you meet all the above criteria, our medical staff will conduct a thorough health assessment to ensure donating blood is safe for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requirement;
